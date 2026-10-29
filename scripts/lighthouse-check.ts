/**
 * Verificação do Lighthouse no perfil de celular.
 *
 * Serve o `dist/` com o `astro preview`, roda o Lighthouse algumas vezes em cada
 * página, usa a mediana das notas, salva os relatórios em `logs/lighthouse/` e
 * termina com erro se alguma categoria obrigatória ficar abaixo da nota mínima.
 *
 * @packageDocumentation
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

/** Páginas verificadas, relativas à raiz do site. */
const pages: readonly string[] = ["/"];

/** Número de execuções por página; a nota considerada é a mediana delas. */
const runsPerPage = 3;

/** Categorias medidas pelo Lighthouse. */
const categories = [
  "performance",
  "accessibility",
  "best-practices",
  "seo",
] as const;

/** Uma categoria medida pelo Lighthouse. */
type Category = (typeof categories)[number];

/** Notas de uma execução, de 0 a 1, por categoria. */
type Scores = Record<Category, number>;

/** Nota mínima, de 0 a 100, das categorias que barram o build. */
const minimumScores: Partial<Record<Category, number>> = {
  performance: 90,
  accessibility: 90,
  seo: 90,
};

/** Porta do `astro preview` durante a verificação. */
const previewPort = 4322;

/** Endereço do `astro preview` durante a verificação. */
const origin = `http://127.0.0.1:${String(previewPort)}`;

/** Opções do Chrome sem interface, que também rodam dentro de um contêiner. */
const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
];

/**
 * Espera o servidor responder, consultando o endereço até o tempo limite.
 *
 * @param url - Endereço consultado.
 * @param timeoutMs - Tempo limite, em milissegundos.
 * @throws Error quando o servidor não responde dentro do tempo limite.
 */
async function waitForServer(url: string, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const isUp = await fetch(url).then(
      (response) => response.ok,
      () => false,
    );
    if (isUp) {
      return;
    }
    await delay(500);
  }
  throw new Error(
    `Server did not respond at ${url} within ${String(timeoutMs)} ms`,
  );
}

/**
 * Calcula a mediana de uma lista de números.
 *
 * @param values - Números da lista, em qualquer ordem.
 * @returns A mediana.
 * @throws Error quando a lista está vazia.
 */
function median(values: readonly number[]): number {
  const sorted = values.toSorted((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const upper = sorted[middle];
  const lower = sorted.length % 2 === 0 ? sorted[middle - 1] : upper;
  if (upper === undefined || lower === undefined) {
    throw new Error("Cannot compute the median of an empty list");
  }
  return (lower + upper) / 2;
}

/**
 * Converte o caminho de uma página num nome de arquivo.
 *
 * @param page - Caminho da página, como `/` ou `/en/`.
 * @returns O nome, como `home` ou `en`.
 */
function slugify(page: string): string {
  const slug = page.split("/").filter(Boolean).join("-");
  return slug === "" ? "home" : slug;
}

/**
 * Roda o Lighthouse uma vez numa página e salva os relatórios JSON e HTML.
 *
 * @param url - Endereço da página.
 * @param chromePort - Porta de depuração do Chrome já aberto.
 * @param outputPrefix - Caminho dos relatórios, sem a extensão.
 * @returns As notas da execução.
 * @throws Error quando o Lighthouse não devolve resultado.
 */
async function runOnce(
  url: string,
  chromePort: number,
  outputPrefix: string,
): Promise<Scores> {
  const result = await lighthouse(url, {
    port: chromePort,
    output: ["json", "html"],
    onlyCategories: [...categories],
    logLevel: "error",
  });
  if (result === undefined) {
    throw new Error(`Lighthouse returned no result for ${url}`);
  }
  const [json = "", html = ""] = Array.isArray(result.report)
    ? result.report
    : [result.report];
  await writeFile(`${outputPrefix}.report.json`, json, "utf8");
  await writeFile(`${outputPrefix}.report.html`, html, "utf8");
  return Object.fromEntries(
    categories.map((category) => [
      category,
      result.lhr.categories[category]?.score ?? 0,
    ]),
  ) as Scores;
}

/**
 * Roda a verificação em todas as páginas e marca o processo com erro quando
 * alguma categoria obrigatória fica abaixo da nota mínima.
 */
async function main(): Promise<void> {
  const stamp = new Date().toISOString().slice(0, 19).replaceAll(":", "-");
  const outputDir = join("logs", "lighthouse", `check__${stamp}`);
  await mkdir(outputDir, { recursive: true });

  const preview = spawn(
    join("node_modules", ".bin", "astro"),
    ["preview", "--host", "127.0.0.1", "--port", String(previewPort)],
    { stdio: "ignore" },
  );
  const chrome = await launch({ chromeFlags });
  let failed = false;

  try {
    await waitForServer(origin, 30_000);
    for (const page of pages) {
      const runs: Scores[] = [];
      for (let run = 1; run <= runsPerPage; run += 1) {
        const prefix = join(outputDir, `${slugify(page)}__run-${String(run)}`);
        runs.push(await runOnce(`${origin}${page}`, chrome.port, prefix));
      }
      for (const category of categories) {
        const score = Math.round(
          median(runs.map((scores) => scores[category])) * 100,
        );
        const minimum = minimumScores[category];
        const passed = minimum === undefined || score >= minimum;
        failed ||= !passed;
        const limit = minimum === undefined ? "" : ` (min ${String(minimum)})`;
        console.log(
          `${page} ${category} ${String(score)}${limit} ${passed ? "ok" : "FAIL"}`,
        );
      }
    }
  } finally {
    chrome.kill();
    preview.kill();
  }

  console.log(`Reports: ${outputDir}`);
  if (failed) {
    process.exitCode = 1;
  }
}

await main();
