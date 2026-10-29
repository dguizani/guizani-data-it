/**
 * Testes do schema do `src/data/site.yaml`: o arquivo real passa, e os erros que
 * devem quebrar o build são recusados com o caminho do campo.
 *
 * @packageDocumentation
 */

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { parse } from "yaml";
import { siteSchema } from "../src/data/schema.ts";

/** Texto do arquivo de dados, lido uma vez para todos os testes. */
const siteText = await readFile(
  new URL("../src/data/site.yaml", import.meta.url),
  "utf8",
);

/**
 * Lê uma cópia nova do arquivo de dados, que cada teste pode alterar.
 *
 * @returns O conteúdo do YAML, ainda sem validação.
 */
function freshSite(): unknown {
  return parse(siteText);
}

/**
 * Navega até um objeto dentro do conteúdo.
 *
 * @param data - Conteúdo do YAML.
 * @param path - Caminho até o objeto, com chaves e índices.
 * @returns O objeto encontrado, para ser alterado pelo teste.
 * @throws Error quando o caminho não leva a um objeto.
 */
function at(
  data: unknown,
  path: readonly (string | number)[],
): Record<string | number, unknown> {
  let current = data;
  for (const key of path) {
    if (current === null || typeof current !== "object") {
      throw new Error(`No object at ${path.join(".")}`);
    }
    current = (current as Record<string | number, unknown>)[key];
  }
  if (current === null || typeof current !== "object") {
    throw new Error(`No object at ${path.join(".")}`);
  }
  return current as Record<string | number, unknown>;
}

/**
 * Valida o conteúdo e lista os caminhos dos erros.
 *
 * @param data - Conteúdo do YAML.
 * @returns Os caminhos dos campos com erro, como `projects.0.role`.
 */
function issuePaths(data: unknown): string[] {
  const result = siteSchema.safeParse(data);
  return result.success
    ? []
    : result.error.issues.map((issue) => issue.path.join("."));
}

describe("site.yaml schema", () => {
  it("accepts the real data file", () => {
    assert.deepEqual(issuePaths(freshSite()), []);
  });

  it("accepts a client that cannot be named", () => {
    const site = freshSite();
    at(site, ["clients", "unimed-goiania"]).isClientPublic = false;
    assert.deepEqual(issuePaths(site), []);
  });

  it("rejects a missing field", () => {
    const site = freshSite();
    Reflect.deleteProperty(at(site, ["projects", 0]), "role");
    assert.ok(issuePaths(site).includes("projects.0.role"));
  });

  it("rejects a missing English translation", () => {
    const site = freshSite();
    Reflect.deleteProperty(at(site, ["services", 0, "title"]), "en");
    assert.ok(issuePaths(site).includes("services.0.title.en"));
  });

  it("rejects an empty English translation", () => {
    const site = freshSite();
    at(site, ["projects", 0, "title"]).en = "  ";
    assert.ok(issuePaths(site).includes("projects.0.title.en"));
  });

  it("rejects an unknown client", () => {
    const site = freshSite();
    at(site, ["projects", 0]).client = "unknown-client";
    assert.ok(issuePaths(site).includes("projects.0.client"));
  });

  it("rejects a duplicate id", () => {
    const site = freshSite();
    const firstId = at(site, ["services", 0]).id;
    at(site, ["services", 1]).id = firstId;
    assert.ok(issuePaths(site).includes("services"));
  });

  it("rejects a period that ends before it starts", () => {
    const site = freshSite();
    const projectPeriod = at(site, ["projects", 1, "period"]);
    projectPeriod.start = "2026-05";
    projectPeriod.end = "2026-01";
    assert.ok(issuePaths(site).includes("projects.1.period.end"));
  });

  it("rejects an unknown field, such as a typo", () => {
    const site = freshSite();
    at(site, ["projects", 0]).problen = "typo";
    assert.ok(issuePaths(site).includes("projects.0"));
  });
});
