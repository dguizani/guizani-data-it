# Roadmap · pendentes

Na ordem de execução. A especificação de cada entrega está em `docs/brief.md` (seção indicada em **Contexto**) e os textos em `docs/approved_content.md`.

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

**Depende de:** M-003 e M-004; C-001 (foto) e C-002 (currículos) para o Sobre e o Contato. O e-mail é `contato@guizani.com.br` (P-001, respondida em 2026-10-28) e só recebe mensagens depois do C-005.

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (seções, hero, cards, contato, rodapé), e `docs/approved_content.md`.

**Passos:**
- [ ] Propor ao usuário opções da frase de posicionamento do hero.
- [ ] Propor a versão nova do Sobre, a partir do texto da landing page atual.
- [ ] Componentes `Header`, `Hero`, `About` (foto otimizada pelo `astro:assets`, AVIF e WebP), `Services`, `ProjectCard`, `Projects`, `OccasionalWork`, `Timeline`, `Skills`, `Lab`, `Contact` e `Footer`, todos lendo o `site.yaml`.
- [ ] Contato: e-mail `contato@guizani.com.br` (P-001), WhatsApp com a mensagem pronta do idioma, LinkedIn e o currículo em PDF do idioma.
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

**Depende de:** M-007, M-008 e C-005 (ImprovMX).

**Contexto:** `docs/brief.md`, seção **Como subir**, e os critérios de sucesso em **Objetivo**.

**Passos:**
- [ ] Trocar a origem do Pages de "branch" para "GitHub Actions" e o workflow de deploy para rodar a cada push na `main` (com autorização).
- [ ] Conferir que o domínio continua verificado (C-004, feito no M-001).
- [ ] Conferir que o CNAME `dguizani.github.io` (C-006, feito no M-001), o certificado e o "Enforce HTTPS" continuam valendo depois da troca da origem do Pages.
- [ ] E-mail do ImprovMX funcionando (C-005): mensagem de teste chegando ao Gmail.
- [ ] Apagar a `release/guizani-data-it` (com autorização).
- [ ] Conferir o site no ar contra os critérios de sucesso (30 segundos no celular, todos os projetos aprovados, projeto novo em menos de 10 minutos editando só o YAML, Lighthouse 90 ou mais).

**Commits:**

**Resultado:**
