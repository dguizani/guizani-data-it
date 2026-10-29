# Roadmap · em andamento

### M-010 · Publicação antecipada do site novo

**Objetivo:** deixar o site novo como o site principal no GitHub Pages já, mesmo sem o M-007 e o M-008, trazendo para agora a troca da origem do Pages que estava no M-009. Origem: pedido do usuário, 2026-10-29.

**Depende de:** M-006.

**Como é hoje** (conferido em 2026-10-29): o Pages usa o build `legacy` a partir da `release/guizani-data-it` (`/`), com o domínio `datait.guizani.com.br` e `https_enforced: true`. O `deploy.yml` só roda à mão (`workflow_dispatch`) e para se a origem não for "GitHub Actions". O ambiente `github-pages` já deixa a `main` publicar. O domínio `guizani.com.br` continua sem registro MX.

**Decisões** (2026-10-29, aprovadas pelo usuário):
1. O deploy roda a cada push na `main` (e continua podendo rodar à mão), sempre depois do CI.
2. O site vai ao ar com o `contato@guizani.com.br` sem funcionar até o C-005, que fica para depois. Entra no ar sem o link do currículo em PDF (some sozinho sem o C-002), sem o M-007 e sem o M-008.
3. A `release/guizani-data-it` fica até o M-009, para voltar ao site antigo trocando a origem do Pages de novo para ela.
4. Autorizados na hora: a troca da origem do Pages para "GitHub Actions" e o push na `main`.

**Passos:**
- [x] `deploy.yml` rodando a cada push na `main` (`b52b99f`).
- [x] Trocar a origem do Pages para "GitHub Actions" (pela API, `build_type: workflow`).
- [x] Push na `main` e deploy verde (`40814613861`).
- [x] Conferir o site novo no ar, com o domínio, o certificado e o "Enforce HTTPS".
- [ ] Validar o T-007.

**Commits:**
- `80bd3d4`: registro da melhoria e do teste.
- `b52b99f`: deploy a cada push na `main`.

**Resultado:**
