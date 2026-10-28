# Onde paramos

- **Última sessão:** 2026-10-28 (primeira sessão).
- **Git:** branch `main` (nova, local, sem branch remota; criada a partir da `origin/release/guizani-data-it` em `38a8a39`), com os commits da primeira sessão ainda sem push. A `legacy/curriculo-2024` local é a `main` antiga (`c9fc9b5`) e ainda rastreia a `origin/main`. Nada mudou no GitHub.
- **Controles:** roadmap com M-001 a M-009 no `pending.md`; nenhum teste; chamados C-001 a C-006 no `to_open.md`; P-001 aberta.
- **Recursos transitórios:** nenhum.

## O que foi feito nesta sessão

- Clone conferido: tudo como o prompt descreve, exceto que a `main` antiga e a `release/guizani-data-it` compartilham o commit raiz `af964a6` (registrado no `docs/brief.md` e no M-001).
- `main` local renomeada para `legacy/curriculo-2024`; `main` nova criada a partir da `release/guizani-data-it`.
- Criados `CLAUDE.md`, `.gitignore`, `docs/control_files.md`, `docs/git_rules.md`, `docs/brief.md`, `docs/approved_content.md` e as quatro pastas de controle.

## Foco atual

Debate do M-001 (linha de base), antes de qualquer mudança no GitHub.

## Próximos passos (em ordem)

1. Debater as ideias do M-001 e registrar as decisões (M-001).
2. Executar os passos do M-001 no GitHub, cada um com autorização (M-001).
3. Responder a P-001 (endereço do e-mail).
4. Debater o M-002 (versão do Node, Docker, Lighthouse local) (M-002).

## Lembretes

- Nunca fazer commit na `release/guizani-data-it`: o build `legacy` publica qualquer arquivo dela até o lançamento.
- A `main` nova nunca pode ir por cima da antiga com `push --force`: a antiga é renomeada no GitHub antes.
- Commits sem `Co-Authored-By` nem menção à IA (`docs/git_rules.md`), mesmo que a ferramenta sugira o contrário.
- O `gh` está autenticado na conta `dguizani` e lê o repositório `dguizani/curriculo_html`.
- Na máquina do usuário não há Node: tudo pelo Docker (`docs/tests/README.md`).
