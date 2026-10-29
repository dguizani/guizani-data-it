# Onde paramos

- **Última sessão:** 2026-10-28 e 2026-10-29 (primeira sessão).
- **Git:** branch `main`, igual à `origin/main` até o `e3a07dc`, mais os commits de fechamento desta sessão (registro do C-006, dos testes e este arquivo), **ainda sem push**. Outras branches: `legacy/curriculo-2024` (currículo antigo, só consulta) e `release/guizani-data-it` (site no ar até o lançamento; nunca fazer commit nela). Repositório `dguizani/guizani-data-it`; o CI do `e3a07dc` (`40813664533`) está verde.
- **Controles:**
  - roadmap: M-001 a M-006 em `in_progress.md`, todos implementados, esperando só a confirmação do usuário nos testes; M-007 a M-009 em `pending.md`;
  - testes: T-001 a T-006 em `pending.md`, com os resultados do agente registrados e os passos esperando a confirmação do usuário;
  - chamados: C-002 (currículos em PDF), C-003 (Cloudflare) e C-005 (ImprovMX) a fazer; C-001, C-004 e C-006 concluídos;
  - perguntas: nenhuma aberta (P-001 e P-002 respondidas).
- **Recursos transitórios:**
  - servidor de desenvolvimento rodando no contêiner `guizani-data-it-dev-1` (<http://localhost:4321>); para parar: `docker compose down`;
  - `logs/` (fora do git): relatórios do Lighthouse, `npm-audit__2026-10-28.json`, capturas em `logs/m004/`, `logs/m005/` e `logs/m006/`, e os conceitos de logo em `logs/logo-concepts/`;
  - `references/` (fora do git): a foto original (`image_3_1x1.png`) e o banner (`capa.fw.png`).

## O que foi feito nesta sessão

- **M-001 (linha de base):** `main` antiga renomeada para `legacy/curriculo-2024`; `main` nova a partir da `release/guizani-data-it`; `release/landing_page` apagada; repositório renomeado para `guizani-data-it`; "Enforce HTTPS" ligado; domínio verificado (C-004) e CNAME `dguizani.github.io` no lugar dos registros A (C-006), os dois trazidos do M-009 por decisão do usuário. Referência do Lighthouse do site atual: 85/92/92/91.
- **M-002 (estrutura):** Astro 7.4.4, TypeScript 6.0.3 `strictest`, Node 26.13.0 LTS só em Docker (`compose.yaml` com os serviços `dev` e `lighthouse`), ESLint, Prettier, CI e deploy manual no GitHub Actions, Dependabot e correções automáticas de segurança. O `@lhci/cli` foi trocado por um script próprio com o Lighthouse 13 (16 vulnerabilidades no `@lhci/cli`).
- **M-003 (dados):** `src/data/site.yaml` com todo o conteúdo nos dois idiomas, validado pelo schema Zod de `src/data/schema.ts` (loader próprio), 9 testes do schema, JSON Schema para o VS Code; inglês aprovado pelo usuário; Laboratório completado pela P-002; telemetria do Astro desligada.
- **M-004 (identidade):** paleta do briefing (contraste AA), Inter e JetBrains Mono, logo "G de circuito", tema claro e escuro com o botão, `CircuitBackground` com o binário "data". Aprovado pelo usuário ("gostei muito do resultado").
- **M-005 (seções):** todas as seções na ordem aprovada, frase B do hero, Sobre com "mais de 5 anos", foto otimizada; cards dos projetos em duas colunas soltas, por escolha do usuário.
- **M-006 (idiomas):** `/en/`, seletor EN/PT no cabeçalho e `hreflang`; Lighthouse 100 nas duas páginas.
- **Incidentes e correções:**
  - lint quebrando no CI por falta da `.astro/` num checkout limpo (`63c3a10`);
  - servidor de desenvolvimento com dados desatualizados depois de mudar o schema (erro 500 uma vez e o erro do `switchLabel` relatado pelo usuário): ele não recarregava o `schema.ts`; corrigido com o `addWatchFile` (`2d602bc`), com teste novo (`d338cfe`); 10 testes no total.
- **Decisões do usuário registradas:** e-mail `contato@guizani.com.br`; logo C (pode mudar no futuro); frase B; duas colunas soltas nos projetos; versão em inglês como proposta.

## Foco atual

Nada em execução. O debate do M-007 (SEO e qualidade) foi proposto ao usuário e espera a aprovação.

## Próximos passos (em ordem)

1. Pedir autorização para o push dos commits de fechamento desta sessão.
2. Aprovar a proposta do M-007 (título por idioma, imagens Open Graph geradas pelo Chromium do serviço `lighthouse` em `public/og/`, favicon, `@astrojs/sitemap`, `robots.txt`, canônico, `og:locale`, cartão do X) e implementar (M-007).
3. Usuário: confirmar os passos dos testes T-001 a T-006 (inclusive a revisão dos textos novos do T-005 e o seletor do T-006) para os M-001 a M-006 irem para `done.md`.
4. Usuário: entregar os currículos em PDF (C-002), para o link aparecer no contato (M-005).
5. Usuário: criar a conta no Cloudflare e passar o token (C-003), para o M-008.
6. Usuário: configurar o ImprovMX (C-005), para o e-mail funcionar antes do lançamento (M-009).
7. M-008 (contagem de visitas) e M-009 (lançamento).

## Lembretes

- **Depois de mudar o `schema.ts`, o servidor de desenvolvimento reinicia sozinho** (integração `watch-site-schema` no `astro.config.ts`). Se uma página do servidor mostrar dados velhos ou `undefined`, reiniciar com `docker compose restart dev` antes de procurar o defeito no código.
- **Não apagar a `.astro/` nem rodar builds em outro contêiner com o servidor de desenvolvimento no ar sem necessidade:** a pasta é compartilhada pelos contêineres.
- **A rodada completa parte de uma pasta limpa** (`rm -rf .astro dist`), como o CI; rodar sem isso escondeu um erro de lint uma vez.
- **No `.astro`, o Prettier quebra a linha antes de um `<span>` e o Astro descarta o espaço:** usar `{" "}` explícito entre um texto e um elemento em linha (ex.: o "via ITIX").
- **ESLint nos `.astro`:** a `no-unsafe-return` está desligada (JSX dentro de `.map()`); não usar `name` como nome de propriedade (`no-deprecated`, confunde com `window.name`).
- **Commits:** escopo com o ID (`feat(M-007): ...`), nunca `git add .` (nem com `--dry-run`), conferir o stage antes de commitar (os `git mv` e `git rm` já entram no stage), nunca `Co-Authored-By`, push só com autorização.
- **Python no Git Bash:** `python -c` com várias linhas quebra; escrever o script num arquivo no scratchpad. Para saída com acentos, `python -I -X utf8`.
- **Arquivos temporários de teste** (cópias de segurança do `site.yaml` e do `schema.ts`) ficam no scratchpad, e o original é conferido com `cmp` depois de restaurado.
- **A foto original e o banner não vão para o git:** só a cópia em `src/assets/profile.jpg`.
