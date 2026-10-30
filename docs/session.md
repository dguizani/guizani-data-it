# Onde paramos

- **Última sessão:** 2026-10-29 (quarta sessão).
- **Git:** branch `main`; o último push foi o `769ff28` (Deploy `40980975780`, com o M-007). Depois dele, 16 commits locais, que o usuário ficou de enviar no fim da sessão: os de documentação e os do M-015 (`d4eaa4e`, `7b83ec6`, `854af51`), que **mudam o site** (link do currículo no contato). Sem mudanças locais. Outras branches: `legacy/curriculo-2024` (currículo antigo, só consulta) e `release/guizani-data-it` (o site antigo, mantido até o M-009 para a volta; nunca fazer commit nela). Repositório `dguizani/guizani-data-it`.
- **Site no ar:** <https://datait.guizani.com.br> e `/en/`, publicado pelo workflow `Deploy` (GitHub Actions) a cada push na `main`, depois do CI. Para voltar ao site antigo: trocar a origem do Pages de novo para a `release/guizani-data-it` (`/`).
- **Controles:**
  - roadmap: M-001 a M-006 e M-010 a M-014 em `done.md`; M-007 e M-015 em `in_progress.md`; M-008 e M-009 em `pending.md`;
  - testes: T-001 a T-011 em `done.md`; T-012 (SEO) à espera só do LinkedIn em português; T-013 (currículos) à espera da conferência no site no ar;
  - chamados: C-002 (currículos) e C-007 (Search Console) abertos; C-003 (Cloudflare) a fazer; C-001, C-004, C-005 e C-006 concluídos;
  - perguntas: nenhuma aberta.
- **Recursos transitórios:**
  - servidor de desenvolvimento no contêiner `guizani-data-it-dev-1` (<http://localhost:4321>); para parar: `docker compose down`;
  - `logs/` (fora do git): as rodadas do M-015 (`m015-full-run__2026-10-29.log` e `m015-full-run-2__2026-10-29.log`), as capturas dos currículos em `logs/cv/`, os logs do M-007 e do M-011 ao M-014, os scripts de navegador automatizado em `logs/m014/` e os relatórios antigos;
  - `references/` (fora do git): a foto original e o banner.

## O que foi feito nesta sessão

- **T-012 (SEO):** usuário confirmou a rodada completa, a aba do navegador, o WhatsApp, o sitemap e o `robots.txt`. No LinkedIn Post Inspector, a prévia em português sai borrada (a `pt.png` está nítida no site; suspeita de cache do LinkedIn). Decisão 6 do M-007: não mudar o código e inspecionar de novo a partir de 2026-11-05.
- **C-005 (ImprovMX), concluído:** conta e alias `contato` criados pelo usuário; dois MX e o SPF no Registro.br, convivendo com o TXT do Google; mensagem de teste chegou ao Gmail. O passo do e-mail do M-009 ficou feito.
- **M-015 (currículos em Markdown para o Marp), pedido do usuário:** `cv/cv-pt.md`, `cv/cv-en.md` e o tema A4 `cv/theme.css`, registrado no `.vscode/settings.json` (`d4eaa4e`); só o que o site mostra, sem foto, cidade nem CNPJ, inglês "técnico". O usuário gerou os PDFs pela extensão do VS Code em `public/`, e o bloco `contact.resume` do `site.yaml` fez o link aparecer no contato (`7b83ec6`); depois, a pedido do usuário, o link passou a abrir em outra aba (`854af51`). Rodada completa verde e Lighthouse 100. T-013 validado no localhost.

## Foco atual

Nada em execução. M-015 (e C-002) à espera da conferência do link no site no ar; M-007 à espera do LinkedIn.

## Próximos passos (em ordem)

1. Conferir se o `Deploy` do push do usuário passou e se o link do currículo abre o PDF certo, em outra aba, em `/` e em `/en/` no site no ar (último passo do T-013); fechar o T-013, o M-015 e o C-002.
2. A partir de 2026-11-05: inspecionar `/` de novo no LinkedIn Post Inspector (fecha o T-012 e o M-007) e conferir em **Páginas** do Search Console se `/` e `/en/` foram indexadas (caso 4 do C-007).
3. Usuário: criar a conta no Cloudflare e passar o token (C-003), para o M-008.
4. M-008 (contagem de visitas) e M-009 (lançamento: conferências finais e apagar a `release/guizani-data-it`, com autorização).

## Lembretes

- **Todo push na `main` publica o site** (o `Deploy` roda o CI antes; commit só de docs também dispara, sem mudar o site). Não commitar trabalho pela metade.
- **Currículos:** os fontes são os `cv/*.md`; os PDFs em `public/` são gerados pelo usuário (extensão do Marp no VS Code, "Marp: Export Slide Deck..." → PDF). O Marp não quebra página: cada `---` é uma página A4 fixa, e o excesso é cortado sem aviso. Depois de mudar um currículo, conferir com `docker compose run --rm --no-deps -e CHROME_NO_SANDBOX=1 lighthouse sh -c 'npx -y @marp-team/marp-cli@4 --theme-set cv/theme.css --images png -o logs/cv/cv-pt.png cv/cv-pt.md'` (um arquivo por vez) e ler as capturas; o contêiner usa a DejaVu Sans, mais larga que a Segoe UI do usuário. Quando um projeto mudar no `site.yaml`, atualizar os currículos à mão e pedir PDFs novos.
- **Conferir PDFs:** o Git Bash tem `pdftotext` e `pdfinfo` (texto, páginas, metadados e links com `pdfinfo -url`).
- **Rodar o `npm run og` de novo, e fazer o commit dos PNG,** sempre que mudar a frase do hero, a linha com o nome, o logo ou o `public/icon.svg`. Se o LinkedIn ou o WhatsApp mostrarem a imagem antiga, a primeira opção é a marca de versão automática no endereço da imagem (decisão 6 do M-007).
- **Capturas depois de rolar a página:** o `chromium --screenshot` não rola até a âncora. Usar o `puppeteer-core` que vem com o Lighthouse, dentro do serviço `lighthouse` (modelos em `logs/m014/`).
- **Nome acessível dos links:** conferir com o `page.accessibility.snapshot` (modelo em `logs/m014/acc.mjs`), não por regex no HTML.
- **No `.astro`, o Prettier quebra a linha antes de um `<span>` e o Astro descarta o espaço:** usar `{" "}` explícito (como no link do currículo do `Contact.astro`) ou montar o texto numa constante no frontmatter.
- **Documentos pessoais do usuário** têm CPF, data de nascimento e códigos de validação: só ler o necessário e nunca copiar esses dados para o repositório, nem o link de validação do diploma.
- **DNS no Registro.br:** a alteração é publicada em cerca de 1 minuto; conferir no servidor do domínio (`nslookup -type=TXT guizani.com.br b.sec.dns.br`) e depois no 8.8.8.8. O domínio tem os MX do ImprovMX, o SPF `v=spf1 include:spf.improvmx.com ~all` e o TXT do Google: um SPF só, TXT diferentes convivem.
- **O ambiente `github-pages` ainda tem a regra de branch `organizando_pastas`** (antiga, sem efeito). Tirar só se o usuário autorizar.
- **Depois de mudar o `schema.ts`, o servidor de desenvolvimento reinicia sozinho.** Se uma página mostrar dados velhos ou `undefined`, reiniciar com `docker compose restart dev`.
- **A rodada completa parte de uma pasta limpa** (`rm -rf .astro dist`), como o CI, com o `dev` parado antes (`docker compose stop dev`) e iniciado depois (`docker compose start dev`): a `.astro/` é compartilhada pelos contêineres.
- **ESLint nos `.astro`:** a `no-unsafe-return` está desligada (JSX dentro de `.map()`); não usar `name` como nome de propriedade.
- **Commits:** escopo com o ID (`feat(M-015): ...`), nunca `git add .`, conferir o stage antes de commitar, nunca `Co-Authored-By`, push só com autorização.
- **Python no Windows:** gravar com `write_bytes(texto.encode("utf-8"))`; `python -c` com várias linhas quebra no Git Bash: usar um heredoc (`python -I -X utf8 - <<'EOF'`).
- **A foto original e o banner não vão para o git:** só a cópia em `src/assets/profile.jpg`.
