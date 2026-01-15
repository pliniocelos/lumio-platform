# 🚀 Firebase Hosting Setup - Próximos Passos

## ✅ O que já foi configurado

1. **Firebase CLI** instalado globalmente
2. **firebase.json** criado com:
   - Configuração para Angular SPA
   - Rewrites para todas as rotas
   - Headers de cache otimizados
3. **GitHub Actions** workflows criados:
   - `.github/workflows/firebase-hosting.yml` - Deploy automático no push para `main`
   - `.github/workflows/firebase-hosting-pr.yml` - Preview deployments em PRs

## 📋 Passos que VOCÊ precisa fazer

### 1. Login no Firebase e criar projeto

```bash
cd /Users/pliniovasconcelos/.gemini/antigravity/scratch/lumio-mvp
firebase login
```

Isso abrirá seu navegador para fazer login com sua conta Google.

### 2. Inicializar projeto Firebase

```bash
firebase init hosting
```

**Respostas sugeridas:**
- Use an existing project ou Create a new project
- What do you want to use as your public directory? **dist/lumio-mvp/browser**
- Configure as a single-page app? **Yes**
- Set up automatic builds and deploys with GitHub? **No** (já configuramos manualmente)
- File dist/lumio-mvp/browser/index.html already exists. Overwrite? **No**

### 3. Criar Service Account para GitHub Actions

```bash
firebase init hosting:github
```

Ou manualmente:

1. Vá para: https://console.firebase.google.com/
2. Selecione seu projeto
3. Project Settings → Service Accounts
4. Generate New Private Key
5. Salve o JSON gerado

### 4. Adicionar Secrets no GitHub

Vá para: https://github.com/pliniocelos/lumio-congressos-fed/settings/secrets/actions

Adicione os seguintes secrets:

**FIREBASE_SERVICE_ACCOUNT:**
- Cole todo o conteúdo do JSON da service account

**FIREBASE_PROJECT_ID:**
- Cole o ID do seu projeto Firebase (ex: `lumio-congressos-123abc`)

### 5. Fazer build local para testar

```bash
npm run build
```

Verifique se a pasta `dist/lumio-mvp/browser` foi criada.

### 6. Testar deploy manual (opcional)

```bash
firebase deploy --only hosting
```

### 7. Commit e push das alterações

```bash
git add .
git commit -m "feat: add Firebase Hosting with GitHub Actions CI/CD"
git push origin main
```

Isso vai disparar o deploy automático! 🎉

## 🔍 Verificar deploy

Após o push:
1. Vá para: https://github.com/pliniocelos/lumio-congressos-fed/actions
2. Veja o workflow rodando
3. Quando completar, acesse a URL do Firebase Hosting

## 📱 URLs do projeto

Após o deploy, você terá:
- **Produção**: `https://SEU-PROJETO.web.app`
- **Preview (PRs)**: URLs temporárias geradas automaticamente

## ❓ Problemas comuns

**Erro: "Permission denied"**
- Verifique se os secrets do GitHub estão corretos
- Confirme que a service account tem permissões de Hosting Admin

**Build falha no GitHub Actions**
- Verifique se `npm run build` funciona localmente
- Confirme que todas as dependências estão no package.json

**404 ao acessar rotas**
- Verifique se o `firebase.json` tem os rewrites corretos
- Confirme que `public` aponta para `dist/lumio-mvp/browser`

## 🆘 Precisa de ajuda?

Me chame que eu te ajudo com qualquer passo! 🚀
