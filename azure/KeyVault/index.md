---
title: Key Vault
---

### Topics
- ### [Key Rotation using Automation Account](KeyRotationWithRunbook)

### Custom Encryption Key
```powershell
New-AzKeyVault -VaultName "byShell-vault" -ResourceGroupName "lab204" -Location "EastUS"
New-AzKeyVault -VaultName "byShell-vault" -ResourceGroupName "lab204" -Location "EastUS" -EnabledForDiskEncryption 
New-AzKeyVault -VaultName "byShell-vault" -ResourceGroupName "lab204" -Location "EastUS" -EnablePurgeProtection
New-AzKeyVault -VaultName "byShell-vault" -ResourceGroupName "lab204" -Location "EastUS" -DisableSoftDelete
```
```azurecli
//TODO 
```

### Assign Access Policies
```powershell
Set-AzKeyVaultAccessPolicy -VaultName "byShell-vault" -ResourceGroupName "lab204" -UserPrincipalName "admin@cloudx-labs.in" `
    -PermissionsToKeys "create,decrypt,delete,list,encrypt,get,import"
```
```azurecli
//TODO 
```

### Add Key & Secrets
```powershell
Add-AzKeyVaultKey -VaultName "byShell-vault" -Size "2048" -Name "sample-key-0" -Destination Software
Set-AzKeyVaultSecret -VaultName "byShell-vault" -Name "sample-key-0"
```
```azcli
//TODO 
```

### Enable Purge Protection (Former Soft Delete)
```azcli
az keyvault create -g lab --enable-purge-protection true
```
```azcli
az keyvault create -g lab --enable-purge-protection true --retention-days 7
```

### CLI
- ### az keyvault
 ```shell
    Group
        az keyvault : Manage KeyVault keys, secrets, and certificates.
    
    Subgroups:
        backup                      [Preview] : Manage full HSM backup.
        certificate                           : Manage certificates.
        key                                   : Manage keys.
        network-rule                          : Manage vault network ACLs.
        private-endpoint-connection [Preview] : Manage vault private endpoint connections.
        private-link-resource       [Preview] : Manage vault private link resources.
        restore                     [Preview] : Manage full HSM restore.
        role                        [Preview] : Manage user roles for access control.
        secret                                : Manage secrets.
        security-domain             [Preview] : Manage security domain operations.
        storage                               : Manage storage accounts.
    
    Commands:
        create                                : Create a Vault or HSM.
        delete                                : Delete a Vault or HSM.
        delete-policy                         : Delete security policy settings for a Key Vault.
        list                                  : List Vaults and/or HSMs.
        list-deleted                          : Get information about the deleted Vaults or HSMs in a
                                                subscription.
        purge                                 : Permanently delete the specified Vault or HSM. Aka
                                                Purges the deleted Vault or HSM.
        recover                               : Recover a Vault or HSM.
        set-policy                            : Update security policy settings for a Key Vault.
        show                                  : Show details of a Vault or HSM.
        update                                : Update the properties of a Vault.
        update-hsm                  [Preview] : Update the properties of a HSM.
        wait                                  : Place the CLI in a waiting state until a condition of
                                                the Vault is met.
        wait-hsm                    [Preview] : Place the CLI in a waiting state until a
                                                condition of the HSM is met.
 ```

- ### az keyvault create
 ```shell
    Command
        az keyvault create : Create a Vault or HSM.
            If `--enable-rbac-authorization` is not specified, then default permissions are created for
            the current user or service principal unless the `--no-self-perms` flag is specified.
    
    Arguments
        --resource-group -g        [Required] : Name of resource group. You can configure the default group using `az configure --defaults group=<name>`.
        --administrators            [Preview] : [HSM Only] Administrator role for data plane operations for Managed HSM. It accepts a space separated
                                                list of OIDs that will be assigned.
            Argument '--administrators' is in preview. It may be changed/removed in a future
            release.
        --enable-purge-protection             : Property specifying whether protection against purge is enabled for this vault. Setting this property to true
                                                activates protection against purge for this vault and its content - only the Key Vault service may initiate a
                                                hard, irrecoverable deletion. The setting is effective only if soft delete is also enabled. Enabling this
                                                functionality is irreversible - that is, the property does not accept false as its value.  Allowed values:
                                                false, true.
        --enable-rbac-authorization [Preview] : Property that controls how data actions are authorized. When true, the key vault will use Role Based
                                                Access Control (RBAC) for authorization of data actions, and the access policies specified in vault properties
                                                will be  ignored (warning: this is a preview feature).
                                                When false, the key vault will use the access policies specified in vault properties, and any policy stored on
                                                Azure Resource Manager will be ignored. If null or not specified, the vault is created with the default value
                                                of false. Note that management actions are always authorized with RBAC.  Allowed values: false, true.
                                                Argument '--enable-rbac-authorization' is in preview. It may be changed/removed in a
                                                future release.
        --enable-soft-delete     [Deprecated] : [Vault Only] Property to specify whether the 'soft delete' functionality is enabled for this key
                                                vault. If it's not set to any value (true or false) when creating new key vault, it will be set to true by
                                                default. Once set to true, it cannot be reverted to false.  
                                                Allowed values: false, true.
                                                Argument 'enable_soft_delete' has been deprecated and will be removed in a future
                                                release.
        --enabled-for-deployment              : [Vault Only] Property to specify whether Azure Virtual
                                                Machines are permitted to retrieve certificates stored
                                                as secrets from the key vault.  Allowed values: false,
                                                true.
        --enabled-for-disk-encryption         : [Vault Only] Property to specify whether Azure Disk
                                                Encryption is permitted to retrieve secrets from the
                                                vault and unwrap keys.  Allowed values: false, true.
        --enabled-for-template-deployment     : [Vault Only] Property to specify whether Azure Resource
                                                Manager is permitted to retrieve secrets from the key
                                                vault.  Allowed values: false, true.
        --hsm-name                  [Preview] : Name of the HSM. (--hsm-name and --name/-n are mutually exclusive, please specify just one of them).
                                                Argument '--hsm-name' is in preview. It may be changed/removed in a future release.
        --location -l                         : Location. Values from: `az account list-locations`. You
                                                can configure the default location using `az configure
                                                --defaults location=<location>`.
        --name -n                             : Name of the Vault.
        --no-self-perms                       : [Vault Only] Don't add permissions for the current
                                                user/service principal in the new vault.  Allowed
                                                values: false, true.
        --no-wait                             : Do not wait for the long-running operation to finish.
        --retention-days                      : Soft delete data retention days. It accepts >=7 and <=90.  Default: 90.
        --sku                                 : Required. SKU details. Allowed values for Vault:
                                                premium, standard. Default: standard. Allowed values for
                                                HSM: Standard_B1, Custom_B32. Default: Standard_B1.
        --tags                                : Space-separated tags: key[=value] [key[=value] ...]. Use
                                                "" to clear existing tags.
    
    Network Rule Arguments
        --bypass                              : Bypass traffic for space-separated uses.  Allowed
                                                values: AzureServices, None.
        --default-action                      : Default action to apply when no rule matches.  Allowed
                                                values: Allow, Deny.
        --network-acls                        : Network ACLs. It accepts a JSON filename or a JSON
                                                string. JSON format: `{\"ip\":[<ip1>, <ip2>...],\"vnet\"
                                                :[<vnet_name_1>/<subnet_name_1>,<subnet_id2>...]}`.
        --network-acls-ips                    : Network ACLs IP rules. Space-separated list of IP
                                                addresses.
        --network-acls-vnets                  : Network ACLS VNet rules. Space-separated list of
                                                Vnet/subnet pairs or subnet resource ids.
    
    Examples
        Create a key vault with network ACLs specified (use --network-acls to specify IP and VNet rules
        by using a JSON string).
            az keyvault create --location westus2 --name MyKeyVault --resource-group MyResourceGroup
            --network-acls "{\"ip\": [\"1.2.3.4\", \"2.3.4.0/24\"], \"vnet\":
            [\"vnet_name_1/subnet_name1\", \"vnet_name_2/subnet_name2\", \"/subscriptions/000000-0000-00
            00/resourceGroups/MyResourceGroup/providers/Microsoft.Network/virtualNetworks/MyVNet/subnets
            /MySubnet\"]}"
    
    
        Create a key vault with network ACLs specified (use --network-acls to specify IP and VNet rules
        by using a JSON file).
            az keyvault create --location westus2 --name MyKeyVault --resource-group MyResourceGroup
            --network-acls network-acls-example.json
    
    
        Create a key vault with network ACLs specified (use --network-acls-ips to specify IP rules).
            az keyvault create --location westus2 --name MyKeyVault --resource-group MyResourceGroup
            --network-acls-ips 3.4.5.0/24 4.5.6.0/24
    
    
        Create a key vault with network ACLs specified (use --network-acls-vnets to specify VNet rules).
            az keyvault create --location westus2 --name MyKeyVault --resource-group MyResourceGroup
            --network-acls-vnets vnet_name_2/subnet_name_2 vnet_name_3/subnet_name_3 /subscriptions/0000
            00-0000-0000/resourceGroups/MyResourceGroup/providers/Microsoft.Network/virtualNetworks/vnet
            _name_4/subnets/subnet_name_4
    
    
        Create a key vault with network ACLs specified (use --network-acls, --network-acls-ips and
        --network-acls-vnets together, redundant rules will be removed, finally there will be 4 IP rules
        and 3 VNet rules).
            az keyvault create --location westus2 --name MyKeyVault --resource-group MyResourceGroup
            --network-acls "{\"ip\": [\"1.2.3.4\", \"2.3.4.0/24\"], \"vnet\":
            [\"vnet_name_1/subnet_name1\", \"vnet_name_2/subnet_name2\"]}" --network-acls-ips 3.4.5.0/24
            4.5.6.0/24 --network-acls-vnets vnet_name_2/subnet_name_2 vnet_name_3/subnet_name_3 /subscri
            ptions/000000-0000-0000/resourceGroups/MyResourceGroup/providers/Microsoft.Network/virtualNe
            tworks/vnet_name_4/subnets/subnet_name_4
    
    
        Create a key vault. (autogenerated)
            az keyvault create --location westus2 --name MyKeyVault --resource-group MyResourceGroup
 ```





