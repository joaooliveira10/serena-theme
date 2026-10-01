// Package probe exercises Go syntax for the Serena theme.
package main

import (
	"context"
	"errors"
	"fmt"
	str "strings"
	_ "embed"
	. "math"
	"net/http"
	"sync"
	"time"
)

// MaxRetries is exported; iota drives the enum below.
const MaxRetries = 3

const (
	Pending Status = iota
	Running
	Done
	KB = 1 << (10 * (iota - 2))
)

var (
	ErrNotFound = errors.New("not found")
	defaultTTL  = 30 * time.Second
	ratio       = 0.75
	hexMask     = 0xFF_FF
	octal       = 0o755
	bin         = 0b1010
	avogadro    = 6.022e+23
	hexFloat    = 0x1p-2
	imag        = 2.5i
	letter      = 'x'
	newline     = '\n'
	unicodeRune = '\u00e9'
	query       = `SELECT *
FROM users WHERE id = $1`
)

//go:embed README.md
var readme string

type Status int

// User has struct tags.
type User struct {
	ID        int64             `json:"id" db:"user_id"`
	Name      string            `json:"name,omitempty"`
	Email     *string           `json:"email"`
	Tags      []string          `json:"tags"`
	Meta      map[string]any    `json:"-"`
	CreatedAt time.Time         `json:"created_at"`
	handler   func(int) error
	sync.Mutex                  // embedded
}

type Repository interface {
	Find(ctx context.Context, id int64) (*User, error)
	fmt.Stringer
}

type Number interface {
	~int | ~int64 | ~float64
}

type Pair[K comparable, V any] struct {
	Key   K
	Value V
}

// Server is a receiver example.
type Server struct {
	addr  string
	users map[int64]*User
	mu    sync.RWMutex
}

func NewServer(addr string) *Server {
	return &Server{addr: addr, users: make(map[int64]*User, 16)}
}

func (s *Server) Find(ctx context.Context, id int64) (*User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	if u, ok := s.users[id]; ok && u != nil {
		return u, nil
	}
	return nil, fmt.Errorf("user %d: %w", id, ErrNotFound)
}

func (s Server) String() string { return "server@" + s.addr }

func Sum[T Number](xs ...T) (total T) {
	for _, x := range xs {
		total += x
	}
	return
}

func Map[K comparable, V any](pairs []Pair[K, V]) map[K]V {
	out := make(map[K]V, len(pairs))
	for i := 0; i < len(pairs); i++ {
		out[pairs[i].Key] = pairs[i].Value
	}
	return out
}

func worker(ctx context.Context, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case j, ok := <-jobs:
			if !ok {
				return
			}
			results <- fmt.Sprintf("job %03d done in %.2fs (%v, %q, %T, %x)\n", j, ratio, j, "q", j, j)
		case <-ctx.Done():
			return
		default:
			time.Sleep(10 * time.Millisecond)
		}
	}
}

func describe(v interface{}) string {
	switch t := v.(type) {
	case nil:
		return "nil"
	case int, int64:
		return fmt.Sprint("int ", t)
	case string:
		return str.ToUpper(t)
	case error:
		return t.Error()
	default:
		return fmt.Sprintf("%v", t)
	}
}

func mustPositive(n int) (result int, err error) {
	defer func() {
		if r := recover(); r != nil {
			err = fmt.Errorf("recovered: %v", r)
		}
	}()
	if n < 0 {
		panic("negative")
	}
	result = n
	return result, nil
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	srv := NewServer(":8080")
	var repo Repository = srv
	u, err := repo.Find(ctx, 42)
	if err != nil && !errors.Is(err, ErrNotFound) {
		fmt.Println("error:", err)
	}
	_ = u

	nums := []int{1, 2, 3}
	matrix := [2][3]float64{{1, 2, 3}, {4, 5, 6}}
	lookup := map[string]int{"a": 1, "b": 2}
	p := Pair[string, int]{Key: "k", Value: 1}
	user := User{ID: 1, Name: "Ana", Tags: nil}
	pt := &struct{ X, Y int }{X: 1, Y: 2}
	nums = append(nums, len(lookup), cap(nums), MaxRetries)
	ptr := new(int)
	*ptr = Sum(nums...)
	f := float64(*ptr) / Pi
	b := []byte("bytes")
	copy(b, "x")
	delete(lookup, "a")
	ch := make(chan int, 3)
	close(ch)
	fmt.Println(matrix[1][2], p.Key, user.Name, pt.X, f, Sqrt(2), true, false)

	jobs := make(chan int)
	results := make(chan string, 1)
	var wg sync.WaitGroup
	wg.Add(1)
	go worker(ctx, jobs, results, &wg)
	go func(n int) { jobs <- n }(7)

	count := 0
outer:
	for i := range 10 {
		for j := 0; j < 3; j++ {
			if i*j > 6 || i == j {
				continue outer
			}
			count++
			if count >= 5 {
				break outer
			}
		}
	}
	if count != 5 {
		goto end
	}
	count <<= 2
	count &^= 1
end:
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "%s %d\t%v", r.Method, http.StatusOK, readme)
	})
	fmt.Println(describe(3.14), mustPositive, Done, KB, hexMask, octal, bin, imag, avogadro, hexFloat, letter, newline, unicodeRune, query, defaultTTL)
}
