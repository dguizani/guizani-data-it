# Testes

Roteiro de teste de cada alteração testável do Portfólio DataIT: o que rodar, onde rodar, o que esperar e o resultado de cada execução. É o que libera uma melhoria para o `roadmap/done.md`.

## Como usar

- Estados: `pending.md` (pendentes, com a **Execução conjunta** no topo) e `done.md` (concluídos).
- Cada item é uma seção `### T-NNN · <título>` com: **Roadmap** (o `M-NNN` que valida), **Commits**, **O que mudou** (resumo, onde aparece e cenários), **Passos** (ação e resultado esperado) e **Resultado** (data e hora de cada execução, inclusive as falhas).
- Toda alteração testável ganha um `T-NNN` no `pending.md`, e a Execução conjunta é atualizada junto.
- Quando houver testes automatizados (a partir do M-002: lint, Prettier, `astro check`, build e Lighthouse CI), o agente roda **todos** e informa o resultado; ao usuário, entrega só o que mudou e onde ver. Relatos do usuário são classificados como bug novo, comportamento esperado ou bug conhecido (com o `M-NNN`).
- Passos só são marcados `[x]` com a confirmação do usuário. Passo que falha registra o erro no Resultado, e a seção fica no `pending.md` até a correção.
- **Onde ficam as saídas:**
  - `logs/` (fora do git): a saída crua de cada execução, em `logs/<comando>__AAAA-MM-DD.log`, e os relatórios do Lighthouse em `logs/lighthouse/`;
  - `docs/reports/` (no git, criada quando for usada pela primeira vez): saídas grandes que vale guardar, convertidas para Markdown por script, com um `README.md` que lista cada execução (ex.: o resumo do Lighthouse do site atual, a referência do M-001). Segue a regra **Saídas grandes** de `docs/control_files.md`.
- Próximo número: o maior `T-NNN` encontrado por `grep -rn "### T-" docs/tests/` + 1.

## Pré-requisitos comuns

O projeto não usa Node instalado no sistema: todos os comandos rodam num contêiner Docker com a imagem oficial `node`, na versão do `.nvmrc`. Os comandos abaixo são para o PowerShell, na raiz do projeto; eles valem a partir do M-002, que cria o projeto Astro, e são conferidos lá.

**Ambiente:**

- Docker Desktop instalado e rodando (`docker version` responde com o cliente e o servidor).
- A versão do Node vem do `.nvmrc`:

  ```powershell
  $node = "node:$((Get-Content .nvmrc).Trim())"
  ```

- As dependências ficam num volume do Docker (`guizani-node-modules`), e não na pasta do projeto, porque no Windows o `node_modules` dentro de uma pasta montada é muito lento. Para reiniciar o ambiente do zero: `docker volume rm guizani-node-modules` e rodar a instalação de novo.

**Comandos** (cada um cria um contêiner temporário, que é apagado no fim, por causa do `--rm`):

| Para | Comando |
|---|---|
| Instalar as dependências | `docker run --rm -v "${PWD}:/app" -v guizani-node-modules:/app/node_modules -w /app $node npm ci` |
| Servidor de desenvolvimento | `docker run --rm -it -v "${PWD}:/app" -v guizani-node-modules:/app/node_modules -w /app -p 4321:4321 $node npm run dev -- --host 0.0.0.0` e abrir <http://localhost:4321> |
| Lint | `docker run --rm -v "${PWD}:/app" -v guizani-node-modules:/app/node_modules -w /app $node npm run lint` |
| Formatação (conferir) | `docker run --rm -v "${PWD}:/app" -v guizani-node-modules:/app/node_modules -w /app $node npm run format:check` |
| Tipos e schema | `docker run --rm -v "${PWD}:/app" -v guizani-node-modules:/app/node_modules -w /app $node npx astro check` |
| Build | `docker run --rm -v "${PWD}:/app" -v guizani-node-modules:/app/node_modules -w /app $node npm run build` |
| Lighthouse CI | definido no M-002 (o Lighthouse precisa de um Chrome, que a imagem `node` não tem) |

Para guardar a saída de um comando em `logs/`, sempre em UTF-8: `<comando> 2>&1 | Out-File -Encoding utf8 logs/<comando>__AAAA-MM-DD.log`.

**Conferir o site:**

- **No celular:** com o servidor de desenvolvimento rodando, abrir no celular, na mesma rede Wi-Fi, `http://<IP do computador>:4321` (o IP aparece no `ipconfig`, em "Endereço IPv4"). Sem o celular à mão, usar o modo de dispositivo do Chrome (F12 → ícone de celular).
- **Nos dois temas:** pelo botão de tema do site e, para testar o tema do sistema, no Chrome: F12 → menu ⋮ → More tools → Rendering → "Emulate CSS media feature prefers-color-scheme". Para voltar ao tema do sistema depois de usar o botão, limpar o armazenamento do site (F12 → Application → Storage → Clear site data).
- **Nos dois idiomas:** `/` (português) e `/en/` (inglês), pelo seletor de idioma, conferindo que nenhum texto aparece no idioma errado.
