# Roadmap · em andamento

### M-001 · Linha de base do repositório

**Objetivo:** arrumar as branches e o repositório no GitHub para a construção do site novo, sem mudar o site no ar. Origem: prompt de construção, 2026-10-28.

**Depende de:** C-004 (verificação do domínio) e C-006 (CNAME no DNS), feitos pelo usuário.

**Como é hoje** (conferido em 2026-10-28):
- `origin/release/guizani-data-it` em `38a8a39` (publicada pelo Pages, build `legacy`, raiz); `origin/main` em `c9fc9b5` (currículo antigo, branch padrão); `origin/release/landing_page` em `544918c`, já contida na `origin/main` (PR #4).
- A `main` antiga e a `release/guizani-data-it` compartilham só o commit raiz `af964a6` (`.gitattributes`); fora ele, os históricos são independentes.
- Localmente (primeira sessão, sem push): a `main` antiga virou `legacy/curriculo-2024` (no `c9fc9b5`, rastreando a `origin/main`), e uma `main` nova foi criada a partir da `origin/release/guizani-data-it`, sem rastrear nenhuma branch remota. Os arquivos de controle e o `CLAUDE.md` estão nela.
- Pages: certificado HTTPS aprovado (expira em 2026-12-26 e o GitHub renova sozinho), `https_enforced: false`, domínio não verificado (`protected_domain_state: null`).
- Repositório `dguizani/curriculo_html`, descrição "Meu currículo"; o remote do clone aponta para `EmployingDGC/curriculo_html` (redirecionado).

**Decisões** (2026-10-28, aprovadas pelo usuário):
1. A `main` remota é renomeada pelo `gh`: `gh api -X POST repos/dguizani/curriculo_html/branches/main/rename -f new_name=legacy/curriculo-2024`.
2. Ordem no GitHub: renomear a `main` → push da `main` nova (`git push -u origin main`, sem `--force`) → trocar a branch padrão para a `main` → apagar a `release/landing_page` → renomear o repositório. O site não muda em nenhum deles, porque o Pages publica a `release/guizani-data-it`.
3. Repositório renomeado para `guizani-data-it`, com a descrição "Site da Guizani Data IT, engenharia de dados (Astro) · Guizani Data IT website, data engineering (Astro)".
4. ~~A referência do Lighthouse do site atual vem da API pública do PageSpeed Insights (`strategy=mobile`), com o JSON cru em `logs/` e o resumo em `docs/reports/`.~~ A referência do Lighthouse vem de um contêiner Docker temporário (imagem `node` 26 com Chromium), com o JSON cru em `logs/lighthouse/` e o resumo em `docs/reports/` (2026-10-28, aprovado pelo usuário, depois de a API sem chave recusar o pedido).
5. A verificação do domínio (C-004) sai do M-009 e entra neste M-001.
6. O "Enforce HTTPS" é ligado agora, com o certificado já aprovado.
7. A troca dos registros A pelo CNAME `dguizani.github.io` (C-006) sai do M-009 e entra neste M-001, feita junto com o C-004: o Pages mostra "DNS check unsuccessful" (`InvalidARecordError`), e a troca não muda o que o site serve (2026-10-28, aprovado pelo usuário).

**Achados:**
- 2026-10-28: a API do PageSpeed Insights sem chave respondeu `429 RESOURCE_EXHAUSTED`, com a cota diária do uso sem chave em zero (`quota_limit_value: "0"`). Ela só serve com uma chave própria.
- 2026-10-28: o rename da `main` pelo `gh` respondeu na hora, mas a API levou alguns segundos para mostrar a branch padrão nova. O push da `main` nova mostrou o aviso "the branch 'main' that you pushed to was renamed", que é só informativo: a `main` foi criada como branch nova.
- 2026-10-28: depois do "Enforce HTTPS", a tela do Pages mostra "DNS check unsuccessful". A API (`pages/health`) confirma que o único motivo é o registro A num subdomínio (`InvalidARecordError`); o DNS resolve para os IPs atuais do GitHub, e o HTTPS responde e é obrigatório.
- 2026-10-28, Lighthouse do site atual (celular, Lighthouse 13.6.0), em `docs/reports/lighthouse_current_site_mobile__2026-10-28.md`: **performance 85, acessibilidade 92, boas práticas 92, SEO 91**. O que puxa para baixo, e o site novo precisa evitar: LCP de 3,9 s (a imagem de fundo do hero vem do Unsplash, e o `logo_1.png` tem 246 KB sem tamanho declarado), CSS e Google Fonts bloqueando a renderização (cerca de 830 ms), contraste de cor insuficiente, imagem sem tamanho responsivo, erro no console e falta de meta description.

**Passos:**
- [x] Conferir o clone, criar localmente a `legacy/curriculo-2024` e a `main` nova (primeira sessão, 2026-10-28).
- [x] Criar os arquivos de controle, o `CLAUDE.md`, o `.gitignore` e os documentos do briefing na `main` nova (primeira sessão, 2026-10-28).
- [x] Registrar o Lighthouse do site atual (celular) como referência (2026-10-28, `27926b3`).
- [x] Renomear a `main` remota para `legacy/curriculo-2024` e apontar a `legacy/curriculo-2024` local para a `origin/legacy/curriculo-2024` (2026-10-28).
- [x] Push da `main` nova, sem `--force` (2026-10-28, até `9df357d`).
- [x] Trocar a branch padrão para a `main` (2026-10-28).
- [x] Apagar a `release/landing_page` no GitHub e localmente (2026-10-28; o `544918c` continua na `legacy/curriculo-2024`).
- [x] Renomear o repositório para `guizani-data-it` com a descrição nova e rodar `git remote set-url origin https://github.com/dguizani/guizani-data-it.git` (2026-10-28).
- [x] Ligar o "Enforce HTTPS" (2026-10-28; `https_enforced: true`, Pages refeito com `status: built`).
- [ ] Fazer o C-004 e o C-006 (usuário, na mesma visita ao Registro.br) e conferir depois do atendimento (`nslookup`, `pages/health` com `is_valid: true`, certificado e "Enforce HTTPS").
- [x] Conferir que o site no ar não mudou (2026-10-28: `index.html` e `style.css` no ar idênticos aos da `release/guizani-data-it`, `https://` com 200 e `http://` com 301 para `https://`).
- [ ] Validar o T-001.

**Commits:**
- `e5cd4df` chore: `.gitignore` (dependências, build, `.astro/`, `logs/`, `references/`, `.env`).
- `3698732` docs: `docs/control_files.md` e `docs/git_rules.md`, copiados do prompt.
- `ab8937a` docs: `docs/brief.md` e `docs/approved_content.md`, copiados do prompt.
- `312f659` docs: `CLAUDE.md`.
- `7c8710d` docs: pastas de controle e `docs/session.md`.
- `27926b3` docs: Lighthouse do site atual em `docs/reports/`.

**Resultado:**
