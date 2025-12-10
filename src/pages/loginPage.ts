//==File used to define the main page object and its methods==//
import { Page } from "@playwright/test";

export class LoginPage {
  //===Locators===//

  get emailInput() {
    return this.page.locator('[data-testId="in-email"]');
  }
  get passwordInput() {
    return this.page.locator('[data-testId="in-password"]');
  }
  get loginButton() {
    return this.page.locator('[data-testId="btn-entrar"]');
  }
  get errorMessage() {
    return this.page.locator("#error-message");
  }
  get btnLogout() {
    return this.page.locator('[data-testId="btn-logout"]');
  }

  constructor(private page: Page) {}

  //===Methods===//

  async navigate(): Promise<void> {
    // Navega explicitamente para a URL definida no arquivo .env
    if (!process.env.BASE_URL) throw new Error("BASE_URL não definida no arquivo .env");
    await this.page.goto(process.env.BASE_URL as string);
  }

  async performLogin(email: string, pass: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
