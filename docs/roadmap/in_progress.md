# Roadmap · em andamento

### M-013 · Projetos principais em uma coluna

**Objetivo:** mostrar os cards dos projetos principais um abaixo do outro, sem as duas colunas no desktop. Origem: pedido do usuário, 2026-10-29.

**Depende de:** —

**Como é hoje:** `Projects.astro` usa `columns: 2` a partir de `64rem` (desktop), com `break-inside: avoid` em cada card; no celular os cards já ficam um abaixo do outro.

**Achados:** com uma coluna só, o card ocupa toda a área de conteúdo (`--content-width: 72rem`), e os parágrafos passariam de 120 caracteres por linha no desktop.

**Decisões:**
1. Entre as opções debatidas (limitar os parágrafos, limitar o card, sem limite, duas colunas dentro do card), o usuário escolheu uma variação da última: o card muda o próprio layout quando passa de uma largura: à esquerda, em cima, o cliente, o título e o período; à esquerda, embaixo, a stack; à direita, o problema e o papel. No celular, a ordem continua a de hoje (topo, problema, papel, stack). (2026-10-29, aprovado pelo usuário.)
2. Detalhes da implementação, a validar no teste: a troca é feita por *container query* na largura do card (48rem), com a esquerda em 1/3 e a direita em 2/3. A stack sai do `dl` do problema e do papel para um `dl` próprio, para o layout não depender de `display: contents`. (2026-10-29.)

**Passos:**
- [x] Tirar o `@media` com as duas colunas e o `break-inside`, que perde a função, do `Projects.astro` (`477e028`).
- [x] Novo layout do `ProjectCard.astro` (decisão 1) (`477e028`). Capturas no desktop (1.280 px), no tablet (820 px) e no celular (390 px) em `logs/m013/` (fora do git). No tablet, o card ainda tem menos de 48rem e fica empilhado; as duas colunas aparecem a partir de cerca de 870 px de tela.
- [ ] T-009 com os projetos no desktop e no celular, nos dois idiomas.

**Commits:**
- `477e028`: projetos em uma coluna e o card em duas colunas quando largo.

**Resultado:**
