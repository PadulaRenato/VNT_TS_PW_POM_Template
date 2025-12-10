import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
  //===Locators===//

  // Header
  get logoutButton() {
    return this.page.locator('[data-testId="btn-logout"]');
  }
  get userEmailDisplay() {
    return this.page.locator("#userEmail");
  }

  // Formulário de Cadastro
  get inputName() {
    return this.page.locator('[data-testId="in-nome"]');
  }
  get inputCode() {
    return this.page.locator('[data-testId="in-codigo"]');
  }
  get inputPrice() {
    return this.page.locator('[data-testId="in-preco"]');
  }
  get selectType() {
    return this.page.locator('[data-testId="in-tipo"]');
  }
  get selectCategory() {
    return this.page.locator('[data-testId="in-categoria"]');
  }
  get registerButton() {
    return this.page.locator('[data-testId="btn-cadastrar"]');
  }

  // Tabela de Produtos
  get productTableBody() {
    return this.page.locator("#productTableBody");
  }

  constructor(private page: Page) {}

  //===Methods===//

  async navigate(): Promise<void> {
    // Navega para a home.html (assumindo que está na mesma pasta do index.html definido na baseURL)
    await this.page.goto("home.html");
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async registerProduct(name: string, code: string, price: string, type: string, category?: string): Promise<void> {
    await this.inputName.fill(name);
    await this.inputCode.fill(code);
    await this.inputPrice.fill(price);
    await this.selectType.selectOption(type);

    if (category) {
      await this.selectCategory.selectOption(category);
    }

    await this.registerButton.click();
  }

  async scrollDownToProduct(text: string): Promise<void> {
    await this.productTableBody.locator("tr", { hasText: text }).scrollIntoViewIfNeeded();
  }
  // Verifica se um produto existe na tabela pelo texto (ex: nome ou código)
  async isProductVisible(text: string): Promise<boolean> {
    const row = this.productTableBody.locator("tr", { hasText: text });
    return await row.isVisible();
  }

  async deleteProduct(name: string): Promise<void> {
    // Encontra a linha que contém o nome do produto
    const row = this.productTableBody.locator("tr", { hasText: name });

    // Configura o listener para aceitar o 'confirm' do navegador antes de clicar
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Clica no botão de excluir dentro dessa linha (assumindo que é o único botão ou o primeiro)
    await row.locator("button").click();
  }
}
