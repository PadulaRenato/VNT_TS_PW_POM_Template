import { test as base, TestInfo } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ProductPage } from "../pages/productPage";
import { SwapiClient } from "../api/clients/swapiClient";
import { captureScreenshot } from "./utils";

// Definimos quais fixtures (objetos) nossos testes vão ter acesso
type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  swapiClient: SwapiClient;
  screenShot: () => Promise<void>;
};

export const test = base.extend<MyFixtures>({
  // Fixture para LoginPage
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Fixture para ProductPage
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  // Fixture para SwapiClient (API)
  swapiClient: async ({ request }, use) => {
    const swapiClient = new SwapiClient(request);
    await use(swapiClient);
  },

  // Fixture que encapsula a lógica do utils.ts
  screenShot: async ({ page }, use, testInfo) => {
    await use(async () => {
      await captureScreenshot(page, testInfo);
    });
  },
});

// Exportamos o expect padrão para manter os imports limpos nos arquivos de teste
export { expect } from "@playwright/test";
