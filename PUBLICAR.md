# Como publicar o Serena Theme

Guia conferido nas documentações oficiais em 29/09/2026. Tudo abaixo é feito por você: são ações públicas na sua conta.

## 0. Antes de tudo: o repositório no GitHub

O README da loja usa as imagens de `images/screenshots/`, e o `vsce` troca os links relativos por links do GitHub. Sem o repositório público, as imagens aparecem quebradas.

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

### Gerar o pacote

```bash
npx @vscode/vsce package
```

Isso cria `serena-theme-1.0.0.vsix`. Teste antes de publicar:

```bash
code --install-extension serena-theme-1.0.0.vsix
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
3. Faça login e publique:

```bash
npx @vscode/vsce login joaoangello
```

```bash
npx @vscode/vsce publish
```

Depois de 01/12/2026, o caminho oficial por linha de comando é o Microsoft Entra ID (`vsce publish --azure-credential`); veja o bloco comentado em `.github/workflows/release.yml`.

### Publicar novas versões

1. Atualize o `CHANGELOG.md`.
2. Rode `node build.mjs`.
3. Suba a versão e publique (precisa do login com token acima). Este comando também faz o commit e a tag no git:

```bash
npx @vscode/vsce publish patch
```

Use `minor` para novidades e `major` para mudanças grandes. No upload manual: mude `version` no `package.json`, rode `vsce package` e, na página manage, use **...** → **Update**.

### Cuidado

`vsce unpublish` **apaga a extensão para sempre**: perde as estatísticas e o nome fica reservado, nem você pode reutilizar. Para só esconder, use **More Actions** → **Unpublish** na página manage.

## 2. Open VSX (VSCodium, Cursor, Windsurf e outros editores)

1. Crie uma conta em https://accounts.eclipse.org e preencha **GitHub Username** com `joaooliveira10`.
2. Entre em https://open-vsx.org com o GitHub → avatar → **Settings** → **Profile** → **Log in with Eclipse** e assine o **Publisher Agreement**.
3. **Settings** → **Access Tokens** → **Generate New Token**. Copie na hora: ele só aparece uma vez.
4. Crie o namespace (igual ao publisher) e publique o **mesmo** `.vsix` do Marketplace:

```bash
npx ovsx create-namespace joaoangello -p SEU_TOKEN
```

```bash
npx ovsx publish serena-theme-1.0.0.vsix -p SEU_TOKEN
```

5. Peça a posse do namespace em https://github.com/EclipseFdn/open-vsx.org/issues/new/choose (**Claim namespace ownership**). Até ser aprovado, a página mostra "unverified".

## 3. Automático pelo GitHub (opcional)

O arquivo `.github/workflows/release.yml` publica nas duas lojas quando você envia uma tag:

1. No GitHub: **Settings** → **Environments** → **New environment** chamado `release`.
2. Adicione os segredos `VSCE_PAT` (token do Azure DevOps) e `OVSX_PAT` (token do Open VSX).
3. Crie e envie a tag com a mesma versão do `package.json`:

```bash
git tag v1.0.1
```

```bash
git push origin v1.0.1
```

O workflow confere a versão, regenera os temas, empacota, publica e anexa o `.vsix` numa Release do GitHub.
