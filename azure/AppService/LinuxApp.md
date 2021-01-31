---
title: Deploy Linux App Service
---

### Topics
- ### Create Web Deployment User
```azurecli
az webapp deployment user set --user-name lab204-app --password Demo@123
```

- ### Create App Service Plan
```azurecli
az appservice plan create --name lab204-linux-plan -g lab204 --sku S1 --is-linux
```

- ### Create Web App
> - `--%` to bypass special characters when executing in powershell
```azurecli
az --% webapp create -g "lab204" --plan "lab204-plan" --name "lab204-app" --runtime "DOTNETCORE|3.1" --deployment-local-git
```

- ### Init local GIT repo and push the code (replace `:` with `@` in git hub url)
```bash
git remote add azure https://lab204-app@lab204-app.scm.azurewebsites.net/lab204-app.git
git push azure master
```

