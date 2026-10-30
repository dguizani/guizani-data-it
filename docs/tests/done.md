# Testes · concluídos

### T-011 · Formação e certificações

**Roadmap:** M-012.

**Commits:** `0a72f74`, `1828e7e`.

**O que mudou:** seção nova "Formação e certificações" ("Education and certifications" em `/en/`), entre as Skills e o Laboratório, fora do menu. Uma linha para o Tecnólogo em Ciência de Dados (UNINTER, 2024 – 2026) e outra para a PCEP (Python Institute, jan. 2025), com o link "Verificar" para a verificação oficial da OpenEDG, em outra aba.

**Passos:**
- [x] Rodada completa e Lighthouse. Esperado: tudo verde, `pass 10, fail 0`, Lighthouse 90 ou mais.
- [x] Desktop e celular, nos dois idiomas e nos dois temas. Esperado: a seção entre as Skills e o Laboratório, com os textos aprovados, sem nada no idioma errado.
- [x] Link "Verificar". Esperado: abre em outra aba a página da OpenEDG com a certificação válida.

**Resultado:**
- 2026-10-29: rodada e Lighthouse verdes pelo agente (100 nas quatro categorias; logs em `logs/m012-checks__2026-10-29.log` e `logs/m012-lighthouse__2026-10-29.log`); textos, link e nome acessível conferidos com o `puppeteer-core`. Publicado no push de 2026-10-29 (Deploy `40977789519`); validado pelo usuário em 2026-10-29.

### T-010 · Botão flutuante para voltar ao topo

**Roadmap:** M-014.

**Commits:** `ab36e71`.

**O que mudou:** um botão com uma seta para cima, no canto inferior direito, que aparece quando o hero sai da tela e leva de volta ao início da página com rolagem suave (sem animação para quem pede menos movimento). O nome para leitores de tela e a dica ao passar o mouse são "Voltar ao topo" / "Back to top". Aparece em `/` e em `/en/`.

**Passos:**
- [x] Rodada completa e Lighthouse. Esperado: tudo verde, `pass 10, fail 0`, Lighthouse 90 ou mais.
- [x] Desktop, nos dois idiomas e nos dois temas: no topo, sem botão; ao rolar além do hero, o botão aparece com um fade; o clique volta ao topo.
- [x] Celular (ou o modo de dispositivo do Chrome): o mesmo comportamento, com o botão sem sair da tela.
- [x] Teclado: com Tab, o botão recebe o foco visível quando está aparecendo, e o Enter volta ao topo. No topo, escondido, ele não recebe foco.
- [x] Mouse parado sobre o botão. Esperado: a dica "Voltar ao topo" ("Back to top" em `/en/`).

**Resultado:**
- 2026-10-29: rodada e Lighthouse verdes pelo agente (100 nas quatro categorias, logs em `logs/m014-checks__2026-10-29.log` e `logs/m014-lighthouse__2026-10-29.log`); comportamento conferido com o `puppeteer-core` em `logs/m014/`. Validado pelo usuário em 2026-10-29.

### T-009 · Projetos principais em uma coluna

**Roadmap:** M-013.

**Commits:** `477e028`.

**O que mudou:** os cards dos projetos principais ficam um abaixo do outro em qualquer tela. Quando o card tem 48rem ou mais (telas a partir de cerca de 870 px), ele se divide em duas colunas: à esquerda, o cliente, o título e o período em cima, e a stack embaixo; à direita, o problema e o papel. Abaixo disso, a ordem é a de antes: topo, problema, papel, stack. Aparece na seção "Projetos principais" de `/` e de `/en/`.

**Passos:**
- [x] Rodada completa (lint, Prettier, `astro check`, `npm test`). Esperado: tudo verde, `pass 10, fail 0`.
- [x] Desktop, nos dois idiomas e nos dois temas. Esperado: os cinco cards um abaixo do outro, cada um em duas colunas, como descrito acima.
- [x] Tablet e celular (modo de dispositivo do Chrome, F12). Esperado: cards empilhados, na ordem topo, problema, papel, stack; nada cortado nem com rolagem lateral.
- [x] Redimensionar a janela do desktop devagar. Esperado: a troca entre os dois layouts acontece sem sobreposição nem salto estranho.

**Resultado:**
- 2026-10-29: rodada verde pelo agente (log em `logs/m013-checks__2026-10-29.log`); capturas conferidas pelo agente em `logs/m013/`. Validado pelo usuário em 2026-10-29.

### T-008 · Ordem dos projetos e espaço no copyright

**Roadmap:** M-011.

**Commits:** `ca3e4db`.

**O que mudou:** os projetos (cards principais, participações pontuais e linha do tempo) passam a seguir a data inicial: os em andamento primeiro e, depois, do início mais recente para o mais antigo. Uma data só com o ano conta como janeiro (ex.: Vita, `2025`, fica depois de fev. 2025). O rodapé mostra "© 2026 Guizani Data IT", com o espaço. Aparece em `/` e em `/en/`.

**Passos:**
- [x] Rodada completa no contêiner (lint, Prettier, `astro check`, `npm test`, build). Esperado: tudo verde, `pass 10, fail 0`.
- [x] Linha do tempo, nos dois idiomas. Esperado: TruckPad (em andamento), JSL (2026), JSL (nov. 2025), Skystone (jul. 2025), Academia Foguete (mai. 2025), Unimed RPA (fev. 2025), Vita (2025), Integral Médica (2024 – 2026), Unimed data warehouse (2022 – 2025).
- [x] Cards dos projetos principais, nos dois idiomas. Esperado: BI da TruckPad, pagamento de notas, ERP Omie, CDP e data warehouse, nessa ordem.
- [x] Rodapé, nos dois idiomas. Esperado: "© 2026 Guizani Data IT · CNPJ ..." (em inglês, "CNPJ (Brazilian company ID) ...").

**Resultado:**
- 2026-10-29: rodada completa verde pelo agente (log em `logs/m011-full-run__2026-10-29.log`); ordem e rodapé conferidos no `dist/` pelo agente. Validado pelo usuário em 2026-10-29.

### T-007 · Publicação antecipada do site novo

**Roadmap:** M-010.

**Commits:** `b52b99f`.

**O que mudou:** o <https://datait.guizani.com.br> passa a mostrar o site novo (em português em `/` e em inglês em `/en/`), publicado pelo workflow `Deploy` a cada push na `main`. A landing page antiga sai do ar, mas a `release/guizani-data-it` continua existindo para a volta.

**Passos:**
- [x] Settings → Pages: origem "GitHub Actions", domínio `datait.guizani.com.br` e "Enforce HTTPS" marcado.
- [x] Actions: o workflow `Deploy` do push na `main` está verde (CI, build e deploy).
- [x] Abrir <https://datait.guizani.com.br> e <https://datait.guizani.com.br/en/> no celular: o site novo, com o cadeado; `http://datait.guizani.com.br` leva para o `https://`.

**Resultado:**
- 2026-10-29, pelo agente: origem do Pages trocada para "GitHub Actions" pela API (`build_type: workflow`, `cname: datait.guizani.com.br`, `https_enforced: true`, certificado `approved`). Push do `b52b99f`: CI `40814613768` e Deploy `40814613861` verdes (checks, build e deploy). Por `curl`: `/` e `/en/` respondem 200 com o site novo (`lang="pt-BR"` e `lang="en"`), e o `http://` responde 301 para o `https://`. Falta a confirmação do usuário.
- 2026-10-29, pelo usuário: os três passos confirmados.

### T-006 · Idiomas

**Roadmap:** M-006.

**Commits:** `5b42355`, `b6f429e` e `b9d0232`.

**O que mudou:** o site tem a versão em inglês em `/en/`, com o mesmo conteúdo, e um seletor no cabeçalho ("EN" na página em português e "PT" na em inglês) que leva ao início da outra versão. As duas páginas têm os links `hreflang` para os buscadores. Onde ver: `docker compose up dev`, <http://localhost:4321> e <http://localhost:4321/en/>.

**Passos:**
- [x] O seletor aparece no cabeçalho, no computador e no celular, e leva de uma versão para a outra.
- [x] Na página em inglês, nenhum texto aparece em português (inclusive o WhatsApp, que abre com a mensagem em inglês).
- [x] Rodada completa no contêiner e Lighthouse com 90 ou mais em `/` e em `/en/`.

**Resultado:**
- 2026-10-29, pelo usuário: todos os passos confirmados.
- 2026-10-29 00:35, pelo agente, no contêiner: lint, Prettier, `astro check` (0/0/0), `npm test` (9 ok) e build (2 páginas) passaram; Lighthouse com 100 nas quatro categorias em `/` e em `/en/`. No HTML gerado, `lang="pt-BR"` e `lang="en"`, os três links `hreflang` (`pt-BR`, `en` e `x-default`) e o seletor com `href`, `hreflang` e o nome para os leitores de tela certos nas duas páginas. A primeira rodada do lint acusou `no-deprecated` no `name` do seletor, corrigido antes do commit. Falta: a conferência do usuário.
- 2026-10-29, pelo usuário: o servidor de desenvolvimento mostrou `Cannot read properties of undefined (reading 'switchLabel')` (bug novo: o servidor não recarregava o schema). Corrigido em `2d602bc`, com o teste `d338cfe` (10 testes, 10 ok; o teste novo falha sem a correção). Servidor reiniciado; `/` e `/en/` respondem 200.
- 2026-10-29, pelo agente: CI `40813664533` (push do `e3a07dc`) verde, com 10 testes ok e Lighthouse 100 nas quatro categorias em `/` e `/en/`.

### T-005 · Seções do site

**Roadmap:** M-005.

**Commits:** `dae8e40`, `4dbc651`, `a258ce4`, `095f0c9` e `01cf5d2`.

**O que mudou:** a página em `/` passou a ter o site completo em português: cabeçalho (com links para Serviços, Projetos e Contato nas telas largas), hero, Sobre com a foto, Serviços, Projetos principais, Participação pontual, Linha do tempo, Skills, Laboratório, Contato e rodapé, com todos os textos vindos do `site.yaml`. O link do currículo em PDF ainda não aparece (C-002). Onde ver: `docker compose up dev` e <http://localhost:4321>, no computador e no celular.

**Passos:**
- [x] No celular, em até 30 segundos, dá para saber o que a Guizani Data IT faz, as principais tecnologias e como entrar em contato.
- [x] Os 5 projetos principais aparecem com o cliente "via ITIX", o problema, o papel e a stack; as 2 participações pontuais e as 9 entradas da linha do tempo aparecem do mais recente para o mais antigo.
- [x] Os botões de contato abrem o e-mail, o WhatsApp com a mensagem pronta e o LinkedIn; os links externos abrem em outra aba.
- [x] Revisão dos textos novos da interface (descrição da foto, "pular para o conteúdo", "(abre em outra aba)", "Currículo em PDF", "CNPJ (Brazilian company ID)").
- [x] Rodada completa no contêiner e Lighthouse com 90 ou mais em performance, acessibilidade e SEO.

**Resultado:**
- 2026-10-29, pelo usuário: todos os passos confirmados.
- 2026-10-29 00:20, pelo agente, no contêiner: lint, Prettier, `astro check` (0/0/0), `npm test` (9 ok) e build passaram; Lighthouse com performance 100, acessibilidade 100, boas práticas 100 e SEO 100 na página completa. Capturas da página inteira em `logs/m005/` (celular no tema escuro e desktop no claro, cortadas em partes): todas as seções na ordem aprovada. A primeira captura mostrou o nome do cliente grudado no "via" ("TruckPadvia ITIX", "via ITIX· BI"), corrigido antes do commit. Com o `isClientPublic` da Unimed desligado numa cópia temporária, o nome sumiu do HTML e o setor apareceu nos 3 lugares. Falta: a conferência do usuário.
- 2026-10-29, pelo usuário: a grade de duas colunas dos Projetos principais deixava espaços verticais desiguais entre os cards (o maior embaixo do card da Vita). Corrigido em `d40c558`, com duas colunas soltas, como o usuário escolheu; na captura do desktop, o espaço entre os cards ficou igual nas duas colunas.

### T-004 · Identidade visual

**Roadmap:** M-004.

**Commits:** `98e6776`, `59f1d6d`, `27973ea`, `3729bbb` e `abf7aee`.

**O que mudou:** a página provisória mostra a identidade nova: o logo "G de circuito" com GUIZANI / DATA IT, o botão de tema (sol no escuro, lua no claro), o fundo de circuito com o texto binário "data" e os botões do hero (amarelo e contorno azul), com Inter e JetBrains Mono. O tema segue o sistema na primeira visita e guarda a escolha do botão. Onde ver: `docker compose up dev` e <http://localhost:4321>, no computador e no celular (`docs/tests/README.md`, **Conferir o site**).

**Passos:**
- [x] Na primeira visita, a página abre no tema do sistema (claro ou escuro), sem piscar no tema errado.
- [x] O botão alterna entre claro e escuro; ao recarregar a página, a escolha continua.
- [x] No celular, o logo, o botão de tema e os dois botões do hero cabem sem quebrar, e o fundo de circuito não atrapalha a leitura.
- [x] Rodada completa no contêiner e Lighthouse com 90 ou mais em performance, acessibilidade e SEO.

**Resultado:**
- 2026-10-29, pelo usuário: todos os passos confirmados.
- 2026-10-29 00:00, pelo agente, no contêiner: lint, Prettier, `astro check` (0/0/0), `npm test` (9 ok) e build passaram a partir de uma pasta limpa; Lighthouse com performance 100, acessibilidade 100, boas práticas 100 e SEO 100. Capturas no Chromium em `logs/m004/` (390 px e 1280 px, nos dois temas): logo, botão de tema com o ícone certo em cada tema, fundo de circuito e botões legíveis. A primeira captura mostrou o texto binário cortado (o `pattern` começava antes do retângulo) e o binário poluindo o texto no desktop; os dois foram corrigidos antes do commit. Falta: a conferência do usuário.
- 2026-10-29, pelo usuário: "gostei muito do resultado" (aprovou a identidade na página provisória). CI `40810456521` (push do `3c9816a`) verde, com `npm test` 9 ok e Lighthouse 100 nas quatro categorias.

### T-003 · Arquivo de dados e schema

**Roadmap:** M-003.

**Commits:** `7dbe943`, `1315828` e `1fc754a`.

**O que mudou:** todo o conteúdo aprovado está em `src/data/site.yaml`, com a versão em inglês para revisar, validado pelo schema de `src/data/schema.ts` no `astro check`, nos testes e no build. Onde ver: o próprio `src/data/site.yaml` no VS Code (com a extensão YAML, o autocomplete e a descrição de cada campo ao passar o mouse); o guia **Editar o conteúdo** do `README.md`. A página ainda não mostra o conteúdo (M-005).

**Passos:**
- [x] Rodada completa no contêiner, agora com o `npm test`: 9 testes, `fail 0`.
- [x] O build quebra com o caminho do campo quando falta uma tradução, e com a linha e a coluna quando o YAML tem erro de sintaxe.
- [x] No VS Code, com a extensão YAML da Red Hat, o `site.yaml` mostra a descrição dos campos e acusa um campo com nome errado.
- [x] Revisão da versão em inglês de todo o conteúdo.

**Resultado:**
- 2026-10-29, pelo usuário: todos os passos confirmados.
- 2026-10-28 23:05, pelo agente, no contêiner: lint, Prettier, `astro check` (0/0/0), `npm test` (9 testes, 9 ok) e build passaram. Com o `en` de `projects[0].title` apagado, o build saiu com 1 e a mensagem `projects.0.title.en: Required`; com um erro de sintaxe na linha 9, saiu com 1 e `Nested mappings are not allowed in compact mappings at line 9, column 11`. O `site.yaml` foi restaurado depois (conferido com `cmp`). O JSON Schema gerado tem 185 descrições. Falta: a conferência no VS Code e a revisão do inglês (usuário).
- 2026-10-28, pelo usuário: versão em inglês aprovada como está. Depois da P-002, o Laboratório ficou com 4 itens (`guizani-supermarket` incluído, `python-financeiro-pessoal` fora); a rodada no contêiner continuou passando (`npm test` 9 ok, build `Complete!`).
- 2026-10-28 23:15, pelo agente: o CI `40804842940` (push do `76ea40f`) falhou no lint (`Unsafe member access .data on a type that cannot be resolved`), porque a `.astro/` não existe num checkout limpo. Reproduzido no contêiner apagando a `.astro/` (7 erros). Corrigido em `63c3a10`; a rodada completa a partir de uma pasta limpa passou (lint, Prettier, `astro check` 0/0/0, `npm test` 9 ok, build e Lighthouse 100 nas quatro categorias). Falta o CI verde depois do push.

### T-002 · Estrutura inicial do projeto

**Roadmap:** M-002.

**Commits:** `9666049` a `9e5b3a7`.

**O que mudou:** a `main` passou a ser um projeto Astro 7 com TypeScript `strictest`, rodando só em Docker (`compose.yaml`, serviços `dev` e `lighthouse`), com ESLint, Prettier, `astro check`, a verificação do Lighthouse 13 (`scripts/lighthouse-check.ts`), o CI e o deploy manual no GitHub Actions e o Dependabot. A página é provisória. Onde ver: os comandos do `README.md`; <http://localhost:4321> com o servidor de desenvolvimento; a aba Actions do repositório, depois do push.

**Passos:**
- [x] Rodada completa no contêiner: `npm ci` com `found 0 vulnerabilities`; lint sem erros; `All matched files use Prettier code style!`; `astro check` com `0 errors`, `0 warnings`, `0 hints`; build `Complete!`; Lighthouse com `ok` em todas as categorias.
- [x] A verificação do Lighthouse falha (`FAIL` e saída 1) quando uma nota fica abaixo do mínimo.
- [x] `docker compose up dev` e <http://localhost:4321> mostra a página provisória "Guizani Data IT"; ao mudar e salvar o `src/pages/index.astro`, a página recarrega sozinha.
- [x] CI no GitHub verde no push da `main`, com o relatório do Lighthouse anexado como artefato (`lighthouse-reports`).

**Resultado:**
- 2026-10-29, pelo usuário: todos os passos confirmados.
- 2026-10-28 22:30, pelo agente, no contêiner: `npm ci` com 0 vulnerabilidades; lint, Prettier, `astro check` (0/0/0) e build passaram; Lighthouse na página provisória com performance 100, acessibilidade 100, boas práticas 100 e SEO 100. Com o mínimo de performance trocado para 101 numa cópia fora do git, a verificação deu `FAIL` e saída 1. `docker compose up dev` respondeu 200 em <http://localhost:4321> com o título "Guizani Data IT". A conferência do `.nvmrc` contra o `Dockerfile` deu `26.13.0` nos dois. Falta: a recarga ao salvar (confirmação do usuário) e o CI no GitHub (depois do push).
- 2026-10-28, pelo usuário: com o `docker compose up dev`, a página recarregou sozinha ao salvar uma mudança no `src/pages/index.astro` (mudança desfeita depois).
- 2026-10-28 22:41, pelo agente, no GitHub: CI `40801729242` (push do `c816a7a`) verde em 1min9s, com todos os passos ok: versão do Node igual no `.nvmrc` e no `Dockerfile`, `npm ci`, lint, Prettier, `astro check`, build e Lighthouse (performance 100, acessibilidade 100, boas práticas 100, SEO 100), e o artefato `lighthouse-reports` (394 KB) anexado. As 6 execuções iniciais do Dependabot terminaram sem abrir pull request (dependências em dia). Aviso do GitHub: o `ubuntu-latest` passa a ser o Ubuntu 26 a partir de 2026-10-19.

### T-001 · Linha de base do repositório

**Roadmap:** M-001.

**Commits:** `e5cd4df` a `27926b3` (documentação); as mudanças no GitHub não geram commit.

**O que mudou:** o repositório passou a se chamar `dguizani/guizani-data-it`, com a descrição nova; a branch padrão é a `main` nova; a `main` antiga virou `legacy/curriculo-2024`; a `release/landing_page` foi apagada; o "Enforce HTTPS" foi ligado. O site no ar continua o mesmo, publicado pela `release/guizani-data-it`. Onde ver: <https://github.com/dguizani/guizani-data-it> (página inicial, Branches, Settings → Pages) e <https://datait.guizani.com.br>.

**Passos:**
- [x] Abrir <https://github.com/dguizani/guizani-data-it>: o nome e a descrição nova aparecem, e a branch mostrada é a `main`, com o `CLAUDE.md` e a pasta `docs/`.
- [x] Abrir a lista de branches: aparecem só `main` (padrão), `legacy/curriculo-2024` e `release/guizani-data-it`.
- [x] Abrir o endereço antigo <https://github.com/dguizani/curriculo_html>: redireciona para o repositório novo.
- [x] Settings → Pages: origem "Deploy from a branch", `release/guizani-data-it`, `/ (root)`; domínio `datait.guizani.com.br`; "Enforce HTTPS" marcado.
- [x] Abrir <https://datait.guizani.com.br> no celular: a landing page de sempre, com o cadeado; `http://datait.guizani.com.br` também leva para o `https://`.
- [x] Depois do C-004: na página Settings → Pages da conta, `guizani.com.br` aparece como verificado, e `gh api repos/dguizani/guizani-data-it/pages --jq .protected_domain_state` responde `verified`.
- [x] Depois do C-006: Settings → Pages do repositório mostra "DNS check successful", sem o aviso de registro A, e o site continua abrindo com o cadeado.

**Resultado:**
- 2026-10-29, pelo usuário: todos os passos confirmados.
- 2026-10-28 21:15, pelo agente: pela API e por `curl`, nome, descrição, branch padrão, lista de branches (`legacy/curriculo-2024`, `main`, `release/guizani-data-it`), origem do Pages, `https_enforced: true` e site no ar idêntico à `release/guizani-data-it` conferem. Falta a confirmação do usuário e o C-004.
- 2026-10-28 22:45, pelo agente: depois do C-004, `protected_domain_state` está `verified`. O CNAME do C-006 aparece no `b.sec.dns.br` (TTL de 1 hora) e no `8.8.8.8`, mas a checagem de DNS do Pages (`pages/health`) ainda responde `InvalidARecordError`; falta o "Check again" no GitHub.
- 2026-10-29, pelo agente: `pages/health` responde `is_valid: true` e `is_cname_to_github_user_domain: true`; `protected_domain_state: verified`, `https_enforced: true`, certificado aprovado. Falta a confirmação do usuário nos passos.
