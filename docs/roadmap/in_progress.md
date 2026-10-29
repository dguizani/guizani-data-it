# Roadmap · em andamento

### M-003 · Arquivo de dados e schema

**Objetivo:** guardar todo o conteúdo do site em `src/data/site.yaml`, nos dois idiomas lado a lado, validado no build por um schema Zod. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-002.

**Contexto:** `docs/approved_content.md` (todo o conteúdo) e `docs/brief.md`, seções **Funcionalidades do MVP** (arquivo de dados único) e **Arquitetura** (textos da interface).

**Achados** (2026-10-28):
- O `file()` loader do Astro 7 lê YAML, mas trata cada chave do topo do arquivo como um item separado e, num erro de sintaxe, só registra uma mensagem e segue sem os dados. O leitor de YAML dele (`@astrojs/internal-helpers/yaml`) é interno.
- O `astro/zod` do Astro 7 é o Zod 4 (`zod/v4`), com `z.strictObject`, `z.url()`, `z.email()` e `.describe()`.
- Laboratório: o `python-financeiro-pessoal` público só tem `.gitignore`, `LICENSE` e um README vazio (um commit, 2025-09-26, nas branches `main` e `develop`); o `uninter` também usa NLTK, scikit-learn e Base dos Dados.

**Decisões** (2026-10-28, aprovadas pelo usuário):
1. Uma *content collection* `site` lê o `src/data/site.yaml` e valida com o schema de `src/data/schema.ts`, no `astro check` e no build, com o caminho do campo no erro. Como o `file()` não serve para um arquivo único com seções diferentes e não quebra o build num erro de sintaxe, a coleção usa um loader próprio, com o pacote `yaml` (sem dependências próprias).
2. Todo texto traduzível é `{ pt, en }`, os dois obrigatórios e não vazios; nomes de tecnologia ficam numa língua só.
3. Clientes cadastrados uma vez (`clients`: nome, setor nos dois idiomas e `isClientPublic`); os projetos citam o cliente pelo identificador, e o schema recusa um identificador que não existe.
4. Períodos com `start` e `end` em `AAAA` ou `AAAA-MM`; `end` vazio é "em andamento".
5. Uma lista de projetos com `kind`: `main` (card completo), `occasional` (participação pontual, uma linha) e `timeline` (só na linha do tempo, os RPAs). A linha do tempo é montada a partir de todos.
6. Testes do schema com o `node:test` (arquivo válido passa; campo faltando, `en` vazio e cliente inexistente são recusados), no `npm test` e no CI.
7. JSON Schema do `site.yaml` para o VS Code, com a extensão YAML da Red Hat (autocomplete e a descrição de cada campo).
8. Laboratório: descrições do `polars-python-studying` e do `uninter` aprovadas; o `intern-data-rpa-course` entra com a descrição proposta, a confirmar na P-002; o `python-financeiro-pessoal` e o `guizani-supermarket` ficam fora do `site.yaml` até a P-002.
9. Depois da P-002: o `python-financeiro-pessoal` não entra no Laboratório; o `guizani-supermarket` entra sem link, com a descrição do usuário; a descrição do `intern-data-rpa-course` fica como proposta; o `uninter` ganha NLTK, scikit-learn e Base dos Dados (2026-10-28, aprovado pelo usuário).
10. A versão em inglês de todo o conteúdo foi aprovada como está, inclusive "Featured projects", "Short engagements", "Skills" também no título em português, "REST APIs" e a explicação da LGPD (2026-10-28, aprovado pelo usuário).
11. A telemetria do Astro fica desligada (`ASTRO_TELEMETRY_DISABLED=1` no `compose.yaml` e nos workflows) (2026-10-28, aprovado pelo usuário).

**Passos:**
- [x] Schema Zod com descrição em cada campo e o loader da coleção `site` (`7dbe943`).
- [x] `site.yaml` com todo o conteúdo aprovado, com a versão em inglês para o usuário revisar (`7dbe943`).
- [x] Testes do schema (`npm test`) e o passo no CI (`1315828`).
- [x] JSON Schema para o VS Code (`1fc754a`), usando o que o Astro já gera em `.astro/collections/site.schema.json`.
- [x] Guia de edição do conteúdo no `README.md`.
- [x] Revisão da versão em inglês pelo usuário (2026-10-28, aprovada como está).
- [x] Responder a P-002 e completar o Laboratório (2026-10-28).
- [x] `T-003`.

**Ajustes na implementação:**
- O loader próprio (`src/content.config.ts`) lê o arquivo inteiro como a entrada `site` da coleção; a função `getSite()` (`src/data/site.ts`) entrega o conteúdo já tipado aos componentes.
- O `yaml` 2.9.1 entrou como dependência de desenvolvimento, porque só é usado no build.
- O ESLint aceita as chamadas `describe` e `it` do `node:test` sem `await` (`no-floating-promises`), como o próprio `node:test` espera.
- A ordem de `projects` no YAML não importa: o site ordena pelas datas.

**Commits:**
- `7dbe943` feat: `site.yaml`, schema Zod, loader e `getSite()`.
- `1315828` test: 9 testes do schema com o `node:test`, `npm test` no CI.
- `1fc754a` chore: JSON Schema do `site.yaml` no VS Code.
- `d9a9f79` feat: Laboratório depois da P-002.
- `6c68d4e` chore: telemetria do Astro desligada.

**Resultado:**

### M-002 · Estrutura inicial do projeto

**Objetivo:** criar o projeto Astro e todo o ferramental (Docker, lint, formatação, CI, Dependabot), sem conteúdo ainda. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-001.

**Contexto:** `docs/brief.md`, seções **Tecnologias**, **Padrões de código**, **Arquitetura** e **Como subir**.

**Achados** (2026-10-28):
- Aviso de segurança mais recente do Node: 2026-10-21 (10 CVEs, o mais grave o CVE-2026-111497, escrita fora dos limites no decodificador Brotli), corrigido na 26.12.1. A 26.13.0, de 2026-10-28, é a primeira LTS da linha 26 ("Lithium") e é posterior à correção.
- Versões estáveis: Astro 7.4.4, `@astrojs/check` 0.9.12, TypeScript 7.0.2, ESLint 10.13.0, `typescript-eslint` 8.72.1, `eslint-plugin-astro` 3.2.1, Prettier 3.9.10, `prettier-plugin-astro` 1.1.2, `@lhci/cli` 0.15.1, Lighthouse 13.6.0.
- O `@astrojs/check` aceita o TypeScript `^5.0.0 || ^6.0.0`, e o `typescript-eslint` aceita `>=4.8.4 <6.1.0`: o TypeScript 7 ainda não funciona com eles.
- O `@lhci/cli` 0.15.1 usa o Lighthouse 12.6.1, e a referência do M-001 foi medida com o 13.6.0.
- As imagens `node:26.13.0-trixie-slim` e `node:26.13.0-bookworm-slim` existem.

**Decisões** (2026-10-28, aprovadas pelo usuário):
1. Node 26.13.0 (LTS): `.nvmrc` com `26.13.0`, `engines` com `>=26.12.1 <27` e a imagem `node:26.13.0-trixie-slim`.
2. Docker por `compose.yaml` e um `Dockerfile` de dois estágios: `base` (só o Node, para instalação, servidor de desenvolvimento, lint, build e `astro check`) e `lighthouse` (a base com o Chromium). O Dependabot atualiza o `FROM` do `Dockerfile`, e o CI confere que a versão dele é igual à do `.nvmrc`.
3. ~~Lighthouse CI no GitHub Actions e, localmente, no estágio `lighthouse`. A referência do site atual é medida de novo com o Lighthouse do `@lhci/cli` (12.6.1), para a comparação ser justa.~~ Substituída pela decisão 6.
4. TypeScript 6.0.x, a mais nova aceita pelo `@astrojs/check` e pelo `typescript-eslint`; subir para a 7 quando os dois aceitarem.
5. `* text=auto eol=lf` no `.gitattributes`.
6. Sem o `@lhci/cli`: o pacote `lighthouse` 13.6.0 e um script próprio (`scripts/lighthouse-check.ts`) servem o `dist/` com o `astro preview`, rodam 3 vezes por página no perfil de celular, usam a mediana, salvam os relatórios em `logs/lighthouse/` e barram performance, acessibilidade e SEO abaixo de 90. Roda no CI e, localmente, no serviço `lighthouse`. A referência do M-001 já foi medida com o 13.6.0, então não é medida de novo (2026-10-28, aprovado pelo usuário, depois de o `npm audit` mostrar 16 vulnerabilidades conhecidas no `@lhci/cli` 0.15.1, 13 altas, e 0 no `lighthouse` 13.6.0).

**Ajustes na implementação:**
- O ESLint 10 precisa do `jiti` para ler o `eslint.config.ts`. A opção `--flag unstable_native_nodejs_ts_config`, que usa o TypeScript nativo do Node, também funcionou, mas foi descartada por ser instável.
- O parser do Astro não aceita o `projectService` do `typescript-eslint`; os arquivos `.astro` usam `project: true`.
- O `astro.config.ts` liga o polling do Vite, porque o contêiner não recebe os eventos de arquivo da pasta montada do Windows.
- O workflow de deploy confere, antes de publicar, que a origem do Pages é "GitHub Actions" (`build_type: workflow`), e se recusa a publicar enquanto ela for a branch `release/guizani-data-it`.
- O Dependabot ignora o TypeScript a partir da 6.1.0 (decisão 4) e as versões maiores da imagem `node` (a linha do projeto é a 26 LTS).
- `src/pages/index.astro` é uma página provisória, com o texto fixo, só para validar a estrutura; ela é substituída no M-005 pelas seções, com os textos do `site.yaml`.
- Os arquivos da landing page antiga (`index.html`, `style.css`, `logo_1.png`) saíram da `main`; continuam na `release/guizani-data-it` e no histórico.

**Passos:**
- [x] `.gitattributes` com `eol=lf` (`9666049`).
- [x] `.nvmrc`, `Dockerfile` e `compose.yaml` (`ef7cf13`).
- [x] Projeto Astro com o `tsconfig` `strictest`, o npm e o `engines`; os arquivos da landing page antiga saem da `main` (continuam na `release/guizani-data-it`), e o `CNAME` vai para `public/` (`f24e4b8`).
- [x] ESLint (`typescript-eslint`, `eslint-plugin-astro`) e Prettier (`prettier-plugin-astro`, CSS e YAML), com os scripts `lint`, `format` e `format:check` (`f24e4b8`).
- [x] ~~Lighthouse CI (`lighthouserc.json`), com os relatórios em `logs/lighthouse/`.~~ Script do Lighthouse 13 (decisão 6), com os relatórios em `logs/lighthouse/` (`f24e4b8`).
- [x] ~~Medir de novo a referência do site atual com o Lighthouse 12.6.1.~~ Desnecessário pela decisão 6.
- [x] `README.md` em português, com um resumo em inglês; comandos no `README.md` e no `tests/README.md` (`adfde1e`, `9e5b3a7`).
- [x] Workflow do CI: versão do `.nvmrc` igual à do `Dockerfile`, ESLint, Prettier (`--check`), `astro check`, build e Lighthouse (barra abaixo de 90 em performance, acessibilidade e SEO, no celular), com o Node do `.nvmrc` (`5a6ae6f`).
- [x] Workflow de deploy do Pages (`configure-pages`, `upload-pages-artifact`, `deploy-pages`) só com `workflow_dispatch` (`5a6ae6f`).
- [x] Dependabot: npm, GitHub Actions e imagem do Docker, semanal (`07e528f`).
- [x] Ligar os alertas de segurança e as correções automáticas do Dependabot no repositório (2026-10-28: os alertas já estavam ligados; correções automáticas ligadas com autorização).
- [x] Push e primeira execução do CI no GitHub (2026-10-28, push até `c816a7a`; CI `40801729242` verde em 1min9s).
- [x] `T-002` com a rodada completa no contêiner e no CI.

**Commits:**
- `9666049` chore: fim de linha LF no `.gitattributes`.
- `ef7cf13` chore: `.nvmrc`, `.npmrc`, `Dockerfile`, `compose.yaml` e `.dockerignore`.
- `f24e4b8` feat: projeto Astro, ESLint, Prettier e o script do Lighthouse; saída da landing page antiga.
- `5a6ae6f` feat: workflows do CI e do deploy.
- `07e528f` chore: Dependabot.
- `adfde1e` docs: `README.md`.
- `9e5b3a7` docs: comandos do Docker no `tests/README.md`.

**Resultado:**

### M-001 · Linha de base do repositório

**Objetivo:** arrumar as branches e o repositório no GitHub para a construção do site novo, sem mudar o site no ar. Origem: prompt de construção, 2026-10-28.

**Depende de:** C-004 (verificação do domínio) e C-006 (CNAME no DNS), feitos pelo usuário.

**Como é hoje** (conferido em 2026-10-28):
- `origin/release/guizani-data-it` em `38a8a39` (publicada pelo Pages, build `legacy`, raiz); `origin/main` em `c9fc9b5` (currículo antigo, branch padrão); `origin/release/landing_page` em `544918c`, já contida na `origin/main` (PR #4).
- A `main` antiga e a `release/guizani-data-it` compartilham só o commit raiz `af964a6` (`.gitattributes`); fora ele, os históricos são independentes.
- Localmente (primeira sessão, sem push): a `main` antiga virou `legacy/curriculo-2024` (no `c9fc9b5`, rastreando a `origin/main`), e uma `main` nova foi criada a partir da `origin/release/guizani-data-it`, sem rastrear nenhuma branch remota. Os arquivos de controle e o `CLAUDE.md` estão nela.
- Pages: certificado HTTPS aprovado (expira em 2026-12-26 e o GitHub renova sozinho), `https_enforced: false`, domínio não verificado (`protected_domain_state: null`).
- Repositório `dguizani/curriculo_html`, descrição "Meu currículo"; o remote do clone aponta para `EmployingDGC/curriculo_html` (redirecionado).

**Decisões** (2026-10-28, aprovadas pelo usuário):
1. A `main` remota é renomeada pelo `gh`: `gh api -X POST repos/dguizani/curriculo_html/branches/main/rename -f new_name=legacy/curriculo-2024`.
2. Ordem no GitHub: renomear a `main` → push da `main` nova (`git push -u origin main`, sem `--force`) → trocar a branch padrão para a `main` → apagar a `release/landing_page` → renomear o repositório. O site não muda em nenhum deles, porque o Pages publica a `release/guizani-data-it`.
3. Repositório renomeado para `guizani-data-it`, com a descrição "Site da Guizani Data IT, engenharia de dados (Astro) · Guizani Data IT website, data engineering (Astro)".
4. ~~A referência do Lighthouse do site atual vem da API pública do PageSpeed Insights (`strategy=mobile`), com o JSON cru em `logs/` e o resumo em `docs/reports/`.~~ A referência do Lighthouse vem de um contêiner Docker temporário (imagem `node` 26 com Chromium), com o JSON cru em `logs/lighthouse/` e o resumo em `docs/reports/` (2026-10-28, aprovado pelo usuário, depois de a API sem chave recusar o pedido).
5. A verificação do domínio (C-004) sai do M-009 e entra neste M-001.
6. O "Enforce HTTPS" é ligado agora, com o certificado já aprovado.
7. A troca dos registros A pelo CNAME `dguizani.github.io` (C-006) sai do M-009 e entra neste M-001, feita junto com o C-004: o Pages mostra "DNS check unsuccessful" (`InvalidARecordError`), e a troca não muda o que o site serve (2026-10-28, aprovado pelo usuário).

**Achados:**
- 2026-10-28: a API do PageSpeed Insights sem chave respondeu `429 RESOURCE_EXHAUSTED`, com a cota diária do uso sem chave em zero (`quota_limit_value: "0"`). Ela só serve com uma chave própria.
- 2026-10-28: o rename da `main` pelo `gh` respondeu na hora, mas a API levou alguns segundos para mostrar a branch padrão nova. O push da `main` nova mostrou o aviso "the branch 'main' that you pushed to was renamed", que é só informativo: a `main` foi criada como branch nova.
- 2026-10-28: depois do "Enforce HTTPS", a tela do Pages mostra "DNS check unsuccessful". A API (`pages/health`) confirma que o único motivo é o registro A num subdomínio (`InvalidARecordError`); o DNS resolve para os IPs atuais do GitHub, e o HTTPS responde e é obrigatório.
- 2026-10-28, Lighthouse do site atual (celular, Lighthouse 13.6.0), em `docs/reports/lighthouse_current_site_mobile__2026-10-28.md`: **performance 85, acessibilidade 92, boas práticas 92, SEO 91**. O que puxa para baixo, e o site novo precisa evitar: LCP de 3,9 s (a imagem de fundo do hero vem do Unsplash, e o `logo_1.png` tem 246 KB sem tamanho declarado), CSS e Google Fonts bloqueando a renderização (cerca de 830 ms), contraste de cor insuficiente, imagem sem tamanho responsivo, erro no console e falta de meta description.

**Passos:**
- [x] Conferir o clone, criar localmente a `legacy/curriculo-2024` e a `main` nova (primeira sessão, 2026-10-28).
- [x] Criar os arquivos de controle, o `CLAUDE.md`, o `.gitignore` e os documentos do briefing na `main` nova (primeira sessão, 2026-10-28).
- [x] Registrar o Lighthouse do site atual (celular) como referência (2026-10-28, `27926b3`).
- [x] Renomear a `main` remota para `legacy/curriculo-2024` e apontar a `legacy/curriculo-2024` local para a `origin/legacy/curriculo-2024` (2026-10-28).
- [x] Push da `main` nova, sem `--force` (2026-10-28, até `9df357d`).
- [x] Trocar a branch padrão para a `main` (2026-10-28).
- [x] Apagar a `release/landing_page` no GitHub e localmente (2026-10-28; o `544918c` continua na `legacy/curriculo-2024`).
- [x] Renomear o repositório para `guizani-data-it` com a descrição nova e rodar `git remote set-url origin https://github.com/dguizani/guizani-data-it.git` (2026-10-28).
- [x] Ligar o "Enforce HTTPS" (2026-10-28; `https_enforced: true`, Pages refeito com `status: built`).
- [ ] Fazer o C-004 e o C-006 (usuário, na mesma visita ao Registro.br) e conferir depois do atendimento (`nslookup`, `pages/health` com `is_valid: true`, certificado e "Enforce HTTPS").
- [x] Conferir que o site no ar não mudou (2026-10-28: `index.html` e `style.css` no ar idênticos aos da `release/guizani-data-it`, `https://` com 200 e `http://` com 301 para `https://`).
- [ ] Validar o T-001.

**Commits:**
- `e5cd4df` chore: `.gitignore` (dependências, build, `.astro/`, `logs/`, `references/`, `.env`).
- `3698732` docs: `docs/control_files.md` e `docs/git_rules.md`, copiados do prompt.
- `ab8937a` docs: `docs/brief.md` e `docs/approved_content.md`, copiados do prompt.
- `312f659` docs: `CLAUDE.md`.
- `7c8710d` docs: pastas de controle e `docs/session.md`.
- `27926b3` docs: Lighthouse do site atual em `docs/reports/`.

**Resultado:**
