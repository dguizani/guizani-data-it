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
12. ~~Ordem dos projetos e rodapé no site, nos dois idiomas → T-008~~ (ok em 2026-10-29)
13. ~~Projetos principais no desktop, no tablet e no celular, nos dois idiomas e nos dois temas → T-009~~ (ok em 2026-10-29)
14. ~~Botão de voltar ao topo no desktop e no celular, nos dois idiomas e nos dois temas → T-010~~ (ok em 2026-10-29)
15. Seção de formação e certificações no desktop e no celular, nos dois idiomas e nos dois temas → T-011

### T-011 · Formação e certificações

**Roadmap:** M-012.

**Commits:** `0a72f74`, `1828e7e`.

**O que mudou:** seção nova "Formação e certificações" ("Education and certifications" em `/en/`), entre as Skills e o Laboratório, fora do menu. Uma linha para o Tecnólogo em Ciência de Dados (UNINTER, 2024 – 2026) e outra para a PCEP (Python Institute, jan. 2025), com o link "Verificar" para a verificação oficial da OpenEDG, em outra aba.

**Passos:**
- [ ] Rodada completa e Lighthouse. Esperado: tudo verde, `pass 10, fail 0`, Lighthouse 90 ou mais.
- [ ] Desktop e celular, nos dois idiomas e nos dois temas. Esperado: a seção entre as Skills e o Laboratório, com os textos aprovados, sem nada no idioma errado.
- [ ] Link "Verificar". Esperado: abre em outra aba a página da OpenEDG com a certificação válida.

**Resultado:**
- 2026-10-29: rodada e Lighthouse verdes pelo agente (100 nas quatro categorias; logs em `logs/m012-checks__2026-10-29.log` e `logs/m012-lighthouse__2026-10-29.log`); textos, link e nome acessível conferidos com o `puppeteer-core`. Falta a confirmação do usuário.
