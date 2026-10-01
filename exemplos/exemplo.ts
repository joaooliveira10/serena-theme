// Arquivo de exemplo para visualizar o tema
import { readFile } from "node:fs/promises";

interface Usuario {
  id: number;
  nome: string;
  ativo: boolean;
}

const LIMITE_MAXIMO = 42;

/**
 * Carrega usuários de um arquivo JSON.
 */
export class RepositorioUsuarios {
  private cache = new Map<number, Usuario>();

  constructor(private readonly caminho: string) {}

  async carregar(filtro?: (u: Usuario) => boolean): Promise<Usuario[]> {
    const texto = await readFile(this.caminho, "utf-8");
    const dados: Usuario[] = JSON.parse(texto);

    for (const usuario of dados) {
      if (usuario.id > LIMITE_MAXIMO) continue;
      this.cache.set(usuario.id, usuario);
    }

    const resultado = filtro ? dados.filter(filtro) : dados;
    console.log(`Carregados ${resultado.length} usuários de ${this.caminho}`);
    return resultado;
  }
}

const regex = /^[a-z]+\d*$/gi;
const ativos = new RepositorioUsuarios("./usuarios.json").carregar((u) => u.ativo && regex.test(u.nome));
