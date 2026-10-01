// Probe: ampla cobertura de C# para testar o tema
#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using static System.Math;
using Json = System.Text.Json.JsonSerializer;

namespace Serena.Probe.Api;

/// <summary>
/// Repositório genérico para <see cref="Order"/> e afins.
/// </summary>
/// <typeparam name="TKey">Tipo da chave.</typeparam>
/// <param name="id">Não usado aqui.</param>
public interface IRepository<TKey, TEntity> where TKey : notnull where TEntity : class, new()
{
    Task<TEntity?> FindAsync(TKey id);
    IEnumerable<TEntity> All { get; }
}

public enum OrderStatus { Pending = 0, Paid = 1 << 1, Shipped, Cancelled = -1 }

[Flags]
public enum Permissions : byte { None = 0, Read = 1, Write = 2, All = Read | Write }

public record Money(decimal Amount, string Currency = "BRL")
{
    public static Money operator +(Money a, Money b) => a with { Amount = a.Amount + b.Amount };
    public static bool operator >(Money a, Money b) => a.Amount > b.Amount;
    public static bool operator <(Money a, Money b) => a.Amount < b.Amount;
    public override string ToString() => $"{Currency} {Amount:N2}";
}

public readonly record struct Point(int X, int Y);

public struct Vector2
{
    public float X;
    public float Y;
    public readonly float Length => MathF.Sqrt(X * X + Y * Y);
}

public delegate void OrderChangedHandler(object sender, OrderEventArgs e);

public sealed class OrderEventArgs : EventArgs
{
    public required Guid OrderId { get; init; }
}

public static class StringExtensions
{
    public static bool IsBlank(this string? value) => string.IsNullOrWhiteSpace(value);

    public static string Truncate(this string value, int max) =>
        value.Length <= max ? value : value[..max] + "…";
}

public class Audit(ILoggerSink sink, string source)
{
    private readonly List<string> _entries = [];
    public void Write(string message) => sink.Log($"[{source}] {message}");
    public IEnumerable<string> Entries() { foreach (var e in _entries) yield return e; }
}

public interface ILoggerSink { void Log(string line); }

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase, IDisposable
{
    private const int MaxPageSize = 100;
    private static readonly Regex SkuPattern = new(@"^[A-Z]{3}-\d{4}$", RegexOptions.Compiled);
    private readonly IRepository<Guid, Order> _repository;
    private int _requestCount;
    public static int Instances;

    public event OrderChangedHandler? OrderChanged;
    public event EventHandler<OrderEventArgs>? Shipped;

    public string Name { get; set; } = "orders";
    public int PageSize { get; private set; } = 20;
    public DateTime CreatedAt { get; } = DateTime.UtcNow;

    public OrdersController(IRepository<Guid, Order> repository)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        Instances++;
    }

    #region Endpoints

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(Order), 200)]
    public async Task<IActionResult> GetAsync(Guid id, [FromQuery] bool includeItems = false)
    {
        _requestCount += 1;
        var order = await _repository.FindAsync(id).ConfigureAwait(false);
        if (order is null) return NotFound();

        var total = order.Items?.Sum(i => i.Price * i.Quantity) ?? 0m;
        var label = order.Status switch
        {
            OrderStatus.Pending => "pending",
            OrderStatus.Paid or OrderStatus.Shipped => "ok",
            _ when total > 1_000m => "review",
            _ => throw new InvalidOperationException($"Unknown status: {order.Status}"),
        };

        OrderChanged?.Invoke(this, new OrderEventArgs { OrderId = id });
        Shipped?.Invoke(this, new() { OrderId = id });
        return Ok(new { order.Id, label, total, includeItems });
    }

    [HttpPost]
    [Obsolete("Use CreateV2", error: false)]
    public IActionResult Create([FromBody] Order order)
    {
        if (order is { Items.Count: > 0 } && order.Customer is not null)
        {
            string path = @"C:\data\orders\" + order.Id;
            string json = """
                { "id": 1, "name": "raw" }
                """;
            var interpolatedRaw = $$"""{"total": {{order.Items.Count}}}""";
            char tab = '\t';
            Console.WriteLine($"Saved {order.Id,-10} at {path}{tab}{json.Length:D4} \"ok\"");
            Console.WriteLine(interpolatedRaw);
        }
        return CreatedAtAction(nameof(GetAsync), new { id = order.Id }, order);
    }

    #endregion

    public IEnumerable<string> Query(IEnumerable<Order> orders)
    {
        var expensive =
            from o in orders
            where o.Total > 100 && o.Status != OrderStatus.Cancelled
            orderby o.CreatedAt descending
            group o by o.Customer into g
            select new { Customer = g.Key, Count = g.Count() };

        var names = orders
            .Where(o => o.Items.Any())
            .Select(static o => o.Customer?.ToUpperInvariant() ?? "anonymous")
            .Distinct()
            .ToList();

        (int count, string first) summary = (names.Count, names.FirstOrDefault() ?? string.Empty);
        var (count, first) = summary;
        Func<int, int> twice = x => x * 2;
        return names.Where(IsValid).Take(Max(twice(count), MaxPageSize));

        static bool IsValid(string sku) => SkuPattern.IsMatch(sku) || sku.IsBlank();
    }

    public T? Pick<T>(IList<T> items, Func<T, bool> predicate, out int index) where T : class
    {
        index = -1;
        for (int i = 0; i < items.Count; i++)
        {
            if (predicate(items[i])) { index = i; return items[i]; }
        }
        double ratio = 3.14e-2d;
        long mask = 0xFF_FF & ~0x0F;
        bool flag = !true && ratio >= 0.5;
        object? boxed = flag ? null : typeof(T);
        var sum = new Money(10m, "USD") + new Money(5m, "USD");
        Console.WriteLine(Json.Serialize(new { mask, boxed, sum }));
        return default;
    }

    public void Dispose()
    {
        lock (this) { GC.SuppressFinalize(this); }
    }
}

public class Order
{
    public Guid Id { get; init; }
    public string? Customer { get; set; }
    public OrderStatus Status { get; set; }
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItem> Items { get; } = new();
}

public class OrderItem
{
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

#if DEBUG
internal static class Diagnostics
{
    public static void Trace(string message) => System.Diagnostics.Debug.WriteLine(message);
}
#else
internal static class Diagnostics
{
    public static void Trace(string message) { }
}
#endif
