# Desenvolvimento

## Testar

1. Abra esta pasta no VS Code.
2. Pressione `F5`. Uma nova janela abre com os temas carregados (e a pasta `exemplos/`).
3. Na nova janela: `Ctrl+K Ctrl+T` e escolha um dos temas Serena; para os ícones, **Preferences: File Icon Theme** e **Serena Icons**.

## Editar

Os arquivos em `themes/` e `icons/` são **gerados**. Edite `src/` e rode:

```bash
node build.mjs
```

- `src/tokens.mjs`: regras de sintaxe, iguais para todas as variantes. Em vez de cores, usam papéis (`r.keyword`, `r.func`...).
- `src/variants/*.mjs`: cada variante define a cor de cada papel e as cores da interface.
- `src/icons/`: ícones de arquivos e pastas.
  - `mapping.json`: quais arquivos e pastas usam cada ícone.
  - `drawn/*.mjs`: desenhos originais (edição Minimal); regras em `system/style.md`.
  - `logos/*.mjs`: desenhos com logos (edição Serena Icons); regras em `logos/logo-style.md`. O que não estiver aqui usa o desenho original.
  - Antes de adicionar um logo, confira a licença e as regras de uso da marca e registre o crédito em `THIRD_PARTY_NOTICES.md`.

Para criar uma nova variante, copie um arquivo de `src/variants/`, mude `id`, `label` e as cores e rode o build. O `package.json` é atualizado automaticamente.

Com a janela de teste (F5) aberta, depois do build use `Developer: Reload Window` nela para ver a mudança.

## Empacotar e instalar localmente

```bash
npx @vscode/vsce package
code --install-extension serena-theme-<versão>.vsix
```

## Publicar

O passo a passo completo (Marketplace, Open VSX e automação pelo GitHub) está em [PUBLICAR.md](PUBLICAR.md).
