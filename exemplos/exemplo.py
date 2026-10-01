#!/usr/bin/env python3
"""Módulo de exemplo com recursos modernos do Python."""
from __future__ import annotations

import asyncio
import os.path as caminho
from collections.abc import Callable, Iterator
from dataclasses import dataclass, field
from enum import Enum, auto
from typing import Any, Generic, Protocol, TypeVar, overload

T = TypeVar("T", bound="Entidade")
MAX_ITENS: int = 10
_contador = 0
type Par[K, V] = tuple[K, V]


class Cor(Enum):
    VERMELHO = auto()
    AZUL = 2


class Comparavel(Protocol):
    def __lt__(self, outro: Any, /) -> bool: ...


@dataclass(frozen=True, slots=True)
class Entidade(Generic[T]):
    """Entidade base.

    Args:
        id: identificador
    """

    id: int
    tags: list[str] = field(default_factory=list)
    extras: dict[str, T | None] | None = None

    def __post_init__(self) -> None:
        object.__setattr__(self, "id", abs(self.id))

    @property
    def rotulo(self) -> str:
        return f"{self.id:>08d} {self.tags!r} {'ok' if self.tags else "vazio"} {{literal}}"

    @classmethod
    def criar(cls, *args: int, **kwargs: str) -> Entidade:
        return cls(*args, **kwargs)

    @staticmethod
    def validar(valor: object, *, estrito: bool = False) -> bool:
        return isinstance(valor, int) and not estrito

    def __repr__(self) -> str:
        return super().__repr__()


def fabrica[S: (int, str)](tipo: type[S], n: int = 0) -> Callable[[S], list[S]]:
    global _contador
    _contador += 1

    def interno(x: S) -> list[S]:
        nonlocal n
        n += 1
        return [x] * n

    return interno


@overload
def medir(x: int) -> int: ...
@overload
def medir(x: str) -> str: ...
def medir(x):
    return x


def roteador(msg: dict[str, Any]) -> str:
    match msg:
        case {"tipo": "ping", **resto} if not resto:
            return "pong"
        case {"tipo": str(t), "dados": [primeiro, *_]}:
            return f"{t}:{primeiro}"
        case Cor.AZUL | Cor.VERMELHO as cor:
            return cor.name
        case Entidade(id=0):
            return "zero"
        case _:
            return "?"


async def consumir(itens: Iterator[int]) -> list[int]:
    async with asyncio.timeout(1.5) as t:
        resultado = [x ** 2 for x in itens if (y := x % 2) == 0]
        pares = {k: v for k, v in zip("abc", range(3))}
        conjunto = {n for n in range(3)}
        gerador = (i for i in range(3))
        async for linha in fluxo():
            print(linha, t, pares, conjunto, gerador, y)
    await asyncio.sleep(0)
    return resultado


async def fluxo():
    yield b"bytes\x00"
    yield rb"\d+raw"
    yield r"C:\temp\novo"
    yield 0xFF, 1_000_000, 3.14e-2, 2j, True, False, None, ...


try:
    raise ExceptionGroup("varios", [ValueError("a"), TypeError("b")])
except* ValueError as grupo:
    print(grupo.exceptions)
except* TypeError:
    pass
finally:
    ordenar = lambda xs, chave=None: sorted(xs, key=chave, reverse=True)
    del ordenar

if __name__ == "__main__":
    assert MAX_ITENS > 0, "precisa ser positivo"
    print(caminho.join("a", "b"), os := 1, __file__, __doc__, Entidade.__name__)
    asyncio.run(consumir(iter([1, 2, 3])))


import functools


class Pilha[T]:
    TAMANHO_MAX = 100

    def __init__(self, itens: list[T] | None = None) -> None:
        self.itens: list[T] = itens or []
        self._topo = len(self.itens)

    @functools.lru_cache(maxsize=None)
    def topo(self) -> T:
        return self.itens[-1] if self.itens else self.TAMANHO_MAX

    @functools.cached_property
    def vazia(self) -> bool:
        return not self.itens

    def __add__(self, outra: Pilha[T]) -> Pilha[T]:
        return Pilha(self.itens + outra.itens)


largura, precisao = 10, 2
texto = f"{3.14159:{largura}.{precisao}f} {largura=} {'a' + "b"!s:>{largura}}"
modelo = t"ola {largura}"
p = Pilha[int]() + Pilha[int]()
for elemento in p.itens:
    print(elemento, p.vazia, Pilha.TAMANHO_MAX, p._topo)


class Colecao:
    def __iter__(self):
        yield from range(3)

    def __contains__(self, x: object) -> bool:
        return x == 1


for item in Colecao():
    print(item, 1 in Colecao(), 2 not in Colecao())

import sys
class App:
    def route(self, caminho: str) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
        return lambda f: f


app = App()


@app.route("/")
def index() -> str:
    return caminho.sep + sys.argv[0]
