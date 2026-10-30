---
marp: true
theme: guizani-cv
footer: Davi Guizani · datait.guizani.com.br
---

<!-- _class: first -->

# Davi Guizani

Engenheiro de dados · fundador da Guizani Data IT

contato@guizani.com.br · (27) 99794-2740 · [linkedin.com/in/davi-guizani](https://www.linkedin.com/in/davi-guizani/) · [github.com/dguizani](https://github.com/dguizani) · [datait.guizani.com.br](https://datait.guizani.com.br/)

## Resumo

Engenheiro de dados com mais de 5 anos de experiência e fundador da Guizani Data IT. Construo pipelines, data warehouses e automações para empresas de saúde, varejo, logística e investimentos, sempre com o mesmo objetivo: dados confiáveis, no lugar certo, para quem precisa decidir.

## Competências

- **Orquestração:** Apache Airflow, Docker
- **Bancos:** PostgreSQL, Oracle, SQL Server, MongoDB, MySQL
- **Processamento:** Python, SQL, pandas, PyArrow, Polars
- **Modelagem:** dimensional (stage, ODS, DW e flat)
- **BI:** Tableau, Power BI
- **Cloud:** AWS (Lambda, S3, Secrets Manager), Google Cloud
- **Automação:** SAP GUI, Selenium, Playwright
- **Governança:** Git, testes de dados, LGPD

## Idiomas

Português (nativo) · Inglês (técnico)

## Experiência

**Engenheiro de dados** · via consultoria ITIX · 2022 – atual

### TruckPad · Reestruturação do BI

Plataforma digital de fretes e pagamentos para o transporte rodoviário · 2026 – atual

- Responsável pela nova arquitetura do BI, que dependia de pipelines legados e de painéis sem controle de versão, com dados espalhados entre MongoDB, PostgreSQL e Oracle.
- Migração para o Airflow, stages incrementais do MongoDB e do PostgreSQL e DW dimensional em PostgreSQL, com frameworks de dimensão e fato e uma camada de views só de leitura para o Power BI.
- DAGs de teste, de backfill e de atualização dos painéis, versionamento dos painéis no Git e atendimento às solicitações de titulares da LGPD.

**Stack:** Python, Apache Airflow, MongoDB, PostgreSQL, Oracle, SQL Server, Power BI, Docker

### JSL · Automação do pagamento de notas

Grupo de logística de grande porte · 2025 - 2026

- Principal desenvolvedor do robô que substituiu o lançamento manual, no SAP, das requisições de compra das notas de serviço.
- O robô lê a planilha de governança, cruza com o faturamento enviado pelo fornecedor por e-mail, cria as requisições no SAP, padroniza os anexos e devolve o status e o aprovador à planilha, com uma interface desktop para a operação.
- Antes, de nov/2025 a mar/2026, um robô com Selenium para o mesmo cliente.

**Stack:** Python, SAP GUI Scripting, Selenium, pandas, MySQL, Microsoft 365 (MSAL), SharePoint, PySide6, pypdf

---

### Vita · Integração com o ERP Omie

Gestora de investimentos · 2025

- Parte do time que construiu uma API serverless que extrai os dados financeiros e operacionais da API do Omie, trata com pandas, grava no PostgreSQL e alimenta os dashboards.

**Stack:** Python, FastAPI, AWS Lambda (Mangum), API Gateway, Secrets Manager, S3, pandas, PostgreSQL

### Integral Médica · Customer Data Platform (CDP)

Grupo de nutrição esportiva e suplementos, com várias marcas · 2024 – 2026

- Um dos dois principais desenvolvedores da CDP, que reuniu numa visão única os dados de clientes espalhados entre e-commerce, marketplace, CRM, atendimento e redes sociais.
- Ingestão de VTEX, Shopify, AnyMarket, Salesforce Marketing Cloud, Zendesk, Instagram, TikTok e YouTube.
- Unificação do cliente (nome, e-mail, telefone, endereço, nascimento e gênero) com a origem de cada dado, DAGs de validação e a infraestrutura do Airflow em Docker.

**Stack:** Python, Apache Airflow, PostgreSQL, SQL Server, APIs REST, Google Cloud, Selenium, Docker

### Unimed de Goiânia · Data warehouse corporativo

Operadora de planos de saúde de grande porte · 2022 – 2025

- Engenheiro de dados no time que construiu e manteve o DW em camadas (stage, ODS, DW e tabelas flat), que substituiu relatórios manuais e consultas diretas ao sistema de gestão.
- Data marts de auditoria de autorizações, contas médicas, faturamento, controladoria, regulação médica, perfil e saúde da carteira, rede credenciada, sinistralidade e gestão de pessoas.
- Framework interno de stages, dimensões e fatos e publicação automática de extratos no Tableau.
- Em fev/2025, um projeto de RPA para o mesmo cliente.

**Stack:** Python, Apache Airflow, Oracle, PostgreSQL, SQLAlchemy, pandas, PyArrow, Tableau (Hyper API, Server Client), Docker

### Trabalhos pontuais

- **Skystone** (indústria de mineração), jul/2025: contribuição pontual num projeto de BI com Airflow e data warehouse.
- **Academia Foguete** (plataforma de streaming de cursos), mai – jun/2025: extração das informações de eventos via API e armazenamento no PostgreSQL, com Airflow e pandas.

## Formação e certificação

### Tecnólogo em Ciência de Dados

UNINTER · 2024 – 2026

### PCEP – Certified Entry-Level Python Programmer

Python Institute · jan/2025 · [verificar a certificação](https://verify.openedg.org/?id=vi42.dv6B.cUXq)

## Projetos pessoais

- **intern-data-rpa-course** (2026): curso de Python para dados e RPA que montei para estagiários.
- **[uninter](https://github.com/dguizani/uninter)** (2025 – 2026): trabalhos da graduação em Ciência de Dados, com uma análise do emprego formal (CAGED) em Linhares e um trabalho de processamento de linguagem natural.
- **[polars-python-studying](https://github.com/dguizani/polars-python-studying)** (2023 – 2025): comparação lado a lado entre pandas e Polars.
- **guizani-supermarket** (2022 – 2023): modelagem completa de um banco de dados relacional para uma rede de supermercados.
