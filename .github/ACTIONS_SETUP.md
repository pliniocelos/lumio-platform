# GitHub Actions Setup - Lumio Platform

## 🚀 Workflows Configurados

### 1. Frontend CI/CD (`frontend-ci.yml`)

**Triggers:**
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`
- Mudanças em `apps/frontend/` ou `packages/shared/`

**Jobs:**
- ✅ Build do Angular
- ✅ Testes (se configurados)
- ✅ Lint (se configurado)
- ✅ Deploy automático para Firebase Hosting (apenas `main`)

---

### 2. Backend CI/CD (`backend-ci.yml`)

**Triggers:**
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`
- Mudanças em `apps/backend/` ou `packages/shared/`

**Jobs:**
- ✅ Build do NestJS
- ✅ Testes (quando configurados)
- ✅ Lint (quando configurado)
- 🔜 Deploy (configurar quando backend estiver pronto)

---

### 3. PR Checks (`pr-checks.yml`)

**Triggers:**
- Pull requests para `main` ou `develop`

**Validações:**
- ✅ Estrutura do workspace
- ✅ Verificação de secrets no código
- ✅ Validação de dependências

---

## 🔧 Configuração Necessária

### 1. Criar Repositório no GitHub

```bash
# No GitHub, criar novo repositório: lumio-platform
# Não inicializar com README (já temos)
```

### 2. Conectar Repositório Local

```bash
cd /Users/pliniovasconcelos/.gemini/antigravity/scratch/lumio-platform

# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/lumio-platform.git

# Fazer primeiro push
git add .
git commit -m "chore: initial commit - monorepo setup"
git branch -M main
git push -u origin main
```

### 3. Configurar Secrets no GitHub

Vá em: **Settings** > **Secrets and variables** > **Actions**

Adicione:

#### `FIREBASE_SERVICE_ACCOUNT`

1. No Firebase Console, vá em **Project Settings** > **Service Accounts**
2. Clique em **Generate New Private Key**
3. Copie TODO o conteúdo do arquivo JSON
4. Cole no secret `FIREBASE_SERVICE_ACCOUNT`

**Exemplo do JSON:**
```json
{
  "type": "service_account",
  "project_id": "lumio-mvp",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "...",
  ...
}
```

> [!CAUTION]
> **NUNCA** commite este arquivo no Git! Ele já está no .gitignore

---

## 📋 Checklist de Setup

- [ ] Criar repositório no GitHub
- [ ] Conectar repositório local ao GitHub
- [ ] Fazer primeiro push
- [ ] Adicionar secret `FIREBASE_SERVICE_ACCOUNT`
- [ ] Testar workflow fazendo um push

---

## 🎯 Como Funciona

### Push para `main`:
```
1. Código enviado ao GitHub
   ↓
2. GitHub Actions inicia
   ↓
3. Build do frontend
   ↓
4. Testes executados
   ↓
5. Deploy automático para Firebase
   ↓
6. Site atualizado!
```

### Pull Request:
```
1. PR criado
   ↓
2. GitHub Actions inicia
   ↓
3. Build e testes
   ↓
4. Validações de PR
   ↓
5. Status exibido no PR
   ↓
6. Merge apenas se passar
```

---

## 🔍 Monitorar Workflows

1. Vá no repositório GitHub
2. Clique na aba **Actions**
3. Veja todos os workflows rodando

---

## ⚙️ Customizar Workflows

### Adicionar Testes:

Edite `.github/workflows/frontend-ci.yml`:

```yaml
- name: Test
  run: cd apps/frontend && npm run test -- --watch=false --browsers=ChromeHeadless
```

### Adicionar Deploy do Backend:

Quando backend estiver pronto, edite `.github/workflows/backend-ci.yml`:

```yaml
deploy:
  needs: build-and-test
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  steps:
    - name: Deploy to Railway
      run: railway up
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 🚨 Troubleshooting

### Workflow falha no deploy Firebase:

1. Verificar se secret `FIREBASE_SERVICE_ACCOUNT` está configurado
2. Verificar se `projectId` está correto no workflow
3. Verificar se Firebase Hosting está ativado

### Build falha:

1. Verificar se `npm ci` funciona localmente
2. Verificar se `npm run build` funciona localmente
3. Verificar logs do workflow no GitHub Actions

---

## 📝 Próximos Passos

1. ✅ Criar repositório no GitHub
2. ✅ Configurar secrets
3. ✅ Fazer primeiro push
4. 🔜 Adicionar testes
5. 🔜 Configurar deploy do backend
6. 🔜 Adicionar badges no README
