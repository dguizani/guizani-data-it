# Roadmap · em andamento

### M-014 · Botão flutuante para voltar ao topo

**Objetivo:** um botão fixo no canto da tela que leva de volta ao início da página. Origem: pedido do usuário, 2026-10-29.

**Depende de:** —

**Ideias para o debate:**
- Quando aparece: sempre, ou só depois de rolar uma parte da página (ex.: passar do hero). Mostrar só depois exige um pouco de JavaScript (um `IntersectionObserver` no hero); sempre visível funciona só com HTML e CSS.
- Como funciona: um link para `#main` (ou para o topo), sem JavaScript, com a rolagem suave do CSS, desligada para quem pede menos movimento (`prefers-reduced-motion`).
- Onde fica: no canto inferior direito, sem cobrir o conteúdo nem o botão de contato no celular, e com o recuo da área segura dos iPhones.
- Aparência: ícone de seta (SVG inline), nos dois temas, com o mesmo estilo dos botões do cabeçalho.
- Acessibilidade e textos: rótulo para leitor de tela nos dois idiomas, no `site.yaml` (ex.: "Voltar ao topo" / "Back to top"), e foco visível no teclado.

**Como é hoje:** o cabeçalho não é fixo; a rolagem suave já existe no `reset.css`, desligada com `prefers-reduced-motion`; o único script é o do tema, no `Base.astro`.

**Decisões:**
1. O botão aparece só depois que o hero sai da tela, com um script curto (`IntersectionObserver` no hero) e um fade curto. Sem JavaScript, o botão fica sempre visível. (2026-10-29, aprovado pelo usuário.)
2. É um link para `#top`, que o HTML entende como o início da página, sem JavaScript. Fica no canto inferior direito, com o recuo lateral do site e a área segura dos iPhones, tem 3rem, ícone de seta para cima em SVG e o estilo do botão de tema, nos dois temas, com foco visível. (2026-10-29, aprovado pelo usuário.)
3. Rótulo para leitor de tela e dica ao passar o mouse: "Voltar ao topo" / "Back to top", no bloco `ui.a11y` do `site.yaml`. (2026-10-29, aprovado pelo usuário.)

**Passos:**
- [x] Debater as ideias acima.
- [x] Texto do rótulo nos dois idiomas no `site.yaml` (`ab36e71`), aprovado na decisão 3. Os textos de interface e de acessibilidade ficam só no `site.yaml`, como o "Pular para o conteúdo"; o `docs/approved_content.md` guarda os textos de conteúdo.
- [x] Componente do botão, nos dois idiomas e nos dois temas (`ab36e71`). Com JavaScript, o botão começa escondido por `@media (scripting: enabled)` e aparece quando o hero sai da tela; sem JavaScript, fica sempre visível. Conferido pelo agente com o `puppeteer-core` do serviço `lighthouse` (escondido no topo, visível depois de rolar, o clique volta ao topo; sem JavaScript, sempre visível), com capturas em `logs/m014/` (fora do git). Lighthouse 100 nas quatro categorias, nos dois idiomas.
- [ ] T-010 com o botão no celular e no desktop.

**Commits:**
- `ab36e71`: botão flutuante de voltar ao topo.

**Resultado:**
