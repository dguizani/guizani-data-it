import { getEntry } from "astro:content";
import type { Site } from "./schema.ts";

/**
 * Lê todo o conteúdo do site, já validado pelo schema.
 *
 * @returns O conteúdo do `src/data/site.yaml`.
 * @throws Error quando a coleção `site` não tem a entrada esperada.
 */
export async function getSite(): Promise<Site> {
  const entry = await getEntry("site", "site");
  if (entry === undefined) {
    throw new Error(
      "The site collection has no entry; check src/data/site.yaml",
    );
  }
  return entry.data;
}
