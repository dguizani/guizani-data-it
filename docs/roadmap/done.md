# Roadmap · concluídos

### M-012 · Formação e certificações

**Objetivo:** mostrar no site a escolaridade, os cursos, os diplomas e as certificações, tendo o LinkedIn do usuário como base. Origem: pedido do usuário, 2026-10-29.

**Depende de:** —

**Contexto:** não está nas seções do MVP (`docs/brief.md`, **Escopo**, item 4); é uma mudança de escopo, e o brief é atualizado junto com as decisões.

**Ideias para o debate:**
- Fonte dos dados: o agente não acessa o LinkedIn logado; o usuário cola as seções "Formação acadêmica" e "Licenças e certificados" ou entrega a exportação de dados do LinkedIn (Configurações → Privacidade dos dados → Obter uma cópia dos seus dados). A exportação fica fora do git.
- Onde mostrar: uma seção nova (ex.: entre a linha do tempo e as skills), ou dentro do "Sobre"; decidir também a posição no menu.
- O que entra: só formação e certificações relevantes para engenharia de dados, ou tudo o que está no LinkedIn; se os cursos curtos aparecem ou ficam de fora.
- Como mostrar: instituição, título, período ou data de emissão, e o link de verificação da certificação, quando houver. Sem imagem de diploma nem de certificado (documentos pessoais não entram no repositório).
- Dados: um bloco novo no `site.yaml` (ex.: `education` e `certifications`), com schema no Zod e os textos nos dois idiomas.

**Achados** (2026-10-29, do print da "Formação acadêmica" e do "Sobre" do LinkedIn, e dos certificados em PDF entregues pelo usuário, lidos fora do repositório; dados pessoais e códigos de autenticidade não foram copiados):
- UNINTER Centro Universitário Internacional: Curso Superior de Tecnologia em Ciência de Dados, fev. 2024 – jun. 2026 (Machine Learning, Big Data, Deep Learning, NLP e Visão Computacional). Concluído em 29 maio 2026, colação de grau em 1º jun. 2026, título de Tecnólogo em Ciência de Dados (diploma lido fora do repositório).
- Ufes (Universidade Federal do Espírito Santo): bacharelado em Sistemas de Informação, jun. 2019 – dez. 2023, não concluído (o usuário abandonou o curso).
- PCEP – Certified Entry-Level Python Programmer (PCEP-30-02), Python Institute (OpenEDG), 18 jan. 2025, verificável em <https://verify.openedg.org/?id=vi42.dv6B.cUXq> (link público, já citado no LinkedIn).
- Linguagem de Programação Python – Básico, Fundação Bradesco (Escola Virtual), curso autoinstrucional de 18 h, 20 ago. 2024.
- Monitoria na Ufes (bolsa PaEPE): monitoria especial para a Superintendência de Tecnologia da Informação, out. 2020, 80 h. O nome do arquivo diz "2019-2", mas o certificado diz outubro de 2020.

**Decisões:**
1. Entram a formação na Uninter e a certificação PCEP. O curso de Python básico da Fundação Bradesco e a monitoria ficam de fora. (2026-10-29, aprovado pelo usuário.)
2. Seção própria e curta, "Formação e certificações", entre as Skills e o Laboratório, fora do menu. (2026-10-29, aprovado pelo usuário.)
3. Uma linha por item, no estilo das participações pontuais: formação com o curso, a instituição e o período; certificação com o nome, o emissor, a data e um link "Verificar" para a página oficial. Sem logos nem imagens de diplomas. Os dados ficam no `site.yaml` (ex.: `education` e `certifications`). (2026-10-29, aprovado pelo usuário.)
4. A Ufes (Sistemas de Informação, não concluído) fica de fora. (2026-10-29, aprovado pelo usuário.)
5. Textos aprovados pelo usuário em 2026-10-29, registrados no `docs/approved_content.md`; o período da formação aparece só com os anos. (2026-10-29, aprovado pelo usuário.)
6. A formação na Uninter fica sem link de verificação. A página de validação do diploma digital mostra o nome, a nacionalidade e o CPF parcialmente mascarado, e o ganho de ter o link no site é pequeno; o link não é registrado no repositório. (2026-10-29, aprovado pelo usuário.)

**Passos:**
- [x] Receber do usuário os dados do LinkedIn (2026-10-29).
- [x] Debater onde e como mostrar, e o que entra (decisões 1 a 4); atualizar o `docs/brief.md` (`1828e7e`).
- [x] Textos nos dois idiomas no `docs/approved_content.md`, revisados pelo usuário (`1828e7e`).
- [x] Schema e dados no `site.yaml` (`0a72f74`): listas `education` e `certifications`, título em `ui.sections.education` e o rótulo `ui.education.verify`.
- [x] Componente `Education.astro`, nos dois idiomas e nos dois temas (`0a72f74`). Conferido pelo agente com o `puppeteer-core` (texto da seção, link de verificação e nome acessível do link nos dois idiomas), capturas em `logs/m012-*.png` (fora do git); Lighthouse 100 nas quatro categorias.
- [x] T-011 com a seção nova no celular e no desktop.

**Commits:**
- `0a72f74`: seção de formação e certificações.
- `1828e7e`: textos aprovados e o brief.

**Resultado:** 2026-10-29, T-011 validado pelo usuário: seção "Formação e certificações" entre as Skills e o Laboratório, com o Tecnólogo em Ciência de Dados (UNINTER) e a PCEP com o link de verificação, nos dois idiomas e nos dois temas; publicada no Deploy `40977789519`.

### M-014 · Botão flutuante para voltar ao topo

**Objetivo:** um botão fixo no canto da tela que leva de volta ao início da página. Origem: pedido do usuário, 2026-10-29.

**Depende de:** —

**Ideias para o debate:**
- Quando aparece: sempre, ou só depois de rolar uma parte da página (ex.: passar do hero). Mostrar só depois exige um pouco de JavaScript (um `IntersectionObserver` no hero); sempre visível funciona só com HTML e CSS.
- Como funciona: um link para `#main` (ou para o topo), sem JavaScript, com a rolagem suave do CSS, desligada para quem pede menos movimento (`prefers-reduced-motion`).
- Onde fica: no canto inferior direito, sem cobrir o conteúdo nem o botão de contato no celular, e com o recuo da área segura dos iPhones.
- Aparência: ícone de seta (SVG inline), nos dois temas, com o mesmo estilo dos botões do cabeçalho.
- Acessibilidade e textos: rótulo para leitor de tela nos dois idiomas, no `site.yaml` (ex.: "Voltar ao topo" / "Back to top"), e foco visível no teclado.

**Como é hoje:** o cabeçalho não é fixo; a rolagem suave já existe no `reset.css`, desligada com `prefers-reduced-motion`; o único script é o do tema, no `Base.astro`.

**Decisões:**
1. O botão aparece só depois que o hero sai da tela, com um script curto (`IntersectionObserver` no hero) e um fade curto. Sem JavaScript, o botão fica sempre visível. (2026-10-29, aprovado pelo usuário.)
2. É um link para `#top`, que o HTML entende como o início da página, sem JavaScript. Fica no canto inferior direito, com o recuo lateral do site e a área segura dos iPhones, tem 3rem, ícone de seta para cima em SVG e o estilo do botão de tema, nos dois temas, com foco visível. (2026-10-29, aprovado pelo usuário.)
3. Rótulo para leitor de tela e dica ao passar o mouse: "Voltar ao topo" / "Back to top", no bloco `ui.a11y` do `site.yaml`. (2026-10-29, aprovado pelo usuário.)

**Passos:**
- [x] Debater as ideias acima.
- [x] Texto do rótulo nos dois idiomas no `site.yaml` (`ab36e71`), aprovado na decisão 3. Os textos de interface e de acessibilidade ficam só no `site.yaml`, como o "Pular para o conteúdo"; o `docs/approved_content.md` guarda os textos de conteúdo.
- [x] Componente do botão, nos dois idiomas e nos dois temas (`ab36e71`). Com JavaScript, o botão começa escondido por `@media (scripting: enabled)` e aparece quando o hero sai da tela; sem JavaScript, fica sempre visível. Conferido pelo agente com o `puppeteer-core` do serviço `lighthouse` (escondido no topo, visível depois de rolar, o clique volta ao topo; sem JavaScript, sempre visível), com capturas em `logs/m014/` (fora do git). Lighthouse 100 nas quatro categorias, nos dois idiomas.
- [x] T-010 com o botão no celular e no desktop.

**Commits:**
- `ab36e71`: botão flutuante de voltar ao topo.

**Resultado:** 2026-10-29, T-010 validado pelo usuário: o botão aparece depois do hero, volta ao topo com rolagem suave e tem o rótulo nos dois idiomas, nos dois temas, no desktop e no celular.

### M-013 · Projetos principais em uma coluna

**Objetivo:** mostrar os cards dos projetos principais um abaixo do outro, sem as duas colunas no desktop. Origem: pedido do usuário, 2026-10-29.

**Depende de:** —

**Como é hoje:** `Projects.astro` usa `columns: 2` a partir de `64rem` (desktop), com `break-inside: avoid` em cada card; no celular os cards já ficam um abaixo do outro.

**Achados:** com uma coluna só, o card ocupa toda a área de conteúdo (`--content-width: 72rem`), e os parágrafos passariam de 120 caracteres por linha no desktop.

**Decisões:**
1. Entre as opções debatidas (limitar os parágrafos, limitar o card, sem limite, duas colunas dentro do card), o usuário escolheu uma variação da última: o card muda o próprio layout quando passa de uma largura: à esquerda, em cima, o cliente, o título e o período; à esquerda, embaixo, a stack; à direita, o problema e o papel. No celular, a ordem continua a de hoje (topo, problema, papel, stack). (2026-10-29, aprovado pelo usuário.)
2. Detalhes da implementação, a validar no teste: a troca é feita por *container query* na largura do card (48rem), com a esquerda em 1/3 e a direita em 2/3. A stack sai do `dl` do problema e do papel para um `dl` próprio, para o layout não depender de `display: contents`. (2026-10-29.)

**Passos:**
- [x] Tirar o `@media` com as duas colunas e o `break-inside`, que perde a função, do `Projects.astro` (`477e028`).
- [x] Novo layout do `ProjectCard.astro` (decisão 1) (`477e028`). Capturas no desktop (1.280 px), no tablet (820 px) e no celular (390 px) em `logs/m013/` (fora do git). No tablet, o card ainda tem menos de 48rem e fica empilhado; as duas colunas aparecem a partir de cerca de 870 px de tela.
- [x] T-009 com os projetos no desktop e no celular, nos dois idiomas.

**Commits:**
- `477e028`: projetos em uma coluna e o card em duas colunas quando largo.

**Resultado:** 2026-10-29, T-009 validado pelo usuário: projetos principais um abaixo do outro, com o card em duas colunas a partir de 48rem (topo e stack à esquerda, problema e papel à direita) e empilhado abaixo disso, nos dois idiomas e nos dois temas.

### M-011 · Ordem dos projetos e espaço no copyright

**Objetivo:** dois ajustes vistos no site publicado. Origem: pedido do usuário, 2026-10-29.
1. Ordenar os projetos pela data inicial, e não pela final. Hoje a Unimed de Goiânia (2022 – 2025) aparece depois de Skystone (jul. 2025).
2. O copyright do rodapé aparece como "© 2026Guizani", sem o espaço entre o ano e o nome.

**Depende de:** —

**Como é hoje:**
- `sortProjects` (`src/data/format.ts`) põe os em andamento primeiro e ordena pelo fim (do mais recente para o mais antigo), usando o início só como desempate. Um fim só com o ano vira dezembro (`2025` → `2025-12`), por isso a Unimed (fim `2025`) passa à frente da Skystone (`2025-07`). A mesma função é usada em `Projects.astro`, `OccasionalWork.astro` e `Timeline.astro`.
- `Footer.astro` tem `© {year}` e `{site.brand.name}` em linhas separadas; o Astro, como o JSX, descarta a quebra de linha entre duas expressões, e o espaço some.

**Ideias para o debate:**
- Ordem: só pelo início (do mais recente para o mais antigo), ou continuar com os em andamento primeiro e, depois, pelo início. Decidir se a linha do tempo segue a mesma ordem dos cards.
- Rodapé: juntar o texto numa expressão só (ex.: `` {`© ${year} ${site.brand.name}`} ``), que o Prettier não quebra.

**Decisões:**
1. Os projetos em andamento vêm primeiro; depois, todos pela data inicial, da mais recente para a mais antiga; no mesmo início, o fim mais recente primeiro. Os cards, as participações pontuais e a linha do tempo seguem a mesma ordem, porque usam a mesma função. (2026-10-29, aprovado pelo usuário.)
2. O copyright vira uma expressão só, com o espaço dentro do texto. (2026-10-29, aprovado pelo usuário.)

**Passos:**
- [x] Debater a regra de ordenação.
- [x] Alterar o `sortProjects` e a docstring (`ca3e4db`).
- [x] Corrigir o espaço do copyright (`ca3e4db`). O Prettier quebrava a linha e grudava o "·" no texto seguinte; a linha inteira virou a constante `legalLine` no frontmatter.
- [x] T-008 com a ordem dos projetos e o rodapé nos dois idiomas.

**Commits:**
- `ca3e4db`: ordem pela data inicial e espaço do copyright.

**Resultado:** 2026-10-29, T-008 validado pelo usuário: projetos ordenados pela data inicial (em andamento primeiro) nos cards, nas participações pontuais e na linha do tempo, e o copyright com o espaço, nos dois idiomas.

### M-010 · Publicação antecipada do site novo

**Objetivo:** deixar o site novo como o site principal no GitHub Pages já, mesmo sem o M-007 e o M-008, trazendo para agora a troca da origem do Pages que estava no M-009. Origem: pedido do usuário, 2026-10-29.

**Depende de:** M-006.

**Como é hoje** (conferido em 2026-10-29): o Pages usa o build `legacy` a partir da `release/guizani-data-it` (`/`), com o domínio `datait.guizani.com.br` e `https_enforced: true`. O `deploy.yml` só roda à mão (`workflow_dispatch`) e para se a origem não for "GitHub Actions". O ambiente `github-pages` já deixa a `main` publicar. O domínio `guizani.com.br` continua sem registro MX.

**Decisões** (2026-10-29, aprovadas pelo usuário):
1. O deploy roda a cada push na `main` (e continua podendo rodar à mão), sempre depois do CI.
2. O site vai ao ar com o `contato@guizani.com.br` sem funcionar até o C-005, que fica para depois. Entra no ar sem o link do currículo em PDF (some sozinho sem o C-002), sem o M-007 e sem o M-008.
3. A `release/guizani-data-it` fica até o M-009, para voltar ao site antigo trocando a origem do Pages de novo para ela.
4. Autorizados na hora: a troca da origem do Pages para "GitHub Actions" e o push na `main`.

**Passos:**
- [x] `deploy.yml` rodando a cada push na `main` (`b52b99f`).
- [x] Trocar a origem do Pages para "GitHub Actions" (pela API, `build_type: workflow`).
- [x] Push na `main` e deploy verde (`40814613861`).
- [x] Conferir o site novo no ar, com o domínio, o certificado e o "Enforce HTTPS".
- [x] Validar o T-007.

**Commits:**
- `80bd3d4`: registro da melhoria e do teste.
- `b52b99f`: deploy a cada push na `main`.

**Resultado:**
- 2026-10-29: T-007 validado pelo usuário. O site novo está no ar em <https://datait.guizani.com.br>, publicado pelo GitHub Actions a cada push na `main`; a `release/guizani-data-it` fica até o M-009.

### M-006 · Idiomas

**Objetivo:** português em `/` e inglês em `/en/`, com o seletor sempre visível e os links `hreflang`, sem redirecionamento automático. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-005.

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (idiomas).

**Decisões** (2026-10-29, aprovadas pelo usuário):
1. Português em `/` e inglês em `/en/`, sem redirecionamento automático; a página em inglês usa o mesmo `HomePage.astro`, com o idioma `en`.
2. Seletor no cabeçalho, ao lado do botão de tema, sempre visível (também no celular): um link com o nome do outro idioma ("EN" na página em português, "PT" na em inglês), chamado "Read this site in English" / "Ler este site em português" pelos leitores de tela, que leva ao início da outra página (sem script).
3. Links `hreflang` para `pt-BR` e `en`, com o `x-default` em `/`, nas duas páginas.
4. A verificação do Lighthouse mede `/` e `/en/`, as duas com o mínimo de 90.

**Passos:**
- [x] Textos do seletor no `site.yaml` e no schema (`5b42355`).
- [x] `LanguageSwitch` no cabeçalho (`b6f429e`).
- [x] `hreflang` no `Base.astro` (`b6f429e`).
- [x] Página `src/pages/en/index.astro` (`b6f429e`).
- [x] `/en/` na verificação do Lighthouse (`b9d0232`).
- [x] `T-006`.

**Ajustes na implementação:**
- O cabeçalho e a página tiram os endereços de cada idioma de `homePath` (`src/data/format.ts`), em vez de receberem o `homeHref` por parâmetro.
- A propriedade do nome do seletor para os leitores de tela chama-se `accessibleName`: com `name`, o parser do Astro no ESLint confundia com a variável global `window.name`, obsoleta (`no-deprecated`).
- Os links `hreflang` usam endereços completos, montados a partir do `site` do `astro.config.ts`; sem ele, o build para com uma mensagem.
- Captura da página em inglês num celular de 360 px em `logs/m006/` (fora do git): o logo, o seletor e o botão de tema cabem no cabeçalho.

**Correções:**
- 2026-10-29: o usuário abriu o site no servidor de desenvolvimento e viu `Cannot read properties of undefined (reading 'switchLabel')` no `Header.astro`. Causa: o servidor só recarrega o schema da coleção quando o próprio `content.config.ts` muda; com o `schema.ts` alterado, ele validou o `site.yaml` novo com o schema antigo (que recusa o campo `language`) e ficou com a última versão válida, sem os textos do seletor. O build e o CI não têm o problema, porque partem do zero. Provavelmente é a mesma causa do erro 500 registrado no M-003. Correção: uma integração no `astro.config.ts` chama o `addWatchFile` do Astro para o `src/data/schema.ts`, e o servidor reinicia quando ele muda (`2d602bc`). Reproduzido com o servidor no ar (campo novo no YAML recusado; depois de pôr o campo no schema, o servidor reiniciou e aceitou o arquivo). Teste novo: `tests/astro-config.test.ts` confere que o schema é vigiado e falha sem a integração (`d338cfe`).

**Commits:**
- `5b42355` feat: textos do seletor e funções de idioma.
- `b6f429e` feat: página em inglês, seletor de idioma e `hreflang`.
- `b9d0232` test: `/en/` na verificação do Lighthouse.
- `2d602bc` fix: o servidor de desenvolvimento reinicia quando o schema muda.
- `d338cfe` test: a configuração do Astro vigia o schema.

**Resultado:**
- 2026-10-29: T-006 validado pelo usuário, com todos os passos confirmados.

### M-005 · Seções do site

**Objetivo:** montar a página com as seções na ordem aprovada: hero, sobre, serviços, projetos principais, participação pontual, linha do tempo, skills, laboratório, contato e rodapé. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-003 e M-004; C-002 (currículos) só para o link do PDF.

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (seções, hero, cards, contato, rodapé), e `docs/approved_content.md`.

**Decisões** (2026-10-29, aprovadas pelo usuário):
1. Frase do hero: "Pipelines, data warehouses e automações para empresas que precisam confiar nos próprios dados." / "Pipelines, data warehouses and automation for companies that need to trust their own data."
2. Sobre: "Sou Davi Guizani, engenheiro de dados com mais de 5 anos de experiência e fundador da Guizani Data IT. Construo pipelines, data warehouses e automações para empresas de saúde, varejo, logística e investimentos, sempre com o mesmo objetivo: dados confiáveis, no lugar certo, para quem precisa decidir." / "I'm Davi Guizani, a data engineer with more than 5 years of experience and the founder of Guizani Data IT. I build pipelines, data warehouses and automation for companies in healthcare, retail, logistics and investments, always with the same goal: reliable data, in the right place, for the people who make decisions."
3. Cabeçalho: logo, seletor de idioma (M-006) e botão de tema; no desktop, links para Serviços, Projetos e Contato; no celular, sem menu; link "pular para o conteúdo".
4. Hero: nome, frase, a linha "Davi Guizani · engenheiro de dados", as seis tecnologias principais em fonte mono e os dois botões.
5. Projetos principais: card com o cliente (com "via ITIX"), título, período, problema, papel e stack em etiquetas; os em andamento primeiro, depois do mais recente para o mais antigo; períodos como "2022 – 2025", "2026 – em andamento" e "jul. 2025".
6. Participação pontual: uma linha por projeto (período, cliente e resumo).
7. Linha do tempo: linha vertical com nós, com todos os projetos, do mais recente para o mais antigo.
8. Skills em grupos com etiquetas; Laboratório em cards pequenos, com "Ver o código" nos públicos e "Repositório privado" nos outros.
9. Contato: botões de e-mail, WhatsApp (com a mensagem do idioma) e LinkedIn; o link do currículo só aparece quando os PDFs existirem (campo opcional no YAML, C-002).
10. Rodapé: CNPJ, LinkedIn e GitHub; o aviso de contagem de visitas entra só no M-008.
11. Foto: cópia em JPEG de alta qualidade em `src/assets/`, com o texto alternativo no YAML e versões AVIF e WebP geradas no build.
12. Componentes recebem o idioma como parâmetro; o M-006 acrescenta a página `/en/`, o seletor e o `hreflang`.

**Passos:**
- [x] Textos novos no `site.yaml` e no schema (hero, sobre, rótulos, currículo opcional) (`4dbc651`).
- [x] Funções de formatação (idioma, período, cliente, ordem dos projetos, link do WhatsApp) (`a258ce4`).
- [x] Foto em `src/assets/` (`095f0c9`).
- [x] Componentes das seções e a página em português (`dae8e40`, `01cf5d2`).
- [x] Conferir no celular o critério dos 30 segundos; Lighthouse 90 ou mais (pelo agente, com capturas em `logs/m005/`; a conferência do usuário fica no T-005).
- [x] `T-005`.

**Ajustes na implementação:**
- O ESLint não aplica mais a `no-unsafe-return` nos arquivos `.astro` (`dae8e40`): o parser do Astro não resolve o tipo do JSX dentro de expressões, como num `.map()`, e o `astro check` já confere esses tipos.
- Dois componentes além da lista do briefing: `Section.astro` (título e largura comuns a todas as seções) e `HomePage.astro` (a página completa num idioma; as páginas de cada idioma só escolhem o idioma).
- As funções de formatação ficam em `src/data/format.ts`: períodos (`Intl.DateTimeFormat`, sem textos de mês no YAML), nome ou setor do cliente, ordem dos projetos (um fim só com o ano conta como dezembro) e link do WhatsApp.
- Textos novos da interface no `site.yaml`: a descrição da foto, "pular para o conteúdo", o nome da navegação, o aviso "(abre em outra aba)" dos links externos, o rótulo do currículo e o do CNPJ (em inglês, "CNPJ (Brazilian company ID)").
- A descrição para os buscadores usa a frase do hero até o M-007.
- A foto em `src/assets/profile.jpg` é um JPEG de 45 KB (768 × 768, qualidade 90) feito do PNG original de 1,8 MB, que continua em `references/`.
- Nas capturas, o nome do cliente aparecia grudado no "via" ("TruckPadvia ITIX"): o Astro descarta o espaço da quebra de linha que o Prettier cria antes do `<span>`. Corrigido antes do commit com um `{" "}` explícito.
- Com o `isClientPublic` da Unimed desligado numa cópia temporária do YAML, o nome sumiu do HTML e o setor apareceu nos 3 lugares (card e duas entradas da linha do tempo).

**Correções:**
- 2026-10-29: o usuário não gostou da grade de duas colunas dos Projetos principais: cada linha ficava com a altura do card mais alto, deixando espaços verticais desiguais (o maior embaixo do card da Vita). Opções debatidas: um card por linha com duas colunas internas, duas colunas com a mesma altura e duas colunas soltas. Escolhida pelo usuário: duas colunas soltas, com as colunas do CSS (`columns: 2`), em que cada coluna tem o mesmo espaço entre os cards e a leitura desce pela coluna da esquerda e depois pela da direita (`d40c558`).

**Commits:**
- `dae8e40` chore: `no-unsafe-return` desligada nos `.astro`.
- `4dbc651` feat: hero, sobre e os textos novos da interface no `site.yaml`.
- `a258ce4` feat: funções de formatação.
- `095f0c9` feat: foto de perfil.
- `01cf5d2` feat: componentes das seções e a página em português.
- `d40c558` fix: cards dos projetos em duas colunas soltas.

**Resultado:**
- 2026-10-29: T-005 validado pelo usuário, com todos os passos confirmados.

### M-004 · Identidade visual

**Objetivo:** paleta nas cores do Python sobre base escura, fontes, logo novo em SVG, tema claro e escuro com botão e o fundo de circuito do hero. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-002 e C-001 (foto e banner de referência, concluído).

**Contexto:** `docs/brief.md`, seção **Funcionalidades do MVP** (identidade visual, logo e tema).

**Achados** (2026-10-28):
- Contraste WCAG da paleta do briefing: todas as combinações de texto passam no AA; a mais justa é o azul `#4B8BBE` sobre a superfície escura `#121C21` (4,73). O amarelo `#FFD43B` como texto sobre o branco reprova (1,43), como o briefing já previa; o texto escuro sobre o botão amarelo fica entre 11,50 e 13,25.
- Banner (`references/capa.fw.png`): fundo quase preto com tom verde-azulado, linhas de circuito brilhantes em amarelo-claro com anéis nas pontas, uma coluna de texto binário (a palavra "empti" repetida), o texto "EMP TI" e dois logos do Python, que não entram no site.
- Prévia dos três conceitos de logo (monograma GD, `guizani.data_it` e G de circuito) nos dois temas, com Inter e JetBrains Mono, em `logs/logo-concepts/preview.png` (fora do git).

**Decisões** (2026-10-28, aprovadas pelo usuário):
1. Paleta do briefing sem mudanças; no tema claro, o amarelo só como fundo de botão, com texto escuro.
2. Inter em versão variável (`@fontsource-variable/inter`) e JetBrains Mono nos pesos 400 e 700 (`@fontsource/jetbrains-mono`), servidas pelo site, só os caracteres latinos baixados (`unicode-range`), com `font-display: swap`.
3. Logo C, "G de circuito": um G desenhado como trilha de circuito em azul, terminando num ponto amarelo, ao lado do nome "GUIZANI" com "DATA IT" em JetBrains Mono embaixo. O símbolo é SVG; o nome é texto HTML com as fontes do site. O usuário pode pedir outro logo no futuro.
4. Tema: segue o sistema na primeira visita; o botão alterna entre claro e escuro; a escolha fica salva no navegador; um script inline no `<head>` aplica o tema antes da página aparecer.
5. `CircuitBackground`: SVG fixo, sem animação, com menos de 5 KB, linhas de circuito em amarelo-claro com anéis nas pontas e brilho feito por uma segunda linha larga e transparente (sem filtro de desfoque), uma coluna de texto binário com a palavra "data" (`01100100 01100001 01110100 01100001`), em baixa opacidade, escondido dos leitores de tela; sem os logos do Python.

**Passos:**
- [x] Fontes pelos pacotes `@fontsource` (`59f1d6d`).
- [x] Tokens dos dois temas em `src/styles/tokens.css` e o reset em `src/styles/reset.css` (`59f1d6d`).
- [x] `Base.astro` com o script do tema no `<head>` (`27973ea`).
- [x] `Logo`, `ThemeToggle` e `CircuitBackground`, com os textos no `site.yaml` (`98e6776`, `3729bbb`).
- [x] Página provisória mostrando a identidade nos dois temas (`abf7aee`).
- [x] Conferir no celular e nos dois temas; Lighthouse 90 ou mais (pelo agente, com capturas em `logs/m004/`; a conferência do usuário fica no T-004).
- [x] `T-004`.

**Ajustes na implementação:**
- O nome da empresa saiu de `contact.company` e foi para um bloco `brand` do `site.yaml`, com as duas linhas do logo (`wordmark.primary` e `wordmark.secondary`); os textos de acessibilidade ficam em `ui.a11y`.
- O script do tema no `<head>` também trata o clique no botão (qualquer elemento com `data-theme-toggle`), para o site não ter um terceiro script.
- O texto binário do `CircuitBackground` é um `<pattern>` do SVG com uma linha que se repete na vertical, em vez de um `.map()` com JSX: o parser do Astro no ESLint não resolve o tipo do JSX dentro de expressões (`no-unsafe-return`), e o `pattern` também deixa o SVG menor (2,2 KB no HTML).
- Nas telas a partir de 48rem, uma máscara em gradiente esmaece o lado esquerdo do fundo, onde fica o texto do hero, como no banner, em que o desenho fica no centro e à direita.
- As capturas da página nos dois temas, no celular (390 px) e no desktop (1280 px), ficam em `logs/m004/` (fora do git).
- O servidor de desenvolvimento não vigia mais `logs/` e `references/` (`fe6789c`): cada relatório do Lighthouse gerava um evento à toa.

**Commits:**
- `98e6776` feat: `brand` e `ui.a11y` no `site.yaml` e no schema.
- `59f1d6d` feat: fontes, tokens dos dois temas e reset.
- `27973ea` feat: `Base.astro` com o script do tema.
- `3729bbb` feat: `Logo`, `ThemeToggle` e `CircuitBackground`.
- `abf7aee` feat: página provisória com a identidade.
- `fe6789c` chore: `logs/` e `references/` fora da vigilância do servidor de desenvolvimento.

**Resultado:**
- 2026-10-29: T-004 validado pelo usuário, com todos os passos confirmados.

### M-003 · Arquivo de dados e schema

**Objetivo:** guardar todo o conteúdo do site em `src/data/site.yaml`, nos dois idiomas lado a lado, validado no build por um schema Zod. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-002.

**Contexto:** `docs/approved_content.md` (todo o conteúdo) e `docs/brief.md`, seções **Funcionalidades do MVP** (arquivo de dados único) e **Arquitetura** (textos da interface).

**Achados** (2026-10-28):
- O `file()` loader do Astro 7 lê YAML, mas trata cada chave do topo do arquivo como um item separado e, num erro de sintaxe, só registra uma mensagem e segue sem os dados. O leitor de YAML dele (`@astrojs/internal-helpers/yaml`) é interno.
- O `astro/zod` do Astro 7 é o Zod 4 (`zod/v4`), com `z.strictObject`, `z.url()`, `z.email()` e `.describe()`.
- Laboratório: o `python-financeiro-pessoal` público só tem `.gitignore`, `LICENSE` e um README vazio (um commit, 2025-09-26, nas branches `main` e `develop`); o `uninter` também usa NLTK, scikit-learn e Base dos Dados.

**Decisões** (2026-10-28, aprovadas pelo usuário):
1. Uma *content collection* `site` lê o `src/data/site.yaml` e valida com o schema de `src/data/schema.ts`, no `astro check` e no build, com o caminho do campo no erro. Como o `file()` não serve para um arquivo único com seções diferentes e não quebra o build num erro de sintaxe, a coleção usa um loader próprio, com o pacote `yaml` (sem dependências próprias).
2. Todo texto traduzível é `{ pt, en }`, os dois obrigatórios e não vazios; nomes de tecnologia ficam numa língua só.
3. Clientes cadastrados uma vez (`clients`: nome, setor nos dois idiomas e `isClientPublic`); os projetos citam o cliente pelo identificador, e o schema recusa um identificador que não existe.
4. Períodos com `start` e `end` em `AAAA` ou `AAAA-MM`; `end` vazio é "em andamento".
5. Uma lista de projetos com `kind`: `main` (card completo), `occasional` (participação pontual, uma linha) e `timeline` (só na linha do tempo, os RPAs). A linha do tempo é montada a partir de todos.
6. Testes do schema com o `node:test` (arquivo válido passa; campo faltando, `en` vazio e cliente inexistente são recusados), no `npm test` e no CI.
7. JSON Schema do `site.yaml` para o VS Code, com a extensão YAML da Red Hat (autocomplete e a descrição de cada campo).
8. Laboratório: descrições do `polars-python-studying` e do `uninter` aprovadas; o `intern-data-rpa-course` entra com a descrição proposta, a confirmar na P-002; o `python-financeiro-pessoal` e o `guizani-supermarket` ficam fora do `site.yaml` até a P-002.
9. Depois da P-002: o `python-financeiro-pessoal` não entra no Laboratório; o `guizani-supermarket` entra sem link, com a descrição do usuário; a descrição do `intern-data-rpa-course` fica como proposta; o `uninter` ganha NLTK, scikit-learn e Base dos Dados (2026-10-28, aprovado pelo usuário).
10. A versão em inglês de todo o conteúdo foi aprovada como está, inclusive "Featured projects", "Short engagements", "Skills" também no título em português, "REST APIs" e a explicação da LGPD (2026-10-28, aprovado pelo usuário).
11. A telemetria do Astro fica desligada (`ASTRO_TELEMETRY_DISABLED=1` no `compose.yaml` e nos workflows) (2026-10-28, aprovado pelo usuário).

**Passos:**
- [x] Schema Zod com descrição em cada campo e o loader da coleção `site` (`7dbe943`).
- [x] `site.yaml` com todo o conteúdo aprovado, com a versão em inglês para o usuário revisar (`7dbe943`).
- [x] Testes do schema (`npm test`) e o passo no CI (`1315828`).
- [x] JSON Schema para o VS Code (`1fc754a`), usando o que o Astro já gera em `.astro/collections/site.schema.json`.
- [x] Guia de edição do conteúdo no `README.md`.
- [x] Revisão da versão em inglês pelo usuário (2026-10-28, aprovada como está).
- [x] Responder a P-002 e completar o Laboratório (2026-10-28).
- [x] `T-003`.

**Ajustes na implementação:**
- O loader próprio (`src/content.config.ts`) lê o arquivo inteiro como a entrada `site` da coleção; a função `getSite()` (`src/data/site.ts`) entrega o conteúdo já tipado aos componentes.
- O `yaml` 2.9.1 entrou como dependência de desenvolvimento, porque só é usado no build.
- O ESLint aceita as chamadas `describe` e `it` do `node:test` sem `await` (`no-floating-promises`), como o próprio `node:test` espera.
- A ordem de `projects` no YAML não importa: o site ordena pelas datas.

**Correções:**
- 2026-10-28: o lint falhou no CI (`40804842940`) com `Unsafe member access .data on a type that cannot be resolved`: os tipos do `astro:content` ficam em `.astro/`, gerada pelo `astro sync`, e no CI o lint roda antes do `check` e do build. Aqui a pasta já existia, por isso passou. Correção: o `lint` roda `astro sync && eslint .` (`63c3a10`), e a **Rodada completa** do `tests/README.md` começa apagando `.astro/` e `dist/` (`71d3e55`), o que reproduz o ambiente do CI.

- 2026-10-29: o servidor de desenvolvimento respondeu 500 ("The site collection has no entry") uma vez, depois de a instalação das fontes trocar o `package-lock.json` com ele no ar e de outros contêineres apagarem e regerarem a `.astro/`. Não foi reproduzido: com o YAML inválido na subida, o servidor para com a mensagem do schema; com o YAML inválido no ar, com ou sem mudança no schema, ele registra o erro, mantém a última versão válida e se recupera quando o arquivo é corrigido. Como prevenção, o loader passou a registrar a vigilância antes da primeira leitura e a registrar no log o erro de uma releitura (`15c7d61`).

**Commits:**
- `7dbe943` feat: `site.yaml`, schema Zod, loader e `getSite()`.
- `1315828` test: 9 testes do schema com o `node:test`, `npm test` no CI.
- `1fc754a` chore: JSON Schema do `site.yaml` no VS Code.
- `d9a9f79` feat: Laboratório depois da P-002.
- `6c68d4e` chore: telemetria do Astro desligada.
- `63c3a10` fix: `astro sync` antes do ESLint.
- `15c7d61` fix: vigilância do loader antes da primeira leitura.
- `71d3e55` docs: rodada completa a partir de uma pasta limpa.

**Resultado:**
- 2026-10-29: T-003 validado pelo usuário, com todos os passos confirmados.

### M-002 · Estrutura inicial do projeto

**Objetivo:** criar o projeto Astro e todo o ferramental (Docker, lint, formatação, CI, Dependabot), sem conteúdo ainda. Origem: prompt de construção, 2026-10-28.

**Depende de:** M-001.

**Contexto:** `docs/brief.md`, seções **Tecnologias**, **Padrões de código**, **Arquitetura** e **Como subir**.

**Achados** (2026-10-28):
- Aviso de segurança mais recente do Node: 2026-10-21 (10 CVEs, o mais grave o CVE-2026-111497, escrita fora dos limites no decodificador Brotli), corrigido na 26.12.1. A 26.13.0, de 2026-10-28, é a primeira LTS da linha 26 ("Lithium") e é posterior à correção.
- Versões estáveis: Astro 7.4.4, `@astrojs/check` 0.9.12, TypeScript 7.0.2, ESLint 10.13.0, `typescript-eslint` 8.72.1, `eslint-plugin-astro` 3.2.1, Prettier 3.9.10, `prettier-plugin-astro` 1.1.2, `@lhci/cli` 0.15.1, Lighthouse 13.6.0.
- O `@astrojs/check` aceita o TypeScript `^5.0.0 || ^6.0.0`, e o `typescript-eslint` aceita `>=4.8.4 <6.1.0`: o TypeScript 7 ainda não funciona com eles.
- O `@lhci/cli` 0.15.1 usa o Lighthouse 12.6.1, e a referência do M-001 foi medida com o 13.6.0.
- As imagens `node:26.13.0-trixie-slim` e `node:26.13.0-bookworm-slim` existem.

**Decisões** (2026-10-28, aprovadas pelo usuário):
1. Node 26.13.0 (LTS): `.nvmrc` com `26.13.0`, `engines` com `>=26.12.1 <27` e a imagem `node:26.13.0-trixie-slim`.
2. Docker por `compose.yaml` e um `Dockerfile` de dois estágios: `base` (só o Node, para instalação, servidor de desenvolvimento, lint, build e `astro check`) e `lighthouse` (a base com o Chromium). O Dependabot atualiza o `FROM` do `Dockerfile`, e o CI confere que a versão dele é igual à do `.nvmrc`.
3. ~~Lighthouse CI no GitHub Actions e, localmente, no estágio `lighthouse`. A referência do site atual é medida de novo com o Lighthouse do `@lhci/cli` (12.6.1), para a comparação ser justa.~~ Substituída pela decisão 6.
4. TypeScript 6.0.x, a mais nova aceita pelo `@astrojs/check` e pelo `typescript-eslint`; subir para a 7 quando os dois aceitarem.
5. `* text=auto eol=lf` no `.gitattributes`.
6. Sem o `@lhci/cli`: o pacote `lighthouse` 13.6.0 e um script próprio (`scripts/lighthouse-check.ts`) servem o `dist/` com o `astro preview`, rodam 3 vezes por página no perfil de celular, usam a mediana, salvam os relatórios em `logs/lighthouse/` e barram performance, acessibilidade e SEO abaixo de 90. Roda no CI e, localmente, no serviço `lighthouse`. A referência do M-001 já foi medida com o 13.6.0, então não é medida de novo (2026-10-28, aprovado pelo usuário, depois de o `npm audit` mostrar 16 vulnerabilidades conhecidas no `@lhci/cli` 0.15.1, 13 altas, e 0 no `lighthouse` 13.6.0).

**Ajustes na implementação:**
- O ESLint 10 precisa do `jiti` para ler o `eslint.config.ts`. A opção `--flag unstable_native_nodejs_ts_config`, que usa o TypeScript nativo do Node, também funcionou, mas foi descartada por ser instável.
- O parser do Astro não aceita o `projectService` do `typescript-eslint`; os arquivos `.astro` usam `project: true`.
- O `astro.config.ts` liga o polling do Vite, porque o contêiner não recebe os eventos de arquivo da pasta montada do Windows.
- O workflow de deploy confere, antes de publicar, que a origem do Pages é "GitHub Actions" (`build_type: workflow`), e se recusa a publicar enquanto ela for a branch `release/guizani-data-it`.
- O Dependabot ignora o TypeScript a partir da 6.1.0 (decisão 4) e as versões maiores da imagem `node` (a linha do projeto é a 26 LTS).
- `src/pages/index.astro` é uma página provisória, com o texto fixo, só para validar a estrutura; ela é substituída no M-005 pelas seções, com os textos do `site.yaml`.
- Os arquivos da landing page antiga (`index.html`, `style.css`, `logo_1.png`) saíram da `main`; continuam na `release/guizani-data-it` e no histórico.

**Passos:**
- [x] `.gitattributes` com `eol=lf` (`9666049`).
- [x] `.nvmrc`, `Dockerfile` e `compose.yaml` (`ef7cf13`).
- [x] Projeto Astro com o `tsconfig` `strictest`, o npm e o `engines`; os arquivos da landing page antiga saem da `main` (continuam na `release/guizani-data-it`), e o `CNAME` vai para `public/` (`f24e4b8`).
- [x] ESLint (`typescript-eslint`, `eslint-plugin-astro`) e Prettier (`prettier-plugin-astro`, CSS e YAML), com os scripts `lint`, `format` e `format:check` (`f24e4b8`).
- [x] ~~Lighthouse CI (`lighthouserc.json`), com os relatórios em `logs/lighthouse/`.~~ Script do Lighthouse 13 (decisão 6), com os relatórios em `logs/lighthouse/` (`f24e4b8`).
- [x] ~~Medir de novo a referência do site atual com o Lighthouse 12.6.1.~~ Desnecessário pela decisão 6.
- [x] `README.md` em português, com um resumo em inglês; comandos no `README.md` e no `tests/README.md` (`adfde1e`, `9e5b3a7`).
- [x] Workflow do CI: versão do `.nvmrc` igual à do `Dockerfile`, ESLint, Prettier (`--check`), `astro check`, build e Lighthouse (barra abaixo de 90 em performance, acessibilidade e SEO, no celular), com o Node do `.nvmrc` (`5a6ae6f`).
- [x] Workflow de deploy do Pages (`configure-pages`, `upload-pages-artifact`, `deploy-pages`) só com `workflow_dispatch` (`5a6ae6f`).
- [x] Dependabot: npm, GitHub Actions e imagem do Docker, semanal (`07e528f`).
- [x] Ligar os alertas de segurança e as correções automáticas do Dependabot no repositório (2026-10-28: os alertas já estavam ligados; correções automáticas ligadas com autorização).
- [x] Push e primeira execução do CI no GitHub (2026-10-28, push até `c816a7a`; CI `40801729242` verde em 1min9s).
- [x] `T-002` com a rodada completa no contêiner e no CI.

**Commits:**
- `9666049` chore: fim de linha LF no `.gitattributes`.
- `ef7cf13` chore: `.nvmrc`, `.npmrc`, `Dockerfile`, `compose.yaml` e `.dockerignore`.
- `f24e4b8` feat: projeto Astro, ESLint, Prettier e o script do Lighthouse; saída da landing page antiga.
- `5a6ae6f` feat: workflows do CI e do deploy.
- `07e528f` chore: Dependabot.
- `adfde1e` docs: `README.md`.
- `9e5b3a7` docs: comandos do Docker no `tests/README.md`.

**Resultado:**
- 2026-10-29: T-002 validado pelo usuário, com todos os passos confirmados.

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
- [x] Fazer o C-004 e o C-006 (usuário, na mesma visita ao Registro.br) e conferir depois do atendimento (`nslookup`, `pages/health` com `is_valid: true`, certificado e "Enforce HTTPS") (2026-10-29: domínio verificado, CNAME reconhecido, certificado aprovado e "Enforce HTTPS" ligado).
- [x] Conferir que o site no ar não mudou (2026-10-28: `index.html` e `style.css` no ar idênticos aos da `release/guizani-data-it`, `https://` com 200 e `http://` com 301 para `https://`).
- [x] Validar o T-001.

**Commits:**
- `e5cd4df` chore: `.gitignore` (dependências, build, `.astro/`, `logs/`, `references/`, `.env`).
- `3698732` docs: `docs/control_files.md` e `docs/git_rules.md`, copiados do prompt.
- `ab8937a` docs: `docs/brief.md` e `docs/approved_content.md`, copiados do prompt.
- `312f659` docs: `CLAUDE.md`.
- `7c8710d` docs: pastas de controle e `docs/session.md`.
- `27926b3` docs: Lighthouse do site atual em `docs/reports/`.

**Resultado:**
- 2026-10-29: T-001 validado pelo usuário, com todos os passos confirmados.
