# Chamados · concluídos

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
