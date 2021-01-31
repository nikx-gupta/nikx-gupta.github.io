---
title: Azure Container Service
---

### Commands
- ### Create container Registry
```powershell
New-AzContainerRegistry -Name "lab204" -ResourceGroupName "lab204" -Location "EastUS" -Sku "Basic" -EnableAdminUser
New-AzContainerRegistry -Name "lab204" -ResourceGroupName "lab204" -Location "EastUS" -Sku "Standard" 
New-AzContainerRegistry -Name "lab204" -ResourceGroupName "lab204" -Location "EastUS" -Sku "Premium"
```
```azurecli
//TODO
```

- ### Tag and Push the image to Azure Container Registry
```bash
docker build -t=acsapi:2 .
docker tag acsapi:2 lab204.azurecr.io/lab204/acsapi
docker push lab204.azurecr.io/lab204/acsapi
```

- ### Get Credential for Container Registry
```powershell
Get-AzContainerRegistryCredential -ResourceGroupName "lab204" -Name "lab204"
```

- ### Use UserName and Password  from above command 
```powershell
$cred = Get-Credential
New-AzContainerGroup -ResourceGroupName "lab204" -Name "lab204-ci" -Image lab204.azurecr.io/lab204/acsapi:latest `
	-Location "EastUS" -Cpu 1 -MemoryInGB 2 -DnsNameLabel "acsapi" -RegistryCredential $cred
```
- ### References
