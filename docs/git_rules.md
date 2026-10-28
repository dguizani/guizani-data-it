# Regras do git

Regras de uso do git e da codificação dos arquivos deste projeto. As escolhas específicas do projeto ficam em **Definições do projeto**, no fim do arquivo.

## Commits

- Cada commit contém um arquivo, ou um conjunto de arquivos que fazem parte da mesma lógica (uma mesma alteração). Alterações independentes vão em commits separados, mesmo quando feitas ao mesmo tempo.
- Os arquivos entram no stage pelo nome: `git add <arquivo> [<arquivo> ...]`. **Nunca** usar `git add .`, `git add -A`, `git add --all` ou `git commit -a`.
- Antes de cada commit, conferir o stage com `git status` e `git diff --staged`, para garantir que só está indo o que pertence àquela lógica.
- Todo commit deixa o projeto funcionando: o build e os testes passam. Trabalho pela metade não é commitado.
- O commit pode ser feito sem pedir autorização sempre que houver uma entrega significativa (ex.: um passo de um teste concluído, ou o teste inteiro validado). O **push** sempre precisa da autorização do usuário.

## Mensagem do commit

- Formato Conventional Commits: `<tipo>(<escopo>): <resumo>`, com os tipos `feat`, `fix`, `docs`, `refactor`, `test` e `chore`.
- Resumo no imperativo, com até cerca de 72 caracteres, no idioma definido para o projeto. Quando o motivo da alteração não for óbvio, ele vai no corpo da mensagem.
- O autor do commit é só o usuário local (o `user.name` e o `user.email` do git). **Nunca** incluir `Co-Authored-By` nem qualquer menção à IA (assinatura, link, "gerado por") nas mensagens de commit, nem na descrição de pull requests.
- Se os arquivos de controle vão para o git, o escopo é o ID do item ligado ao commit (ex.: `feat(M-003): add login`, `test(T-002): cover sign-up without e-mail`). Se os arquivos de controle são só locais, o escopo é opcional.
- Quando a definição **Commits e PRs mencionam os arquivos de controle** é `não`, nenhum ID de item (`M-`, `T-`, `C-`, `P-NNN`) nem nome de arquivo de controle aparece nas mensagens de commit, nos nomes de branch ou na descrição de pull requests.

## Arquivos de controle

- Vale só quando os arquivos de controle vão para o git: a atualização deles (passos marcados, hashes, resultados) vai num commit próprio, **depois** do commit de código, porque o hash só existe depois que o commit é feito (ex.: `docs(M-003): record the commits of step 2`).

## Histórico e hooks

- Nunca reescrever o que já foi enviado ao remoto: nada de `push --force`, `rebase` ou `commit --amend` em commits já publicados.
- Nunca usar `--no-verify`. Se um hook falhar, a causa é corrigida.

## O que não vai para o git

- `.env`, chaves e credenciais, logs (incluindo a pasta `logs/` dos testes) e arquivos gerados (build, dependências instaladas).
- Se o projeto ainda não tiver `.gitignore`, ele é criado no primeiro commit, cobrindo esses itens.

## Codificação dos arquivos

- Todo arquivo de texto é lido e gravado em UTF-8 (sem BOM), inclusive o que é gerado por comandos e scripts. Quando a ferramenta usa outra codificação por padrão, ela é informada explicitamente (ex.: `-Encoding utf8` no PowerShell).
- Outra codificação só é usada quando for identificado um erro com o UTF-8 (ex.: um sistema externo que exige outro formato, ou caracteres corrompidos), e só no arquivo afetado, com o motivo informado ao usuário.

## Definições do projeto

| Definição | Opções | Valor |
|---|---|---|
| Idioma das mensagens de commit | ex.: português, inglês | inglês |
| Arquivos de controle no git | sim, ou não (só locais, listados em `.git/info/exclude`) | sim |
| Commits e PRs mencionam os arquivos de controle | sim (IDs no escopo, commits de atualização dos arquivos), ou não (comum quando o repositório é de uma equipe e os arquivos são só locais) | sim |
| Branches | direto na `main`; uma branch por melhoria (`m-NNN-<nome>`) com merge depois do `T-NNN` validado; ou o padrão da equipe (ex.: `feature/<id-do-item>`) | direto na `main` (depois da linha de base do `M-001`) |
| Destino do merge ou do PR | ex.: `main`, `develop`, a branch de uma funcionalidade da equipe | não se aplica (direto na `main`) |
| Tags de versão | não usar, ou `vX.Y.Z` a cada entrega (MVP e versões seguintes), anotadas no `session.md` | não usar |
