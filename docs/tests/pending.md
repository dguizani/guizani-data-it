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
11. Deploy pelo GitHub Actions e site novo no ar → T-007

### T-007 · Publicação antecipada do site novo

**Roadmap:** M-010.

**Commits:**

**O que mudou:** o <https://datait.guizani.com.br> passa a mostrar o site novo (em português em `/` e em inglês em `/en/`), publicado pelo workflow `Deploy` a cada push na `main`. A landing page antiga sai do ar, mas a `release/guizani-data-it` continua existindo para a volta.

**Passos:**
- [ ] Settings → Pages: origem "GitHub Actions", domínio `datait.guizani.com.br` e "Enforce HTTPS" marcado.
- [ ] Actions: o workflow `Deploy` do push na `main` está verde (CI, build e deploy).
- [ ] Abrir <https://datait.guizani.com.br> e <https://datait.guizani.com.br/en/> no celular: o site novo, com o cadeado; `http://datait.guizani.com.br` leva para o `https://`.

**Resultado:**
