---
marp: true
theme: guizani-cv
footer: Davi Guizani · datait.guizani.com.br
---

<!-- _class: first -->

# Davi Guizani

Data engineer · founder of Guizani Data IT

contato@guizani.com.br · +55 27 99794-2740 · [linkedin.com/in/davi-guizani](https://www.linkedin.com/in/davi-guizani/) · [github.com/dguizani](https://github.com/dguizani) · [datait.guizani.com.br/en](https://datait.guizani.com.br/en/)

## Summary

Data engineer with more than 5 years of experience and the founder of Guizani Data IT. I build pipelines, data warehouses and automation for companies in healthcare, retail, logistics and investments, always with the same goal: reliable data, in the right place, for the people who make decisions.

## Skills

- **Orchestration:** Apache Airflow, Docker
- **Databases:** PostgreSQL, Oracle, SQL Server, MongoDB, MySQL
- **Processing:** Python, SQL, pandas, PyArrow, Polars
- **Modeling:** dimensional (stage, ODS, DW and flat)
- **BI:** Tableau, Power BI
- **Cloud:** AWS (Lambda, S3, Secrets Manager), Google Cloud
- **Automation:** SAP GUI, Selenium, Playwright
- **Governance:** Git, data testing, LGPD

## Languages

Portuguese (native) · English (technical)

## Experience

**Data engineer** · via the ITIX consultancy · 2022 – present

### TruckPad · BI restructuring

Digital freight and payments platform for road transport · 2026 – present

- Owner of the new BI architecture, which relied on legacy pipelines and dashboards without version control, with data scattered across MongoDB, PostgreSQL and Oracle.
- Migration to Airflow, incremental stages from MongoDB and PostgreSQL and a dimensional DW in PostgreSQL, with dimension and fact frameworks and a read-only view layer for Power BI.
- DAGs for testing, backfill and dashboard refresh, dashboard version control in Git, and handling of data subject requests under the LGPD (Brazil's data protection law).

**Stack:** Python, Apache Airflow, MongoDB, PostgreSQL, Oracle, SQL Server, Power BI, Docker

### JSL · Invoice payment automation

Large logistics group · 2025 - 2026

- Lead developer of the bot that replaced the manual entry, in SAP, of purchase requisitions for service invoices.
- The bot reads the governance spreadsheet, matches it against the billing the supplier sends by e-mail, creates the requisitions in SAP, standardizes the attachments and writes the status and the approver back to the spreadsheet, with a desktop interface for the operations team.
- Before that, from Nov 2025 to Mar 2026, a Selenium bot for the same client.

**Stack:** Python, SAP GUI Scripting, Selenium, pandas, MySQL, Microsoft 365 (MSAL), SharePoint, PySide6, pypdf

---

### Vita · Omie ERP integration

Investment management firm · 2025

- Part of the team that built a serverless API that extracts financial and operational data from the Omie API, transforms it with pandas, loads it into PostgreSQL and feeds the dashboards.

**Stack:** Python, FastAPI, AWS Lambda (Mangum), API Gateway, Secrets Manager, S3, pandas, PostgreSQL

### Integral Médica · Customer Data Platform (CDP)

Sports nutrition and supplements group with several brands · 2024 – 2026

- One of the two lead developers of the CDP, which brought into a single view the customer data scattered across e-commerce, marketplaces, CRM, customer service and social media.
- Ingestion from VTEX, Shopify, AnyMarket, Salesforce Marketing Cloud, Zendesk, Instagram, TikTok and YouTube.
- Customer unification (name, e-mail, phone, address, date of birth and gender) keeping the source of each field, validation DAGs and the Airflow infrastructure on Docker.

**Stack:** Python, Apache Airflow, PostgreSQL, SQL Server, REST APIs, Google Cloud, Selenium, Docker

### Unimed de Goiânia · Corporate data warehouse

Large health insurance provider · 2022 – 2025

- Data engineer on the team that built and maintained the layered DW (stage, ODS, DW and flat tables), which replaced manual reports and direct queries to the management system.
- Data marts for authorization audit, medical claims, billing, controllership, medical regulation, member portfolio profile and health, provider network, loss ratio and people management.
- An internal framework for stages, dimensions and facts, and automated publishing of extracts to Tableau.
- In Feb 2025, an RPA project for the same client.

**Stack:** Python, Apache Airflow, Oracle, PostgreSQL, SQLAlchemy, pandas, PyArrow, Tableau (Hyper API, Server Client), Docker

### Short engagements

- **Skystone** (mining company), Jul 2025: short contribution to a BI project with Airflow and a data warehouse.
- **Academia Foguete** (online course streaming platform), May – Jun 2025: extraction of event data through an API and storage in PostgreSQL, with Airflow and pandas.

## Education and certification

### Technologist degree in Data Science

UNINTER · 2024 – 2026

### PCEP – Certified Entry-Level Python Programmer

Python Institute · Jan 2025 · [verify the certification](https://verify.openedg.org/?id=vi42.dv6B.cUXq)

## Personal projects

- **intern-data-rpa-course** (2026): Python for data and RPA course I built for interns.
- **[uninter](https://github.com/dguizani/uninter)** (2025 – 2026): Data Science degree coursework, with an analysis of formal employment data (CAGED) in Linhares and a natural language processing assignment.
- **[polars-python-studying](https://github.com/dguizani/polars-python-studying)** (2023 – 2025): side-by-side comparison of pandas and Polars.
- **guizani-supermarket** (2022 – 2023): complete relational database model for a supermarket chain.
