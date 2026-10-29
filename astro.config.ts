import { defineConfig } from "astro/config";
import type { AstroIntegration } from "astro";

/**
 * Integração que reinicia o servidor de desenvolvimento quando o schema do
 * `site.yaml` muda. Sem ela, o servidor só recarrega o schema quando o próprio
 * `content.config.ts` muda e continua validando o `site.yaml` com o schema antigo.
 */
const watchSiteSchema: AstroIntegration = {
  name: "watch-site-schema",
  hooks: {
    "astro:config:setup": ({ addWatchFile }) => {
      addWatchFile(new URL("./src/data/schema.ts", import.meta.url));
    },
  },
};

/**
 * Configuração do Astro: site estático publicado em `datait.guizani.com.br`.
 *
 * O servidor de desenvolvimento usa polling para perceber as mudanças nos arquivos,
 * porque o contêiner não recebe os eventos de arquivo da pasta montada do Windows.
 * As pastas `logs/` e `references/` ficam fora da vigilância.
 */
export default defineConfig({
  site: "https://datait.guizani.com.br",
  integrations: [watchSiteSchema],
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
