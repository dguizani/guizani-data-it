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
14. Botão de voltar ao topo no desktop e no celular, nos dois idiomas e nos dois temas → T-010

### T-010 · Botão flutuante para voltar ao topo

**Roadmap:** M-014.

**Commits:** `ab36e71`.

**O que mudou:** um botão com uma seta para cima, no canto inferior direito, que aparece quando o hero sai da tela e leva de volta ao início da página com rolagem suave (sem animação para quem pede menos movimento). O nome para leitores de tela e a dica ao passar o mouse são "Voltar ao topo" / "Back to top". Aparece em `/` e em `/en/`.

**Passos:**
- [ ] Rodada completa e Lighthouse. Esperado: tudo verde, `pass 10, fail 0`, Lighthouse 90 ou mais.
- [ ] Desktop, nos dois idiomas e nos dois temas: no topo, sem botão; ao rolar além do hero, o botão aparece com um fade; o clique volta ao topo.
- [ ] Celular (ou o modo de dispositivo do Chrome): o mesmo comportamento, com o botão sem sair da tela.
- [ ] Teclado: com Tab, o botão recebe o foco visível quando está aparecendo, e o Enter volta ao topo. No topo, escondido, ele não recebe foco.
- [ ] Mouse parado sobre o botão. Esperado: a dica "Voltar ao topo" ("Back to top" em `/en/`).

**Resultado:**
- 2026-10-29: rodada e Lighthouse verdes pelo agente (100 nas quatro categorias, logs em `logs/m014-checks__2026-10-29.log` e `logs/m014-lighthouse__2026-10-29.log`); comportamento conferido com o `puppeteer-core` em `logs/m014/`. Falta a confirmação do usuário.
