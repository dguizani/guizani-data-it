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
17. Link do currículo no contato, nos dois idiomas, no servidor de desenvolvimento e depois do push → T-013

### T-013 · Currículos em PDF

**Roadmap:** M-015 (e C-002).

**Commits:** `d4eaa4e`, `7b83ec6`, `854af51`.

**O que mudou:** os currículos em Markdown (`cv/`), com o tema A4 do Marp; os PDFs gerados pelo usuário em `public/davi-guizani-cv-pt.pdf` e `public/davi-guizani-cv-en.pdf`; e o bloco `contact.resume` do `site.yaml`, que faz aparecer o link "Currículo em PDF" / "Résumé (PDF)" no fim da seção de contato, abrindo em outra aba.

**Passos:**
- [ ] Rodada completa e Lighthouse. Esperado: tudo verde, `pass 10, fail 0`, Lighthouse 90 ou mais.
- [ ] Em <http://localhost:4321/> e <http://localhost:4321/en/>, clicar no link do currículo, no fim do contato. Esperado: abre, em outra aba, o PDF do idioma da página, em 2 páginas A4, com os links clicáveis.
- [ ] Depois do push, repetir no site no ar. Esperado: o mesmo.

**Resultado:**
- 2026-10-29: rodada completa e Lighthouse verdes pelo agente, a partir de uma pasta limpa (100 nas quatro categorias; log em `logs/m015-full-run__2026-10-29.log`); o link aparece no `dist/` com o PDF de cada idioma. Texto e metadados dos PDFs conferidos com o `pdftotext` e o `pdfinfo`: 2 páginas A4, nada cortado, só o que o site mostra. Falta a confirmação do usuário.
- 2026-10-29: pedido do usuário, o link passou a abrir em outra aba (`854af51`). Rodada completa e Lighthouse verdes de novo, a partir de uma pasta limpa (100 nas quatro categorias; log em `logs/m015-full-run-2__2026-10-29.log`); no `dist/`, o link tem `target="_blank"` e o aviso "(abre em outra aba)" / "(opens in a new tab)" separado do rótulo por um espaço. Falta a confirmação do usuário.

### T-012 · SEO e qualidade

**Roadmap:** M-007.

**Commits:** `25faf8f`.

**O que mudou:** título e descrição por idioma; link canônico; Open Graph com uma imagem por idioma (`/og/pt.png` e `/og/en.png`) e o cartão grande do X; favicon (`/icon.svg`, `/favicon.ico`, `/apple-touch-icon.png`); `/sitemap-index.xml` e `/robots.txt`. As prévias de compartilhamento só podem ser conferidas depois do push, porque o LinkedIn e o WhatsApp leem o site no ar.

**Passos:**
- [x] Rodada completa e Lighthouse. Esperado: tudo verde, `pass 10, fail 0`, Lighthouse 90 ou mais.
- [x] Aba do navegador em `/` e em `/en/`. Esperado: o ícone do "G de circuito" e o título de cada idioma.
- [ ] Depois do push, colar `https://datait.guizani.com.br/` e `https://datait.guizani.com.br/en/` no LinkedIn Post Inspector (<https://www.linkedin.com/post-inspector/>). Esperado: a imagem do idioma certo, o título e a descrição.
- [x] Depois do push, mandar o link numa conversa do WhatsApp (pode ser para você mesmo). Esperado: a prévia com a imagem e o título.
- [x] Abrir `https://datait.guizani.com.br/sitemap-index.xml` e `https://datait.guizani.com.br/robots.txt`. Esperado: o índice apontando o `sitemap-0.xml` com as duas páginas, e o `robots.txt` liberando tudo e apontando o sitemap.

**Resultado:**
- 2026-10-29: rodada completa e Lighthouse verdes pelo agente, a partir de uma pasta limpa (100 nas quatro categorias; logs em `logs/m007-full-run__2026-10-29.log` e `logs/m007-lighthouse__2026-10-29.log`); `<head>`, sitemap e imagens conferidos no `dist/`. Falta a confirmação do usuário.
- 2026-10-29: usuário confirmou a aba do navegador (ícone e títulos) e a prévia do WhatsApp. No LinkedIn Post Inspector, a prévia em inglês saiu boa e a em português, borrada, mesmo depois de inspecionar de novo. As duas imagens publicadas têm 1.200 × 630 px e a `pt.png` está nítida no site (conferido pelo agente), então a suspeita é a imagem guardada no cache do LinkedIn. `sitemap-index.xml`, `sitemap-0.xml` e `robots.txt` conferidos pelo agente no site no ar; a linha `<script src="chrome-extension://...">` do print do usuário vem de uma extensão do navegador, não do site.
- 2026-10-29: usuário confirmou o sitemap e o `robots.txt`. Decidiu não mudar o código por causa do LinkedIn e esperar o cache expirar (cerca de 7 dias): inspecionar `/` de novo no Post Inspector a partir de 2026-11-05.
- 2026-10-29: usuário confirmou a rodada completa e o Lighthouse. Falta só a prévia em português no LinkedIn.
