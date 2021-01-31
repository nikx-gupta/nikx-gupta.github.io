---
title: Managed Identity
---

### Commands
- ### Declare Variable
    ```azurecli
    export VMNAME=prodserver
    export KVNAME=furniture-secrets$RANDOM
    ```

- ### Create KeyVault secret
    ```azcli
    az keyvault create --name $KVNAME \
        --resource-group learn-f18c9a7e-7611-43ba-aad1-9dbd98d7d066 \
        --default-action Allow \
        --location $(az resource list --output tsv --query [0].location) \
        --sku standard
    ```

- ### Create VM
    ```azcli
    export publicIP=$(az vm create \
        --name $VMNAME \
        --resource-group learn-f18c9a7e-7611-43ba-aad1-9dbd98d7d066 \
        --image UbuntuLTS \
        --generate-ssh-keys \
        --output tsv \
        --query "publicIpAddress")
    ```
- ### Assign Managed Identity
    ```azcli
    az vm identity assign \
        --name $VMNAME \
        --resource-group learn-f18c9a7e-7611-43ba-aad1-9dbd98d7d066
    ```
- ### Store Database Credentials to KeyVault
    ```azcli
    az keyvault secret set \
        --vault-name $KVNAME \
        --name DBCredentials \
        --value "Server=tcp:prodserverSQL.database.windows.net,1433;Database=myDataBase;User ID=mylogin@myserver;Password=examplePassword;Trusted_Connection=False;Encrypt=True;"
    ```

- ### Create User Assigned Identity
    ```azcli
    az identity create \
        --name <identity name>
        --resource-group <resource group>
    ```
- ### Assign Identity to Resource For.Eg. FunctionApp
    ```azcli
    az functionapp identity assign \
        --name <function app name> \
        --resource-group <resource group> \
        --role <principal id>
    ```

- ### Assign Identity to Resource `Example - Key Vault`
    ```azcli
    az keyvault set-policy \
        --name <key vault name> \
        --object-id <principal id> \
        --secret-permissions get list
    ```
