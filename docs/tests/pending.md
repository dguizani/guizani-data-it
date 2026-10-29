# Testes · pendentes

## Execução conjunta

1. Conferência do repositório no GitHub e do site no ar → T-001
2. Conferência da verificação do domínio e do CNAME, depois do C-004 e do C-006 → T-001
3. Rodada completa no contêiner: `npm ci`, lint, Prettier, `astro check`, build e Lighthouse (`docs/tests/README.md`, **Rodada completa**) → T-002
4. ~~Servidor de desenvolvimento com recarga ao salvar → T-002~~ (ok em 2026-10-28)
5. ~~Primeira execução do CI no GitHub, depois do push → T-002~~ (ok em 2026-10-28)
6. Rodada completa com o `npm test` e o build quebrando com dados inválidos → T-003
7. `site.yaml` no VS Code com a extensão YAML → T-003
8. Página provisória no computador e no celular, nos dois temas → T-004

### T-004 · Identidade visual

**Roadmap:** M-004.

**Commits:** `98e6776`, `59f1d6d`, `27973ea`, `3729bbb` e `abf7aee`.

**O que mudou:** a página provisória mostra a identidade nova: o logo "G de circuito" com GUIZANI / DATA IT, o botão de tema (sol no escuro, lua no claro), o fundo de circuito com o texto binário "data" e os botões do hero (amarelo e contorno azul), com Inter e JetBrains Mono. O tema segue o sistema na primeira visita e guarda a escolha do botão. Onde ver: `docker compose up dev` e <http://localhost:4321>, no computador e no celular (`docs/tests/README.md`, **Conferir o site**).

**Passos:**
- [ ] Na primeira visita, a página abre no tema do sistema (claro ou escuro), sem piscar no tema errado.
- [ ] O botão alterna entre claro e escuro; ao recarregar a página, a escolha continua.
- [ ] No celular, o logo, o botão de tema e os dois botões do hero cabem sem quebrar, e o fundo de circuito não atrapalha a leitura.
- [ ] Rodada completa no contêiner e Lighthouse com 90 ou mais em performance, acessibilidade e SEO.

**Resultado:**
- 2026-10-29 00:00, pelo agente, no contêiner: lint, Prettier, `astro check` (0/0/0), `npm test` (9 ok) e build passaram a partir de uma pasta limpa; Lighthouse com performance 100, acessibilidade 100, boas práticas 100 e SEO 100. Capturas no Chromium em `logs/m004/` (390 px e 1280 px, nos dois temas): logo, botão de tema com o ícone certo em cada tema, fundo de circuito e botões legíveis. A primeira captura mostrou o texto binário cortado (o `pattern` começava antes do retângulo) e o binário poluindo o texto no desktop; os dois foram corrigidos antes do commit. Falta: a conferência do usuário.

### T-003 · Arquivo de dados e schema

**Roadmap:** M-003.

**Commits:** `7dbe943`, `1315828` e `1fc754a`.

**O que mudou:** todo o conteúdo aprovado está em `src/data/site.yaml`, com a versão em inglês para revisar, validado pelo schema de `src/data/schema.ts` no `astro check`, nos testes e no build. Onde ver: o próprio `src/data/site.yaml` no VS Code (com a extensão YAML, o autocomplete e a descrição de cada campo ao passar o mouse); o guia **Editar o conteúdo** do `README.md`. A página ainda não mostra o conteúdo (M-005).

**Passos:**
- [ ] Rodada completa no contêiner, agora com o `npm test`: 9 testes, `fail 0`.
- [ ] O build quebra com o caminho do campo quando falta uma tradução, e com a linha e a coluna quando o YAML tem erro de sintaxe.
- [ ] No VS Code, com a extensão YAML da Red Hat, o `site.yaml` mostra a descrição dos campos e acusa um campo com nome errado.
- [x] Revisão da versão em inglês de todo o conteúdo.

**Resultado:**
- 2026-10-28 23:05, pelo agente, no contêiner: lint, Prettier, `astro check` (0/0/0), `npm test` (9 testes, 9 ok) e build passaram. Com o `en` de `projects[0].title` apagado, o build saiu com 1 e a mensagem `projects.0.title.en: Required`; com um erro de sintaxe na linha 9, saiu com 1 e `Nested mappings are not allowed in compact mappings at line 9, column 11`. O `site.yaml` foi restaurado depois (conferido com `cmp`). O JSON Schema gerado tem 185 descrições. Falta: a conferência no VS Code e a revisão do inglês (usuário).
- 2026-10-28, pelo usuário: versão em inglês aprovada como está. Depois da P-002, o Laboratório ficou com 4 itens (`guizani-supermarket` incluído, `python-financeiro-pessoal` fora); a rodada no contêiner continuou passando (`npm test` 9 ok, build `Complete!`).
- 2026-10-28 23:15, pelo agente: o CI `40804842940` (push do `76ea40f`) falhou no lint (`Unsafe member access .data on a type that cannot be resolved`), porque a `.astro/` não existe num checkout limpo. Reproduzido no contêiner apagando a `.astro/` (7 erros). Corrigido em `63c3a10`; a rodada completa a partir de uma pasta limpa passou (lint, Prettier, `astro check` 0/0/0, `npm test` 9 ok, build e Lighthouse 100 nas quatro categorias). Falta o CI verde depois do push.

### T-002 · Estrutura inicial do projeto

**Roadmap:** M-002.

**Commits:** `9666049` a `9e5b3a7`.

**O que mudou:** a `main` passou a ser um projeto Astro 7 com TypeScript `strictest`, rodando só em Docker (`compose.yaml`, serviços `dev` e `lighthouse`), com ESLint, Prettier, `astro check`, a verificação do Lighthouse 13 (`scripts/lighthouse-check.ts`), o CI e o deploy manual no GitHub Actions e o Dependabot. A página é provisória. Onde ver: os comandos do `README.md`; <http://localhost:4321> com o servidor de desenvolvimento; a aba Actions do repositório, depois do push.

**Passos:**
- [ ] Rodada completa no contêiner: `npm ci` com `found 0 vulnerabilities`; lint sem erros; `All matched files use Prettier code style!`; `astro check` com `0 errors`, `0 warnings`, `0 hints`; build `Complete!`; Lighthouse com `ok` em todas as categorias.
- [ ] A verificação do Lighthouse falha (`FAIL` e saída 1) quando uma nota fica abaixo do mínimo.
- [x] `docker compose up dev` e <http://localhost:4321> mostra a página provisória "Guizani Data IT"; ao mudar e salvar o `src/pages/index.astro`, a página recarrega sozinha.
- [ ] CI no GitHub verde no push da `main`, com o relatório do Lighthouse anexado como artefato (`lighthouse-reports`).

**Resultado:**
- 2026-10-28 22:30, pelo agente, no contêiner: `npm ci` com 0 vulnerabilidades; lint, Prettier, `astro check` (0/0/0) e build passaram; Lighthouse na página provisória com performance 100, acessibilidade 100, boas práticas 100 e SEO 100. Com o mínimo de performance trocado para 101 numa cópia fora do git, a verificação deu `FAIL` e saída 1. `docker compose up dev` respondeu 200 em <http://localhost:4321> com o título "Guizani Data IT". A conferência do `.nvmrc` contra o `Dockerfile` deu `26.13.0` nos dois. Falta: a recarga ao salvar (confirmação do usuário) e o CI no GitHub (depois do push).
- 2026-10-28, pelo usuário: com o `docker compose up dev`, a página recarregou sozinha ao salvar uma mudança no `src/pages/index.astro` (mudança desfeita depois).
- 2026-10-28 22:41, pelo agente, no GitHub: CI `40801729242` (push do `c816a7a`) verde em 1min9s, com todos os passos ok: versão do Node igual no `.nvmrc` e no `Dockerfile`, `npm ci`, lint, Prettier, `astro check`, build e Lighthouse (performance 100, acessibilidade 100, boas práticas 100, SEO 100), e o artefato `lighthouse-reports` (394 KB) anexado. As 6 execuções iniciais do Dependabot terminaram sem abrir pull request (dependências em dia). Aviso do GitHub: o `ubuntu-latest` passa a ser o Ubuntu 26 a partir de 2026-10-19.

### T-001 · Linha de base do repositório

**Roadmap:** M-001.

**Commits:** `e5cd4df` a `27926b3` (documentação); as mudanças no GitHub não geram commit.

**O que mudou:** o repositório passou a se chamar `dguizani/guizani-data-it`, com a descrição nova; a branch padrão é a `main` nova; a `main` antiga virou `legacy/curriculo-2024`; a `release/landing_page` foi apagada; o "Enforce HTTPS" foi ligado. O site no ar continua o mesmo, publicado pela `release/guizani-data-it`. Onde ver: <https://github.com/dguizani/guizani-data-it> (página inicial, Branches, Settings → Pages) e <https://datait.guizani.com.br>.

**Passos:**
- [ ] Abrir <https://github.com/dguizani/guizani-data-it>: o nome e a descrição nova aparecem, e a branch mostrada é a `main`, com o `CLAUDE.md` e a pasta `docs/`.
- [ ] Abrir a lista de branches: aparecem só `main` (padrão), `legacy/curriculo-2024` e `release/guizani-data-it`.
- [ ] Abrir o endereço antigo <https://github.com/dguizani/curriculo_html>: redireciona para o repositório novo.
- [ ] Settings → Pages: origem "Deploy from a branch", `release/guizani-data-it`, `/ (root)`; domínio `datait.guizani.com.br`; "Enforce HTTPS" marcado.
- [ ] Abrir <https://datait.guizani.com.br> no celular: a landing page de sempre, com o cadeado; `http://datait.guizani.com.br` também leva para o `https://`.
- [ ] Depois do C-004: na página Settings → Pages da conta, `guizani.com.br` aparece como verificado, e `gh api repos/dguizani/guizani-data-it/pages --jq .protected_domain_state` responde `verified`.
- [ ] Depois do C-006: Settings → Pages do repositório mostra "DNS check successful", sem o aviso de registro A, e o site continua abrindo com o cadeado.

**Resultado:**
- 2026-10-28 21:15, pelo agente: pela API e por `curl`, nome, descrição, branch padrão, lista de branches (`legacy/curriculo-2024`, `main`, `release/guizani-data-it`), origem do Pages, `https_enforced: true` e site no ar idêntico à `release/guizani-data-it` conferem. Falta a confirmação do usuário e o C-004.
- 2026-10-28 22:45, pelo agente: depois do C-004, `protected_domain_state` está `verified`. O CNAME do C-006 aparece no `b.sec.dns.br` (TTL de 1 hora) e no `8.8.8.8`, mas a checagem de DNS do Pages (`pages/health`) ainda responde `InvalidARecordError`; falta o "Check again" no GitHub.
