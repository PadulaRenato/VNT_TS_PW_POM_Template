import { PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// Carrega variáveis de ambiente do arquivo .env na raiz do projeto
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Configuração principal do Playwright Test indicando reports e timeouts
const config: PlaywrightTestConfig = {
  reporter: [["html", { outputFolder: "reports/html", open: "never" }]],

  // Define onde os artefatos de teste (vídeos, screenshots brutos) serão salvos.
  // Centralizando tudo dentro da pasta reports.
  outputDir: "reports/test-results",

  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  // Define  como serão executados os testes.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 4,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL,

    // Estratégias de captura de evidências (logs, screenshots, vídeos)
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // Define o diretório raiz e formato dos testes, alem da configuração de setup/teardown globais
  testDir: "./",
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  globalSetup: "./src/support/globalSetup.ts",
  globalTeardown: "./src/support/globalTeardown.ts",
};

export default config;
