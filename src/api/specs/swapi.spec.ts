import { test, expect } from "../../support/fixtures";
import { peopleSchema } from "../schemas/people.schema";
import { planetSchema } from "../schemas/planet.schema";

test.describe("SWAPI API Tests @api", () => {
  test("Deve buscar informações do Luke Skywalker com validação completa e contrato", async ({ swapiClient }) => {
    const response = await swapiClient.getPeople("1");

    // Validação de Status e Headers
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    const headers = response.headers();
    expect(headers["content-type"]).toContain("application/json");

    const data = await response.json();

    // Validação de Contrato (Schema)
    const validation = peopleSchema.safeParse(data);
    if (!validation.success) {
      console.error("Erro de validação de contrato:", validation.error.format());
    }
    expect(validation.success, "O contrato da resposta deve ser válido").toBeTruthy();

    // Validação de Valores Específicos
    expect(data).toEqual(
      expect.objectContaining({
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        gender: "male",
      })
    );
  });

  test("Deve buscar informações de Tatooine e validar contrato", async ({ swapiClient }) => {
    const response = await swapiClient.getPlanet("1");
    expect(response.status()).toBe(200);

    const data = await response.json();

    // Validação de Contrato (Schema)
    const validation = planetSchema.safeParse(data);
    if (!validation.success) {
      console.error("Erro de validação de contrato:", validation.error.format());
    }
    expect(validation.success, "O contrato da resposta deve ser válido").toBeTruthy();

    // Validação de Valores Específicos
    expect(data.name).toBe("Tatooine");
    expect(data.terrain).toContain("desert");
  });

  test("Deve validar erro 404 e mensagem para recurso inexistente", async ({ swapiClient }) => {
    const response = await swapiClient.getPeople("999999");
    expect(response.status()).toBe(404);
    expect(response.ok()).toBeFalsy();

    // SWAPI retorna { detail: "Not found" }
    const data = await response.json();
    expect(data).toHaveProperty("detail", "Not found");
  });
});
