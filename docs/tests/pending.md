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
15. ~~Seção de formação e certificações no desktop e no celular, nos dois idiomas e nos dois temas → T-011~~ (ok em 2026-10-29)
16. Prévias de compartilhamento, favicon, sitemap e `robots.txt`, no site publicado → T-012

### T-012 · SEO e qualidade

**Roadmap:** M-007.

**Commits:** `25faf8f`.

**O que mudou:** título e descrição por idioma; link canônico; Open Graph com uma imagem por idioma (`/og/pt.png` e `/og/en.png`) e o cartão grande do X; favicon (`/icon.svg`, `/favicon.ico`, `/apple-touch-icon.png`); `/sitemap-index.xml` e `/robots.txt`. As prévias de compartilhamento só podem ser conferidas depois do push, porque o LinkedIn e o WhatsApp leem o site no ar.

**Passos:**
- [ ] Rodada completa e Lighthouse. Esperado: tudo verde, `pass 10, fail 0`, Lighthouse 90 ou mais.
- [ ] Aba do navegador em `/` e em `/en/`. Esperado: o ícone do "G de circuito" e o título de cada idioma.
- [ ] Depois do push, colar `https://datait.guizani.com.br/` e `https://datait.guizani.com.br/en/` no LinkedIn Post Inspector (<https://www.linkedin.com/post-inspector/>). Esperado: a imagem do idioma certo, o título e a descrição.
- [ ] Depois do push, mandar o link numa conversa do WhatsApp (pode ser para você mesmo). Esperado: a prévia com a imagem e o título.
- [ ] Abrir `https://datait.guizani.com.br/sitemap-index.xml` e `https://datait.guizani.com.br/robots.txt`. Esperado: o índice apontando o `sitemap-0.xml` com as duas páginas, e o `robots.txt` liberando tudo e apontando o sitemap.

**Resultado:**
- 2026-10-29: rodada completa e Lighthouse verdes pelo agente, a partir de uma pasta limpa (100 nas quatro categorias; logs em `logs/m007-full-run__2026-10-29.log` e `logs/m007-lighthouse__2026-10-29.log`); `<head>`, sitemap e imagens conferidos no `dist/`. Falta a confirmação do usuário.
