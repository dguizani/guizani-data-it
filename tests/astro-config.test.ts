/**
 * Testes da configuração do Astro: o servidor de desenvolvimento precisa
 * reiniciar quando o schema do `site.yaml` muda. Sem isso, ele valida o
 * `site.yaml` com o schema antigo e fica com dados desatualizados (defeito
 * encontrado no M-006).
 *
 * @packageDocumentation
 */

import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { describe, it } from "node:test";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import config from "../astro.config.ts";

/**
 * Diz se um item da lista `integrations` é uma integração (a lista também
 * aceita sublistas, `false` e `null`).
 *
 * @param item - Item da lista `integrations`, já sem sublistas.
 * @returns `true` quando o item é uma integração.
 */
function isIntegration(item: unknown): item is AstroIntegration {
  return typeof item === "object" && item !== null && "hooks" in item;
}

/**
 * Chama o gancho `astro:config:setup` de uma integração e guarda os arquivos
 * que ela pede para vigiar.
 *
 * @param name - Nome da integração.
 * @returns Os caminhos vigiados, como caminhos do sistema de arquivos.
 * @throws Error quando a integração não existe ou não tem o gancho.
 */
async function watchedFiles(name: string): Promise<string[]> {
  const integration = (config.integrations ?? [])
    .flat()
    .filter(isIntegration)
    .find((item) => item.name === name);
  const setup = integration?.hooks["astro:config:setup"];
  if (setup === undefined) {
    throw new Error(`Integration ${name} with astro:config:setup not found`);
  }
  const files: string[] = [];
  const addWatchFile = (path: URL | string): void => {
    files.push(path instanceof URL ? fileURLToPath(path) : path);
  };
  await setup({ addWatchFile } as unknown as Parameters<typeof setup>[0]);
  return files;
}

describe("astro.config.ts", () => {
  it("restarts the dev server when the site schema changes", async () => {
    const files = await watchedFiles("watch-site-schema");
    const schema = files.find((file) =>
      file.endsWith(join("src", "data", "schema.ts")),
    );
    assert.ok(schema, "src/data/schema.ts is not watched");
    await access(schema);
  });
});
