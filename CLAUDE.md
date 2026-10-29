# Portfólio DataIT

Site da **Guizani Data IT**, a empresa de engenharia de dados de Davi Guizani, publicado em <https://datait.guizani.com.br>. É refeito em **Astro** como site estático, em português (`/`) e inglês (`/en/`), com todo o conteúdo num arquivo YAML (`src/data/site.yaml`) validado por Zod no build.

## Antes de qualquer tarefa

1. Ler `docs/control_files.md` (como funcionam o `roadmap/`, `tests/`, `tickets/`, `questions/` e o `session.md`, e as regras de leitura de arquivos grandes).
2. Ler `docs/git_rules.md` (commits, mensagens, o que não vai para o git, codificação).
3. Consultar, só no trecho necessário, `docs/brief.md` (objetivo, escopo, funcionalidades, tecnologias, arquitetura, deploy, riscos e decisões já tomadas) e `docs/approved_content.md` (textos aprovados do site).

"o que temos para hoje?" e "finalizamos essa sessão" seguem o que está descrito no `session.md` em `docs/control_files.md`.

## Idioma

- Conversa com o usuário, documentação (inclusive os arquivos de controle) e docstrings: **português**.
- Código (componentes, variáveis, funções, chaves do YAML), estrutura (pastas, arquivos, branches) e mensagens de commit: **inglês**.
- Conteúdo do site: bilíngue. O usuário escreve os textos do jeito dele; o agente recomenda a versão nos dois idiomas, no padrão de escrita do site.
- O usuário é engenheiro de dados (Python e SQL) e está aprendendo infraestrutura e deploy: explicar as partes de front-end e de deploy quando aparecem pela primeira vez.

## O que já existe

- **Repositório:** `dguizani/guizani-data-it` (antes `curriculo_html`; o GitHub redireciona o nome antigo), público. Precisa continuar público, por causa do GitHub Pages gratuito.
- **GitHub Pages:** publica a branch `release/guizani-data-it`, na raiz, com o build `legacy` (sem Actions), no domínio `datait.guizani.com.br`, com certificado HTTPS e "Enforce HTTPS" ligado. Essa branch tem a landing page antiga (HTML e CSS puros) e fica **congelada** até o lançamento.
- **Branches:** `main` (padrão, criada a partir da `release/guizani-data-it`, onde ficam todos os commits), `legacy/curriculo-2024` (a `main` antiga, com o currículo em inglês; só consulta) e `release/guizani-data-it` (o site no ar). A `main` e a `legacy/curriculo-2024` compartilham só o commit raiz `af964a6`.
- **DNS:** Registro.br, sem registro MX; o `datait` aponta para o GitHub Pages por quatro registros A.

## Padrões de código

- **TypeScript** em tudo o que a linguagem permitir, com o `tsconfig` `strictest` do Astro.
- **Comentários:** nenhum. Só docstrings TSDoc (`/** ... */`), em português, obrigatórias em toda função, componente e tipo exportado. Nos `.astro`, um bloco no início do frontmatter diz o que o componente mostra, e cada campo da interface `Props` é documentado. No schema do YAML, cada campo tem descrição.
- **Lint e formatação:** ESLint (`typescript-eslint`, `eslint-plugin-astro`) e Prettier (`prettier-plugin-astro`, formatando também CSS e YAML). Sem Biome nem gts.
- **CSS puro** (sem Tailwind): estilo com escopo em cada componente; um arquivo global só com os tokens (paleta dos dois temas, fontes, espaçamentos) e o reset. Classes em `kebab-case`, medidas em `rem`, celular primeiro. Sem CSS global com BEM.
- **Nomes:** em inglês; componentes em `PascalCase.astro`; os demais arquivos em `kebab-case`.
- **Node:** linha LTS 26 (piso na 26.12.1), npm, versão no `.nvmrc` e no `engines`. Na máquina do usuário, o Node roda **só em Docker** (imagem oficial `node` da versão do `.nvmrc`); nada de Node instalado no sistema.

## Regras de trabalho

- Nenhum código sem um `M-NNN` registrado no `docs/roadmap/`.
- Todo tema é debatido com o usuário antes da execução: propor opções com prós e contras, marcar a recomendada e registrar só o que ele aprovar.
- Todo commit segue `docs/git_rules.md`: mensagens em inglês, com o ID no escopo (ex.: `feat(M-004): add project cards`); nunca `git add .`; nunca `Co-Authored-By` nem menção à IA; push só com autorização. Renomear, apagar ou trocar a branch padrão, e mudar as configurações do repositório e do Pages, também só com autorização, na hora.
- Nunca fazer commit na `release/guizani-data-it`: ela é a origem do site no ar até o lançamento, e o build `legacy` publicaria qualquer arquivo novo (inclusive os `.md` de `docs/`).
- Todo texto novo do site entra no `site.yaml` nos dois idiomas, revisado pelo usuário; nada de texto fixo no HTML.
- Passos de teste só são marcados `[x]` com a confirmação do usuário.
- Dependências e ferramentas rodam num ambiente isolado do projeto (o contêiner Docker); nada é instalado no sistema do usuário sem avisar antes, com o motivo.
- Nenhum dado real além do que o site mostra entra no repositório: nada de contratos, valores, documentos pessoais ou dados de clientes, nem números do negócio, detalhes internos, prints ou código dos clientes. As imagens de referência que o usuário entregar e não forem usadas no site ficam fora do git.
- Nunca usar o logo do Python (marca registrada da PSF): só as cores.
- Arquivos acima dos limites de **Leitura de arquivos grandes** (20 KB ou 500 linhas por arquivo, linha de até 2.000 caracteres, 50 KB somados por tarefa) são medidos e inspecionados antes, e lidos só no trecho necessário; saídas grandes (logs, relatórios do Lighthouse, saídas do build) são guardadas uma vez e lidas por trecho. Atenção ao `package-lock.json` e aos relatórios JSON do Lighthouse.
- Este arquivo e todo o `docs/` vão para um repositório público: nada que não possa ser público.
