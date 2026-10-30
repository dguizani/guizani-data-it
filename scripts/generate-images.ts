/**
 * Geração das imagens Open Graph e dos ícones PNG do site.
 *
 * Serve o `dist/` com o `astro preview`, abre o Chromium sem interface e
 * fotografa as páginas-molde `/og-template/<idioma>/` e o `icon.svg`, pelo
 * protocolo de depuração do Chrome. Grava `public/og/<idioma>.png`,
 * `public/apple-touch-icon.png` e `public/favicon.ico`. Roda depois do build,
 * sempre que os textos do hero, o logo ou o ícone mudarem.
 *
 * @packageDocumentation
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { launch } from "chrome-launcher";

/** Porta do `astro preview` durante a geração. */
const previewPort = 4323;

/** Endereço do `astro preview` durante a geração. */
const origin = `http://127.0.0.1:${String(previewPort)}`;

/** Opções do Chrome sem interface, que também rodam dentro de um contêiner. */
const chromeFlags = [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--disable-dev-shm-usage",
  "--hide-scrollbars",
];

/** Uma imagem a gerar: a página fotografada, o tamanho e o arquivo de saída. */
interface Shot {
  /** Caminho da página ou do arquivo, relativo à raiz do site. */
  path: string;
  /** Largura e altura da imagem, em pixels. */
  size: { width: number; height: number };
  /** Arquivo gravado. */
  output: string;
  /** Formato do arquivo: PNG ou ICO (um PNG dentro do contêiner ICO). */
  format: "png" | "ico";
  /** Fundo transparente, para os cantos arredondados dos ícones. */
  transparent: boolean;
}

/** Imagens geradas pelo script. */
const shots: readonly Shot[] = [
  {
    path: "/og-template/pt/",
    size: { width: 1200, height: 630 },
    output: join("public", "og", "pt.png"),
    format: "png",
    transparent: false,
  },
  {
    path: "/og-template/en/",
    size: { width: 1200, height: 630 },
    output: join("public", "og", "en.png"),
    format: "png",
    transparent: false,
  },
  {
    path: "/icon.svg",
    size: { width: 180, height: 180 },
    output: join("public", "apple-touch-icon.png"),
    format: "png",
    transparent: true,
  },
  {
    path: "/icon.svg",
    size: { width: 32, height: 32 },
    output: join("public", "favicon.ico"),
    format: "ico",
    transparent: true,
  },
];

/** Mensagem recebida do Chrome pelo protocolo de depuração. */
interface CdpMessage {
  /** Número do comando respondido; ausente nos eventos. */
  id?: number;
  /** Nome do evento; ausente nas respostas. */
  method?: string;
  /** Resultado do comando. */
  result?: Record<string, unknown>;
  /** Erro do comando. */
  error?: { message: string };
}

/** Conexão com uma aba do Chrome pelo protocolo de depuração. */
interface CdpSession {
  /**
   * Envia um comando e espera a resposta.
   *
   * @param method - Nome do comando (ex.: `Page.navigate`).
   * @param params - Parâmetros do comando.
   * @returns O resultado do comando.
   */
  send: (
    method: string,
    params?: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
  /**
   * Espera o próximo evento com o nome informado.
   *
   * @param method - Nome do evento (ex.: `Page.loadEventFired`).
   */
  waitFor: (method: string) => Promise<void>;
  /** Fecha a conexão. */
  close: () => void;
}

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
 * Abre uma aba nova no Chrome e conecta a ela pelo protocolo de depuração.
 *
 * @param chromePort - Porta de depuração do Chrome já aberto.
 * @returns A conexão com a aba.
 */
async function connect(chromePort: number): Promise<CdpSession> {
  const response = await fetch(
    `http://127.0.0.1:${String(chromePort)}/json/new?about:blank`,
    { method: "PUT" },
  );
  const target = (await response.json()) as { webSocketDebuggerUrl: string };
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise<void>((resolve, reject) => {
    socket.addEventListener("open", () => {
      resolve();
    });
    socket.addEventListener("error", () => {
      reject(new Error("Could not connect to Chrome"));
    });
  });

  let nextId = 0;
  const replies = new Map<number, (message: CdpMessage) => void>();
  const waiters = new Map<string, () => void>();
  socket.addEventListener("message", (event: MessageEvent<string>) => {
    const message = JSON.parse(event.data) as CdpMessage;
    if (message.id !== undefined) {
      replies.get(message.id)?.(message);
      replies.delete(message.id);
    } else if (message.method !== undefined) {
      waiters.get(message.method)?.();
      waiters.delete(message.method);
    }
  });

  return {
    send: (method, params = {}) =>
      new Promise((resolve, reject) => {
        nextId += 1;
        replies.set(nextId, (message) => {
          if (message.error === undefined) {
            resolve(message.result ?? {});
          } else {
            reject(new Error(`${method}: ${message.error.message}`));
          }
        });
        socket.send(JSON.stringify({ id: nextId, method, params }));
      }),
    waitFor: (method) =>
      new Promise((resolve) => {
        waiters.set(method, resolve);
      }),
    close: () => {
      socket.close();
    },
  };
}

/**
 * Coloca um PNG dentro de um arquivo ICO de uma imagem só, formato aceito por
 * todos os navegadores atuais.
 *
 * @param png - Conteúdo do PNG.
 * @param size - Largura e altura da imagem, em pixels (até 256).
 * @returns O conteúdo do arquivo ICO.
 */
function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size % 256, 0);
  entry.writeUInt8(size % 256, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);
  return Buffer.concat([header, entry, png]);
}

/**
 * Fotografa uma página no tamanho pedido, depois de carregada e com as fontes
 * prontas, e grava o arquivo.
 *
 * @param session - Conexão com a aba do Chrome.
 * @param shot - Imagem a gerar.
 */
async function capture(session: CdpSession, shot: Shot): Promise<void> {
  await session.send("Emulation.setDeviceMetricsOverride", {
    ...shot.size,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await session.send("Emulation.setDefaultBackgroundColorOverride", {
    color: shot.transparent
      ? { r: 0, g: 0, b: 0, a: 0 }
      : { r: 255, g: 255, b: 255, a: 1 },
  });
  const loaded = session.waitFor("Page.loadEventFired");
  await session.send("Page.navigate", { url: `${origin}${shot.path}` });
  await loaded;
  await session.send("Runtime.evaluate", {
    expression: "document.fonts.ready.then(() => true)",
    awaitPromise: true,
  });
  const { data } = await session.send("Page.captureScreenshot", {
    format: "png",
  });
  if (typeof data !== "string") {
    throw new Error(`No screenshot for ${shot.path}`);
  }
  const png = Buffer.from(data, "base64");
  const content = shot.format === "ico" ? pngToIco(png, shot.size.width) : png;
  await writeFile(shot.output, content);
  console.log(`${shot.output} (${String(content.length)} bytes)`);
}

/** Gera todas as imagens. */
async function main(): Promise<void> {
  await mkdir(join("public", "og"), { recursive: true });
  const preview = spawn(
    join("node_modules", ".bin", "astro"),
    ["preview", "--host", "127.0.0.1", "--port", String(previewPort)],
    { stdio: "ignore" },
  );
  const chrome = await launch({ chromeFlags });

  try {
    await waitForServer(origin, 30_000);
    const session = await connect(chrome.port);
    await session.send("Page.enable");
    for (const shot of shots) {
      await capture(session, shot);
    }
    session.close();
  } finally {
    chrome.kill();
    preview.kill();
  }
}

await main();
