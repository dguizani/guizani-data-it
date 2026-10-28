# Roadmap · pendentes

Na ordem de execução. A especificação de cada entrega está em `docs/brief.md` (seção indicada em **Contexto**) e os textos em `docs/approved_content.md`.

### M-001 · Linha de base do repositório

**Objetivo:** arrumar as branches e o repositório no GitHub para a construção do site novo, sem mudar o site no ar. Origem: prompt de construção, 2026-10-28.

**Depende de:** nada.

**Como é hoje** (conferido em 2026-10-28):
- `origin/release/guizani-data-it` em `38a8a39` (publicada pelo Pages, build `legacy`, raiz); `origin/main` em `c9fc9b5` (currículo antigo, branch padrão); `origin/release/landing_page` em `544918c`, já contida na `origin/main` (PR #4).
- A `main` antiga e a `release/guizani-data-it` compartilham só o commit raiz `af964a6` (`.gitattributes`); fora ele, os históricos são independentes.
- Localmente (primeira sessão, sem push): a `main` antiga virou `legacy/curriculo-2024` (no `c9fc9b5`, rastreando a `origin/main`), e uma `main` nova foi criada a partir da `origin/release/guizani-data-it`, sem rastrear nenhuma branch remota. Os arquivos de controle e o `CLAUDE.md` estão nela.
- Pages: certificado HTTPS aprovado (expira em 2026-12-26 e o GitHub renova sozinho), `https_enforced: false`, domínio não verificado (`protected_domain_state: null`).
- Repositório `dguizani/curriculo_html`, descrição "Meu currículo"; o remote do clone aponta para `EmployingDGC/curriculo_html` (redirecionado).

**Ideias para o debate:**
1. **Como renomear a `main` remota:** pelo `gh` (`gh api -X POST repos/dguizani/curriculo_html/branches/main/rename -f new_name=legacy/curriculo-2024`), que fica registrado na conversa (recomendado), ou pela tela (Settings → Branches → lápis ao lado da `main`). Nos dois casos a branch renomeada continua padrão até o passo seguinte.
2. **Ordem dos passos no GitHub:** renomear a `main` → push da `main` nova (`git push -u origin main`, sem `--force`, porque a `main` remota deixou de existir) → trocar a branch padrão para a `main` → apagar a `release/landing_page` → renomear o repositório. O site não muda em nenhum deles, porque o Pages publica a `release/guizani-data-it`.
3. **Nome e descrição do repositório:** `guizani-data-it`, com a descrição nos dois idiomas. Proposta: "Site da Guizani Data IT, engenharia de dados (Astro) · Guizani Data IT website, data engineering (Astro)".
4. **Referência do Lighthouse do site atual (celular):** pela API pública do PageSpeed Insights (`strategy=mobile`), que roda o Lighthouse nos servidores do Google sem instalar nada (recomendado), com o JSON cru em `logs/` e o resumo das notas em `docs/reports/`; ou pelo Lighthouse num contêiner com Chrome, que só fica pronto no M-002.
5. **Verificação do domínio (C-004):** o prompt deixa para o lançamento (M-009), mas ela protege o `datait` contra um site de outra conta do GitHub desde já e não muda nada no ar. Sugestão: trazer para este M-001.

**Decisões:**

**Passos:**
- [x] Conferir o clone, criar localmente a `legacy/curriculo-2024` e a `main` nova (primeira sessão, 2026-10-28).
- [x] Criar os arquivos de controle, o `CLAUDE.md`, o `.gitignore` e os documentos do briefing na `main` nova (primeira sessão, 2026-10-28).
- [ ] Renomear a `main` remota para `legacy/curriculo-2024` (com autorização) e apontar a `legacy/curriculo-2024` local para a `origin/legacy/curriculo-2024`.
- [ ] Push da `main` nova, sem `--force` (com autorização).
- [ ] Trocar a branch padrão para a `main` (com autorização).
- [ ] Apagar a `release/landing_page` no GitHub e localmente (com autorização).
- [ ] Renomear o repositório para `guizani-data-it` com a descrição nova (com autorização) e rodar `git remote set-url origin https://github.com/dguizani/guizani-data-it.git`.
- [ ] Ligar o "Enforce HTTPS" (com autorização).
- [ ] Registrar o Lighthouse do site atual (celular) como referência.
- [ ] Conferir que o site no ar não mudou (mesmo conteúdo, HTTPS, `http://` redirecionando para `https://`).

**Commits:**
- `e5cd4df` chore: `.gitignore` (dependências, build, `.astro/`, `logs/`, `references/`, `.env`).
- `3698732` docs: `docs/control_files.md` e `docs/git_rules.md`, copiados do prompt.
- `ab8937a` docs: `docs/brief.md` e `docs/approved_content.md`, copiados do prompt.
- `312f659` docs: `CLAUDE.md`.
- `7c8710d` docs: pastas de controle e `docs/session.md`.

**Resultado:**

### M-002 · Estrutura inicial do projeto

**Objetivo:** criar o projeto Astro e todo o ferramental (Docker, lint, formatação, CI, Dependabot), sem conteúdo ainda. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-001.

**Contexto:** `docs/brief.md`, seções **Tecnologias**, **Padrões de código**, **Arquitetura** e **Como subir**.

**Ideias para o debate:**
1. **Versão do Node:** conferir o aviso de segurança mais recente (<https://nodejs.org/en/blog/vulnerability>) e escolher a versão 26 LTS com o piso 26.12.1, mostrando ao usuário antes de fixar.
2. **Docker:** só `docker run` (comandos longos, documentados no `tests/README.md`) ou um `compose.yaml` com o serviço do Node (comandos curtos, como `docker compose run --rm node npm run build`, e é o que o Dependabot consegue atualizar no ecossistema `docker`). Com o `compose.yaml`, a versão fica em dois lugares (`.nvmrc` e a imagem), e o CI precisa conferir que são iguais.
3. **Lighthouse local:** a imagem `node` não tem Chrome. Opções: uma imagem própria (`Dockerfile` com Chromium) só para o Lighthouse, ou rodar o Lighthouse CI só no GitHub Actions e, localmente, usar o PageSpeed Insights depois do deploy.
4. **Fim de linha:** o `.gitattributes` atual (`* text=auto`) faz o git gravar os arquivos com CRLF no checkout do Windows (aviso "LF will be replaced by CRLF", visto em 2026-10-28), e o Prettier espera LF: o `format:check` local falharia num clone novo. Sugestão: `* text=auto eol=lf` no `.gitattributes`.

**Decisões:**

**Passos:**
- [ ] Escolher e mostrar a versão do Node; gravar no `.nvmrc` e no `engines` do `package.json`.
- [ ] Criar o projeto Astro (última versão estável) pelo contêiner, com o `tsconfig` `strictest` e o npm.
- [ ] Ambiente Docker (comandos ou `compose.yaml`, conforme o debate) e os comandos no `README.md` e no `tests/README.md`.
- [ ] ESLint (`typescript-eslint`, `eslint-plugin-astro`) e Prettier (`prettier-plugin-astro`, CSS e YAML), com os scripts `lint`, `format` e `format:check`.
- [ ] Completar o `.gitignore` com o que o Astro gera (`.astro/`).
- [ ] `README.md` em português, com um resumo em inglês.
- [ ] Workflow do CI: ESLint, Prettier (`--check`), `astro check`, build e Lighthouse CI (barra abaixo de 90 em performance, acessibilidade e SEO, no celular), com o Node do `.nvmrc`.
- [ ] Workflow de deploy do Pages (`configure-pages`, `upload-pages-artifact`, `deploy-pages`) só com `workflow_dispatch`.
- [ ] Dependabot: npm, GitHub Actions e imagem do Docker, semanal; ligar os alertas de segurança no repositório (com autorização).
- [ ] `T-NNN` com a rodada completa no contêiner e no CI.

**Commits:**

**Resultado:**

### M-003 · Arquivo de dados e schema

**Objetivo:** guardar todo o conteúdo do site em `src/data/site.yaml`, nos dois idiomas lado a lado, validado no build por um schema Zod. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-002.

**Contexto:** `docs/approved_content.md` (todo o conteúdo) e `docs/brief.md`, seções **Funcionalidades do MVP** (arquivo de dados único) e **Arquitetura** (textos da interface).

**Passos:**
- [ ] Desenhar as chaves do YAML (em inglês) e o schema Zod, com descrição em cada campo; campo faltando ou sem a versão em inglês quebra o build.
- [ ] Campo `isClientPublic` e o setor em cada cliente: desligado, o nome do cliente é trocado pelo setor, sem reescrever o card.
- [ ] Seção de textos da interface (títulos, rótulos, textos de acessibilidade), também nos dois idiomas.
- [ ] Escrever a versão em inglês de todo o conteúdo aprovado e mostrar ao usuário para revisão.
- [ ] Escrever a descrição de uma linha de cada item do Laboratório (README dos repositórios públicos; perguntar ao usuário sobre os privados) e mostrar antes de gravar.
- [ ] Teste de que o build quebra com um campo faltando e com uma tradução faltando.

**Commits:**

**Resultado:**

### M-004 · Identidade visual

**Objetivo:** paleta nas cores do Python sobre base escura, fontes, logo novo em SVG, tema claro e escuro com botão e o fundo de circuito do hero. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-002 e C-001 (foto e banner de referência).

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (identidade visual, logo e tema).

**Passos:**
- [ ] Tokens da paleta dos dois temas em `src/styles/tokens.css`, conferindo os tons e o contraste (WCAG AA); no tema claro, o amarelo nunca é cor de texto.
- [ ] Inter e JetBrains Mono pelos pacotes `@fontsource`, servidas pelo site.
- [ ] Debater as opções de logo (monograma ou nome em fonte própria) e fazer o SVG que troca de cor com o tema; nunca o logo do Python.
- [ ] `ThemeToggle` e o script inline no `<head>` (tema do sistema por padrão, escolha salva no navegador, sem piscar).
- [ ] `CircuitBackground`: linhas de circuito e texto binário em SVG leve, inspirados no banner.

**Commits:**

**Resultado:**

### M-005 · Seções do site

**Objetivo:** montar a página com as seções na ordem aprovada: hero, sobre, serviços, projetos principais, participação pontual, linha do tempo, skills, laboratório, contato e rodapé. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-003 e M-004; C-001 (foto), C-002 (currículos) e P-001 (e-mail) para o Sobre e o Contato.

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (seções, hero, cards, contato, rodapé), e `docs/approved_content.md`.

**Passos:**
- [ ] Propor ao usuário opções da frase de posicionamento do hero.
- [ ] Propor a versão nova do Sobre, a partir do texto da landing page atual.
- [ ] Componentes `Header`, `Hero`, `About` (foto otimizada pelo `astro:assets`, AVIF e WebP), `Services`, `ProjectCard`, `Projects`, `OccasionalWork`, `Timeline`, `Skills`, `Lab`, `Contact` e `Footer`, todos lendo o `site.yaml`.
- [ ] Contato: e-mail (depois da P-001), WhatsApp com a mensagem pronta do idioma, LinkedIn e o currículo em PDF do idioma.
- [ ] Conferir no celular o critério dos 30 segundos (o que faz, principais tecnologias, como contatar).

**Commits:**

**Resultado:**

### M-006 · Idiomas

**Objetivo:** português em `/` e inglês em `/en/`, com o seletor sempre visível e os links `hreflang`, sem redirecionamento automático. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-005 (pode andar junto com ele, se o debate decidir).

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (idiomas).

**Passos:**
- [ ] Páginas `src/pages/index.astro` e `src/pages/en/index.astro`, com o `lang` certo no `<html>`.
- [ ] `LanguageSwitch` no cabeçalho, levando à mesma seção no outro idioma.
- [ ] Links `hreflang` (`pt-BR`, `en` e `x-default`) no `Base.astro`.

**Commits:**

**Resultado:**

### M-007 · SEO e qualidade

**Objetivo:** meta description, Open Graph com uma imagem por idioma, favicon, sitemap, `robots.txt` e Lighthouse 90 ou mais em performance, acessibilidade e SEO, no celular. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-006.

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (SEO e qualidade).

**Passos:**
- [ ] Meta description e título por idioma, vindos do `site.yaml`.
- [ ] Imagens Open Graph (1.200 × 630, com o logo, o nome e o posicionamento), uma por idioma; debater como gerá-las.
- [ ] Favicon a partir do logo.
- [ ] Sitemap (`@astrojs/sitemap`) e `robots.txt`.
- [ ] Lighthouse CI passando com 90 ou mais nas três categorias, comparado com a referência do M-001.

**Commits:**

**Resultado:**

### M-008 · Contagem de visitas

**Objetivo:** contar visitas com o Cloudflare Web Analytics, sem cookies, e avisar no rodapé. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-005 e C-003 (conta e token do Cloudflare).

**Contexto:** `docs/brief.md`, seções **Funcionalidades do MVP** (contagem de visitas) e **Tecnologias**.

**Passos:**
- [ ] Conferir os limites do plano gratuito do Cloudflare Web Analytics.
- [ ] Incluir o script com o token no `Base.astro`, sem afetar o Lighthouse.
- [ ] Aviso no rodapé, vindo do `site.yaml`.
- [ ] Conferir as primeiras visitas no painel do Cloudflare depois do lançamento.

**Commits:**

**Resultado:**

### M-009 · Lançamento

**Objetivo:** publicar o site novo pelo GitHub Actions e fechar a configuração do domínio e do e-mail. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-007, M-008, C-004 (verificação do domínio), C-005 (ImprovMX) e C-006 (CNAME no DNS).

**Contexto:** `docs/brief.md`, seção **Como subir**, e os critérios de sucesso em **Objetivo**.

**Passos:**
- [ ] Trocar a origem do Pages de "branch" para "GitHub Actions" e o workflow de deploy para rodar a cada push na `main` (com autorização).
- [ ] Domínio verificado (C-004), se ainda não tiver sido feito no M-001.
- [ ] Trocar os quatro registros A pelo CNAME `dguizani.github.io` (C-006) e conferir o certificado e o "Enforce HTTPS".
- [ ] E-mail do ImprovMX funcionando (C-005): mensagem de teste chegando ao Gmail.
- [ ] Apagar a `release/guizani-data-it` (com autorização).
- [ ] Conferir o site no ar contra os critérios de sucesso (30 segundos no celular, todos os projetos aprovados, projeto novo em menos de 10 minutos editando só o YAML, Lighthouse 90 ou mais).

**Commits:**

**Resultado:**
