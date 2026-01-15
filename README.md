# Lumio Platform - Monorepo

Plataforma de gerenciamento de eventos científicos com arquitetura monorepo.

## 📁 Estrutura do Projeto

```
lumio-platform/
├── apps/
│   ├── frontend/          # Aplicação Angular
│   └── backend/           # API NestJS (em desenvolvimento)
├── packages/
│   └── shared/            # Código compartilhado (models, DTOs)
└── package.json           # Configuração do workspace
```

## 🚀 Como Usar

### Instalar Dependências

```bash
# Instalar dependências do root
npm install

# Instalar dependências do frontend
cd apps/frontend && npm install
```

### Desenvolvimento

```bash
# Rodar apenas o frontend
npm run dev:frontend

# Rodar frontend e backend simultaneamente (quando backend estiver pronto)
npm run dev
```

### Build

```bash
# Build do frontend
npm run build:frontend

# Build do backend (quando estiver pronto)
npm run build:backend
```

## 📦 Pacotes

### @lumio/shared

Código compartilhado entre frontend e backend:
- **Models**: Interfaces de dados (Event, User, etc.)
- **DTOs**: Data Transfer Objects para APIs

## 🛠️ Tecnologias

- **Frontend**: Angular 20 + TypeScript
- **Backend**: NestJS + TypeScript (em desenvolvimento)
- **Autenticação**: Firebase Authentication
- **Banco de Dados**: PostgreSQL (planejado)

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev:frontend` | Inicia o frontend em modo desenvolvimento |
| `npm run dev:backend` | Inicia o backend em modo desenvolvimento |
| `npm run dev` | Inicia frontend e backend simultaneamente |
| `npm run build:frontend` | Build de produção do frontend |
| `npm run build:backend` | Build de produção do backend |

## 🔗 Links Úteis

- [Documentação Angular](https://angular.dev)
- [Documentação NestJS](https://nestjs.com)
- [Firebase](https://firebase.google.com)
