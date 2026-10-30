# Chamados · a fazer

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
