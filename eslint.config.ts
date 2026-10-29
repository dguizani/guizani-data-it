import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * Configuração do ESLint: regras recomendadas do JavaScript, regras estritas do
 * TypeScript com checagem de tipos e regras recomendadas do Astro.
 *
 * Nos arquivos `.astro`, a regra `no-unsafe-return` fica desligada: o parser do
 * Astro no ESLint não resolve o tipo do JSX dentro de expressões (como num
 * `.map()`), e o `astro check` já confere esses tipos com o TypeScript.
 */
export default defineConfig(
  globalIgnores(["dist/", ".astro/", "logs/", "references/"]),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".astro"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          allowForKnownSafeCalls: [
            {
              from: "package",
              package: "node:test",
              name: ["describe", "it", "suite", "test"],
            },
          ],
        },
      ],
    },
  },
  astro.configs.recommended,
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
);
