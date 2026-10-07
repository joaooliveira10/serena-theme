// Serena Icons — edição com logos para os conceitos de configuração da v5.
// Cada arquivo de configuração reutiliza o logo do conceito de onde veio (mesmo desenho e mesmas cores),
// por referência: uma correção no logo original vale automaticamente aqui.
// A edição Minimal desenha esses arquivos como configuração (drawn/v5-configs.mjs).
// Um id escrito errado (A["nugget"]) vale undefined: o build recusa, em vez de cair calado no desenho Minimal.
// Para um arquivo voltar ao desenho Minimal, apague a linha dele.
import { icons as A } from "./logos-a.mjs";
import { icons as B } from "./logos-b.mjs";

export const icons = {
  "nuget-config": A["nuget"],
  "nuget-lock": A["nuget"],
  "cmake-config": A["cmake"],
  "laravel-artisan": A["laravel"],
  "r-config": A["r"],
  "r-lock": A["r"],
  "r-data": A["r"],
  "haskell-package": A["haskell"],
  "haskell-lock": A["haskell"],
  "haskell-config": A["haskell"],
  "zig-package": A["zig"],
  "nix-config": A["nix"],
  "nix-lock": A["nix"],
  "svelte-config": B["svelte"],
  "yarn-config": B["yarn"],
  "pnpm-config": B["pnpm"],
  "deno-lock": B["deno"],
  "godot-scene": A["godot"],
  "godot-config": A["godot"],
};
