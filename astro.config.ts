import { defineConfig } from "astro/config";

/**
 * Configuração do Astro: site estático publicado em `datait.guizani.com.br`.
 *
 * O servidor de desenvolvimento usa polling para perceber as mudanças nos arquivos,
 * porque o contêiner não recebe os eventos de arquivo da pasta montada do Windows.
 * As pastas `logs/` e `references/` ficam fora da vigilância.
 */
export default defineConfig({
  site: "https://datait.guizani.com.br",
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
        ignored: ["**/logs/**", "**/references/**"],
      },
    },
  },
});
