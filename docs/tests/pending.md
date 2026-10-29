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
13. Projetos principais no desktop, no tablet e no celular, nos dois idiomas e nos dois temas → T-009

### T-009 · Projetos principais em uma coluna

**Roadmap:** M-013.

**Commits:** `477e028`.

**O que mudou:** os cards dos projetos principais ficam um abaixo do outro em qualquer tela. Quando o card tem 48rem ou mais (telas a partir de cerca de 870 px), ele se divide em duas colunas: à esquerda, o cliente, o título e o período em cima, e a stack embaixo; à direita, o problema e o papel. Abaixo disso, a ordem é a de antes: topo, problema, papel, stack. Aparece na seção "Projetos principais" de `/` e de `/en/`.

**Passos:**
- [ ] Rodada completa (lint, Prettier, `astro check`, `npm test`). Esperado: tudo verde, `pass 10, fail 0`.
- [ ] Desktop, nos dois idiomas e nos dois temas. Esperado: os cinco cards um abaixo do outro, cada um em duas colunas, como descrito acima.
- [ ] Tablet e celular (modo de dispositivo do Chrome, F12). Esperado: cards empilhados, na ordem topo, problema, papel, stack; nada cortado nem com rolagem lateral.
- [ ] Redimensionar a janela do desktop devagar. Esperado: a troca entre os dois layouts acontece sem sobreposição nem salto estranho.

**Resultado:**
- 2026-10-29: rodada verde pelo agente (log em `logs/m013-checks__2026-10-29.log`); capturas conferidas pelo agente em `logs/m013/`. Falta a confirmação do usuário.
