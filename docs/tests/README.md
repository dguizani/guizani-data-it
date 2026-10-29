# Testes

Roteiro de teste de cada alteração testável do Portfólio DataIT: o que rodar, onde rodar, o que esperar e o resultado de cada execução. É o que libera uma melhoria para o `roadmap/done.md`.

## Como usar

- Estados: `pending.md` (pendentes, com a **Execução conjunta** no topo) e `done.md` (concluídos).
- Cada item é uma seção `### T-NNN · <título>` com: **Roadmap** (o `M-NNN` que valida), **Commits**, **O que mudou** (resumo, onde aparece e cenários), **Passos** (ação e resultado esperado) e **Resultado** (data e hora de cada execução, inclusive as falhas).
- Toda alteração testável ganha um `T-NNN` no `pending.md`, e a Execução conjunta é atualizada junto.
- Quando houver testes automatizados (a partir do M-002: lint, Prettier, `astro check`, build e Lighthouse), o agente roda **todos** e informa o resultado; ao usuário, entrega só o que mudou e onde ver. Relatos do usuário são classificados como bug novo, comportamento esperado ou bug conhecido (com o `M-NNN`).
- Passos só são marcados `[x]` com a confirmação do usuário. Passo que falha registra o erro no Resultado, e a seção fica no `pending.md` até a correção.
- **Onde ficam as saídas:**
  - `logs/` (fora do git): a saída crua de cada execução, em `logs/<comando>__AAAA-MM-DD.log`, e os relatórios do Lighthouse em `logs/lighthouse/`;
  - `docs/reports/` (no git, criada quando for usada pela primeira vez): saídas grandes que vale guardar, convertidas para Markdown por script, com um `README.md` que lista cada execução (ex.: o resumo do Lighthouse do site atual, a referência do M-001). Segue a regra **Saídas grandes** de `docs/control_files.md`.
- Próximo número: o maior `T-NNN` encontrado por `grep -rn "### T-" docs/tests/` + 1.

## Pré-requisitos comuns

O projeto não usa Node instalado no sistema: todos os comandos rodam em contêineres Docker definidos no `compose.yaml` e no `Dockerfile`, com a imagem oficial `node` na versão do `.nvmrc`. Os comandos valem no PowerShell e no Git Bash, na raiz do projeto.

**Ambiente:**

- Docker Desktop instalado e rodando (`docker version` responde com o cliente e o servidor).
- Serviço `dev`: o Node, para instalação, servidor de desenvolvimento, lint, formatação, `astro check`, testes e build. Serviço `lighthouse`: o mesmo Node com o Chromium.
- As dependências ficam no volume `guizani-data-it_node_modules`, e não na pasta do projeto, porque no Windows o `node_modules` dentro de uma pasta montada é muito lento. Para reiniciar o ambiente do zero: `docker compose down -v` e rodar a instalação de novo. Depois de mudar o `Dockerfile` (por exemplo, a versão do Node): `docker compose build`.
- O CI confere que a versão do `FROM` do `Dockerfile` é igual à do `.nvmrc`; quando o Dependabot sobe a imagem, o `.nvmrc` precisa subir no mesmo pull request.

**Comandos** (o `run --rm` cria um contêiner temporário, apagado no fim):

| Para | Comando | Esperado |
|---|---|---|
| Instalar as dependências | `docker compose run --rm dev npm ci` | `found 0 vulnerabilities` |
| Servidor de desenvolvimento | `docker compose up dev` e abrir <http://localhost:4321> (Ctrl+C para parar) | a página abre e recarrega ao salvar um arquivo |
| Lint | `docker compose run --rm dev npm run lint` | nenhuma mensagem de erro |
| Formatação (conferir) | `docker compose run --rm dev npm run format:check` | `All matched files use Prettier code style!` |
| Tipos e schema | `docker compose run --rm dev npm run check` | `0 errors`, `0 warnings`, `0 hints` |
| Testes do schema | `docker compose run --rm dev npm test` | `fail 0` |
| Build | `docker compose run --rm dev npm run build` | `Complete!` |
| Lighthouse (build e verificação) | `docker compose run --rm lighthouse` | cada categoria com `ok` e a pasta dos relatórios |

**Rodada completa** (a mesma sequência do CI), no Git Bash:

```bash
docker compose run --rm dev sh -c "npm ci && npm run lint && npm run format:check && npm run check && npm test" && docker compose run --rm lighthouse
```

**Lighthouse:** o `scripts/lighthouse-check.ts` serve o `dist/` com o `astro preview`, roda o Lighthouse 3 vezes por página no perfil de celular, usa a mediana e barra performance, acessibilidade ou SEO abaixo de 90 (boas práticas só é informada). Os relatórios JSON e HTML de cada execução ficam em `logs/lighthouse/check__<data e hora>/`; o HTML abre no navegador. As notas no contêiner podem diferir um pouco das do CI, porque o Lighthouse simula um celular a partir da velocidade da máquina.

**Logs:** para guardar a saída de um comando em `logs/`, sempre em UTF-8: no PowerShell, `<comando> 2>&1 | Out-File -Encoding utf8 logs/<comando>__AAAA-MM-DD.log`; no Git Bash, `<comando> > logs/<comando>__AAAA-MM-DD.log 2>&1`.

**Conferir o site:**

- **No celular:** com o servidor de desenvolvimento rodando, abrir no celular, na mesma rede Wi-Fi, `http://<IP do computador>:4321` (o IP aparece no `ipconfig`, em "Endereço IPv4"). Sem o celular à mão, usar o modo de dispositivo do Chrome (F12 → ícone de celular).
- **Nos dois temas:** pelo botão de tema do site e, para testar o tema do sistema, no Chrome: F12 → menu ⋮ → More tools → Rendering → "Emulate CSS media feature prefers-color-scheme". Para voltar ao tema do sistema depois de usar o botão, limpar o armazenamento do site (F12 → Application → Storage → Clear site data).
- **Nos dois idiomas:** `/` (português) e `/en/` (inglês), pelo seletor de idioma, conferindo que nenhum texto aparece no idioma errado.
