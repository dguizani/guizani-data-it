import type { Config } from "prettier";

/**
 * Configuração do Prettier: o padrão do Prettier, com o plugin do Astro para os
 * arquivos `.astro`. CSS, YAML, JSON e TypeScript usam os formatadores nativos.
 */
const config: Config = {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: { parser: "astro" },
    },
  ],
};

export default config;
