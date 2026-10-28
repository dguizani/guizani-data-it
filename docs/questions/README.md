# Perguntas

Registro das dúvidas sobre o projeto que dependem de uma decisão de outra pessoa. Neste projeto, **as perguntas são para o usuário** (dono da Guizani Data IT e do conteúdo do site).

## Como usar

- Estados: `open.md` (abertas) e `answered.md` (respondidas).
- Cada item é uma seção `### P-NNN · <título>` com: **Para**, **Origem** (o `M-`/`T-`/`C-NNN` e a data), **Contexto** (com evidências e sem dados sensíveis), **Pergunta**, **Impacto**, **Achados** e **Conferência** (opcionais), **Resposta** e **Status** (`a enviar`, `enviada (data, canal)` ou `respondida`).
- Como o usuário é quem responde, "enviar" é fazer a pergunta na conversa; o Status registra a data.
- Quando a resposta chega, ela é registrada com a data, o efeito vai para o `M-NNN` de origem, e a seção vai para o `answered.md`.
- Pedido de ação em serviço externo não é pergunta: vira chamado (`docs/tickets/`).
- Próximo número: o maior `P-NNN` encontrado por `grep -rn "### P-" docs/questions/` + 1.
