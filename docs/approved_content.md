# Conteúdo aprovado

Subseção **Conteúdo aprovado** da seção 2 do prompt de construção, copiada sem alteração em 2026-10-28. É a fonte dos textos do `src/data/site.yaml` (M-003).


Os textos abaixo foram aprovados pelo usuário em português. A versão em inglês é sua: escreva-a no mesmo tom, para o usuário revisar. Quando o usuário mandar um texto novo, do jeito dele, recomende a versão nos dois idiomas seguindo o padrão de escrita do site todo.

Os cards podem usar contagens do trabalho do usuário (ex.: "11 áreas de negócio", "8 fontes de dados"), mas **nunca** números do negócio do cliente (faturamento, volume de clientes), detalhes internos, prints ou código.

Todos os projetos de clientes foram feitos pela consultoria **ITIX**, e no site o cliente vem em destaque, com a consultoria ao lado (ex.: "Unimed de Goiânia, via ITIX"). Cada cliente tem no YAML o campo `cliente_publico` (chave em inglês, ex.: `isClientPublic`), ligado em todos no lançamento, e a descrição do setor: desligado, o nome do cliente é trocado pelo setor, sem reescrever o card.

| Cliente | Setor (quando o nome não puder aparecer) |
|---|---|
| Unimed de Goiânia | operadora de planos de saúde de grande porte |
| TruckPad | plataforma digital de fretes e pagamentos para o transporte rodoviário |
| Integral Médica | grupo de nutrição esportiva e suplementos, com várias marcas |
| JSL | grupo de logística de grande porte |
| Vita | gestora de investimentos |
| Skystone | indústria de mineração |
| Academia Foguete | plataforma de streaming de cursos |

**Projetos principais** (card completo):

- **Unimed de Goiânia, via ITIX: data warehouse corporativo** (2022–2025)
  - **Problema:** as áreas de negócio de uma das maiores operadoras de saúde do país dependiam de relatórios manuais e consultas diretas ao sistema de gestão, sem uma visão única dos dados.
  - **Papel:** engenheiro de dados no time que construiu e manteve o DW em camadas (stage, ODS, DW e tabelas flat), com data marts de auditoria de autorizações, contas médicas, faturamento, controladoria, regulação médica, perfil e saúde da carteira, rede credenciada, sinistralidade e gestão de pessoas; um framework interno de stages, dimensões e fatos; e a publicação automática de extratos no Tableau.
  - **Stack:** Python, Apache Airflow, Oracle, PostgreSQL, SQLAlchemy, pandas, PyArrow, Tableau (Hyper API e Server Client) e Docker.
- **TruckPad, via ITIX: reestruturação do BI** (2026, em andamento)
  - **Problema:** o BI dependia de pipelines legados e de painéis sem controle de versão, com dados espalhados entre MongoDB, PostgreSQL e Oracle.
  - **Papel:** responsável pela nova arquitetura: migração para o Airflow, stages incrementais do MongoDB e do PostgreSQL, DW dimensional em PostgreSQL com frameworks de dimensão e fato, uma camada de views só de leitura para o Power BI, DAGs de teste, de backfill e de atualização dos painéis, versionamento dos painéis no Git e atendimento às solicitações de titulares da LGPD.
  - **Stack:** Python, Apache Airflow, MongoDB, PostgreSQL, Oracle, SQL Server, Power BI e Docker.
- **Integral Médica, via ITIX: Customer Data Platform (CDP)** (2024–2026)
  - **Problema:** dados de clientes das várias marcas do grupo espalhados entre e-commerce, marketplace, CRM, atendimento e redes sociais, sem uma visão única do cliente.
  - **Papel:** um dos dois principais desenvolvedores: ingestão de VTEX, Shopify, AnyMarket, Salesforce Marketing Cloud, Zendesk, Instagram, TikTok e YouTube; unificação do cliente (nome, e-mail, telefone, endereço, nascimento e gênero) com a origem de cada dado; DAGs de validação; e a infraestrutura do Airflow em Docker.
  - **Stack:** Python, Apache Airflow, PostgreSQL, SQL Server, APIs REST, Google Cloud, Selenium e Docker.
- **JSL, via ITIX: automação do pagamento de notas** (2026)
  - **Problema:** as requisições de compra das notas de serviço eram lançadas à mão no SAP, a partir de planilhas, e-mails e anexos do SharePoint.
  - **Papel:** principal desenvolvedor do robô que lê a planilha de governança, cruza com o faturamento enviado pelo fornecedor por e-mail, cria as requisições no SAP, padroniza os anexos e devolve o status e o aprovador à planilha, com uma interface desktop para a operação.
  - **Stack:** Python, SAP GUI Scripting, Selenium, pandas, MySQL, Microsoft 365 (MSAL), SharePoint, PySide6 e pypdf.
- **Vita, via ITIX: integração com o ERP Omie** (2025)
  - **Problema:** os dados financeiros e operacionais do ERP Omie não estavam integrados a relatórios e dashboards.
  - **Papel:** parte do time que construiu uma API serverless que extrai os dados da API do Omie, trata com pandas, grava no PostgreSQL e alimenta os dashboards.
  - **Stack:** Python, FastAPI, AWS Lambda (Mangum), API Gateway, Secrets Manager, S3, pandas e PostgreSQL.

**Participação pontual** (seção própria, uma linha por projeto, sem card completo):

- **Skystone, via ITIX: BI** (2025-07): contribuição pontual num projeto de BI com Airflow e data warehouse.
- **Academia Foguete, via ITIX: análise de dados** (2025-05 a 2025-06): extração das informações de eventos via API e armazenamento no PostgreSQL (Airflow, PostgreSQL e pandas), para uma plataforma de streaming de cursos.

**Linha do tempo** (uma linha cada; experiências próximas de dados, sem card): além dos projetos acima, entram os RPAs:

- **JSL, via ITIX: robô com Selenium** (2025-11 a 2026-03);
- **Unimed de Goiânia, via ITIX: RPA** (2025-02).

**SEO** (M-007, aprovado em 2026-10-29):

- **Título:** Guizani Data IT · Engenharia de dados | Davi Guizani / Guizani Data IT · Data engineering | Davi Guizani.
- **Descrição:** Davi Guizani, engenheiro de dados: pipelines, data warehouses e automações para empresas que precisam confiar nos próprios dados. / Davi Guizani, data engineer: pipelines, data warehouses and automation for companies that need to trust their own data.

**Formação e certificações** (M-012, aprovado em 2026-10-29; seção entre as skills e o laboratório, uma linha por item; a Ufes, o curso de Python básico da Fundação Bradesco e a monitoria ficam de fora):

- **Título da seção:** Formação e certificações / Education and certifications.
- **Formação:** Tecnólogo em Ciência de Dados · UNINTER · 2024 – 2026 / Technologist degree in Data Science · UNINTER · 2024 – 2026.
- **Certificação:** PCEP – Certified Entry-Level Python Programmer · Python Institute · jan. 2025 · Verificar / Verify (link para a verificação oficial da OpenEDG).

**Laboratório** (projetos pessoais e de estudo ligados a engenharia de dados; só os repositórios públicos ganham link para o código):

| Projeto | Período | Tecnologias | Repositório |
|---|---|---|---|
| `polars-python-studying` | 2023–2025 | Polars | público: <https://github.com/dguizani/polars-python-studying> |
| `python-financeiro-pessoal` | 2025 | DuckDB | público: <https://github.com/dguizani/python-financeiro-pessoal> |
| `uninter` | 2025–2026 | pandas e matplotlib | público: <https://github.com/dguizani/uninter> |
| `guizani-supermarket` | 2022–2023 | PostgreSQL e SQL | privado, sem link |
| `intern-data-rpa-course` | 2026 | curso de Python para dados e RPA para estagiários | privado, sem link |

Escreva a descrição de uma linha de cada item do Laboratório lendo o README do repositório público (ou perguntando ao usuário, no caso dos privados), e mostre ao usuário antes de gravar.

**Serviços da Guizani Data IT:**

1. **Pipelines e integração de dados:** ETL/ELT com Airflow, ingestão de APIs, bancos e redes sociais, cargas incrementais e unificação de clientes (CDP).
2. **Data Warehouse e BI:** modelagem dimensional, data marts, Tableau e Power BI.
3. **Modernização e governança de dados:** migração de BI legado, versionamento dos pipelines e dos painéis, testes de dados e LGPD.
4. **Automação de processos:** RPA com SAP, Selenium e Microsoft 365, e APIs de integração (ex.: ERP).

**Skills (agrupadas):**

- **Orquestração:** Apache Airflow e Docker.
- **Bancos:** PostgreSQL, Oracle, SQL Server, MongoDB e MySQL.
- **Processamento:** Python, SQL, pandas, PyArrow e Polars.
- **Modelagem:** dimensional (stage, ODS, DW e flat).
- **BI:** Tableau e Power BI.
- **Cloud:** AWS (Lambda, S3, Secrets Manager) e Google Cloud.
- **Automação:** SAP GUI, Selenium e Playwright.
- **Governança:** Git, testes de dados e LGPD.

**Sobre:** curto. Parta do texto atual da `release/guizani-data-it` (engenheiro de dados, fundador da Guizani Data IT, experiência em saúde, varejo, logística e investimentos) e proponha uma versão nova ao usuário.

