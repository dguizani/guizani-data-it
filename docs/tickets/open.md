# Chamados · abertos

### C-005 · Criar a conta no ImprovMX e configurar o e-mail no DNS

**Roadmap:** M-005 e M-009. Endereço definido na P-001: `contato@guizani.com.br`.

**Para:** o usuário, no ImprovMX e no Registro.br.

**Referência:** ImprovMX, domínio `guizani.com.br` (conta criada pelo usuário em 2026-10-29).

**Título:** Encaminhar o e-mail do domínio para o Gmail pelo ImprovMX.

**Descrição:** o domínio `guizani.com.br` não tem registro MX (conferido em 2026-10-28), então nenhum endereço `@guizani.com.br` recebe mensagens. O ImprovMX recebe as mensagens do `contato@guizani.com.br` (P-001) e encaminha para o Gmail, de graça; as respostas saem do próprio Gmail. O Cloudflare Email Routing foi descartado porque exigiria mover o DNS para a Cloudflare.

| Verificação | Encontrado (2026-10-28) | Esperado |
|---|---|---|
| `nslookup -type=MX guizani.com.br` | nenhum MX | `mx1.improvmx.com` (10) e `mx2.improvmx.com` (20) |
| `nslookup -type=TXT guizani.com.br` | a conferir | SPF com `include:spf.improvmx.com` |

**Sugestão de solução** (só uma sugestão; os valores certos são os que o painel do ImprovMX mostrar):
1. Antes de criar a conta, conferir em <https://improvmx.com/pricing> os limites do plano gratuito (domínios, aliases, mensagens por dia, tamanho do anexo) e avisar no chat se algo mudou. A alternativa já avaliada é o Forward Email.
2. Criar a conta em <https://improvmx.com>, informando o domínio `guizani.com.br` e o seu Gmail como destino.
3. Em **Aliases**, criar o alias `contato` (para `contato@guizani.com.br`) encaminhando para o Gmail. Não criar o alias `*` (pega tudo), que atrai spam.
4. O painel mostra os registros a criar. No Registro.br (**Entrar** → `guizani.com.br` → **DNS** → **Editar zona**), criar com **Nova entrada**:
   - tipo **MX**, nome em branco (o próprio domínio), dados `mx1.improvmx.com`, prioridade `10`;
   - tipo **MX**, nome em branco, dados `mx2.improvmx.com`, prioridade `20`;
   - tipo **TXT**, nome em branco, dados `v=spf1 include:spf.improvmx.com ~all`. Se já existir um TXT começando com `v=spf1`, não criar outro: juntar os dois num só e avisar no chat.
5. **Salvar alterações**, esperar a propagação e clicar em **Check again** no painel do ImprovMX até os registros ficarem verdes.
6. Nunca registrar aqui a senha do ImprovMX nem o endereço do Gmail.

**Casos de teste:**
1. `nslookup -type=MX guizani.com.br 8.8.8.8` mostra os dois servidores do ImprovMX.
2. Uma mensagem enviada de outra conta (não do próprio Gmail) para `contato@guizani.com.br` chega ao Gmail em poucos minutos.
3. O painel do ImprovMX mostra o domínio como ativo, sem erros.

**Andamento:**
- 2026-10-29: limites do plano gratuito conferidos pelo agente em <https://improvmx.com/pricing>: 1 domínio, 25 aliases, 500 mensagens por dia, sem envio por SMTP (as respostas saem do Gmail, como previsto). Antes da mudança, o domínio tinha só o TXT do Google (C-007), sem SPF. Conta criada e alias `contato` configurado pelo usuário; registros criados no Registro.br e verdes no painel do ImprovMX (caso 3 ok, conferido pelo usuário). Os dois MX (`mx1.improvmx.com` 10 e `mx2.improvmx.com` 20) e o SPF aparecem no `b.sec.dns.br`, no 8.8.8.8 e no 1.1.1.1, junto com o TXT do Google (caso 1 ok, conferido pelo agente). Falta o caso 2 (mensagem de teste).

### C-007 · Cadastrar o site no Google Search Console e enviar o sitemap

**Roadmap:** M-007 (sitemap e `robots.txt` publicados no Deploy `40980975780`) e M-009 (conferências do lançamento).

**Para:** o usuário, no Google Search Console e no Registro.br.

**Referência:** Google Search Console, propriedade de domínio `guizani.com.br` (aberto pelo usuário em 2026-10-29).

**Título:** Verificar o domínio `guizani.com.br` no Google Search Console e enviar o sitemap do `datait.guizani.com.br`.

**Descrição:** o site já publica o `sitemap-index.xml` e o `robots.txt` (M-007), mas o Google só descobre as páginas sozinho, com o tempo. O Search Console faz o Google ler o sitemap logo, mostra se as páginas `/` e `/en/` foram indexadas, por quais buscas o site aparece e avisa sobre erros. É gratuito e não muda nada no código.

| Verificação | Encontrado (2026-10-29) | Esperado |
|---|---|---|
| Propriedade no Search Console | nenhuma | propriedade de domínio `guizani.com.br` verificada |
| `nslookup -type=TXT guizani.com.br 8.8.8.8` | nenhum TXT | um TXT `google-site-verification=...` |
| Sitemap enviado | não | `https://datait.guizani.com.br/sitemap-index.xml` com o status "Sucesso" e 2 páginas encontradas |

**Sugestão de solução** (só uma sugestão; os valores certos são os que o painel do Google mostrar):
1. Entrar em <https://search.google.com/search-console> com a sua conta Google.
2. **Adicionar propriedade** → escolher **Domínio** (à esquerda) e digitar `guizani.com.br`. A propriedade de domínio vale para todos os subdomínios (`datait` e os que vierem) e para `http` e `https`, e é verificada pelo DNS, sem mexer no site. A alternativa é **Prefixo do URL** (`https://datait.guizani.com.br/`), verificada por uma tag no HTML, o que exigiria uma mudança no código.
3. O Google mostra um registro TXT, como `google-site-verification=abc123...`. Copiar o valor.
4. No Registro.br (**Entrar** → `guizani.com.br` → **DNS** → **Editar zona**), criar com **Nova entrada**: tipo **TXT**, nome em branco (o próprio domínio) e dados com o valor copiado. Se já existir um TXT (ex.: o SPF do ImprovMX, do C-005), criar outro: registros TXT diferentes convivem no mesmo nome, ao contrário do SPF, que precisa ser um só.
5. **Salvar alterações**, esperar a propagação (de minutos a algumas horas) e clicar em **Verificar** no Search Console. Se falhar, tentar de novo mais tarde; não apagar o TXT depois de verificado, porque o Google confere de tempos em tempos.
6. Já na propriedade verificada: menu **Sitemaps** → em "Adicionar um novo sitemap", digitar `https://datait.guizani.com.br/sitemap-index.xml` → **Enviar**.
7. Opcional: menu **Inspeção de URL** → colar `https://datait.guizani.com.br/` → **Solicitar indexação**; repetir com `/en/`.
8. Avisar no chat quando o sitemap aparecer como "Sucesso". Não é preciso passar nenhum código: o valor do TXT não é segredo, mas não precisa ficar registrado aqui.

**Casos de teste:**
1. `nslookup -type=TXT guizani.com.br 8.8.8.8` mostra o registro `google-site-verification`.
2. O Search Console mostra a propriedade `guizani.com.br` como verificada.
3. Em **Sitemaps**, o `sitemap-index.xml` aparece com o status "Sucesso" e 2 páginas encontradas.
4. Depois de alguns dias, em **Páginas**, `/` e `/en/` aparecem como indexadas (ou com o motivo, se não estiverem).

**Andamento:**
- 2026-10-29: TXT `google-site-verification` criado pelo usuário no Registro.br; publicado nos servidores do domínio em cerca de 1 minuto e visto no 8.8.8.8 e no 1.1.1.1 (caso 1 ok, conferido pelo agente). Propriedade verificada pelo usuário (caso 2 ok). Sitemap enviado com o status "Processado" (caso 3 ok, conferido pelo usuário). Na Inspeção de URL, `/` aparece como "O URL não está no Google", o esperado para um site recém-publicado; indexação solicitada. Falta o caso 4, que depende do Google (de alguns dias a duas semanas).
