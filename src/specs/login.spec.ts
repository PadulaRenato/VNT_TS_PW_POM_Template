//Testes divididos em steps, com metodos encapsulados na camada page
import { test, expect } from "../support/fixtures";

test.describe("Autenticação @login", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("Login com credenciais válidas", async ({ loginPage, screenShot }) => {
    await test.step("Realizar login", async () => {
      await loginPage.performLogin(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
    });

    await test.step("Validar login com sucesso", async () => {
      await expect(loginPage.btnLogout).toBeVisible();
      await screenShot();
    });
  });

  test("Login com credenciais inválidas", async ({ loginPage, screenShot }) => {
    await test.step("Tentativa de login com dados inválidos", async () => {
      await loginPage.performLogin("usuario@invalido.com", "senha123");
    });

    await test.step("Validar mensagem de erro", async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await screenShot();
    });
  });
});
