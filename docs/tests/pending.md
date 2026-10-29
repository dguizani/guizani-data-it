# Testes · pendentes

## Execução conjunta

1. Conferência do repositório no GitHub e do site no ar → T-001
2. Conferência da verificação do domínio, depois do C-004 → T-001

### T-001 · Linha de base do repositório

**Roadmap:** M-001.

**Commits:** `e5cd4df` a `27926b3` (documentação); as mudanças no GitHub não geram commit.

**O que mudou:** o repositório passou a se chamar `dguizani/guizani-data-it`, com a descrição nova; a branch padrão é a `main` nova; a `main` antiga virou `legacy/curriculo-2024`; a `release/landing_page` foi apagada; o "Enforce HTTPS" foi ligado. O site no ar continua o mesmo, publicado pela `release/guizani-data-it`. Onde ver: <https://github.com/dguizani/guizani-data-it> (página inicial, Branches, Settings → Pages) e <https://datait.guizani.com.br>.

**Passos:**
- [ ] Abrir <https://github.com/dguizani/guizani-data-it>: o nome e a descrição nova aparecem, e a branch mostrada é a `main`, com o `CLAUDE.md` e a pasta `docs/`.
- [ ] Abrir a lista de branches: aparecem só `main` (padrão), `legacy/curriculo-2024` e `release/guizani-data-it`.
- [ ] Abrir o endereço antigo <https://github.com/dguizani/curriculo_html>: redireciona para o repositório novo.
- [ ] Settings → Pages: origem "Deploy from a branch", `release/guizani-data-it`, `/ (root)`; domínio `datait.guizani.com.br`; "Enforce HTTPS" marcado.
- [ ] Abrir <https://datait.guizani.com.br> no celular: a landing page de sempre, com o cadeado; `http://datait.guizani.com.br` também leva para o `https://`.
- [ ] Depois do C-004: na página Settings → Pages da conta, `guizani.com.br` aparece como verificado, e `gh api repos/dguizani/guizani-data-it/pages --jq .protected_domain_state` responde `verified`.

**Resultado:**
- 2026-10-28 21:15, pelo agente: pela API e por `curl`, nome, descrição, branch padrão, lista de branches (`legacy/curriculo-2024`, `main`, `release/guizani-data-it`), origem do Pages, `https_enforced: true` e site no ar idêntico à `release/guizani-data-it` conferem. Falta a confirmação do usuário e o C-004.
