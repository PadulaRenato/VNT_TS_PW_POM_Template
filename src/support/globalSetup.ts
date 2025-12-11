// Este arquivo é executado uma única vez antes de todos os testes.
// É o local ideal para configurações globais, como:
// 1. Obter dados no banco de dados.
// 2. Criar massa de dados inicial.
// 3. Verificar se o ambiente de testes (URL) está acessível.

import { FullConfig } from "@playwright/test";
import { closeConnection } from "./sqlserverUtils";
import { UserQueries } from "../queries/UserQueries";
import fs from "fs";
import path from "path";

async function globalSetup(config: FullConfig) {
  console.log("Global Setup: Iniciando execução da suíte de testes...");

  // Garante que a pasta 'reports' exista para centralizar logs, html e screenshots
  const reportsDir = path.resolve(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) {
    console.log("Global Setup: Criando diretório 'reports'...");
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  //realiza conexao no banco de dados e armazena as informações  de login
  try {
    console.log("Global Setup: Buscando credenciais de admin no banco de dados...");

    const users = await UserQueries.getUsersByRole("admin");

    if (users && users.length > 0) {
      const adminUser = users[0];

      process.env.ADMIN_EMAIL = adminUser.email;
      process.env.ADMIN_PASSWORD = adminUser.password;

      console.log(`Global Setup: Credenciais configuradas para o usuário: ${adminUser.email}`);
    } else {
      throw new Error("Global Setup: Nenhum usuário admin encontrado no banco de dados.");
    }
  } catch (error) {
    console.error("Global Setup: Falha ao configurar ambiente de testes.", error);
    throw error;
  } finally {
    await closeConnection();
  }
}

export default globalSetup;
