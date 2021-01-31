---
title: Management Groups
---

### Important
- ### Management groups are containers that help `controlling access`, `policy` and `compliance` across multiple subscriptions
- ### `Display name` of Root Management Group can be changed only by `Owner or Contributor`
- ### Only `Azure AD Global Administrator` can `elevate themselves` to gain access to Root Management Group
- ### `Access Policies` can only be assigned by `Owner and Resource Policy Contributor`
- ### `Access to the groups` can only be assigned by `Owner and User Access Administrator`

### Commands
- ### Create Management Group
```powershell
New-AzManagementGroup -GroupName "Lab204Root" -DisplayName "Lab 204 Root"
```
```azurecli
az account management-group create 
```

### References
- ### [Manage Groups](https://docs.microsoft.com/en-us/azure/governance/management-groups/create)
