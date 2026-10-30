# Onde paramos

- **Última sessão:** 2026-10-29 (terceira sessão).
- **Git:** branch `main`; o último push foi o `769ff28` (Deploy `40980975780`, com o M-007). Depois dele, ficam só commits de documentação (o C-007 e este fechamento), à espera da autorização do push. Sem mudanças locais. Outras branches: `legacy/curriculo-2024` (currículo antigo, só consulta) e `release/guizani-data-it` (o site antigo, mantido até o M-009 para a volta; nunca fazer commit nela). Repositório `dguizani/guizani-data-it`.
- **Site no ar:** <https://datait.guizani.com.br> e `/en/`, publicado pelo workflow `Deploy` (GitHub Actions) a cada push na `main`, depois do CI. Já tem o M-011, o M-012, o M-013, o M-014 e o M-007. Para voltar ao site antigo: trocar a origem do Pages de novo para a `release/guizani-data-it` (`/`).
- **Controles:**
  - roadmap: M-001 a M-006 e M-010 a M-014 em `done.md`; M-007 em `in_progress.md` (todos os passos feitos, falta o T-012); M-008 e M-009 em `pending.md`;
  - testes: T-001 a T-011 em `done.md`; T-012 (SEO) pendente, à espera do usuário;
  - chamados: C-007 (Google Search Console) aberto, falta o caso 4 (indexação); C-002 (currículos em PDF), C-003 (Cloudflare) e C-005 (ImprovMX) a fazer; C-001, C-004 e C-006 concluídos;
  - perguntas: nenhuma aberta.
- **Recursos transitórios:**
  - servidor de desenvolvimento no contêiner `guizani-data-it-dev-1` (<http://localhost:4321>); para parar: `docker compose down`;
  - `logs/` (fora do git): logs das rodadas e do Lighthouse do M-007, do M-011 ao M-014, capturas em `logs/m013/`, `logs/m014/` e `logs/m012-*.png`, e os scripts de navegador automatizado em `logs/m014/` (`shots.mjs`, `edu.mjs`, `acc.mjs`); também os relatórios antigos, `npm-audit__2026-10-28.json`, as capturas de `m004` a `m006` e `logo-concepts/`;
  - `references/` (fora do git): a foto original (`image_3_1x1.png`) e o banner (`capa.fw.png`).

## O que foi feito nesta sessão

- **M-011 (ordem dos projetos e copyright):** os em andamento primeiro e, depois, pela data inicial; o rodapé virou uma constante no frontmatter (`ca3e4db`). T-008 validado.
- **M-013 (projetos em uma coluna):** os cards ficam um abaixo do outro; com 48rem ou mais (*container query*), o card se divide em duas colunas: o topo e a stack à esquerda, o problema e o papel à direita (`477e028`). T-009 validado.
- **M-014 (botão de voltar ao topo):** pedido do usuário; é um link para `#top` que aparece quando o hero sai da tela (`IntersectionObserver`) e fica sempre visível sem JavaScript (`ab36e71`). T-010 validado.
- **M-012 (formação e certificações):** seção entre as Skills e o Laboratório, com o Tecnólogo em Ciência de Dados (UNINTER) e a PCEP com o link de verificação (`0a72f74`, textos e brief em `1828e7e`). Ficaram de fora a Ufes (não concluída), o curso de Python básico da Fundação Bradesco, a monitoria e o link de validação do diploma (mostra o nome e o CPF parcial). T-011 validado.
- **M-007 (SEO):** título e descrição por idioma (bloco `seo`), canônico, Open Graph com imagem por idioma, cartão do X, favicon, `@astrojs/sitemap` 3.7.4 e `robots.txt` (`25faf8f`). As imagens saem do `npm run og` (`scripts/generate-images.ts` fotografa as páginas-molde `/og-template/`). Lighthouse 100 nas quatro categorias. Publicado; falta o T-012.
- **C-007 (Search Console), pedido do usuário:** TXT criado pelo usuário no Registro.br, propriedade de domínio `guizani.com.br` verificada, sitemap "Processado" e indexação de `/` solicitada.
- **Pushes autorizados:** `af5399d` (M-011 a M-014 e M-012, Deploy `40977789519`) e `769ff28` (M-007, Deploy `40980975780`).

## Foco atual

M-007 à espera do T-012 (conferência do usuário no site no ar).

## Próximos passos (em ordem)

1. Autorizar o push dos commits de documentação (o C-007 e este fechamento); o deploy roda, mas o site não muda.
2. Usuário: validar o T-012 (favicon e título na aba, LinkedIn Post Inspector, WhatsApp, sitemap e `robots.txt`) e fechar o M-007.
3. Usuário: daqui a alguns dias, conferir em **Páginas** do Search Console se `/` e `/en/` foram indexadas (caso 4 do C-007) e fechar o chamado.
4. Usuário: configurar o ImprovMX (C-005), para o `contato@guizani.com.br` receber e-mails; o TXT do Google e o SPF do ImprovMX convivem.
5. Usuário: entregar os currículos em PDF (C-002), para o link aparecer no contato (M-005).
6. Usuário: criar a conta no Cloudflare e passar o token (C-003), para o M-008.
7. M-008 (contagem de visitas) e M-009 (lançamento: e-mail, conferências finais e apagar a `release/guizani-data-it`, com autorização).

## Lembretes

- **Todo push na `main` publica o site** (o `Deploy` roda o CI antes; commit só de docs também dispara, sem mudar o site). Não commitar trabalho pela metade.
- **Rodar o `npm run og` de novo, e fazer o commit dos PNG,** sempre que mudar a frase do hero, a linha com o nome, o logo ou o `public/icon.svg` (comando no `README.md`). As páginas-molde `/og-template/` são publicadas com `noindex` e ficam fora do sitemap.
- **Capturas depois de rolar a página:** o `chromium --screenshot` não rola até a âncora. Usar o `puppeteer-core` que vem com o Lighthouse, dentro do serviço `lighthouse` (modelos em `logs/m014/`).
- **Nome acessível dos links:** extrair o texto do HTML gruda o rótulo no `<span class="visually-hidden">` ("VerificarPCEP"), mas o nome que o Chrome entrega aos leitores de tela tem o espaço. Conferir com o `page.accessibility.snapshot` (modelo em `logs/m014/acc.mjs`), não por regex.
- **No `.astro`, o Prettier quebra a linha antes de um `<span>` e o Astro descarta o espaço:** usar `{" "}` explícito ou montar o texto numa constante no frontmatter (como no `Footer.astro`).
- **Documentos pessoais do usuário** (diplomas e certificados em `G:\My Drive\...`) têm CPF, data de nascimento e códigos de validação: só ler o necessário e nunca copiar esses dados para o repositório, nem o link de validação do diploma.
- **DNS no Registro.br:** a alteração é publicada em cerca de 1 minuto; conferir no servidor do domínio (`nslookup -type=TXT guizani.com.br b.sec.dns.br`) e depois no 8.8.8.8.
- **O ambiente `github-pages` ainda tem a regra de branch `organizando_pastas`** (antiga, sem efeito). Tirar só se o usuário autorizar.
- **Depois de mudar o `schema.ts`, o servidor de desenvolvimento reinicia sozinho** (integração `watch-site-schema` no `astro.config.ts`). Se uma página mostrar dados velhos ou `undefined`, reiniciar com `docker compose restart dev` antes de procurar o defeito no código.
- **Não apagar a `.astro/` nem rodar builds em outro contêiner com o servidor de desenvolvimento no ar sem necessidade:** a pasta é compartilhada pelos contêineres. Para a rodada completa, parar o `dev` antes (`docker compose stop dev`) e subir depois.
- **A rodada completa parte de uma pasta limpa** (`rm -rf .astro dist`), como o CI; rodar sem isso escondeu um erro de lint uma vez.
- **ESLint nos `.astro`:** a `no-unsafe-return` está desligada (JSX dentro de `.map()`); não usar `name` como nome de propriedade (`no-deprecated`, confunde com `window.name`).
- **Commits:** escopo com o ID (`feat(M-007): ...`), nunca `git add .` (nem com `--dry-run`), conferir o stage antes de commitar, nunca `Co-Authored-By`, push só com autorização.
- **Python no Windows:** `write_text` grava CRLF; gravar com `write_bytes(texto.encode("utf-8"))`. `python -c` com várias linhas quebra no Git Bash: usar um heredoc (`python -I -X utf8 - <<'EOF'`).
- **A foto original e o banner não vão para o git:** só a cópia em `src/assets/profile.jpg`.
