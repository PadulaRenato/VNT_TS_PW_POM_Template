# 📘 Template de Automação - Playwright + TypeScript

Este repositório serve como base para a criação de projetos de automação de testes E2E utilizando **Playwright** com **TypeScript**. Ele já vem configurado com boas práticas como Page Objects, Fixtures customizadas, geração de massa de dados e relatórios.

---

## 📂 Estrutura do Projeto

Entenda onde cada arquivo deve ficar:

```text
📦 raiz
 ┣ 📂 src
 ┃ ┣ 📂 pages       # Page Objects (Mapeamento de elementos e ações)
 ┃ ┣ 📂 queries     # Consultas ao Banco de Dados (Encapsulamento SQL)
 ┃ ┣ 📂 specs       # Arquivos de teste (.spec.ts)
 ┃ ┣ 📂 support     # Configurações auxiliares
 ┃ ┃ ┣ 📜 fixtures.ts      # Injeção de dependência das páginas
 ┃ ┃ ┣ 📜 sqlserverUtils.ts # Utilitário de conexão e execução de queries
 ┃ ┃ ┣ 📜 utils.ts         # Funções úteis (Screenshots, Faker, etc)
 ┃ ┃ ┣ 📜 globalSetup.ts   # Configurações antes da suíte (ex: massa de dados)
 ┃ ┃ ┗ 📜 globalTeardown.ts # Limpeza após a suíte
 ┣ 📂 reports       # Onde os relatórios e screenshots são salvos
 ┣ 📜 .env          # Variáveis de ambiente (URLs, Senhas)
 ┣ 📜 .prettierrc   # Regras de formatação de código
 ┣ 📜 playwright.config.ts # Configuração principal do Playwright
 ┗ 📜 tsconfig.json # Configuração do TypeScript
```

## 🛠️ Como Criar um Novo Teste

Siga este fluxo para manter o padrão do projeto:

### 1. Crie o Page Object (`src/pages`)

Crie uma classe representando a página. Use **Getters** para os locators e métodos assíncronos para as ações.

```typescript
export class MinhaPage {
  // Locators
  get btnSalvar() {
    return this.page.locator("#salvar");
  }

  constructor(private page: Page) {}

  // Ações
  async clicarSalvar() {
    await this.btnSalvar.click();
  }
}
```

### 2. Registre na Fixture (`src/support/fixtures.ts`)

Para não precisar dar `new MinhaPage(page)` em todo teste, registre-a na fixture.

```typescript
import { MinhaPage } from "../pages/minhaPage";

type MyFixtures = {
  minhaPage: MinhaPage;
  // ...
};

export const test = base.extend<MyFixtures>({
  minhaPage: async ({ page }, use) => {
    await use(new MinhaPage(page));
  },
  // ...
});
```

### 3. Crie o Arquivo de Teste (`src/specs`)

Importe o `test` e `expect` da sua fixture (não do @playwright/test) e chame a página no argumento.

```typescript
import { test, expect } from "../support/fixtures";

test("Meu cenário de teste", async ({ minhaPage, screenShot }) => {
  await test.step("Ação de salvar", async () => {
    await minhaPage.clicarSalvar();
    await screenShot(); // Tira print e anexa ao report
  });
});
```

### 4. Crie Queries de Banco de Dados (`src/queries`)

Para manter o SQL organizado e reutilizável, use o padrão de Queries.

1.  **Crie a classe de Query:**

    ```typescript
    // src/queries/UserQueries.ts
    import { executeQuery } from "../support/sqlserverUtils";

    export class UserQueries {
      static async getAdminUser() {
        return await executeQuery("SELECT * FROM users WHERE role = 'admin'");
      }
    }
    ```

2.  **Use no Global Setup ou nos Testes:**
    ```typescript
    // Exemplo de uso
    const users = await UserQueries.getAdminUser();
    ```

---

---

<!-- A PARTIR DAQUI É O TEMPLATE PARA O README DO PROJETO FINAL -->

# 🚀 [Nome do Projeto] - Automação de Testes

Projeto de automação de testes End-to-End para validar o fluxo de [Descreva o objetivo, ex: Vendas, Cadastro, etc].

## 🌐 Aplicação Sob Teste

O site utilizado para os testes de exemplo é um ambiente controlado criado para fins didáticos:

- **URL:** [https://padularenato.github.io/test/home.html](https://padularenato.github.io/test/home.html)

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (Versão 16 ou superior)
- [VS Code](https://code.visualstudio.com/) (Recomendado)
- Extensão "Playwright Test for VSCode"

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone [url-do-repo]
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Instale os navegadores do Playwright:
   ```bash
   npx playwright install
   ```

## ⚙️ Configuração (.env)

Crie um arquivo `.env` na raiz do projeto (baseado no exemplo abaixo) e preencha as variáveis:

```ini
BASE_URL=https://padularenato.github.io/test/home.html

# Configurações de Banco de Dados
DB_HOST=https://padularenato.github.io/test/
DB_DATABASE=users.json
DB_USER=test_runner
DB_PASSWORD=mock_secure_password

# As variáveis ADMIN_EMAIL e ADMIN_PASSWORD são injetadas automaticamente
# pelo Global Setup consultando o banco de dados.
```

## ▶️ Executando os Testes

### Rodar todos os testes (Headless)

```bash
npx playwright test
```

### Rodar com navegador visível (Headed)

```bash
npx playwright test --headed
```

### Rodar apenas testes com uma tag específica

```bash
npx playwright test -g "@home"
```

### Ver o relatório HTML

```bash
npx playwright show-report reports/html
```

## 🧩 Funcionalidades do Framework

- **Page Objects:** Estrutura organizada por páginas.
- **Queries:** Camada de abstração para consultas SQL (`src/queries`).
- **Fixtures:** Injeção automática de páginas nos testes.
- **Faker:** Geração de massa de dados dinâmica (`src/support/utils.ts`).
- **Screenshots:** Captura automática anexada ao relatório via fixture `screenShot`.
- **Steps:** Passos descritivos no relatório (`test.step`).
