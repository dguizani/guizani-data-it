# Onde paramos

- **Última sessão:** 2026-10-29 (segunda sessão).
- **Git:** branch `main`, igual à `origin/main` depois do push do fechamento desta sessão, sem mudanças locais. Outras branches: `legacy/curriculo-2024` (currículo antigo, só consulta) e `release/guizani-data-it` (o site antigo, mantido até o M-009 para a volta; nunca fazer commit nela). Repositório `dguizani/guizani-data-it`.
- **Site no ar:** o site novo, em <https://datait.guizani.com.br> e `/en/`, publicado pelo workflow `Deploy` (GitHub Actions) a cada push na `main`, depois do CI. Pages com `build_type: workflow`, domínio `datait.guizani.com.br`, certificado aprovado e "Enforce HTTPS" ligado. Para voltar ao site antigo: trocar a origem do Pages de novo para a `release/guizani-data-it` (`/`).
- **Controles:**
  - roadmap: M-001 a M-006 e M-010 em `done.md`; nada em `in_progress.md`; M-007 a M-009 em `pending.md`;
  - testes: T-001 a T-007 em `done.md`; nenhum pendente;
  - chamados: C-002 (currículos em PDF), C-003 (Cloudflare) e C-005 (ImprovMX) a fazer; C-001, C-004 e C-006 concluídos;
  - perguntas: nenhuma aberta.
- **Recursos transitórios:**
  - servidor de desenvolvimento no contêiner `guizani-data-it-dev-1` (<http://localhost:4321>); para parar: `docker compose down`;
  - `logs/` (fora do git): relatórios do Lighthouse, `npm-audit__2026-10-28.json`, capturas em `logs/m004/`, `logs/m005/` e `logs/m006/`, e os conceitos de logo em `logs/logo-concepts/`;
  - `references/` (fora do git): a foto original (`image_3_1x1.png`) e o banner (`capa.fw.png`).

## O que foi feito nesta sessão

- **T-001 a T-006 validados pelo usuário:** M-001 a M-006 e os testes foram para os `done.md` (`b3911bc`).
- **M-010 (publicação antecipada), pedido do usuário:** o site novo virou o principal no Pages, mesmo sem o M-007 e o M-008. Registro em `80bd3d4`; `deploy.yml` a cada push na `main` em `b52b99f`; origem do Pages trocada para "GitHub Actions" pela API; Deploy `40814613861` verde; T-007 validado pelo usuário (`b24fe03`). A troca da origem saiu do M-009.
- **Decisões do usuário:** deploy a cada push na `main`; publicar com o `contato@guizani.com.br` ainda sem funcionar (o domínio continua sem MX até o C-005); manter a `release/guizani-data-it` até o M-009; o favicon fica para o M-007, sem adiantar.

## Foco atual

Nada em execução.

## Próximos passos (em ordem)

1. Debater e aprovar a proposta do M-007 (título e descrição por idioma, imagens Open Graph geradas pelo Chromium do serviço `lighthouse` em `public/og/`, favicon a partir do logo, `@astrojs/sitemap`, `robots.txt`, canônico, `og:locale`, cartão do X) e implementar (M-007).
2. Usuário: configurar o ImprovMX (C-005), para o `contato@guizani.com.br` receber e-mails; até lá, mensagens para ele voltam.
3. Usuário: entregar os currículos em PDF (C-002), para o link aparecer no contato (M-005).
4. Usuário: criar a conta no Cloudflare e passar o token (C-003), para o M-008.
5. M-008 (contagem de visitas) e M-009 (lançamento: e-mail, conferências finais e apagar a `release/guizani-data-it`, com autorização).

## Lembretes

- **Todo push na `main` publica o site** (o `Deploy` roda o CI antes; commit só de docs também dispara, sem mudar o site). Não commitar trabalho pela metade.
- **O ambiente `github-pages` ainda tem a regra de branch `organizando_pastas`** (antiga, sem efeito). Tirar só se o usuário autorizar.
- **Depois de mudar o `schema.ts`, o servidor de desenvolvimento reinicia sozinho** (integração `watch-site-schema` no `astro.config.ts`). Se uma página mostrar dados velhos ou `undefined`, reiniciar com `docker compose restart dev` antes de procurar o defeito no código.
- **Não apagar a `.astro/` nem rodar builds em outro contêiner com o servidor de desenvolvimento no ar sem necessidade:** a pasta é compartilhada pelos contêineres.
- **A rodada completa parte de uma pasta limpa** (`rm -rf .astro dist`), como o CI; rodar sem isso escondeu um erro de lint uma vez.
- **No `.astro`, o Prettier quebra a linha antes de um `<span>` e o Astro descarta o espaço:** usar `{" "}` explícito entre um texto e um elemento em linha (ex.: o "via ITIX").
- **ESLint nos `.astro`:** a `no-unsafe-return` está desligada (JSX dentro de `.map()`); não usar `name` como nome de propriedade (`no-deprecated`, confunde com `window.name`).
- **Commits:** escopo com o ID (`feat(M-007): ...`), nunca `git add .` (nem com `--dry-run`), conferir o stage antes de commitar (os `git mv` e `git rm` já entram no stage), nunca `Co-Authored-By`, push só com autorização.
- **Python no Windows:** `write_text` grava CRLF; gravar com `write_bytes(texto.encode("utf-8"))` ou corrigir com `sed -i 's/\r$//'`. `python -c` com várias linhas quebra no Git Bash: usar um heredoc (`python -I -X utf8 - <<'EOF'`) ou um script no scratchpad.
- **Arquivos temporários de teste** (cópias de segurança do `site.yaml` e do `schema.ts`) ficam no scratchpad, e o original é conferido com `cmp` depois de restaurado.
- **A foto original e o banner não vão para o git:** só a cópia em `src/assets/profile.jpg`.
