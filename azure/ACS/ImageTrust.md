---
title: Image Trust
---

### Important
- ### Assign `AcrImageSigner` role to the user

### Commands
- ### Create a new user with `AcrImageSigner`role
```powershell
New-AzADUser -UserPrincipalName "imagesigner@cloudx-labs.in" -DisplayName "image-signer" -MailNickName "imagesigner"
New-AzRoleAssignment -ResourceGroupName "lab204" -SignInName "imagesigner@cloudx-labs.in" -RoleDefinitionName "AcrImageSigner"
```
```azurecli
az role assignment create --role AcrImageSigner --assignee imagesigner@cloudx-labs.in
```

- ### Enable Image Trust in Registry
```azurecli
az acr config content-trust update --status enabled -g "lab204" --name "lab204"
```

### References
- ### [Generate Docker Trust Keys](https://docs.docker.com/engine/security/trust/trust_delegation/#creating-delegation-keys)
- ### [Docker User Trust](https://docs.docker.com/engine/security/trust/content_trust/)
