# Roadmap · em andamento

### M-011 · Ordem dos projetos e espaço no copyright

**Objetivo:** dois ajustes vistos no site publicado. Origem: pedido do usuário, 2026-10-29.
1. Ordenar os projetos pela data inicial, e não pela final. Hoje a Unimed de Goiânia (2022 – 2025) aparece depois de Skystone (jul. 2025).
2. O copyright do rodapé aparece como "© 2026Guizani", sem o espaço entre o ano e o nome.

**Depende de:** —

**Como é hoje:**
- `sortProjects` (`src/data/format.ts`) põe os em andamento primeiro e ordena pelo fim (do mais recente para o mais antigo), usando o início só como desempate. Um fim só com o ano vira dezembro (`2025` → `2025-12`), por isso a Unimed (fim `2025`) passa à frente da Skystone (`2025-07`). A mesma função é usada em `Projects.astro`, `OccasionalWork.astro` e `Timeline.astro`.
- `Footer.astro` tem `© {year}` e `{site.brand.name}` em linhas separadas; o Astro, como o JSX, descarta a quebra de linha entre duas expressões, e o espaço some.

**Ideias para o debate:**
- Ordem: só pelo início (do mais recente para o mais antigo), ou continuar com os em andamento primeiro e, depois, pelo início. Decidir se a linha do tempo segue a mesma ordem dos cards.
- Rodapé: juntar o texto numa expressão só (ex.: `` {`© ${year} ${site.brand.name}`} ``), que o Prettier não quebra.

**Decisões:**
1. Os projetos em andamento vêm primeiro; depois, todos pela data inicial, da mais recente para a mais antiga; no mesmo início, o fim mais recente primeiro. Os cards, as participações pontuais e a linha do tempo seguem a mesma ordem, porque usam a mesma função. (2026-10-29, aprovado pelo usuário.)
2. O copyright vira uma expressão só, com o espaço dentro do texto. (2026-10-29, aprovado pelo usuário.)

**Passos:**
- [x] Debater a regra de ordenação.
- [x] Alterar o `sortProjects` e a docstring (`ca3e4db`).
- [x] Corrigir o espaço do copyright (`ca3e4db`). O Prettier quebrava a linha e grudava o "·" no texto seguinte; a linha inteira virou a constante `legalLine` no frontmatter.
- [ ] T-008 com a ordem dos projetos e o rodapé nos dois idiomas.

**Commits:**
- `ca3e4db`: ordem pela data inicial e espaço do copyright.

**Resultado:**
