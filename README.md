# salesTracker - Sistema de Acompanhamento de Vendas para Vidraçaria

[![Licença MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Aplicação web para gerenciamento do fluxo de vendas e produção em vidraçaria, com controle de status de materiais (vidro/alumínio) e permissões hierárquicas.

## ✨ Funcionalidades

- **Dashboard de vendas** com filtros por:
  - Número do pedido
  - Cliente
  - Tipo de produto ( M2000, Portão automático, Portão de alumínio, Esquadria de alumínio com vidro )
  - Status ( Não iniciado, Em andamento, Finalizado )
- **Controle de materiais**:
  - Status do vidro ( Pendente medidas / Pendente projeto / Pendente pedido / Aguardando material / Aguardando agendamento / Finalizado )
  - Status do alumínio ( Pendente medidas / Pendente projeto / Pendente pedido / Aguardando material / Aguardando agendamento / Finalizado )
- **Hierarquia de usuários**:

  - **Admin**: Cria/edita/exclui pedidos e gerencia usuários
  - **Visualizador**: Apenas consulta o andamento

- **Histórico automático** de alterações com data/hora

## 🛠 Tecnologias

- **Frontend**:
  ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-20232A?style=flat&logo=typescript)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-20232A?style=flat&logo=tailwindcss)

- **Backend**:
  ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
  ![Cloud Functions](https://img.shields.io/badge/Cloud%20Functions-FFCA28?style=flat&logo=firebase&logoColor=black)

## 🚀 Como Executar

1. **Pré-requisitos**:

   - Node.js v16+
   - Conta Firebase

2. **Configuração**:
   ```bash
   git clone https://github.com/erfilho/salesTracker.git
   cd salesTracker
   npm install
   ```
