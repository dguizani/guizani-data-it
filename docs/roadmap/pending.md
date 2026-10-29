# Roadmap · pendentes

Na ordem de execução. A especificação de cada entrega está em `docs/brief.md` (seção indicada em **Contexto**) e os textos em `docs/approved_content.md`.

### M-014 · Botão flutuante para voltar ao topo

**Objetivo:** um botão fixo no canto da tela que leva de volta ao início da página. Origem: pedido do usuário, 2026-10-29.

**Depende de:** —

**Ideias para o debate:**
- Quando aparece: sempre, ou só depois de rolar uma parte da página (ex.: passar do hero). Mostrar só depois exige um pouco de JavaScript (um `IntersectionObserver` no hero); sempre visível funciona só com HTML e CSS.
- Como funciona: um link para `#main` (ou para o topo), sem JavaScript, com a rolagem suave do CSS, desligada para quem pede menos movimento (`prefers-reduced-motion`).
- Onde fica: no canto inferior direito, sem cobrir o conteúdo nem o botão de contato no celular, e com o recuo da área segura dos iPhones.
- Aparência: ícone de seta (SVG inline), nos dois temas, com o mesmo estilo dos botões do cabeçalho.
- Acessibilidade e textos: rótulo para leitor de tela nos dois idiomas, no `site.yaml` (ex.: "Voltar ao topo" / "Back to top"), e foco visível no teclado.

**Passos:**
- [ ] Debater as ideias acima.
- [ ] Texto do rótulo nos dois idiomas no `docs/approved_content.md` e no `site.yaml`, revisado pelo usuário.
- [ ] Componente do botão, nos dois idiomas e nos dois temas.
- [ ] `T-NNN` com o botão no celular e no desktop.

**Commits:**

**Resultado:**

### M-012 · Formação e certificações

**Objetivo:** mostrar no site a escolaridade, os cursos, os diplomas e as certificações, tendo o LinkedIn do usuário como base. Origem: pedido do usuário, 2026-10-29.

**Depende de:** —

**Contexto:** não está nas seções do MVP (`docs/brief.md`, **Escopo**, item 4); é uma mudança de escopo, e o brief é atualizado junto com as decisões.

**Ideias para o debate:**
- Fonte dos dados: o agente não acessa o LinkedIn logado; o usuário cola as seções "Formação acadêmica" e "Licenças e certificados" ou entrega a exportação de dados do LinkedIn (Configurações → Privacidade dos dados → Obter uma cópia dos seus dados). A exportação fica fora do git.
- Onde mostrar: uma seção nova (ex.: entre a linha do tempo e as skills), ou dentro do "Sobre"; decidir também a posição no menu.
- O que entra: só formação e certificações relevantes para engenharia de dados, ou tudo o que está no LinkedIn; se os cursos curtos aparecem ou ficam de fora.
- Como mostrar: instituição, título, período ou data de emissão, e o link de verificação da certificação, quando houver. Sem imagem de diploma nem de certificado (documentos pessoais não entram no repositório).
- Dados: um bloco novo no `site.yaml` (ex.: `education` e `certifications`), com schema no Zod e os textos nos dois idiomas.

**Passos:**
- [ ] Receber do usuário os dados do LinkedIn.
- [ ] Debater onde e como mostrar, e o que entra; atualizar o `docs/brief.md`.
- [ ] Textos nos dois idiomas no `docs/approved_content.md`, revisados pelo usuário.
- [ ] Schema e dados no `site.yaml`.
- [ ] Componente da seção, nos dois idiomas e nos dois temas.
- [ ] `T-NNN` com a seção nova no celular e no desktop.

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

**Depende de:** M-007, M-008, M-010 e C-005 (ImprovMX).

**Contexto:** `docs/brief.md`, seção **Como subir**, e os critérios de sucesso em **Objetivo**.

**Passos:**
- ~~[ ] Trocar a origem do Pages de "branch" para "GitHub Actions" e o workflow de deploy para rodar a cada push na `main` (com autorização).~~ Adiantado para o M-010 (2026-10-29).
- [ ] Conferir que o domínio continua verificado (C-004, feito no M-001).
- [ ] Conferir que o CNAME `dguizani.github.io` (C-006, feito no M-001), o certificado e o "Enforce HTTPS" continuam valendo depois da troca da origem do Pages.
- [ ] E-mail do ImprovMX funcionando (C-005): mensagem de teste chegando ao Gmail.
- [ ] Apagar a `release/guizani-data-it` (com autorização).
- [ ] Conferir o site no ar contra os critérios de sucesso (30 segundos no celular, todos os projetos aprovados, projeto novo em menos de 10 minutos editando só o YAML, Lighthouse 90 ou mais).

**Commits:**

**Resultado:**
