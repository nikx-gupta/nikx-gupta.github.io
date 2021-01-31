---
title: App Service with SQL Database
---

### Commands
- ### Create SQL Server & Database
```azurecli
az sql server create -l eastus -g lab204 -n lab204-sql-server -u nikx -p Demo@123
az sql db create -n lab204-db -g lab204 -s lab204-sql-server -e GeneralPurpose -f Gen5 -c 4 --compute-model Provisioned `
    --sample-name AdventureWorksLT -e GeneralPurpose
```

- ### [Link - Create WebApp](../LinuxApp)
- ### Enable logging live stream
```azurecli
az webapp log config --name lab204-app -g lab204 --application-logging true --level information
```
