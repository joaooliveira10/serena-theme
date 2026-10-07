# Como publicar o Serena Theme

Guia conferido nas documentações oficiais em 29/09/2026 (seções 1, 2 e 3 revistas em 06/10/2026). Tudo abaixo é feito por você: são ações públicas na sua conta.

## 0. Antes de tudo: o repositório no GitHub

O README da loja usa as imagens de `images/` (`hero.png`, `palette.png` e a pasta `screenshots/`), e o `vsce` troca os links relativos por links do GitHub. Sem o repositório público, as imagens aparecem quebradas. Esses links apontam sempre para o branch principal (`raw/HEAD`), não para a versão publicada: trocar um desses PNGs muda a página das duas lojas sem publicar versão nova, e apagar ou renomear um PNG quebra as imagens da versão que já está publicada.

O `package.json` já aponta para `https://github.com/joaooliveira10/serena-theme`. Para criar esse repositório e enviar o projeto:

```bash
git init -b main
```

```bash
git add .
```

```bash
git commit -m "Serena Theme 1.0.0"
```

```bash
gh repo create serena-theme --public --source . --push
```

Se usar outro nome ou outra conta, atualize `repository`, `bugs` e `homepage` no `package.json`.

## 1. Visual Studio Marketplace (a loja do VS Code)

### Criar o publisher (uma vez só)

1. Acesse https://marketplace.visualstudio.com/manage e entre com sua conta Microsoft.
2. Clique em **Create publisher**.
3. **ID**: `joaoangello`. Tem que ser igual ao campo `publisher` do `package.json` e não pode ser mudado depois. Se já estiver em uso, escolha outro e troque no `package.json` também.
4. **Name**: o nome exibido na loja, por exemplo `João Angello`.

### O `vsce` e o `ovsx` no seu computador

Os comandos deste guia usam as mesmas versões que os workflows usam e testam: `@vscode/vsce@3.9.2` e `ovsx@1.2.0`. Sem o número, o `npx` roda a versão mais nova que existir, que pode ser outra.

Antes de rodar qualquer um deles, repita no terminal as duas proteções dos workflows: não rodar scripts de instalação e não aceitar pacotes publicados há menos de 7 dias. Elas valem só para aquele terminal.

No Git Bash:

```bash
export NPM_CONFIG_IGNORE_SCRIPTS=true NPM_CONFIG_MIN_RELEASE_AGE=7
```

No PowerShell:

```powershell
$env:NPM_CONFIG_IGNORE_SCRIPTS = "true"; $env:NPM_CONFIG_MIN_RELEASE_AGE = "7"
```

Para conferir, `npm config get min-release-age` tem que responder `7`.

O Dependabot não acompanha essas duas versões, porque elas ficam dentro de comandos. De vez em quando, veja a mais nova com `npm view @vscode/vsce version` e `npm view ovsx version`. Para trocar, espere a versão ter mais de 7 dias, mude o número em `.github/workflows/validate.yml`, em `.github/workflows/release.yml`, neste guia e no `CONTRIBUTING.md`, e espere o **Validate** ficar verde. O `node scripts/check.mjs` acusa se sobrar um lugar com outra versão ou sem versão. O `vsce` 4 exige o Node 22 ou mais novo.

### Gerar o pacote

Antes de empacotar à mão, rode `node build.mjs` e `node scripts/check.mjs`: o build apaga arquivos soltos de `themes/` e `icons/` que, de outro modo, poderiam entrar no pacote.

```bash
npx --yes @vscode/vsce@3.9.2 package
```

Isso cria `serena-theme-X.Y.Z.vsix`, com o número da versão do `package.json`. Teste antes de publicar (troque `X.Y.Z` pela versão):

```bash
code --install-extension serena-theme-X.Y.Z.vsix
```

### Publicar: jeito recomendado (upload manual)

1. Em https://marketplace.visualstudio.com/manage, clique em **+ New extension** → **Visual Studio Code**.
2. Envie o arquivo `.vsix`.
3. A versão fica em "Verifying" enquanto passa pela verificação de segurança, que costuma levar alguns minutos. Depois aparece em https://marketplace.visualstudio.com/items?itemName=joaoangello.serena-theme

Esse jeito não precisa de token e continua funcionando depois de 01/12/2026.

### Publicar pela linha de comando (só até 30/11/2026)

Os tokens PAT globais do Azure DevOps, que o Marketplace exige, param de funcionar em **01/12/2026**. Até lá:

1. Em https://dev.azure.com, crie uma organização (se não tiver).
2. **User settings** → **Personal access tokens** → **New Token**:
   - Organization: **All accessible organizations**
   - Expiration: até 30/11/2026
   - Scopes: **Custom defined** → **Show all scopes** → **Marketplace: Manage**
3. Publique o arquivo `.vsix` que você já testou (troque `X.Y.Z` pela versão). O token fica só na variável `VSCE_PAT` desse terminal, que o `vsce` lê sozinho: não o escreva no comando, porque ele ficaria no histórico. O primeiro comando espera você colar o token e apertar Enter, sem mostrar o token na tela (o Git Bash não mostra nada; o PowerShell mostra asteriscos).

No Git Bash:

```bash
read -rs VSCE_PAT && export VSCE_PAT
```

```bash
npx --yes @vscode/vsce@3.9.2 publish --packagePath serena-theme-X.Y.Z.vsix
```

```bash
unset VSCE_PAT
```

No PowerShell:

```powershell
$env:VSCE_PAT = [System.Net.NetworkCredential]::new("", (Read-Host -AsSecureString "Token")).Password
```

```powershell
npx --yes @vscode/vsce@3.9.2 publish --packagePath serena-theme-X.Y.Z.vsix
```

```powershell
Remove-Item Env:VSCE_PAT
```

Não use `vsce login`: ele guarda o token no computador e, quando não consegue abrir o cofre de senhas do sistema, grava o token em texto puro no arquivo `.vsce` da sua pasta de usuário.

Depois de 01/12/2026, o caminho oficial por linha de comando é o Microsoft Entra ID (`vsce publish --azure-credential`); veja o bloco comentado em `.github/workflows/release.yml`.

### Publicar novas versões

Siga o passo a passo da seção 3: é um só para as duas lojas, e as duas recebem o mesmo arquivo.

No Marketplace, enquanto não houver publicação automática, o envio é manual: na página manage, use **...** (More Actions) → **Update** e envie o `serena-theme.vsix` anexado à Release do GitHub.

### Cuidado

`vsce unpublish` **apaga a extensão para sempre**: perde as estatísticas e o nome fica reservado, nem você pode reutilizar. Para só esconder, use **More Actions** → **Unpublish** na página manage.

## 2. Open VSX (VSCodium, Cursor e outros editores)

A extensão está em https://open-vsx.org/extension/joaoangello/serena-theme

### Preparar a conta (uma vez só, já feito)

1. Crie uma conta em https://accounts.eclipse.org e preencha **GitHub Username** com `joaooliveira10`.
2. Entre em https://open-vsx.org com o GitHub → avatar → **Settings** → **Profile** → **Log in with Eclipse** e assine o **Publisher Agreement**.
3. Em **Settings**, clique no **+** ao lado de **Namespaces** e crie `joaoangello` (igual ao `publisher` do `package.json`, com as mesmas maiúsculas e minúsculas).

### Posse do namespace (já feito)

Quem cria um namespace vira só colaborador dele. Enquanto ninguém for dono, a página da extensão mostra um aviso de "publisher não verificado", e não dá para usar a publicação automática sem token.

Para pedir a posse, abra **Settings** → **Namespaces** → `joaoangello` → **Claim Ownership**. Isso abre o formulário de uma issue pública em https://github.com/EclipseFdn/open-vsx.org. Marque **Ownership**, **Account Age** e a **Option 1** (o namespace também é um publisher no Marketplace, com uma extensão cujo repositório pertence à sua conta do GitHub) e envie. A equipe da Eclipse analisa à mão. O pedido desta extensão foi a [issue 13839](https://github.com/EclipseFdn/open-vsx.org/issues/13839), aprovada em 06/10/2026, cerca de meia hora depois.

### Publicar pelo GitHub sem token (Trusted Publishing, já configurado)

Cada tag `vX.Y.Z` enviada publica no Open VSX pelo workflow da seção 3. Não há segredo guardado: o GitHub prova ao Open VSX de onde vem a execução, e recebe um token que dura minutos e só publica esta extensão.

O que foi configurado em 06/10/2026:

1. No Open VSX, **Settings** → **Trusted Publishers** → **Add a trusted publisher**. No diálogo, escolha **Namespace** `joaoangello`, **Publisher** `GitHub` e **Extension** `serena-theme`, preencha os campos abaixo e clique em **Register**:
   - Organization or User name: `joaooliveira10`
   - Repository name: `serena-theme`
   - Workflow filename: `release.yml`
   - Environment name: `release`
2. No GitHub, **Settings** → **Environments** → `release` → **Environment variables**: `OVSX_TRUSTED_PUBLISHING` com o valor `true`, escrito exatamente assim.

Se o botão **Add a trusted publisher** não aparecer, há dois motivos possíveis:

- A posse do namespace ainda não foi aprovada. A página mostra "Trusted publishers are registered per namespace — create or join a namespace first."
- A extensão já tem um registro, e cada extensão só pode ter um. A página lista o registro e mostra "Every active extension in your namespaces already has a trusted publisher." É o caso hoje: para registrar de novo, apague antes o registro atual.

O que esse registro significa:

- **Em que o Open VSX confia.** Em qualquer execução do arquivo `release.yml` deste repositório, de qualquer branch ou tag, que rode no ambiente `release`. Quem consegue enviar código para o repositório, ou rodar código dentro desse job, consegue publicar. Isso não é só você: um GitHub App instalado na sua conta com permissão de escrita em **Contents** neste repositório também consegue enviar commits e tags, e é o envio de uma tag `vX.Y.Z` que dispara a publicação. Para ver quais apps têm acesso, abra no repositório **Settings** → **Integrations** → **GitHub Apps**. Em cada um, **Configure** abre a página da instalação: ali aparecem as permissões e, em **Repository access**, dá para escolher **Only select repositories** sem o `serena-theme`, ou desinstalar o app que você não usa.
- **Como desligar.** Apague o registro em **Settings** → **Trusted Publishers** no Open VSX: é ele que revoga a permissão. Apague também a variável `OVSX_TRUSTED_PUBLISHING` (no GitHub, **Settings** → **Environments** → `release` → **Environment variables**). Sem o registro e com a variável ainda em `true`, a próxima tag falha no passo do Open VSX com `No trusted publisher matches the presented token` e a Release do GitHub não é criada. Apagar só a variável faz o workflow pular o passo, mas não revoga a permissão.
- **O registro não pode ser editado.** Se renomear o `release.yml`, o ambiente ou o repositório, apague o registro e crie outro.

Proteções que valem a pena no ambiente `release` (no GitHub, **Settings** → **Environments** → `release`). Ainda não estão ativadas:

- **Required reviewers**, com o seu usuário, e depois **Save protection rules**. Cada release fica parada até você abrir a execução em **Actions**, clicar em **Review deployments**, marcar o ambiente `release` e clicar em **Approve and deploy**. Você é avisado de toda execução que tenta usar o ambiente. Deixe **Prevent self-review** desmarcado: com ele marcado, quem inicia a execução não pode aprová-la, e como só você aprova, nenhuma release passaria. Enquanto houver um GitHub App com permissão de escrita neste repositório, é esta aprovação que impede uma tag enviada por ele de publicar sozinha.
- **Deployment branches and tags** → **Selected branches and tags** → regra do tipo **Tag** com o padrão `v*.*.*`. Não muda a sua rotina e impede que um branch use o ambiente.

Ao publicar:

- **Não envie a mesma versão também pelo site.** O workflow pula uma versão que já está pública, mas falha se ela ainda estiver em "Under review". Nesse caso, espere dois minutos e repita a execução.
- **Passo verde quer dizer envio aceito.** A versão aparece como "Public" um ou dois minutos depois, quando a verificação automática do Open VSX termina.
- **Se o passo falhar com `No trusted publisher matches the presented token`**, o registro não bate com o workflow: confira os quatro campos e a extensão escolhida (apague e crie de novo, se preciso). Depois, no GitHub, use **Re-run failed jobs** na mesma execução. Não é preciso criar outra tag: o que já foi publicado é pulado.

### Publicar uma versão pelo site (sem token)

Só é preciso se a publicação automática estiver desligada.

1. Abra https://open-vsx.org/publish (ou **Settings** → **Extensions** → **Publish extension**).
2. Envie o **mesmo** `.vsix` do Marketplace.
3. A versão fica em "Under review" por um ou dois minutos, enquanto passa pela verificação automática, e depois aparece como "Public".

### Publicar pela linha de comando (com token)

Só se preferir: **Settings** → **Access Tokens** → **Generate New Token** (copie na hora: ele só aparece uma vez). Não escreva o token no comando, porque ele ficaria no histórico do terminal: guarde-o na variável `OVSX_PAT`, que o `ovsx` lê sozinho, e apague-a no fim. O primeiro comando espera você colar o token e apertar Enter, sem mostrar o token na tela (o Git Bash não mostra nada; o PowerShell mostra asteriscos). Troque `X.Y.Z` pela versão. Antes, ative no terminal as duas proteções da seção 1 (**O `vsce` e o `ovsx` no seu computador**).

No Git Bash:

```bash
read -rs OVSX_PAT && export OVSX_PAT
```

```bash
npx --yes ovsx@1.2.0 publish serena-theme-X.Y.Z.vsix
```

```bash
unset OVSX_PAT
```

No PowerShell:

```powershell
$env:OVSX_PAT = [System.Net.NetworkCredential]::new("", (Read-Host -AsSecureString "Token")).Password
```

```powershell
npx --yes ovsx@1.2.0 publish serena-theme-X.Y.Z.vsix
```

```powershell
Remove-Item Env:OVSX_PAT
```

## 3. Lançar uma versão nova pelo GitHub

O arquivo `.github/workflows/release.yml` roda quando você envia uma tag `vX.Y.Z`. Ele confere a versão e o `CHANGELOG.md`, regenera os temas, roda as conferências do `scripts/check.mjs`, empacota um `serena-theme.vsix`, confere a lista de arquivos do pacote, publica nas lojas configuradas e, se nenhum passo falhar, cria uma Release no GitHub com o `.vsix` anexado.

O que está configurado no ambiente `release` do GitHub:

- Open VSX: a variável `OVSX_TRUSTED_PUBLISHING` (seção 2, sem token). A alternativa é o segredo `OVSX_PAT`, com um token do Open VSX.
- Marketplace: nada. Para publicar lá automaticamente, crie o segredo `VSCE_PAT` (token do Azure DevOps, só funciona até 30/11/2026). Sem ele, o envio é manual (passo 6).

Antes de começar, rode `git pull` para trazer o que foi aceito pelo GitHub (por exemplo, atualizações do Dependabot).

Passo a passo, trocando `X.Y.Z` pelo número da versão:

1. No `CHANGELOG.md`, troque o título `## Unreleased` por `## X.Y.Z`. Se esse título não existir, crie a entrada `## X.Y.Z` (o changelog é em inglês, porque é a aba Changelog das duas lojas). O workflow falha, antes de publicar, se faltar a linha `## X.Y.Z` ou se sobrar um título `## Unreleased` ou `## Não lançado`.
2. Mude `version` no `package.json`.
3. Rode `node build.mjs` e depois `node scripts/check.mjs`, que tem que terminar com `ok`.
4. Veja o que vai entrar no commit:

```bash
git status --short --untracked-files=all
```

Confira a lista: só devem aparecer arquivos que você quer publicar. As linhas que começam com `??` são arquivos novos, um por linha, mesmo dentro de uma pasta nova; se algum não é do projeto, apague-o ou inclua-o no `.gitignore` antes de continuar. Depois faça o commit e envie:

```bash
git add -A
```

```bash
git commit -m "Release X.Y.Z"
```

```bash
git push
```

5. Espere o **Validate** ficar verde no GitHub. Depois crie e envie a tag:

```bash
git tag vX.Y.Z
```

```bash
git push origin vX.Y.Z
```

6. Marketplace: baixe o `serena-theme.vsix` da Release criada e envie em https://marketplace.visualstudio.com/manage, em **...** (More Actions) → **Update**. Assim as duas lojas recebem o mesmo arquivo.

Se um passo de loja falhar, a Release não é criada. Corrija a causa e use **Re-run failed jobs**: o que já foi publicado é pulado.

Se o Validate ou a Release falharem com `ETARGET`, a versão fixada do `vsce` ou do `ovsx` (ou uma dependência exata delas) tem menos de 7 dias. Espere e repita a execução.

Se a falha for num passo de conferência (versão, `CHANGELOG.md`, arquivos gerados, `scripts/check.mjs` ou a lista de arquivos do pacote), nada foi publicado, e **Re-run failed jobs** não resolve: a execução repetida usa o mesmo commit. Corrija, faça o commit e o push, espere o **Validate** ficar verde e mova a tag para o commit novo:

```bash
git tag -f vX.Y.Z
```

```bash
git push --force origin vX.Y.Z
```
