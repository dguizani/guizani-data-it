# Chamados · abertos

### C-002 · Entregar os currículos em PDF

**Roadmap:** M-005 e M-015 (os currículos passaram a ser escritos pelo agente em Markdown para o Marp; os PDFs continuam gerados pelo usuário).

**Para:** o usuário.

**Referência:** M-015 e T-013.

**Título:** Currículos em PDF, em português e em inglês.

**Descrição:** o contato tem um link para o currículo em PDF, que segue o idioma da página. Os PDFs são feitos pelo usuário, fora do site, e ficam públicos em `public/`.

**Sugestão de solução** (só uma sugestão):
1. Exportar os dois currículos em PDF, de preferência com menos de 500 KB cada (fotos comprimidas).
2. Conferir que eles não têm dados que não devem ficar públicos (endereço completo, CPF, documentos) e que os contatos batem com os do site.
3. Salvar na pasta do projeto, em `public/`, com os nomes `davi-guizani-cv-pt.pdf` e `davi-guizani-cv-en.pdf`, e avisar no chat. O agente confere o tamanho e faz o commit.

**Casos de teste:**
1. Os dois arquivos estão em `public/` e abrem no navegador.
2. Na página em português, o link abre o PDF em português; em `/en/`, o PDF em inglês.

**Andamento:**
- 2026-10-29: PDFs gerados pelo usuário com a extensão do Marp no VS Code e salvos em `public/` (57 KB e 59 KB, 2 páginas A4 cada); conteúdo e metadados conferidos pelo agente. Link no contato pelo bloco `contact.resume` do `site.yaml`, abrindo em outra aba (`7b83ec6`, `854af51`). Casos 1 e 2 ok no servidor de desenvolvimento, confirmados pelo usuário (T-013). Falta repetir no site no ar, depois do push.

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
