# Chamados

Rascunho das ações que o projeto não pode executar sozinho. Neste projeto, os chamados são **ações do próprio usuário em serviços externos**: Registro.br (DNS), ImprovMX (e-mail), Cloudflare (Web Analytics) e as configurações do GitHub (repositório, Pages, domínio). Também entram as entregas de arquivos que só o usuário tem (currículos em PDF, foto, banner).

## Como usar

- Estados: `to_open.md` (a fazer), `open.md` (em andamento pelo usuário) e `done.md` (concluídos, com a data).
- Cada item é uma seção `### C-NNN · <título>` com: **Roadmap**, **Para**, **Histórico** (opcional), **Referência**, **Título**, **Descrição**, **Sugestão de solução** e **Casos de teste**.
- Como o usuário está aprendendo infraestrutura, a **Sugestão de solução** é sempre um passo a passo: onde clicar, que valor copiar, quanto tempo esperar. Ela continua sendo só uma sugestão; se a tela do serviço tiver mudado, vale o que o serviço mostrar.
- A ferramenta é o próprio arquivo: a **Referência** fica vazia, e o chamado vai para o `open.md` quando o usuário começa a executá-lo. Se o usuário pedir, os chamados podem virar GitHub Issues, e a Referência passa a ser o link da issue.
- O chamado vai para o `done.md` depois que os casos de teste passam; o `M-NNN` ligado tem os passos "fazer o C-NNN" e "conferir depois".
- Nunca registrar senhas, tokens secretos ou códigos de recuperação nos chamados. O token do Cloudflare Web Analytics não é secreto (aparece no HTML do site) e pode ser registrado.
- Próximo número: o maior `C-NNN` encontrado por `grep -rn "### C-" docs/tickets/` + 1.
