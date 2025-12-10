//Testes divididos em steps, com metodos encapsulados na camada page
import { test, expect } from "../support/fixtures";
import { generateProductData } from "../support/utils";

test.describe("Gerenciamento de Produtos @home", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.performLogin(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
  });

  test("Cadastro e exclusão de produto", async ({ productPage, screenShot }) => {
    const product = generateProductData();

    await test.step("Cadastrar Produto", async () => {
      await productPage.registerProduct(product.name, product.code, product.price, product.type, product.category);
    });

    await test.step("Validar cadastro do produto", async () => {
      await productPage.scrollDownToProduct(product.name);
      const isVisible = await productPage.isProductVisible(product.name);
      expect(isVisible).toBeTruthy();
      await screenShot();
    });

    await test.step("Excluir o produto", async () => {
      await productPage.deleteProduct(product.name);
    });

    await test.step("Validar exclusão do produto", async () => {
      const isVisibleAfterDelete = await productPage.isProductVisible(product.name);
      expect(isVisibleAfterDelete).toBeFalsy();
      await screenShot();
    });
  });
});
