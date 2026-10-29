# Testes · pendentes

## Execução conjunta

1. ~~Conferência do repositório no GitHub e do site no ar → T-001~~ (ok em 2026-10-29)
2. ~~Conferência da verificação do domínio e do CNAME, depois do C-004 e do C-006 → T-001~~ (ok em 2026-10-29, pelo agente; confirmado pelo usuário em 2026-10-29)
3. ~~Rodada completa no contêiner: `npm ci`, lint, Prettier, `astro check`, build e Lighthouse (`docs/tests/README.md`, **Rodada completa**) → T-002~~ (ok em 2026-10-29)
4. ~~Servidor de desenvolvimento com recarga ao salvar → T-002~~ (ok em 2026-10-28)
5. ~~Primeira execução do CI no GitHub, depois do push → T-002~~ (ok em 2026-10-28)
6. ~~Rodada completa com o `npm test` e o build quebrando com dados inválidos → T-003~~ (ok em 2026-10-29)
7. ~~`site.yaml` no VS Code com a extensão YAML → T-003~~ (ok em 2026-10-29)
8. ~~Página provisória no computador e no celular, nos dois temas → T-004~~ (ok em 2026-10-29)
9. ~~Página completa no celular e no computador (30 segundos, projetos, contato, textos novos) → T-005~~ (ok em 2026-10-29)
10. ~~Seletor de idioma e página em inglês → T-006~~ (ok em 2026-10-29)
11. ~~Deploy pelo GitHub Actions e site novo no ar → T-007~~ (ok em 2026-10-29)
12. Ordem dos projetos e rodapé no site, nos dois idiomas → T-008

### T-008 · Ordem dos projetos e espaço no copyright

**Roadmap:** M-011.

**Commits:** `ca3e4db`.

**O que mudou:** os projetos (cards principais, participações pontuais e linha do tempo) passam a seguir a data inicial: os em andamento primeiro e, depois, do início mais recente para o mais antigo. Uma data só com o ano conta como janeiro (ex.: Vita, `2025`, fica depois de fev. 2025). O rodapé mostra "© 2026 Guizani Data IT", com o espaço. Aparece em `/` e em `/en/`.

**Passos:**
- [ ] Rodada completa no contêiner (lint, Prettier, `astro check`, `npm test`, build). Esperado: tudo verde, `pass 10, fail 0`.
- [ ] Linha do tempo, nos dois idiomas. Esperado: TruckPad (em andamento), JSL (2026), JSL (nov. 2025), Skystone (jul. 2025), Academia Foguete (mai. 2025), Unimed RPA (fev. 2025), Vita (2025), Integral Médica (2024 – 2026), Unimed data warehouse (2022 – 2025).
- [ ] Cards dos projetos principais, nos dois idiomas. Esperado: BI da TruckPad, pagamento de notas, ERP Omie, CDP e data warehouse, nessa ordem.
- [ ] Rodapé, nos dois idiomas. Esperado: "© 2026 Guizani Data IT · CNPJ ..." (em inglês, "CNPJ (Brazilian company ID) ...").

**Resultado:**
- 2026-10-29: rodada completa verde pelo agente (log em `logs/m011-full-run__2026-10-29.log`); ordem e rodapé conferidos no `dist/` pelo agente. Falta a confirmação do usuário.
