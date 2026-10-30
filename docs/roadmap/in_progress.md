# Roadmap · em andamento

### M-007 · SEO e qualidade

**Objetivo:** meta description, Open Graph com uma imagem por idioma, favicon, sitemap, `robots.txt` e Lighthouse 90 ou mais em performance, acessibilidade e SEO, no celular. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-006.

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (SEO e qualidade).

**Como é hoje:** o título é só "Guizani Data IT" nos dois idiomas e a descrição é a frase do hero; sem Open Graph, favicon, sitemap, `robots.txt` nem canônico. O Lighthouse já dá 100 em SEO, e o CI barra o deploy abaixo de 90.

**Decisões** (2026-10-29, aprovadas pelo usuário):
1. Título e descrição por idioma, num bloco `seo` do `site.yaml`:
   - título: "Guizani Data IT · Engenharia de dados | Davi Guizani" / "Guizani Data IT · Data engineering | Davi Guizani";
   - descrição: "Davi Guizani, engenheiro de dados: pipelines, data warehouses e automações para empresas que precisam confiar nos próprios dados." / "Davi Guizani, data engineer: pipelines, data warehouses and automation for companies that need to trust their own data."
2. Imagem Open Graph (1.200 × 630, uma por idioma, com o logo, o nome, a frase do hero e as linhas de circuito no tema escuro): uma página-molde do próprio Astro, fotografada pelo Chromium do serviço `lighthouse` com um script (`npm run og`); os PNGs ficam em `public/og/`. A página-molde é publicada com `noindex` e fica fora do sitemap. Descartados: `satori` com `sharp` no build (duas dependências, uma nativa, e CSS limitado) e SVG feito à mão.
3. Favicon a partir do símbolo "G de circuito" do logo, sobre um quadrado escuro de cantos arredondados: `icon.svg`, `favicon.ico` (32 px) e `apple-touch-icon.png` (180 px), os PNGs gerados pelo mesmo script. Nada do logo do Python.
4. Sitemap com o `@astrojs/sitemap` (`/` e `/en/`, com a ligação entre os idiomas) e `robots.txt` liberando tudo e apontando o sitemap.
5. No `<head>`: canônico, Open Graph (tipo, endereço, título, descrição, imagem com medidas e texto alternativo, idioma e idioma alternativo, nome do site) e o cartão grande do X/Twitter.

**Passos:**
- [ ] Título e descrição por idioma, vindos do `site.yaml` (decisão 1).
- [ ] Página-molde e script das imagens Open Graph e do favicon (decisões 2 e 3).
- [ ] Favicon no `<head>`.
- [ ] Sitemap (`@astrojs/sitemap`) e `robots.txt` (decisão 4).
- [ ] Canônico, Open Graph e cartão do X no `<head>` (decisão 5).
- [ ] Lighthouse CI passando com 90 ou mais nas três categorias, comparado com a referência do M-001.
- [ ] T-012 com as prévias de compartilhamento, o favicon, o sitemap e o `robots.txt`.

**Commits:**

**Resultado:**
