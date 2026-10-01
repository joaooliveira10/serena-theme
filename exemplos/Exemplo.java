/*
 * Probe: ampla cobertura de Java para testar o tema
 */
package com.serena.probe.orders;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import static java.util.Objects.requireNonNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador REST para {@link Order}.
 *
 * @author Serena
 * @param <T> tipo da entidade
 * @see OrderService#findAll()
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController<T extends Comparable<T>> implements AutoCloseable {

    public static final int MAX_PAGE_SIZE = 100;
    private static final String DEFAULT_NAME = "orders";
    private static int instances = 0;

    private final OrderService service;
    private int requestCount;

    @Autowired
    public OrderController(OrderService service) {
        this.service = requireNonNull(service, "service");
        instances++;
    }

    /**
     * Busca um pedido.
     *
     * @param id o id do pedido
     * @return o pedido, ou {@code null}
     * @throws IllegalStateException quando o status é desconhecido
     */
    @GetMapping("/{id}")
    public Optional<Order> find(@PathVariable("id") long id) {
        requestCount += 1;
        var order = service.findById(id);
        if (order == null || !order.isActive()) {
            return Optional.empty();
        }
        String label = switch (order.status()) {
            case PENDING -> "pending";
            case PAID, SHIPPED -> "ok";
            default -> throw new IllegalStateException("Unknown: " + order.status());
        };
        return Optional.of(order);
    }

    @Override
    @Deprecated(since = "2.0", forRemoval = true)
    public String toString() {
        return String.format("OrderController[%s, %d]%n", DEFAULT_NAME, requestCount);
    }

    public List<String> customers(List<Order> orders) {
        Map<String, Long> byCustomer = orders.stream()
                .filter(o -> o.total() > 100.0 && o.status() != Status.CANCELLED)
                .map(Order::customer)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        return byCustomer.keySet().stream().sorted(Comparator.reverseOrder()).toList();
    }

    public String describe(Object obj) {
        if (obj instanceof Order o && o.total() >= 0) {
            return "Order of " + o.customer();
        }
        return switch (obj) {
            case Integer i when i > 10 -> "big int " + i;
            case String s -> "string of length " + s.length();
            case null -> "null";
            default -> obj.toString();
        };
    }

    public String readAll(Path path) throws IOException {
        String template = """
                {
                  "name": "%s",
                  "tab": "\t"
                }
                """;
        try (BufferedReader reader = Files.newBufferedReader(path)) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
            return template.formatted(sb);
        } catch (IOException | RuntimeException e) {
            throw new IllegalStateException("failed: " + e.getMessage(), e);
        } finally {
            requestCount--;
        }
    }

    public static <K, V extends Number> Map<K, V> copy(Map<? extends K, ? super V> source) {
        int hex = 0xFF_FF;
        long big = 1_000_000L;
        double ratio = 3.14e-2d;
        char c = 'x';
        boolean flag = true;
        int[] values = new int[] { 1, 2, 3 };
        return new HashMap<>();
    }

    @Override
    public void close() {
        synchronized (this) {
            instances = Math.max(0, instances - 1);
        }
    }
}

enum Status {
    PENDING("P"), PAID("A"), SHIPPED("S"), CANCELLED("C");

    private final String code;

    Status(String code) { this.code = code; }

    public String code() { return code; }
}

record Order(long id, String customer, double total, Status status) {
    Order {
        Objects.requireNonNull(customer);
    }

    boolean isActive() { return status != Status.CANCELLED; }
}

sealed interface Shape permits Circle, Square {}
final class Circle implements Shape { double radius; }
non-sealed class Square implements Shape { double side; }

interface OrderService {
    Order findById(long id);
    default List<Order> findAll() { return List.of(); }
}

@FunctionalInterface
interface Mapper<A, B> {
    B apply(A input);
}

class Holder {
    @SuppressWarnings({"unchecked", "rawtypes"})
    private Map<String, List<Integer>> map = new TreeMap<>();
    Runnable r = () -> System.out.println(this.map);
    Mapper<String, Integer> len = String::length;
    java.util.function.Supplier<Holder> factory = Holder::new;
    int[] arr = {1, 2};
    int x = arr.length > 0 ? arr[0] : -1;
    int bits = (x << 2) | (x >>> 1) & ~x ^ 3;
    String nl = "line\n";
}
