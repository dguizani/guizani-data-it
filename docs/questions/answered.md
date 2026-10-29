# Perguntas · respondidas

### P-002 · Itens do Laboratório sem descrição

**Para:** o usuário.

**Origem:** M-003, 2026-10-28.

**Contexto:** a descrição de cada item do Laboratório vem do README do repositório público ou, nos privados, do usuário. Três itens não têm de onde tirar a descrição:
- `python-financeiro-pessoal` (2025, DuckDB, público): o repositório só tem `.gitignore`, `LICENSE` e um README vazio, com um commit só (2025-09-26), nas branches `main` e `develop`. Um link para ele levaria o visitante a um repositório vazio.
- `guizani-supermarket` (2022–2023, PostgreSQL e SQL, privado).
- `intern-data-rpa-course` (2026, privado): entrou no `site.yaml` com a descrição proposta "Curso de Python para dados e RPA que montei para estagiários" (EN: "Python for data and RPA course I built for interns").

**Pergunta:**
1. `python-financeiro-pessoal`: o código com DuckDB está em outro lugar ou ainda vai subir? Qual é a descrição? Até o código subir, a sugestão é mostrar o item sem link.
2. `guizani-supermarket`: o que é o projeto (uma linha)?
3. `intern-data-rpa-course`: a descrição proposta está certa?
4. `uninter`: incluir NLTK, scikit-learn e Base dos Dados nas tecnologias, além de pandas e matplotlib?

**Impacto:** os itens 1 e 2 ficam fora do `site.yaml` até a resposta; os itens 3 e 4 podem mudar o texto e a lista de tecnologias. Não bloqueia o resto do M-003.

**Resposta:** 2026-10-28, o usuário, na conversa: 1) o `python-financeiro-pessoal` não vai ser usado; 2) `guizani-supermarket`: "modelagem completa de um banco de dados relacional para uma rede de supermercados"; 3) e 4) aprovados (a descrição do curso para estagiários fica como proposta, e o `uninter` ganha NLTK, scikit-learn e Base dos Dados). Efeito no M-003: o `python-financeiro-pessoal` sai do Laboratório, e o `guizani-supermarket` entra sem link, com a versão em inglês "Complete relational database model for a supermarket chain."

**Status:** respondida.

### P-001 · Endereço final do e-mail no domínio

**Para:** o usuário.

**Origem:** M-005 (contato) e C-005 (ImprovMX), 2026-10-28.

**Contexto:** o contato do site tem um e-mail no domínio `guizani.com.br`, encaminhado gratuitamente pelo ImprovMX para o Gmail do usuário. Hoje o domínio não tem registro MX (conferido em 2026-10-28), então nenhum endereço `@guizani.com.br` recebe mensagens. O endereço vai ficar público no site e no currículo.

**Pergunta:** qual endereço o site vai usar? A sugestão é `contato@guizani.com.br`. Outras opções: `davi@guizani.com.br` (mais pessoal, combina com o site centrado em você) ou `datait@guizani.com.br` (ligado à marca).

**Impacto:** bloqueia o link de e-mail do contato (M-005) e a configuração do alias no ImprovMX (C-005).

**Resposta:** 2026-10-28, o usuário, na conversa: o endereço é `contato@guizani.com.br`. Efeito: o M-005 usa esse endereço no contato, e o C-005 cria o alias `contato` no ImprovMX.

**Status:** respondida.
