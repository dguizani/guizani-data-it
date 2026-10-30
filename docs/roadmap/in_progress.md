# Roadmap · em andamento

### M-015 · Currículos em Markdown para o Marp

**Objetivo:** escrever os currículos em português e em inglês, em Markdown no formato do Marp, a partir das informações do projeto; o usuário gera os PDFs pela extensão do Marp no VS Code. Origem: pedido do usuário, 2026-10-29. Substitui o "feito à parte pelo usuário" do C-002, que continua valendo para a entrega dos PDFs em `public/`.

**Depende de:** nada.

**Decisões** (2026-10-29, aprovadas pelo usuário):
1. O agente entrega só os dois Markdown (`cv/cv-pt.md` e `cv/cv-en.md`); os PDFs são gerados pelo usuário, com a extensão do Marp no VS Code, e salvos em `public/` com os nomes do C-002.
2. Conteúdo só do que o site já mostra (`src/data/site.yaml`), revisado pelo usuário antes do commit.
3. Sem foto, sem cidade e sem CNPJ. Título "Engenheiro de dados · fundador da Guizani Data IT" / "Data engineer · founder of Guizani Data IT"; inglês "técnico" / "technical".

**Passos:**
- [x] Tema A4 (`cv/theme.css`, 794 × 1123 px, fundo claro, cores do site), registrado para a extensão no `.vscode/settings.json`.
- [x] Rascunho dos dois currículos, em duas páginas cada. Conferido pelo agente que nada é cortado, com o `@marp-team/marp-cli` rodando por `npx` no serviço `lighthouse`, sem dependência nova (capturas em `logs/cv/`).
- [x] Revisão do usuário (2026-10-29).
- [ ] PDFs gerados pelo usuário em `public/` (C-002).

**Commits:**
- `d4eaa4e`: currículos em Markdown, tema A4 e registro do tema no VS Code.

**Resultado:**

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
6. (2026-10-29) A prévia em português ficou borrada no LinkedIn Post Inspector, mesmo com a `pt.png` nítida no site; a suspeita é o cache de imagens do LinkedIn, guardado pelo endereço. Sem mudança no código: esperar o cache expirar (cerca de 7 dias) e inspecionar de novo. Descartadas, por ora: marca de versão automática no endereço da imagem (`?v=<hash>`) e marca manual (`?v=2`). Se o problema voltar quando o `npm run og` gerar imagens novas, a marca automática é a primeira opção.

**Passos:**
- [x] Título e descrição por idioma, vindos do bloco `seo` do `site.yaml` (decisão 1) (`25faf8f`).
- [x] Página-molde (`src/pages/og-template/[lang].astro`) e script (`scripts/generate-images.ts`, `npm run og`) das imagens Open Graph e dos ícones (decisões 2 e 3) (`25faf8f`). O script fala com o Chromium pelo protocolo de depuração, sem dependência nova; o `favicon.ico` é um PNG de 32 px dentro do contêiner ICO. Comando no `README.md`.
- [x] Favicon no `<head>`: `icon.svg`, `favicon.ico` e `apple-touch-icon.png` (`25faf8f`).
- [x] Sitemap (`@astrojs/sitemap` 3.7.4, `npm audit` sem vulnerabilidades) e `robots.txt` (decisão 4) (`25faf8f`). O `sitemap-0.xml` lista `/` e `/en/` com os `hreflang` e deixa a página-molde de fora.
- [x] Canônico, Open Graph e cartão do X no `<head>` (decisão 5) (`25faf8f`). O texto alternativo da imagem junta o nome da empresa e a frase do hero, já aprovados.
- [x] Lighthouse passando com 90 ou mais nas três categorias: 100 nas quatro, nos dois idiomas, igual ao M-014 (`logs/m007-lighthouse__2026-10-29.log`).
- [ ] T-012 com as prévias de compartilhamento, o favicon, o sitemap e o `robots.txt`. Falta só a prévia em português no LinkedIn, a partir de 2026-11-05 (decisão 6).

**Commits:**
- `25faf8f`: metadados de SEO, imagens de compartilhamento, favicon e sitemap.

**Resultado:**
