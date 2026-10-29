# Chamados · concluídos

### C-006 · Trocar os registros A do `datait` por um CNAME

**Roadmap:** M-001 (decisão 7, de 2026-10-28) e conferido de novo no M-009.

**Para:** o usuário, no Registro.br.

**Referência:** zona DNS do Registro.br, alterada pelo usuário em 2026-10-28: os quatro registros A do `datait` foram apagados e o CNAME `datait` → `dguizani.github.io` foi criado. Conferido no mesmo dia no `b.sec.dns.br`, no `8.8.8.8` e no `1.1.1.1`; o site continua no ar (200, certificado válido até 2026-12-26). Aguardando a checagem do GitHub, que ainda via os registros A antigos em cache (`InvalidARecordError`).

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

**Resultado:** 2026-10-29, concluído. `nslookup -type=CNAME datait.guizani.com.br 8.8.8.8` responde `dguizani.github.io` (caso 1); `https://datait.guizani.com.br` responde 200 e `http://` redireciona com 301 para `https://` (caso 2); `gh api repos/dguizani/guizani-data-it/pages/health` responde `is_valid: true` e `is_cname_to_github_user_domain: true`, o equivalente ao "DNS check successful" (caso 3). A checagem do GitHub levou várias horas para sair do cache dos registros A antigos.

### C-001 · Entregar a foto de perfil e o banner do LinkedIn

**Roadmap:** M-004 e M-005.

**Para:** o usuário.

**Histórico:** 2026-10-28, a primeira entrega trazia outras imagens (não eram a foto de perfil nem o banner); o usuário trocou pelos arquivos certos no mesmo dia.

**Referência:** `references/image_3_1x1.png` (foto, 768 × 768) e `references/capa.fw.png` (banner, 4423 × 1152), entregues em 2026-10-28.

**Título:** Foto de perfil e banner do LinkedIn (referências da identidade visual).

**Descrição:** a foto entra na seção Sobre (otimizada no build). O banner é só inspiração para o fundo de circuito do hero e não entra no site. A foto antiga do currículo (`images/perfil-1.fw.png`, 9,7 MB) não é reaproveitada.

**Sugestão de solução** (só uma sugestão):
1. Salvar a foto e o banner, no maior tamanho que tiver, na pasta `references/` da raiz do projeto. Ela está no `.gitignore` e nunca vai para o git.
2. Avisar no chat. O agente copia uma versão da foto para `src/assets/` (essa vai para o git e é otimizada no build) e usa o banner só como referência.

**Casos de teste:**
1. Os dois arquivos estão em `references/`, e `git status` não os mostra.

**Resultado:** 2026-10-28, concluído. Os dois arquivos estão em `references/`, e `git status --ignored` mostra a pasta como ignorada (caso 1). A foto entra no `src/assets/` no M-005; o banner fica só como referência do `CircuitBackground` (M-004), sem os logos do Python.

### C-004 · Verificar o domínio no GitHub

**Roadmap:** M-001 (decisão 5, de 2026-10-28) e conferido de novo no M-009.

**Para:** o usuário, no GitHub e no Registro.br.

**Referência:** domínio `guizani.com.br` adicionado na conta e TXT `_github-pages-challenge-dguizani` criado no Registro.br pelo usuário em 2026-10-28, conferido no mesmo dia no `b.sec.dns.br`, no `8.8.8.8` e no `1.1.1.1`. `protected_domain_state` passou de `null` para `unverified`; o Verify ainda não passou.

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

**Resultado:** 2026-10-28, concluído. O TXT `_github-pages-challenge-dguizani` aparece no `b.sec.dns.br`, no `8.8.8.8` e no `1.1.1.1` (caso 1), e `gh api repos/dguizani/guizani-data-it/pages` mostra `protected_domain_state: verified` (casos 2 e 3).
