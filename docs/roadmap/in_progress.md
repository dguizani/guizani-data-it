# Roadmap · em andamento

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

**Passos:**
- [x] Receber do usuário os dados do LinkedIn (2026-10-29).
- [ ] Debater onde e como mostrar, e o que entra (decisões 1 a 3; falta a Ufes); atualizar o `docs/brief.md`.
- [ ] Textos nos dois idiomas no `docs/approved_content.md`, revisados pelo usuário.
- [ ] Schema e dados no `site.yaml`.
- [ ] Componente da seção, nos dois idiomas e nos dois temas.
- [ ] `T-NNN` com a seção nova no celular e no desktop.

**Commits:**

**Resultado:**
