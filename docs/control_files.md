# Arquivos de controle do projeto

Descrição da finalidade e do funcionamento dos arquivos de controle que todo projeto deve ter em `docs/`: quatro pastas, uma por tipo de item, e o `session.md`. Se for definido pelo usuário que os arquivos de controle do projeto são apenas locais, as pastas e o `session.md` deverão ser listados em `.git/info/exclude` e nunca subir para o git. Juntos, formam um sistema de acompanhamento do projeto:

| Caminho | Prefixo | Guarda |
|---|---|---|
| `roadmap/` | `M-NNN` | melhorias (o que fazer, decisões, passos) |
| `tests/` | `T-NNN` | roteiro de teste de cada alteração |
| `tickets/` | `C-NNN` | chamados que deverão ser abertos para terceiros |
| `questions/` | `P-NNN` | dúvidas que dependem de outras pessoas ou áreas |
| `session.md` | — | onde a última sessão parou |

**Estrutura das pastas:**

```
docs/
├── roadmap/
│   ├── README.md         # finalidade e Como usar
│   ├── in_progress.md
│   ├── pending.md
│   └── done.md
├── tests/
│   ├── README.md         # finalidade, Como usar e Pré-requisitos comuns
│   ├── pending.md        # com a Execução conjunta no topo
│   └── done.md
├── tickets/
│   ├── README.md
│   ├── to_open.md
│   ├── open.md
│   └── done.md
├── questions/
│   ├── README.md
│   ├── open.md
│   └── answered.md
└── session.md
```

**Regras comuns:**
- Os números (`M-`, `T-`, `C-`, `P-NNN`) são sequenciais e **nunca reaproveitados**. O próximo número é o maior encontrado por uma busca na pasta inteira + 1.
- Cada estado é um arquivo, e cada item vive numa seção `### <ID> · <título>` dentro do arquivo do estado atual. Mudar de estado é mover a seção inteira para o arquivo do novo estado (ex.: `pending.md` → `in_progress.md` → `done.md`). Itens novos entram no topo do arquivo.
- Os nomes das pastas e dos arquivos são em inglês e em `snake_case`. O conteúdo é escrito no idioma do projeto.
- Depois de mover um item, conferir com `git diff` (ou comparando os arquivos, quando são só locais) e com uma busca pelo `### <ID>` que a seção aparece inteira e em um arquivo só.
- O `README.md` de cada pasta guarda o que é estável (finalidade e **Como usar**) e só é relido quando a regra é necessária. Os arquivos de estado guardam só os itens.
- Os itens se referenciam pelos IDs: o `T-NNN` aponta para o `M-NNN` que testa, o `C-NNN` e o `P-NNN` apontam para a melhoria ou o teste de origem, e o efeito de uma resposta ou de um chamado volta para o `M-NNN`.
- O que for específico da tecnologia do projeto (como rodar, como testar, onde ficam os logs, ferramenta de chamados) é descrito no `README.md` da pasta, nas seções **Como usar** e **Pré-requisitos comuns**, e não neste documento.

**Como ler (regra para o agente de IA):**
- Arquivo de estado ativo (`in_progress.md`, `pending.md`, `to_open.md`, `open.md`) é lido inteiro, dentro dos limites de **Leitura de arquivos grandes**.
- Arquivo de estado encerrado (`done.md`, `answered.md`) nunca é lido inteiro: o índice é gerado na hora, por uma busca dos títulos com o número da linha (ex.: `grep -n "^### " docs/roadmap/done.md`), e só o intervalo do item é lido.
- Item citado por ID é encontrado por uma busca na pasta (ex.: `grep -rn "### M-012" docs/roadmap/`), sem abrir os arquivos de estado um por um.
- Se um arquivo encerrado passar dos limites de **Leitura de arquivos grandes**, ele pode ser dividido por ano (ex.: `done_2026.md`), e a busca continua valendo para a pasta inteira.

**Fluxo típico de uma melhoria:**
1. A ideia vira um `M-NNN` no `roadmap/pending.md`.
2. Debate com o usuário; as decisões aprovadas são registradas no `M-NNN`, e ele vai para o `roadmap/in_progress.md`.
3. Dúvida que depende de outra pessoa ou área vira `P-NNN` no `questions/open.md`; ação que só terceiros podem executar (acesso, infraestrutura, configuração, conta em serviço externo) vira `C-NNN` no `tickets/to_open.md`.
4. A implementação gera commits, anotados nos passos do `M-NNN`.
5. A alteração testável ganha um `T-NNN` no `tests/pending.md`; o teste é rodado (pelo agente de IA, quando há testes automatizados) e o usuário confirma.
6. Com o `T-NNN` validado, o `T-NNN` e o `M-NNN` vão para o `done.md` das suas pastas, com a data no Resultado.
7. Ao fim da sessão, o `session.md` é sobrescrito com o estado para retomar.

---

## Leitura de arquivos grandes

Regra para o agente de IA, que vale para qualquer arquivo (código, documentação, dados, logs, arquivos gerados). O limite é medido em **KB**, e não só em linhas, porque um arquivo de uma linha só (JSON, CSV ou código minificado) pode ter milhares de tokens. Como referência, 1 KB equivale a cerca de 250 a 350 tokens.

**Limites:**

| Medida | Limite | Acima do limite |
|---|---|---|
| Um arquivo | até 20 KB **e** até 500 linhas | inspecionar antes e ler só o trecho necessário |
| Linha mais longa | até 2.000 caracteres | não ler o arquivo cru: formatar ou extrair por script (ex.: indentar o JSON, separar as colunas do CSV) e ler o resultado por trecho |
| Soma dos arquivos lidos para a mesma tarefa | até 50 KB | resumir o que já foi lido (por escrito, no arquivo de controle ou na conversa) antes de ler mais, ou trocar a leitura por busca ou script |
| Um trecho | até 200 linhas ou 20 KB | dividir em mais trechos |

**Como aplicar:**
- Quando o tamanho não é conhecido, medir antes de ler, por comando ou script (ex.: `wc -c -l` para os bytes e as linhas, `wc -L` para a linha mais longa). Medir vários arquivos de uma vez, quando a tarefa envolve mais de um.
- Acima do limite, a ordem é: 1) a estrutura (índice, cabeçalhos, nomes de funções ou de chaves); 2) uma busca pelo termo; 3) só o intervalo de linhas necessário.
- Exceção: quando o usuário, o prompt ou o arquivo de instruções do agente (ex.: `CLAUDE.md`) pede a leitura completa de um arquivo, ele é lido inteiro, em trechos dentro do limite e em sequência, com o tamanho avisado antes, se passar de 50 KB.
- Saídas grandes guardadas pelo projeto (logs, descobertas, relatórios) seguem também a regra abaixo.

---

## Saídas grandes: guardar uma vez, ler por trecho

Saídas grandes ou caras de repetir são guardadas no repositório uma vez, convertidas para Markdown, para não precisarem rodar de novo. Exemplos: consultas de descoberta (catálogo, esquema, contagens, cruzamentos) em produção ou em sistemas externos, logs de execução, varreduras, relatórios de ferramentas e respostas de APIs. Como são grandes, são escritas e lidas de um jeito que economiza tokens.

**Onde e como guardar:**
- Uma pasta só para cada tipo de saída (ex.: `docs/discoveries/`), com um arquivo por execução: `<nome_da_saída>__<AAAA-MM-DD>.md`. As pastas usadas pelo projeto são descritas no **Como usar** do `tests/README.md`.
- Um `README.md` na pasta lista cada execução: data, nome, identificador da execução (run id, job id, hash do commit), origem (log, comando ou consulta), o que foi lido e onde está a interpretação.
- Só entram metadados e agregados (ex.: nomes e tipos de colunas, índices, contagens, distribuições, totais de erros por tipo). Antes, um script varre o conteúdo atrás de dados pessoais ou sensíveis (números longos, e-mails, documentos, telefones, nomes, chaves).
- Endereços internos (IP, host), URLs completas e credenciais ficam só em documentos locais, fora do git. O log cru continua em `logs/`, também fora do git.

**Formato do arquivo (gerado por script, nunca à mão):**
- Um **índice no topo**: uma tabela com a parte, o objeto e o intervalo de linhas (ex.: `| catálogo | tabela_x | 37–66 |`).
- Uma seção `###` por objeto (tabela, coleção, cruzamento, etapa do log), com a saída num bloco `text`.
- **Sem os espaços de alinhamento** da saída original: 2 ou mais espaços depois de um caractere viram 1, e o recuo do começo da linha é mantido. Isso costuma reduzir o arquivo em cerca de um terço sem perder informação.
- O script gera o arquivo em duas passadas: a primeira calcula as linhas de cada seção, e a segunda escreve o índice com os números certos.

**Interpretação separada da fonte crua:**
- A conclusão (o que a saída significa para o projeto) fica num texto curto à parte, no lugar onde ela é usada (ex.: nos Achados do `M-NNN` ou do `P-NNN`, ou no Resultado do `T-NNN`), com o caminho do arquivo da saída.
- O arquivo da saída é a fonte crua, consultada só quando a interpretação não basta.

**Como ler (regra para o agente de IA):**
- **Nunca ler um arquivo de saída grande inteiro:** eles podem ter milhares de linhas e dezenas de milhares de tokens.
- Ordem: 1) a interpretação curta; 2) o índice do arquivo; 3) só o intervalo de linhas do objeto (leitura com offset e limite) ou uma busca pelo termo (coluna, caminho, mensagem de erro).
- Antes de rodar uma consulta ou uma execução nova, conferir na pasta e nas interpretações se a informação já existe. A origem só é consultada para o que faltar, e a nova saída é guardada no mesmo formato.
- Log grande também é processado por script (dividido por seção, resumido e varrido), e não lido inteiro.

---

## `roadmap/`

**Para que serve:** controle das etapas de construção do projeto, com todas as melhorias, atuais e futuras. É a fonte do "o que vamos fazer e por quê". Nenhum código é escrito sem um `M-NNN` registrado antes.

**Estrutura:**
- `README.md`: a finalidade e uma seção **Como usar** com as regras.
- Três arquivos de estado: `in_progress.md` (em andamento), `pending.md` (pendentes, na ordem de execução) e `done.md` (concluídos). O `in_progress.md` pode ter uma nota no topo sobre melhorias que andam juntas.
- Cada `M-NNN` tem:
  - **Objetivo:** o problema ou o pedido, com a origem (pedido do usuário, falha num teste, incidente etc.) e a data;
  - **Depende de:** outras melhorias ou chamados;
  - **Contexto / Como é hoje / Achados / Ideias para o debate** (opcionais), quando a melhoria nasce de um problema ainda em análise;
  - **Decisões:** numeradas, com a data do debate e a indicação "aprovado pelo usuário". Decisão substituída fica riscada (`~~...~~`) com a nova ao lado;
  - **Passos:** checkboxes `[ ]`/`[x]`;
  - **Correções / Ajustes na implementação** (opcionais), quando algo muda depois da entrega;
  - **Commits:** hashes com uma descrição curta de cada um;
  - **Resultado:** data e resumo da validação (ou o motivo do cancelamento).

**Como funciona:**
- Ideia nova ou mudança de escopo cria (ou altera) uma seção no `pending.md` **antes** de qualquer código.
- Antes de executar, o tema é debatido com o usuário (o que fazer, como, riscos, melhorias); o resultado do debate entra em Decisões e Passos.
- Ao começar, a seção vai para o `in_progress.md`. Cada passo concluído é marcado `[x]` com os commits.
- Decisão tomada no meio do caminho entra nas Decisões da própria seção.
- A seção só vai para o `done.md` depois que o `T-NNN` ligado a ela for validado. Melhoria cancelada também vai para o `done.md`, com o motivo no Resultado.

---

## `tests/`

**Para que serve:** roteiro de teste de cada alteração testável. Diz o que rodar, onde rodar, o que esperar e guarda o resultado de cada execução. É o que libera uma melhoria para o `roadmap/done.md`.

**Estrutura:**
- `README.md`: a finalidade, **Como usar** e **Pré-requisitos comuns**: tudo o que vale para qualquer teste do projeto (ambiente onde os testes rodam, como preparar ou reiniciar esse ambiente, dependências instaladas, dados ou estado a limpar antes de rodar, como acompanhar a execução, onde salvar os logs).
- Dois arquivos de estado: `pending.md` (pendentes) e `done.md` (concluídos).
- **Execução conjunta**, no topo do `pending.md`: lista numerada, em ordem, de tudo o que precisa rodar para validar os pendentes numa rodada só (`comando/rotina → T-NNN`). Os itens feitos ficam riscados com "(ok em <data>)".
- Cada `T-NNN` tem:
  - **Roadmap:** o `M-NNN` que ele valida;
  - **Commits:** os commits testados;
  - **O que mudou:** resumo da alteração, onde ela aparece (tela, caminho, menu, comando, arquivo etc.) e os cenários de teste;
  - **Passos:** checkboxes, cada um com a ação a executar (comando, rotina, fluxo na interface etc.) e o resultado esperado (ex.: `7 passed, 0 failed`, tela X exibe Y);
  - **Resultado:** data (e hora) de cada execução e o que aconteceu, inclusive as falhas.

**Como funciona:**
- Toda alteração testável ganha um `T-NNN` no `pending.md`, e a Execução conjunta é atualizada junto.
- O usuário ou o agente de IA roda o teste e, quando houver, salva a saída ou o log em `logs/`; a validação é feita lendo essa saída (quando ela é grande, seguindo **Saídas grandes: guardar uma vez, ler por trecho**).
- **Quando o projeto tem testes automatizados:** o agente de IA roda **todos** eles (não só os da alteração) e informa o resultado. Ao usuário, ele entrega só o que mudou e onde ver (tela, caminho, menu, comando, arquivo etc.), sem roteiro de passos para executar. O usuário faz os próprios testes e avisa quando encontrar algo estranho. Para cada relato, o agente confere e responde se é:
  - um **bug novo**: o erro vai para o Resultado, como num passo que falha;
  - um **comportamento esperado**: com a explicação (a decisão ou a regra que define esse comportamento);
  - um **bug conhecido**: com o `M-NNN` em que ele já está mapeado para uma melhoria futura.
- Exceção à regra anterior: se o usuário pedir sugestões de teste, o agente sugere cenários (os que já cobriu nos testes automatizados ou outros novos), só como sugestão, sem criar testes por causa disso.
- Testes automatizados novos só são criados quando:
  - o usuário pede;
  - o usuário encontra um bug que não estava mapeado;
  - o agente, ao rodar o código por conta própria, encontra um bug que ele mesmo não tinha mapeado.

  Nos dois últimos casos, o teste novo cobre o bug encontrado.
- Cada passo é marcado `[x]` **só quando o usuário confirma** o resultado.
- Passo que falha: o erro (mensagem, trecho do log, comportamento observado) vai para o Resultado, e a seção fica no `pending.md` até a correção.
- Com todos os passos `[x]`, o Resultado recebe a data, e a seção vai para o `done.md` (o `M-NNN` ligado também pode ir para o `roadmap/done.md`).

---

## `tickets/`

**Para que serve:** rascunho dos chamados para pessoas, times ou serviços externos que precisam executar algo que o projeto não pode (ou não deve) fazer sozinho: criar acessos e permissões, provisionar infraestrutura, alterar configurações, liberar contas ou chaves de serviços externos. Cada chamado é escrito aqui antes de ser aberto na ferramenta usada (JIRA, GitHub Issues, e-mail etc.).

**Estrutura:**
- `README.md`: a finalidade e **Como usar** (inclui qual ferramenta recebe os chamados).
- Três arquivos de estado: `to_open.md` (a abrir), `open.md` (abertos) e `done.md` (concluídos).
- Cada `C-NNN` tem:
  - **Roadmap:** os `M-NNN` ligados;
  - **Para:** a pessoa, o time ou o serviço que atende;
  - **Histórico** (opcional): mudanças de escopo do pedido;
  - **Referência:** o número ou link do chamado na ferramenta (vazio até ser aberto);
  - **Título:** o título do chamado;
  - **Descrição:** contexto, regra esperada e a situação encontrada (de preferência numa tabela "verificação / encontrado / esperado", com a data e o teste que achou);
  - **Sugestão de solução:** comandos, configurações ou passos, deixando claro que é **só uma sugestão** e que quem atende segue a abordagem que achar melhor;
  - **Casos de teste:** numerados, com a verificação e o resultado esperado; o último pode ser um teste automatizado que cobre os demais.

**Como funciona:**
- O chamado nasce no `to_open.md`.
- Depois de aberto na ferramenta, vai para o `open.md` com a referência.
- Depois de validado pelos casos de teste, vai para o `done.md` com a data.
- O `M-NNN` e o `T-NNN` que dependem do chamado ficam com o passo "abrir o C-NNN" e "rodar de novo depois do atendimento".

---

## `questions/`

**Para que serve:** registro das dúvidas sobre o projeto (regras de negócio, requisitos, dados, integrações, decisões de produto) que dependem de outras pessoas ou áreas. Deixa cada pergunta pronta para enviar e guarda a resposta e o efeito dela no projeto.

**Estrutura:**
- `README.md`: a finalidade e **Como usar**.
- Dois arquivos de estado: `open.md` (abertas) e `answered.md` (respondidas).
- Cada `P-NNN` tem:
  - **Para:** a pessoa, a área ou o time que responde;
  - **Origem:** o `M-`/`T-`/`C-NNN` em que a dúvida surgiu, e a data;
  - **Contexto:** o que foi observado, **com números e evidências e sem dados sensíveis**;
  - **Pergunta:** o texto pronto para enviar (pode ser "reduzida" ou "reescrita" com a data, quando parte dela já foi respondida);
  - **Impacto:** o que muda com a resposta e o que fica bloqueado até lá;
  - **Achados** (opcionais): o que a investigação própria (código, histórico do git, documentação, versões anteriores) descobriu, cada um com a origem e a data;
  - **Conferência** (opcional): o achado confirmado ou refutado por consulta, experimento ou teste;
  - **Resposta:** data, quem respondeu e o conteúdo, mais o efeito no projeto;
  - **Status:** `a enviar`, `enviada (data, canal)` ou `respondida` (pode ser "respondida pela investigação própria, sem envio").

**Como funciona:**
- Toda dúvida que depende de outra pessoa ou área vira um `P-NNN` no `open.md`.
- A investigação própria vai sendo anexada como Achados e pode reduzir a pergunta.
- Quando a resposta chega, preenche-se a Resposta, o efeito é levado ao `M-NNN` de origem, e a seção vai para o `answered.md`.
- Pedido de ação a terceiros (criar acesso, liberar recurso, alterar configuração) **não** é pergunta: vira chamado (`tickets/`).

---

## `session.md`

**Para que serve:** passagem de bastão entre sessões de trabalho. Guarda o necessário para retomar sem reler o histórico: onde parou, o que vem a seguir e o que não pode ser esquecido. É um arquivo só, porque é sobrescrito a cada sessão e não tem estados.

**Estrutura:**
- Cabeçalho **Onde paramos**, seguido de um resumo do estado:
  - **Última sessão:** a data;
  - **Git:** branch, último commit, se está igual ao remoto e se há mudanças locais;
  - **Controles:** as outras quatro pastas;
  - estado de recursos transitórios (logs guardados, ambientes ou serviços de teste ativos, configurações temporárias, testes pendentes).
- **O que foi feito nesta sessão:** melhorias e testes concluídos, incidentes e correções (com commits), itens anotados para debate e decisões do usuário.
- **Foco atual:** o que está em execução (ou "nada em execução").
- **Próximos passos (em ordem):** lista numerada, cada item com o ID ligado.
- **Lembretes:** armadilhas, contornos e convenções aprendidos (ex.: como diagnosticar uma falha, cuidados com dados sensíveis nos logs, comandos que exigem passo manual).

**Como funciona:**
- O arquivo é **sobrescrito** (não acumulado) quando o usuário diz "finalizamos essa sessão".
- Quando o usuário diz "o que temos para hoje?", o `session.md` é lido inteiro, junto com os arquivos de estado ativos das quatro pastas (`roadmap/in_progress.md` e `pending.md`, `tests/pending.md`, `tickets/to_open.md` e `open.md`, `questions/open.md`). Os `README.md` e os arquivos encerrados não são lidos nesse momento. O estado é apresentado: onde paramos e os próximos passos.
