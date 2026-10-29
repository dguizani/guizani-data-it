# Guizani Data IT

Site da **Guizani Data IT**, empresa de engenharia de dados de Davi Guizani, publicado em <https://datait.guizani.com.br>. É um site estático feito em [Astro](https://astro.build), em português (`/`) e inglês (`/en/`), com todo o conteúdo num arquivo YAML.

> **English summary:** website of Guizani Data IT, a data engineering company. Static site built with Astro and TypeScript, bilingual (Portuguese and English), with all content in a single YAML file validated at build time. Node runs only inside Docker; see the commands below.

## Tecnologias

- Astro 7 e TypeScript (`tsconfig` `strictest`), CSS puro.
- ESLint (`typescript-eslint`, `eslint-plugin-astro`) e Prettier (`prettier-plugin-astro`).
- Lighthouse 13 com um script próprio (`scripts/lighthouse-check.ts`), que barra notas abaixo de 90 em performance, acessibilidade e SEO, no perfil de celular.
- Node 26 LTS (versão no `.nvmrc`), npm e Docker.
- GitHub Actions (CI e deploy do GitHub Pages) e Dependabot.

## Como rodar

O Node não é instalado na máquina: tudo roda em contêineres Docker, definidos no `compose.yaml` e no `Dockerfile`. É preciso só o Docker Desktop rodando. Os comandos são executados na raiz do projeto.

| Para                             | Comando                                                                     |
| -------------------------------- | --------------------------------------------------------------------------- |
| Instalar as dependências         | `docker compose run --rm dev npm ci`                                        |
| Servidor de desenvolvimento      | `docker compose up dev` e abrir <http://localhost:4321> (Ctrl+C para parar) |
| Lint                             | `docker compose run --rm dev npm run lint`                                  |
| Formatar o código                | `docker compose run --rm dev npm run format`                                |
| Conferir a formatação            | `docker compose run --rm dev npm run format:check`                          |
| Tipos e schema                   | `docker compose run --rm dev npm run check`                                 |
| Build                            | `docker compose run --rm dev npm run build`                                 |
| Lighthouse (build e verificação) | `docker compose run --rm lighthouse`                                        |

- O serviço `dev` usa a imagem `node` da versão do `.nvmrc`; o serviço `lighthouse` usa a mesma imagem com o Chromium.
- As dependências ficam no volume `guizani-data-it_node_modules`, e não na pasta do projeto, porque o `node_modules` dentro de uma pasta montada do Windows é muito lento. Para reinstalar do zero: `docker compose down -v` e rodar a instalação de novo.
- Os relatórios do Lighthouse ficam em `logs/lighthouse/`, fora do git.

## Estrutura

```
src/pages/            páginas (português em /, inglês em /en/)
public/               arquivos servidos como estão (CNAME e, depois, favicon, PDFs, imagens)
scripts/              scripts do projeto (verificação do Lighthouse)
docs/                 briefing, regras e arquivos de controle do projeto
.github/              workflows do GitHub Actions e Dependabot
```

## Deploy

- **CI** (`.github/workflows/ci.yml`): a cada push na `main` e em cada pull request, confere que o Node do `.nvmrc` é o mesmo do `Dockerfile` e roda lint, Prettier, `astro check`, build e Lighthouse.
- **Deploy** (`.github/workflows/deploy.yml`): por enquanto só manual. Ele se recusa a publicar enquanto o GitHub Pages estiver publicando a partir de uma branch; a troca da origem para "GitHub Actions" é feita no lançamento.
- Até o lançamento, o site no ar é a landing page antiga, da branch `release/guizani-data-it`.

## Documentação do projeto

O briefing, as regras do git e os arquivos de controle (roadmap, testes, chamados e perguntas) ficam em [`docs/`](docs/). O [`CLAUDE.md`](CLAUDE.md) resume o projeto e as regras de trabalho.
