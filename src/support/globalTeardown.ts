// Este arquivo é executado uma única vez após todos os testes terminarem.
// É o local ideal para limpeza global, como:
// 1. Deletar massa de dados criada.
// 2. Fechar conexões globais.
// 3. Enviar notificações ou gerar relatórios customizados.

import { FullConfig } from "@playwright/test";

async function globalTeardown(config: FullConfig) {
  console.log("Global Teardown: Finalizando execução da suíte de testes...");
}

export default globalTeardown;
