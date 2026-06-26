import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

async function readRequestBody(req: any) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks).toString("utf8");
  if (!rawBody) return {};

  try {
    return JSON.parse(rawBody);
  } catch {
    return {};
  }
}

function createViteApiResponse(res: any) {
  return {
    statusCode: 200,
    status(code: number) {
      this.statusCode = code;
      res.statusCode = code;
      return this;
    },
    setHeader(name: string, value: string) {
      res.setHeader(name, value);
      return this;
    },
    json(payload: unknown) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
      return this;
    },
    end() {
      res.end();
      return this;
    },
  };
}

function addLeadApiMiddleware(server: any, base: string) {
  const apiPaths = new Set(["/api/lead", `${base.replace(/\/$/, "")}/api/lead`]);

  server.middlewares.use(async (req: any, res: any, next: any) => {
    const pathname = new URL(req.url || "", "http://localhost").pathname;
    if (!apiPaths.has(pathname)) {
      next();
      return;
    }

    const { default: leadHandler } = await import("./api/lead.js");
    const body = await readRequestBody(req);

    await leadHandler(
      {
        method: req.method,
        headers: req.headers,
        body,
      },
      createViteApiResponse(res),
    );
  });
}

function localLeadApiPlugin(base: string) {
  return {
    name: "local-lead-api",
    configureServer(server: any) {
      addLeadApiMiddleware(server, base);
    },
    configurePreviewServer(server: any) {
      addLeadApiMiddleware(server, base);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    process.env[key] = process.env[key] || value;
  }

  const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
  const base = isVercel ? '/' : '/landing_page_mantri/';

  return {
    base,
    plugins: [react(), tailwindcss(), localLeadApiPlugin(base)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
