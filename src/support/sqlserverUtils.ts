import { request } from "@playwright/test";

/**
 * Configuração de conexão com o banco de dados.
 */
const dbConfig = {
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

let isConnected = false;

/**
 * Estabelece a conexão com o banco de dados.
 */
export async function connectToDatabase() {
  console.log(`Conectando ao banco de dados em: ${dbConfig.connection.host}...`);

  // Ajuste: Ignora erros de certificado SSL (comum em redes corporativas/VPNs)
  const context = await request.newContext({ ignoreHTTPSErrors: true });
  const response = await context.get(`${dbConfig.connection.host}${dbConfig.connection.database}`);

  if (response.ok()) {
    isConnected = true;
    console.log("Conexão estabelecida com sucesso.");
  } else {
    throw new Error(`Falha ao conectar no banco de dados: ${response.status()} - ${response.statusText()}`);
  }
}

//Executa uma query SQL no banco de dados.

export async function executeQuery(query: string) {
  if (!isConnected) {
    await connectToDatabase();
  }

  const context = await request.newContext({ ignoreHTTPSErrors: true });
  const response = await context.get(`${dbConfig.connection.host}${dbConfig.connection.database}`);
  const data = await response.json();

  const normalizedQuery = query.trim();

  // Processamento da query SQL para a tabela 'users'
  if (/SELECT \* FROM users/i.test(normalizedQuery)) {
    let results = data.users;

    const whereMatch = normalizedQuery.match(/WHERE\s+(\w+)\s*=\s*'([^']+)'/i);

    if (whereMatch) {
      const [, field, value] = whereMatch;
      results = results.filter((item: any) => item[field] === value);
    }

    return results;
  }

  throw new Error(`Query não suportada ou inválida: ${query}`);
}

/**
 * Encerra a conexão com o banco de dados.
 */
export async function closeConnection() {
  isConnected = false;
  console.log("Conexão encerrada.");
}
