# Roadmap · pendentes

Na ordem de execução. A especificação de cada entrega está em `docs/brief.md` (seção indicada em **Contexto**) e os textos em `docs/approved_content.md`.

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
