# Chamados · a fazer

### C-006 · Trocar os registros A do `datait` por um CNAME

**Roadmap:** M-001 (decisão 7, de 2026-10-28) e conferido de novo no M-009.

**Para:** o usuário, no Registro.br.

**Referência:**

**Título:** Apontar o `datait.guizani.com.br` para o GitHub Pages por CNAME.

**Descrição:** hoje o `datait` aponta para o GitHub Pages por quatro registros A (`185.199.108.153` a `185.199.111.153`, conferido em 2026-10-28). Para subdomínios, o GitHub recomenda um CNAME para `<usuário>.github.io`: se o GitHub trocar os IPs, o site continua no ar sem mexer no DNS. Feito no M-001, junto com o C-004 (o Pages mostra "DNS check unsuccessful", `InvalidARecordError`, desde 2026-10-28); a troca não muda o que o site serve.

| Verificação | Encontrado (2026-10-28) | Esperado |
|---|---|---|
| `nslookup -type=CNAME datait.guizani.com.br` | sem CNAME, quatro registros A | CNAME `dguizani.github.io` |

**Sugestão de solução** (só uma sugestão; se a tela tiver mudado, vale o que o Registro.br mostrar):
1. Entrar em <https://registro.br> → **Entrar** → escolher o domínio `guizani.com.br` → **DNS** → **Editar zona**.
2. Apagar as quatro entradas do tipo **A** com o nome `datait` (ícone da lixeira em cada uma). Um nome com CNAME não pode ter outros registros, por isso elas saem antes.
3. **Nova entrada:** tipo **CNAME**, nome `datait`, dados `dguizani.github.io.` (com o ponto no fim, se o Registro.br pedir o nome completo).
4. **Salvar alterações** (o Registro.br pede para confirmar). A troca leva de alguns minutos a algumas horas para valer.
5. No GitHub, abrir Settings → Pages do repositório e conferir que o domínio aparece com "DNS check successful". Se o certificado for reemitido, esperar ele ficar pronto antes de conferir o "Enforce HTTPS".

**Casos de teste:**
1. `nslookup -type=CNAME datait.guizani.com.br 8.8.8.8` responde `dguizani.github.io`.
2. <https://datait.guizani.com.br> abre o site com o cadeado do HTTPS, e `http://datait.guizani.com.br` redireciona para `https://`.
3. A tela Settings → Pages mostra "DNS check successful".

### C-005 · Criar a conta no ImprovMX e configurar o e-mail no DNS

**Roadmap:** M-005 e M-009. Endereço definido na P-001: `contato@guizani.com.br`.

**Para:** o usuário, no ImprovMX e no Registro.br.

**Referência:**

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

### C-004 · Verificar o domínio no GitHub

**Roadmap:** M-001 (decisão 5, de 2026-10-28) e conferido de novo no M-009.

**Para:** o usuário, no GitHub e no Registro.br.

**Referência:**

**Título:** Verificar o `guizani.com.br` na conta `dguizani` do GitHub.

**Descrição:** com o domínio verificado, só os repositórios da conta `dguizani` podem publicar no `guizani.com.br` e nos subdomínios dele, o que impede alguém de apontar o `datait` para outro site no GitHub (por exemplo, num momento em que o domínio ficasse sem repositório). Hoje o domínio não está verificado (`protected_domain_state: null`, conferido em 2026-10-28). A verificação não muda nada no site no ar.

| Verificação | Encontrado (2026-10-28) | Esperado |
|---|---|---|
| github.com → Settings → Pages | sem domínio verificado | `guizani.com.br` com "Verified" |

**Sugestão de solução** (só uma sugestão):
1. No GitHub, clicar na sua foto (canto superior direito) → **Settings** → no menu da esquerda, em "Code, planning, and automation", **Pages**. É a página da conta, e não a do repositório.
2. **Add a domain** → digitar `guizani.com.br` (o domínio principal, que cobre o `datait`) → **Add domain**.
3. O GitHub mostra um registro TXT com um nome no formato `_github-pages-challenge-dguizani` e um valor (um código). Copiar os dois.
4. No Registro.br (**Entrar** → `guizani.com.br` → **DNS** → **Editar zona**) → **Nova entrada**: tipo **TXT**, nome `_github-pages-challenge-dguizani` (sem o `.guizani.com.br`, se o Registro.br completar sozinho), dados o código copiado → **Salvar alterações**.
5. Esperar alguns minutos (pode levar até 24 horas) e clicar em **Verify** no GitHub. Não apagar o registro TXT depois: o GitHub confere de tempos em tempos.

**Casos de teste:**
1. `nslookup -type=TXT _github-pages-challenge-dguizani.guizani.com.br 8.8.8.8` mostra o código.
2. A página Settings → Pages da conta mostra `guizani.com.br` como verificado.
3. `gh api repos/dguizani/<repositório>/pages` mostra `protected_domain_state` como `verified`.

### C-003 · Criar a conta no Cloudflare e o site no Web Analytics

**Roadmap:** M-008.

**Para:** o usuário, no Cloudflare.

**Referência:**

**Título:** Gerar o token do Cloudflare Web Analytics para o `datait.guizani.com.br`.

**Descrição:** a contagem de visitas usa o Cloudflare Web Analytics, que é gratuito, não usa cookies e funciona só com um script, sem mover o DNS para a Cloudflare. O script precisa de um token do site. O token não é secreto (fica visível no HTML do site) e pode ser passado no chat. A alternativa já avaliada é o Umami.

**Sugestão de solução** (só uma sugestão):
1. Criar uma conta gratuita em <https://dash.cloudflare.com/sign-up>. Não é preciso adicionar o domínio à Cloudflare nem trocar o DNS: se o painel oferecer isso, pular.
2. No painel, menu da esquerda → **Analytics & Logs** → **Web Analytics** → **Add a site**.
3. Em hostname, digitar `datait.guizani.com.br` → **Done**.
4. Escolher a instalação manual ("JS snippet"). O painel mostra um trecho como `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "..."}'></script>`.
5. Copiar só o valor do `token` e passar no chat.
6. Conferir na página de planos os limites atuais do Web Analytics gratuito e avisar se mudaram.

**Casos de teste:**
1. O site `datait.guizani.com.br` aparece na lista do Web Analytics.
2. Depois do M-008 publicado, uma visita feita pelo celular aparece no painel em alguns minutos.

### C-002 · Entregar os currículos em PDF

**Roadmap:** M-005.

**Para:** o usuário.

**Referência:**

**Título:** Currículos em PDF, em português e em inglês.

**Descrição:** o contato tem um link para o currículo em PDF, que segue o idioma da página. Os PDFs são feitos pelo usuário, fora do site, e ficam públicos em `public/`.

**Sugestão de solução** (só uma sugestão):
1. Exportar os dois currículos em PDF, de preferência com menos de 500 KB cada (fotos comprimidas).
2. Conferir que eles não têm dados que não devem ficar públicos (endereço completo, CPF, documentos) e que os contatos batem com os do site.
3. Salvar na pasta do projeto, em `public/`, com os nomes `davi-guizani-cv-pt.pdf` e `davi-guizani-cv-en.pdf`, e avisar no chat. O agente confere o tamanho e faz o commit.

**Casos de teste:**
1. Os dois arquivos estão em `public/` e abrem no navegador.
2. Na página em português, o link abre o PDF em português; em `/en/`, o PDF em inglês.

### C-001 · Entregar a foto de perfil e o banner do LinkedIn

**Roadmap:** M-004 e M-005.

**Para:** o usuário.

**Referência:**

**Título:** Foto de perfil e banner do LinkedIn (referências da identidade visual).

**Descrição:** a foto entra na seção Sobre (otimizada no build). O banner é só inspiração para o fundo de circuito do hero e não entra no site. A foto antiga do currículo (`images/perfil-1.fw.png`, 9,7 MB) não é reaproveitada.

**Sugestão de solução** (só uma sugestão):
1. Salvar a foto e o banner, no maior tamanho que tiver, na pasta `references/` da raiz do projeto. Ela está no `.gitignore` e nunca vai para o git.
2. Avisar no chat. O agente copia uma versão da foto para `src/assets/` (essa vai para o git e é otimizada no build) e usa o banner só como referência.

**Casos de teste:**
1. Os dois arquivos estão em `references/`, e `git status` não os mostra.
