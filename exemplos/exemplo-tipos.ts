import { EventEmitter } from "node:events";
import type { Readable } from "node:stream";
import * as os from "node:os";
export type { Readable as Leitura };

const enum Direcao { Norte = "N", Sul = "S" }
enum Status { Ativo = 1, Inativo = Ativo << 1 }
declare const VERSAO: string;
declare module "node:events" { interface EventEmitter { extra?: number } }
declare global { interface Window { app: unknown } }

export const ROTAS = ["/", "/sobre"] as const;
type Rota = (typeof ROTAS)[number];
type Chaves<T> = keyof T;
type Opcional<T> = { [K in keyof T]?: T[K] };
type SomenteLeitura<T> = { readonly [K in keyof T as `get${Capitalize<string & K>}`]-?: () => T[K] };
type Desembrulha<T> = T extends Promise<infer U> ? U : T extends Array<infer V> ? V : never;
type Evento = `on${Capitalize<"click" | "focus">}`;
type Par<A = string, B extends number = 0> = [primeiro: A, segundo?: B, ...resto: unknown[]];
type Fn = (...args: any[]) => void;
type Ctor = new (x: number) => object;
type Uniao = string | null | undefined | bigint | symbol | object | never;

interface Entidade { readonly id: number; nome?: string; [chave: string]: unknown }
interface Entidade { criadoEm: Date }
interface Repo<T extends Entidade = Entidade> extends Iterable<T> {
  buscar(id: T["id"]): Promise<T | undefined>;
  new (x: T): Repo<T>;
}

namespace Geometria {
  export namespace Unidades { export const CM = 1; }
  export function area(l: number): number { return l * l * Unidades.CM; }
}

function Module(meta: { imports: unknown[]; providers?: unknown[] }) { return (alvo: Function) => { void meta; void alvo; }; }
function Injectable() { return (alvo: Function) => void alvo; }
function Inject(token: string) { return (alvo: object, chave: string | symbol | undefined, idx: number) => void [alvo, chave, idx]; }
function Log(alvo: object, chave: string) { void [alvo, chave]; }
class Http {}

@Injectable()
export class Servico { ping() { return "pong"; } }

@Module({ imports: [Http], providers: [Servico] })
export class AppModule {}

export abstract class Base<T> {
  protected abstract validar(x: T): boolean;
  public static contador = 0;
  private readonly segredo!: string;
  #interno?: number;
  declare campo: string;
  constructor(@Inject("CFG") protected cfg: Record<string, unknown>, public readonly nome = "base") {}
  @Log
  metodo(this: Base<T>, valor?: T): asserts valor is NonNullable<T> {
    if (valor == null) throw new Error("vazio");
  }
  get tamanho(): number { return this.#interno!; }
  set tamanho(v: number) { this.#interno = v; }
}

export function isString(x: unknown): x is string { return typeof x === "string"; }
function assertDefinido<T>(v: T | undefined, msg?: string): asserts v { if (v === undefined) throw new Error(msg); }

function converte(x: string): number;
function converte(x: number): string;
function converte(x: string | number): string | number {
  return typeof x === "string" ? Number(x) : String(x);
}

const cfg = { porta: 8080, host: "localhost" } satisfies Record<string, string | number>;
const valor = <const T extends readonly unknown[]>(xs: T): T[0] => xs[0];
let definido!: number;
const el = document.getElementById("app")!;
const maybe = (el as HTMLElement | null)?.dataset?.["x"] ?? "padrao";
export default function principal<TEntrada, TSaida = void>(entrada: TEntrada, mapear: (e: TEntrada) => TSaida): TSaida {
  const local = mapear(entrada);
  const unico = Symbol("id");
  for (const [k, v] of Object.entries(cfg)) console.log(k, v, unico.description);
  assertDefinido(local);
  return local;
}
abstract class Forma { abstract area(): number; }
class Quadrado extends Forma implements Iterable<number> {
  constructor(private lado: number) { super(); }
  override area() { return this.lado ** 2; }
  *[Symbol.iterator]() { yield this.lado; }
}
export { Quadrado, Direcao, Status, Geometria, converte, valor, maybe, definido, os, VERSAO };
using recurso = { [Symbol.dispose]() {} };
namespace Deco { export function Marca() { return (a: object, k: string) => void [a, k]; } export const Simples = (a: object, k: string) => void [a, k]; }
class Decorada {
  @Deco.Marca() um = 1;
  @Deco.Simples dois = 2;
  @Log tres() { return new.target; }
  accessor quatro = 4;
  static #contagem = 0;
  static existe(o: object) { return #contagem in o && Decorada.#contagem >= 0; }
  opcional?(): void;
}
const obj = { get x() { return 1; }, set x(v: number) { void v; }, [`k${1}`]: true, metodo() { return import.meta.url; } };
function comCallback(pronto = () => {}, erro = function nomeado() {}) { pronto(); erro(); }
const lista: Array<Record<string, number>> = [];
const r = converte<string>;
declare const unico: unique symbol;
type K2 = keyof typeof obj;
