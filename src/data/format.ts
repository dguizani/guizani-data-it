import type {
  Client,
  LocalizedText,
  Period,
  Project,
  SkillItem,
} from "./schema.ts";

/** Idioma do conteúdo do site. */
export type Lang = keyof LocalizedText;

/** Projeto principal, mostrado num card completo. */
export type MainProject = Extract<Project, { kind: "main" }>;

/** Participação pontual, mostrada numa linha. */
export type OccasionalProject = Extract<Project, { kind: "occasional" }>;

/** Valor do atributo `lang` do HTML para cada idioma. */
export const htmlLang: Readonly<Record<Lang, string>> = {
  pt: "pt-BR",
  en: "en",
};

/**
 * Deixa a primeira letra de um texto em maiúscula.
 *
 * @param text - Texto qualquer.
 * @returns O texto com a primeira letra em maiúscula.
 */
function upperFirst(text: string): string {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

/**
 * Nome de um item de skill no idioma da página.
 *
 * @param item - Nome que não se traduz ou texto nos dois idiomas.
 * @param lang - Idioma da página.
 * @returns O nome a mostrar.
 */
export function skillLabel(item: SkillItem, lang: Lang): string {
  return typeof item === "string" ? item : item[lang];
}

/**
 * Nome do cliente, ou o setor dele quando o nome não pode aparecer.
 *
 * @param client - Cliente do projeto.
 * @param lang - Idioma da página.
 * @returns O nome do cliente ou o setor, com a primeira letra em maiúscula.
 */
export function clientLabel(client: Client, lang: Lang): string {
  return client.isClientPublic ? client.name : upperFirst(client.sector[lang]);
}

/**
 * Formata uma data `AAAA` ou `AAAA-MM` no idioma da página.
 *
 * @param value - Data no formato `AAAA` ou `AAAA-MM`.
 * @param lang - Idioma da página.
 * @returns O ano (ex.: `2025`) ou o mês abreviado e o ano (ex.: `jul. 2025`, `Jul 2025`).
 */
export function formatYearMonth(value: string, lang: Lang): string {
  const [year, month] = value.split("-");
  if (month === undefined) {
    return value;
  }
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  const monthName = new Intl.DateTimeFormat(htmlLang[lang], {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  return `${monthName} ${String(year)}`;
}

/**
 * Formata o período de um projeto no idioma da página.
 *
 * @param period - Período do projeto.
 * @param lang - Idioma da página.
 * @param ongoingLabel - Texto do fim de um período em andamento (ex.: em andamento).
 * @returns O período, como `2022 – 2025`, `jul. 2025` ou `2026 – em andamento`.
 */
export function formatPeriod(
  period: Period,
  lang: Lang,
  ongoingLabel: string,
): string {
  const start = formatYearMonth(period.start, lang);
  if (period.end === null) {
    return `${start} – ${ongoingLabel}`;
  }
  if (period.end === period.start) {
    return start;
  }
  return `${start} – ${formatYearMonth(period.end, lang)}`;
}

/**
 * Converte uma data `AAAA` ou `AAAA-MM` numa chave de ordenação `AAAA-MM`.
 *
 * @param value - Data no formato `AAAA` ou `AAAA-MM`.
 * @param yearOnlyMonth - Mês usado quando a data só tem o ano.
 * @returns A chave, que pode ser comparada como texto.
 */
function sortKey(value: string, yearOnlyMonth: string): string {
  return value.length === 4 ? `${value}-${yearOnlyMonth}` : value;
}

/**
 * Ordena os projetos: os em andamento primeiro; depois, do fim mais recente
 * para o mais antigo e, no mesmo fim, do início mais recente para o mais antigo.
 *
 * @param projects - Projetos em qualquer ordem.
 * @returns Uma nova lista, ordenada.
 */
export function sortProjects<T extends Project>(projects: readonly T[]): T[] {
  return projects.toSorted((a, b) => {
    const endA =
      a.period.end === null ? "9999-99" : sortKey(a.period.end, "12");
    const endB =
      b.period.end === null ? "9999-99" : sortKey(b.period.end, "12");
    if (endA !== endB) {
      return endB.localeCompare(endA);
    }
    return sortKey(b.period.start, "01").localeCompare(
      sortKey(a.period.start, "01"),
    );
  });
}

/**
 * Monta o link do WhatsApp com a mensagem pronta.
 *
 * @param number - Número só com dígitos, com o código do país e o DDD.
 * @param message - Mensagem que abre pronta no WhatsApp.
 * @returns O endereço `https://wa.me/...`.
 */
export function whatsappUrl(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Diz se um projeto é um projeto principal.
 *
 * @param project - Projeto de qualquer tipo.
 * @returns `true` quando o projeto é do tipo `main`.
 */
export function isMainProject(project: Project): project is MainProject {
  return project.kind === "main";
}

/**
 * Diz se um projeto é uma participação pontual.
 *
 * @param project - Projeto de qualquer tipo.
 * @returns `true` quando o projeto é do tipo `occasional`.
 */
export function isOccasionalProject(
  project: Project,
): project is OccasionalProject {
  return project.kind === "occasional";
}

/**
 * Junta cada projeto ao seu cliente, na ordem dos projetos. O schema garante
 * que todo cliente citado existe; um projeto sem cliente é descartado.
 *
 * @param projects - Projetos já filtrados e ordenados.
 * @param clients - Clientes do site, pelo identificador.
 * @returns Os pares de projeto e cliente.
 */
export function withClients<T extends Project>(
  projects: readonly T[],
  clients: Readonly<Record<string, Client>>,
): { project: T; client: Client }[] {
  return projects.flatMap((project) => {
    const client = clients[project.client];
    return client === undefined ? [] : [{ project, client }];
  });
}
