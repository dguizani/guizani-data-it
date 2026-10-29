# Relatórios

Saídas grandes guardadas uma vez, convertidas para Markdown por script, seguindo a regra **Saídas grandes** de `docs/control_files.md`: índice no topo, uma seção `###` por objeto, sem os espaços de alinhamento. A saída crua fica em `logs/`, fora do git. Ler primeiro a interpretação, depois o índice do arquivo, e só então o intervalo de linhas necessário.

| Data | Arquivo | Execução | Origem | O que foi lido | Interpretação |
|---|---|---|---|---|---|
| 2026-10-28 | `lighthouse_current_site_mobile__2026-10-28.md` | Lighthouse 13.6.0, `fetchTime` 2026-10-29T00:10:21Z; commit publicado `38a8a39` | `npx lighthouse@latest` num contêiner `node:26-bookworm-slim` (Node 26.13.0) com Chromium 156, perfil de celular padrão (`simulate`); JSON cru em `logs/lighthouse/` | notas das quatro categorias, métricas e auditorias abaixo de 0,9 | M-001, Resultado |
