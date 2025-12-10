// aqui ficam funções utilitárias de uso geral para os testes

import { Page, TestInfo } from "@playwright/test";
import { faker } from "@faker-js/faker";

//Tira um screenshot e anexa automaticamente ao relatório HTML do Playwright.
export async function captureScreenshot(page: Page, testInfo: TestInfo) {
  const screenshot = await page.screenshot();
  // Gera timestamp apenas com números (ex: 20231027103015123)
  const name = new Date().toISOString().replace(/\D/g, "");
  await testInfo.attach(name, { body: screenshot, contentType: "image/png" });
}

//Gera dados aleatórios para cadastro de produto
export function generateProductData() {
  return {
    name: faker.commerce.productName(),
    code: faker.string.alpha({ length: 1, casing: "upper" }) + faker.string.numeric(3),
    price: faker.commerce.price({ min: 10, max: 500 }),
    type: faker.helpers.arrayElement(["Loja", "Marketplace"]),
    category: faker.helpers.arrayElement(["Equipamento", "Proteção", "Vestuário", "Calçados"]),
  };
}
