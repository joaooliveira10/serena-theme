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

```bash
node scripts/check.mjs
```

Só é preciso o Node.js: não há dependências para instalar. O CI usa o Node 24.

- `src/tokens.mjs`: regras de sintaxe, iguais para todas as variantes. Em vez de cores, usam papéis (`r.keyword`, `r.func`...).
- `src/variants/*.mjs`: cada variante define a cor de cada papel e as cores da interface. As cores são escritas em minúsculas, como `#rrggbb` ou `#rrggbbaa`.
- `src/icons/`: ícones de arquivos e pastas.
  - `mapping.json`: quais arquivos e pastas usam cada ícone.
  - `drawn/*.mjs`: desenhos originais (edição Minimal); regras em `system/style.md`.
  - `logos/*.mjs`: desenhos com logos (edição Serena Icons); regras em `logos/logo-style.md`. O que não estiver aqui usa o desenho original.
  - Antes de adicionar um logo, confira a licença e as regras de uso da marca e registre o crédito em `THIRD_PARTY_NOTICES.md`.

Para criar uma nova variante, copie um arquivo de `src/variants/`, mude `id`, `label` e as cores e rode o build. O `id` tem que ser igual ao nome do arquivo e o `type` é um de `dark`, `light`, `hc` ou `hcLight`. O `package.json` é atualizado automaticamente. Inclua também o nome do tema na lista de `.github/ISSUE_TEMPLATE/wrong-color.yml`. O `.vscodeignore` só deixa entrar no pacote os temas cujo `id` começa com `serena-`; para outro nome, inclua uma linha lá. O `node scripts/check.mjs` acusa as duas coisas.

Com a janela de teste (F5) aberta, depois do build use `Developer: Reload Window` nela para ver a mudança.

## O que é conferido

O `node build.mjs` confere tudo antes de gravar. Ele para com uma lista de problemas, dizendo o arquivo e a chave, e não grava nem apaga nenhum arquivo, quando encontra:

- um papel que não existe em `src/tokens.mjs` (por exemplo `r.keywrod`) ou uma regra sem cor nem estilo;
- uma variante com `type` errado, `id` ou `label` repetido, um papel faltando ou uma cor que não é `#rrggbb` ou `#rrggbbaa`;
- um ícone do `mapping.json` sem desenho, ou o mesmo nome de arquivo em dois ícones.

O `node scripts/check.mjs` roda depois do build e confere o que o build não confere. Ele imprime uma linha por problema e, quando está tudo certo, termina com `ok`. As linhas que começam com `warning` são avisos e não reprovam. Ele confere:

- o contraste de cada cor de sintaxe sobre o fundo do editor: 4,5:1 nos temas comuns e 7:1 nos de alto contraste;
- se todas as variantes definem os mesmos papéis, e se uma chave da interface existe numa variante e falta na outra;
- se os ícones de símbolo (`symbolIcon.*`) usam a cor do papel correspondente;
- o tema de ícones: todo caminho existe, nenhum SVG sobra, nenhum nome está em dois ícones;
- os SVG: só formas simples, sem script, sem estilo, sem link para outro arquivo;
- os números do `README.md`, as listas de temas do `package.json` e dos formulários de issue, a entrada da versão no `CHANGELOG.md`;
- se o `package.json` continua sem código, sem dependências e só com temas de cores e de ícones;
- se a versão do `vsce` e a do `ovsx` são as mesmas nos workflows e nos guias;
- se o `.vscodeignore` deixa entrar no pacote tudo o que é usado, incluindo `LICENSE` e `THIRD_PARTY_NOTICES.md`, e deixa de fora os arquivos soltos de `themes/` e `icons/`.

No GitHub, o workflow **Validate** roda os dois em todo push no branch `main` e em todo pull request. Ele também falha se o build mudar ou criar algum arquivo que não está no commit, e confere a lista de arquivos do pacote. O workflow **Release** repete as mesmas conferências antes de publicar.

As imagens da loja (`images/hero.png`, `images/palette.png` e `images/screenshots/`) são geradas por `node scripts/store/render.mjs` (o cabeçalho do script diz do que ele precisa), mas o build não as atualiza quando uma cor muda. Depois de gerá-las de novo, rode `node scripts/check.mjs --stamp-screenshots` e inclua no commit o arquivo `images/screenshots/colors.sha256` que ele cria. A partir daí, o check avisa quando as cores mudarem e as imagens ficarem antigas. O script trabalha numa pasta temporária e abre o navegador sem janela, com um perfil descartável: os dois são apagados no fim. Com `--work <pasta>`, as páginas e as capturas ficam nessa pasta, que tem que estar fora do repositório; o perfil do navegador é apagado mesmo assim, porque guarda o nome do usuário e caminhos do computador. Assim, nada disso entra num commit nem no pacote.

## Empacotar e instalar localmente

Antes de empacotar, rode `node build.mjs` e `node scripts/check.mjs`: o build apaga arquivos soltos de `themes/` e `icons/` que, de outro modo, poderiam entrar no pacote.

```bash
npx --yes @vscode/vsce@3.9.2 package
```

```bash
code --install-extension serena-theme-X.Y.Z.vsix
```

O `@3.9.2` é a versão do `vsce` que os workflows usam. Ela precisa do Node 20 ou mais novo. No segundo comando, troque `X.Y.Z` pela versão do `package.json`.

## Publicar

O passo a passo completo (Marketplace, Open VSX e automação pelo GitHub) está em [PUBLICAR.md](PUBLICAR.md).
