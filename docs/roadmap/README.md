# Roadmap

Controle das etapas de construção do Portfólio DataIT, com todas as melhorias, atuais e futuras. É a fonte do "o que vamos fazer e por quê". Nenhum código é escrito sem um `M-NNN` registrado antes.

## Como usar

- Estados: `pending.md` (pendentes, na ordem de execução), `in_progress.md` (em andamento) e `done.md` (concluídos ou cancelados, com o motivo no Resultado).
- Cada item é uma seção `### M-NNN · <título>` com: **Objetivo** (com a origem e a data), **Depende de**, **Contexto / Como é hoje / Achados / Ideias para o debate** (opcionais), **Decisões** (numeradas, com a data e "aprovado pelo usuário"; decisão substituída fica riscada com a nova ao lado), **Passos** (`[ ]`/`[x]`), **Correções / Ajustes na implementação** (opcionais), **Commits** e **Resultado**.
- Ideia nova ou mudança de escopo cria (ou altera) uma seção no `pending.md` antes de qualquer código. O tema é debatido com o usuário antes de executar, e o resultado vai para Decisões e Passos.
- Ao começar, a seção vai para o `in_progress.md`; cada passo concluído é marcado `[x]` com os commits. O registro dos hashes vai num commit próprio, depois do commit de código (`docs(M-NNN): record the commits of step N`).
- A seção só vai para o `done.md` depois que o `T-NNN` ligado a ela for validado.
- A especificação de cada entrega está em `docs/brief.md` e o texto aprovado do site em `docs/approved_content.md`; as seções do roadmap apontam para eles em vez de copiá-los.
- Próximo número: o maior `M-NNN` encontrado por `grep -rn "### M-" docs/roadmap/` + 1. Números nunca são reaproveitados.
