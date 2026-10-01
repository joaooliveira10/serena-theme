// @ts-check
"use strict";
import fs, { readFile as ler, constants } from "node:fs";
import * as path from "node:path";
import padrao from "./padrao.js";
export { ler as lerArquivo };
export * from "./util.js";
export default class Contador {}
const { EventEmitter } = require("node:events");
const lodash = require("lodash");
module.exports = { Contador };

const LIMITE = 3;
const CONFIG = Object.freeze({ nivel: "info", tentativas: LIMITE });

/**
 * Soma valores.
 * @param {number} a - primeiro valor
 * @param {Array<string>} [lista=[]] lista opcional
 * @returns {Promise<number>} o resultado
 * @typedef {{ id: number, nome?: string }} Item
 * @see {@link Contador}
 */
export async function soma(a, lista = [], ...resto) {
  return a + lista.length + resto.length;
}

class Conta extends EventEmitter {
  #saldo = 0;
  static #instancias = 0;
  static TAXA = 0.02;
  static {
    Conta.#instancias = 0;
  }
  constructor(titular, { moeda = "BRL", limite: max = 100 } = {}) {
    super();
    this.titular = titular;
    this.moeda = moeda;
    this.max = max;
  }
  get saldo() { return this.#saldo; }
  set saldo(valor) { this.#saldo = valor; }
  #validar(v) { return typeof v === "number" && !Number.isNaN(v); }
  async *extrato(itens) {
    for await (const item of itens) yield item?.valor ?? 0;
  }
  static criar(...args) { return new Conta(...args); }
}

const html = (partes, ...vals) => partes.raw.join("|") + vals.length;
const saida = html`<b>${CONFIG.nivel}</b> ${1 + 2}`;
const data = /(?<ano>\d{4})-(?<mes>\d{2})-\k<mes>/u;
const { groups: { ano = "0000" } = {} } = data.exec("2024-05-05") ?? {};
let cache = null;
cache ??= new Map();
cache ||= new Map();
cache &&= cache;
const copia = { ...CONFIG, extra: [...[1, 2, 3], 0x1f, 1_000n, 1e-3] };
const valor = copia?.extra?.[0] ?? copia.nivel;
const fn = function nomeada() { return arguments.length; };
const seta = async (x = 1, { y } = {}) => await Promise.resolve(x + y);

externo: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue externo;
    if (i > 1 && j !== 0 || !valor) break externo;
  }
}

switch (typeof valor) {
  case "string": console.log(`texto: ${valor.toUpperCase()}`); break;
  default: throw new TypeError("tipo inesperado");
}
try { JSON.parse("{"); } catch ({ message }) { console.error(message); } finally { void 0; }
delete copia.extra;
if ("nivel" in copia && copia instanceof Object) console.log(this, globalThis, undefined, NaN, Infinity);
const conta = new Conta("Ana");
conta.saldo = 10;
document.querySelector("#app")?.addEventListener("click", (evento) => evento.preventDefault());
class Privado {
  #valor = 1;
  #calcular() { return this.#valor; }
  usar(outro) { return #valor in outro && this.#calcular(); }
  handle = async () => { await this.usar(this); };
  static { this.criado = new.target === undefined; }
}
function comCallback(pronto = () => {}, erro = function nomeado() {}) { pronto(); erro(); }
const url = import.meta.url;
export async function* gerar() { yield* [1, 2]; }
