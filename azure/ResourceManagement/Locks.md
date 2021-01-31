---
title: Azure Resource Management
description: Azure Resource Locks on Subscription, Resource Groups, Management Groups and Resource
---

### Important
- ### Resource Locks are `inherited` by default from Parent. The hierarchy from top to bottom is
	- ### Management Group
    - ### Subscription
    - ### Resource Group
- ### When ReadOnly lock is applied over Resource no resource property can be updated


### Commands
- ### Create Resource Lock
	- Types of Locks
		- `ReadOnly`
		  - Resources cannot be moved out of resource group `but can be moved in` as they are treated as new resources. After movement `ReadOnly` restrictions apply to new resources
		  - No existing resource property can be modified
		    ```powershell
			New-AzResourceLock -LockName rg-shell-read -LockLevel ReadOnly -ResourceGroupName lab204 -Force
		    ```
			```azurecli
			az lock create --name rg-cli-read --resource-group lab204 --lock-type ReadOnly
			```
		- `CanNotDelete`
			- Resources cannot be deleted
				```powershell
				New-AzResourceLock -LockName rg-shell-read -LockLevel CanNotDelete -ResourceGroupName lab204 -Force
				```
				```azurecli
				az lock create --name rg-cli-read --resource-group lab204 --lock-type CanNotDelete
				```

### References
- ### [Resource Groups from CLI](https://docs.microsoft.com/en-us/cli/azure/lock?view=azure-cli-latest)
