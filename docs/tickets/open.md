# Chamados · abertos

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
