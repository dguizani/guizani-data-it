import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { defineCollection } from "astro:content";
import type { Loader } from "astro/loaders";
import { parse } from "yaml";
import { siteSchema } from "./data/schema.ts";

/** Caminho do arquivo de dados, a partir da raiz do projeto. */
const siteFile = "src/data/site.yaml";

/** Identificador da única entrada da coleção `site`. */
const siteEntryId = "site";

/**
 * Loader que lê o arquivo de dados inteiro como uma entrada só da coleção.
 *
 * Diferente do `file()` do Astro, um erro de sintaxe no YAML interrompe o build,
 * com a linha e a coluna do erro. No servidor de desenvolvimento, a entrada é
 * recarregada a cada mudança no arquivo; a vigilância é registrada antes da
 * primeira leitura, para o servidor se recuperar quando um arquivo inválido é
 * corrigido, e um erro numa releitura é registrado no log sem derrubar o
 * servidor, que continua com a última versão válida.
 *
 * @param fileName - Caminho do arquivo YAML, a partir da raiz do projeto.
 * @returns O loader da coleção.
 */
function singleYamlFileLoader(fileName: string): Loader {
  return {
    name: "single-yaml-file-loader",
    load: async (context) => {
      const { config, store, watcher } = context;
      const filePath = fileURLToPath(new URL(fileName, config.root));

      const sync = async (): Promise<void> => {
        const text = await readFile(filePath, "utf8");
        const raw: unknown = parse(text);
        if (raw === null || typeof raw !== "object" || Array.isArray(raw)) {
          throw new Error(
            `${fileName} must contain a YAML mapping at the top level`,
          );
        }
        const data = await context.parseData({
          id: siteEntryId,
          data: raw as Record<string, unknown>,
          filePath,
        });
        store.clear();
        store.set({
          id: siteEntryId,
          data,
          digest: context.generateDigest(text),
          filePath: fileName,
        });
      };

      watcher?.add(filePath);
      watcher?.on("change", (changedPath) => {
        if (changedPath === filePath) {
          sync().catch((error: unknown) => {
            context.logger.error(
              error instanceof Error ? error.message : String(error),
            );
          });
        }
      });
      await sync();
    },
  };
}

/** Coleções de conteúdo do site. */
export const collections = {
  site: defineCollection({
    loader: singleYamlFileLoader(siteFile),
    schema: siteSchema,
  }),
};
