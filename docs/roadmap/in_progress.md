# Roadmap · em andamento

### M-001 · Linha de base do repositório

**Objetivo:** arrumar as branches e o repositório no GitHub para a construção do site novo, sem mudar o site no ar. Origem: prompt de construção, 2026-10-28.

**Depende de:** C-004 (verificação do domínio, feita pelo usuário).

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
4. A referência do Lighthouse do site atual vem da API pública do PageSpeed Insights (`strategy=mobile`), com o JSON cru em `logs/` e o resumo em `docs/reports/`.
5. A verificação do domínio (C-004) sai do M-009 e entra neste M-001.
6. O "Enforce HTTPS" é ligado agora, com o certificado já aprovado.

**Passos:**
- [x] Conferir o clone, criar localmente a `legacy/curriculo-2024` e a `main` nova (primeira sessão, 2026-10-28).
- [x] Criar os arquivos de controle, o `CLAUDE.md`, o `.gitignore` e os documentos do briefing na `main` nova (primeira sessão, 2026-10-28).
- [ ] Registrar o Lighthouse do site atual (celular) como referência.
- [ ] Renomear a `main` remota para `legacy/curriculo-2024` (com autorização) e apontar a `legacy/curriculo-2024` local para a `origin/legacy/curriculo-2024`.
- [ ] Push da `main` nova, sem `--force` (com autorização).
- [ ] Trocar a branch padrão para a `main` (com autorização).
- [ ] Apagar a `release/landing_page` no GitHub e localmente (com autorização).
- [ ] Renomear o repositório para `guizani-data-it` com a descrição nova (com autorização) e rodar `git remote set-url origin https://github.com/dguizani/guizani-data-it.git`.
- [ ] Ligar o "Enforce HTTPS" (com autorização).
- [ ] Fazer o C-004 (usuário) e conferir depois do atendimento.
- [ ] Conferir que o site no ar não mudou (mesmo conteúdo, HTTPS, `http://` redirecionando para `https://`).

**Commits:**
- `e5cd4df` chore: `.gitignore` (dependências, build, `.astro/`, `logs/`, `references/`, `.env`).
- `3698732` docs: `docs/control_files.md` e `docs/git_rules.md`, copiados do prompt.
- `ab8937a` docs: `docs/brief.md` e `docs/approved_content.md`, copiados do prompt.
- `312f659` docs: `CLAUDE.md`.
- `7c8710d` docs: pastas de controle e `docs/session.md`.

**Resultado:**
