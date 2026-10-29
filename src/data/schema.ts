import { z } from "astro/zod";

/** Identificador em `kebab-case`, usado para ligar itens do arquivo de dados entre si. */
const id = z
  .string()
  .regex(
    /^[a-z0-9]+(-[a-z0-9]+)*$/,
    "use kebab-case: lowercase letters, digits and hyphens",
  )
  .describe(
    "Identificador em kebab-case (letras minúsculas, números e hífens).",
  );

/** Texto que não se traduz, como o nome de uma tecnologia. */
const plainText = z.string().trim().min(1).describe("Texto que não se traduz.");

/** Texto nos dois idiomas do site; os dois são obrigatórios e não podem ficar vazios. */
export const localizedText = z
  .strictObject({
    pt: z.string().trim().min(1).describe("Texto em português."),
    en: z.string().trim().min(1).describe("Texto em inglês."),
  })
  .describe(
    "Texto nos dois idiomas: pt (português) e en (inglês), os dois obrigatórios.",
  );

/** Texto nos dois idiomas do site. */
export type LocalizedText = z.infer<typeof localizedText>;

/** Data no formato `AAAA` ou `AAAA-MM`. */
const yearMonth = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "use YYYY or YYYY-MM")
  .describe("Ano (AAAA) ou ano e mês (AAAA-MM), entre aspas.");

/** Período de um projeto; sem fim quando ainda está em andamento. */
export const period = z
  .strictObject({
    start: yearMonth.describe("Início: AAAA ou AAAA-MM, entre aspas."),
    end: yearMonth
      .nullable()
      .describe(
        "Fim: AAAA ou AAAA-MM, entre aspas; vazio quando o projeto está em andamento.",
      ),
  })
  .refine((value) => value.end === null || value.end >= value.start, {
    message: "end must not be before start",
    path: ["end"],
  })
  .describe("Período do projeto.");

/** Período de um projeto. */
export type Period = z.infer<typeof period>;

/** Cliente de um projeto, com o setor que substitui o nome quando ele não pode aparecer. */
export const client = z
  .strictObject({
    name: plainText.describe("Nome do cliente, como aparece no site."),
    isClientPublic: z
      .boolean()
      .describe(
        "true: o site mostra o nome do cliente; false: mostra o setor no lugar do nome.",
      ),
    sector: localizedText.describe(
      "Setor do cliente, mostrado no lugar do nome quando isClientPublic é false.",
    ),
  })
  .describe("Cliente de um ou mais projetos.");

/** Cliente de um projeto. */
export type Client = z.infer<typeof client>;

/** Campos comuns a todos os tipos de projeto. */
const projectBase = {
  id: id.describe("Identificador do projeto, único no arquivo."),
  client: id.describe("Identificador do cliente, uma das chaves de clients."),
  consultancy: plainText
    .optional()
    .describe(
      'Consultoria pela qual o projeto foi feito (ex.: ITIX); mostrada como "via ...".',
    ),
  title: localizedText.describe(
    "Título curto do projeto, sem o nome do cliente.",
  ),
  period,
};

/** Projeto principal, mostrado num card completo. */
const mainProject = z
  .strictObject({
    ...projectBase,
    kind: z
      .literal("main")
      .describe("main: card completo na seção de projetos principais."),
    problem: localizedText.describe(
      "O problema do cliente, sem números do negócio nem detalhes internos.",
    ),
    role: localizedText.describe("O papel do Davi e o que foi construído."),
    stack: z
      .array(plainText)
      .min(1)
      .describe("Tecnologias usadas, na ordem em que aparecem no card."),
  })
  .describe("Projeto principal, com card completo.");

/** Participação pontual, mostrada numa linha. */
const occasionalProject = z
  .strictObject({
    ...projectBase,
    kind: z
      .literal("occasional")
      .describe("occasional: uma linha na seção de participação pontual."),
    summary: localizedText.describe("Resumo de uma linha da participação."),
    stack: z
      .array(plainText)
      .min(1)
      .optional()
      .describe("Tecnologias usadas (opcional)."),
  })
  .describe("Participação pontual num projeto.");

/** Experiência que aparece só na linha do tempo, como os RPAs. */
const timelineProject = z
  .strictObject({
    ...projectBase,
    kind: z
      .literal("timeline")
      .describe("timeline: aparece só na linha do tempo."),
  })
  .describe("Experiência que aparece só na linha do tempo.");

/** Projeto de cliente, de qualquer tipo. */
export const project = z
  .discriminatedUnion("kind", [mainProject, occasionalProject, timelineProject])
  .describe("Projeto de cliente; o kind define onde ele aparece.");

/** Projeto de cliente, de qualquer tipo. */
export type Project = z.infer<typeof project>;

/** Serviço oferecido pela Guizani Data IT. */
export const service = z
  .strictObject({
    id: id.describe("Identificador do serviço, único no arquivo."),
    title: localizedText.describe("Nome do serviço."),
    description: localizedText.describe("Descrição de uma linha do serviço."),
  })
  .describe("Serviço oferecido pela Guizani Data IT.");

/** Serviço oferecido pela Guizani Data IT. */
export type Service = z.infer<typeof service>;

/** Item de um grupo de skills: um nome que não se traduz ou um texto nos dois idiomas. */
export const skillItem = z
  .union([plainText, localizedText])
  .describe(
    "Nome que não se traduz (ex.: PostgreSQL) ou texto nos dois idiomas.",
  );

/** Item de um grupo de skills. */
export type SkillItem = z.infer<typeof skillItem>;

/** Grupo de skills, como Orquestração ou Bancos. */
export const skillGroup = z
  .strictObject({
    id: id.describe("Identificador do grupo, único no arquivo."),
    name: localizedText.describe("Nome do grupo."),
    items: z
      .array(skillItem)
      .min(1)
      .describe("Skills do grupo, na ordem em que aparecem."),
  })
  .describe("Grupo de skills.");

/** Grupo de skills. */
export type SkillGroup = z.infer<typeof skillGroup>;

/** Projeto pessoal ou de estudo, mostrado no Laboratório. */
export const labItem = z
  .strictObject({
    id: id.describe("Identificador do item, único no arquivo."),
    name: plainText.describe(
      "Nome do projeto, normalmente o nome do repositório.",
    ),
    period,
    technologies: z.array(plainText).min(1).describe("Tecnologias principais."),
    description: localizedText.describe("Descrição de uma linha."),
    repository: z
      .url()
      .optional()
      .describe(
        "Endereço do repositório, só quando ele é público e tem código.",
      ),
  })
  .describe("Projeto pessoal ou de estudo.");

/** Projeto pessoal ou de estudo. */
export type LabItem = z.infer<typeof labItem>;

/** Nome da empresa e as duas partes do nome que aparecem no logo. */
export const brand = z
  .strictObject({
    name: plainText.describe(
      "Nome completo da empresa (ex.: Guizani Data IT).",
    ),
    wordmark: z
      .strictObject({
        primary: plainText.describe(
          "Parte de cima do nome no logo (ex.: Guizani).",
        ),
        secondary: plainText.describe(
          "Parte de baixo do nome no logo (ex.: Data IT).",
        ),
      })
      .describe("Nome no logo, em duas linhas."),
  })
  .describe("Marca da empresa.");

/** Marca da empresa. */
export type Brand = z.infer<typeof brand>;

/** Dados de contato e da empresa. */
export const contact = z
  .strictObject({
    owner: plainText.describe("Nome do engenheiro por trás da empresa."),
    cnpj: z
      .string()
      .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "use 00.000.000/0000-00")
      .describe("CNPJ da empresa, no formato 00.000.000/0000-00."),
    email: z.email().describe("E-mail de contato."),
    whatsapp: z
      .strictObject({
        number: z
          .string()
          .regex(/^\d{12,13}$/, "use only digits, with country and area codes")
          .describe(
            "Número só com dígitos, com o código do país e o DDD (ex.: 5527999999999).",
          ),
        display: plainText.describe(
          "Número como aparece no site (ex.: (27) 99999-9999).",
        ),
        message: localizedText.describe(
          "Mensagem pronta que abre no WhatsApp.",
        ),
      })
      .describe("WhatsApp de contato."),
    linkedin: z.url().describe("Endereço do perfil do LinkedIn."),
    github: z.url().describe("Endereço do perfil do GitHub."),
    resume: z
      .strictObject({
        pt: z
          .string()
          .regex(/^\/[\w.-]+\.pdf$/, "use a path in public/, like /resume.pdf")
          .describe(
            "Caminho do currículo em português, dentro de public/ (ex.: /davi-guizani-cv-pt.pdf).",
          ),
        en: z
          .string()
          .regex(/^\/[\w.-]+\.pdf$/, "use a path in public/, like /resume.pdf")
          .describe(
            "Caminho do currículo em inglês, dentro de public/ (ex.: /davi-guizani-cv-en.pdf).",
          ),
      })
      .optional()
      .describe(
        "Currículos em PDF; enquanto não existirem, o link não aparece.",
      ),
  })
  .describe("Dados de contato e da empresa.");

/** Dados de contato e da empresa. */
export type Contact = z.infer<typeof contact>;

/** Topo da página: a frase de posicionamento e a linha com o nome e o papel. */
export const hero = z
  .strictObject({
    tagline: localizedText.describe(
      "Frase de posicionamento, logo abaixo do nome da empresa.",
    ),
    byline: localizedText.describe(
      "Linha com o nome e o papel (ex.: Davi Guizani · engenheiro de dados).",
    ),
  })
  .describe("Textos do hero.");

/** Textos do hero. */
export type Hero = z.infer<typeof hero>;

/** Seção Sobre: um texto curto e a foto. */
export const about = z
  .strictObject({
    text: localizedText.describe(
      "Texto curto sobre o Davi e a Guizani Data IT.",
    ),
    photoAlt: localizedText.describe(
      "Descrição da foto para os leitores de tela.",
    ),
  })
  .describe("Textos da seção Sobre.");

/** Textos da seção Sobre. */
export type About = z.infer<typeof about>;

/** Textos da interface: títulos das seções, rótulos e textos de acessibilidade. */
export const ui = z
  .strictObject({
    sections: z
      .strictObject({
        about: localizedText,
        services: localizedText,
        projects: localizedText,
        occasionalWork: localizedText,
        timeline: localizedText,
        skills: localizedText,
        lab: localizedText,
        contact: localizedText,
      })
      .describe("Títulos das seções."),
    hero: z
      .strictObject({
        contactButton: localizedText.describe("Botão que leva ao contato."),
        projectsButton: localizedText.describe("Botão que leva aos projetos."),
      })
      .describe("Botões do hero."),
    project: z
      .strictObject({
        via: localizedText.describe(
          "Palavra entre o cliente e a consultoria (ex.: via).",
        ),
        ongoing: localizedText.describe("Fim de um período em andamento."),
        problem: localizedText.describe("Rótulo do problema no card."),
        role: localizedText.describe("Rótulo do papel no card."),
        stack: localizedText.describe("Rótulo da stack no card."),
      })
      .describe("Rótulos dos projetos."),
    lab: z
      .strictObject({
        repository: localizedText.describe(
          "Link para o código de um item público.",
        ),
        privateRepository: localizedText.describe(
          "Aviso de um item sem código público.",
        ),
      })
      .describe("Rótulos do Laboratório."),
    contact: z
      .strictObject({
        email: localizedText,
        whatsapp: localizedText,
        linkedin: localizedText,
        github: localizedText,
        resume: localizedText.describe("Link para o currículo em PDF."),
      })
      .describe("Rótulos dos canais de contato."),
    footer: z
      .strictObject({
        companyId: localizedText.describe(
          "Rótulo do CNPJ no rodapé (ex.: CNPJ).",
        ),
        analyticsNotice: localizedText.describe(
          "Aviso sobre a contagem de visitas.",
        ),
      })
      .describe("Textos do rodapé."),
    a11y: z
      .strictObject({
        home: localizedText.describe(
          "Nome do link do logo, que leva ao início da página.",
        ),
        themeToggle: localizedText.describe(
          "Nome do botão que alterna entre o tema claro e o escuro.",
        ),
        skipToContent: localizedText.describe(
          "Link escondido que leva direto ao conteúdo, para quem navega pelo teclado.",
        ),
        mainNav: localizedText.describe("Nome da navegação principal."),
        externalLink: localizedText.describe(
          "Aviso, depois do nome de um link, de que ele abre em outra aba.",
        ),
      })
      .describe("Textos de acessibilidade, lidos pelos leitores de tela."),
  })
  .describe("Textos da interface, nos dois idiomas.");

/** Textos da interface. */
export type Ui = z.infer<typeof ui>;

/**
 * Procura identificadores repetidos numa lista.
 *
 * @param items - Itens com identificador.
 * @returns Os identificadores que aparecem mais de uma vez.
 */
function duplicateIds(items: readonly { id: string }[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      duplicates.add(item.id);
    }
    seen.add(item.id);
  }
  return [...duplicates];
}

/** Todo o conteúdo do site, como está no `src/data/site.yaml`. */
export const siteSchema = z
  .strictObject({
    clients: z
      .record(id, client)
      .describe(
        "Clientes, cada um com um identificador em kebab-case como chave.",
      ),
    projects: z
      .array(project)
      .min(1)
      .describe(
        "Projetos de clientes, em qualquer ordem: o site ordena pelas datas.",
      ),
    services: z
      .array(service)
      .min(1)
      .describe("Serviços, na ordem em que aparecem."),
    skills: z
      .array(skillGroup)
      .min(1)
      .describe("Grupos de skills, na ordem em que aparecem."),
    lab: z
      .array(labItem)
      .describe("Projetos pessoais e de estudo, na ordem em que aparecem."),
    brand,
    hero,
    about,
    contact,
    ui,
  })
  .superRefine((site, context) => {
    site.projects.forEach((item, index) => {
      if (!(item.client in site.clients)) {
        context.addIssue({
          code: "custom",
          message: `unknown client "${item.client}"; use one of the keys of clients`,
          path: ["projects", index, "client"],
        });
      }
    });
    const lists = {
      projects: site.projects,
      services: site.services,
      skills: site.skills,
      lab: site.lab,
    };
    for (const [list, items] of Object.entries(lists)) {
      for (const duplicate of duplicateIds(items)) {
        context.addIssue({
          code: "custom",
          message: `duplicate id "${duplicate}"`,
          path: [list],
        });
      }
    }
  })
  .describe(
    "Todo o conteúdo do site da Guizani Data IT, em português e inglês.",
  );

/** Todo o conteúdo do site. */
export type Site = z.infer<typeof siteSchema>;
