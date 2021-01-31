---
title: Storage Access Restrictions
---

- ### Create Storage Account `without public endpoints`
```azcli
az storage account create --name lab204genstorage -g lab204 --allow-blob-public-access false --access-tier Hot `
    --sku Standard_LRS --kind StorageV2 --publish-microsoft-endpoints true --min-tls-version TLS1_2
```

- ### Attach Storage account to Private Virtual Network Subnet in different resource group
```azcli
 $subnet = az network vnet subnet show --name default --vnet-name lab204-vnet -g lab-vm --query "id" -o tsv
 az storage account network-rule add --account-name lab204genstorage --subnet $subnet -g lab204
```

- ### Add Service Endpoint at subnet level (More Restrictive)
```azcli
  az network vnet subnet update -g lab-vm --vnet-name lab204-vnet -n default --service-endpoints Microsoft.Storage
```

- ### Deny Access from `All Networks` option in `Firewalls and Virtual networks`
```azcli
az storage account update -g lab204 --name lab204genstorage --default-action Deny
```

- ### Upload file from same VNet
    - [Create a Virtual Machine](/Azure/VirtualMachine/CreateLinuxVM) in same Virtual network as the Storage Account

    - Upload File from Virtual Machine
```azcli
az storage blob upload --account-name lab204blobstorage -f films.json -c datasets -n films.json `
    --account-key 3CVXkKxbVU3F0BbyIV5vb0uTsbmTJiXBfIGpkz3ECow946T9+zp40V7VPVIKc/sg08J/H7Tor29eGqm4azgJ5w==
```

### References
- [Storage Account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?toc=%2Fazure%2Fstorage%2Fblobs%2Ftoc.json&tabs=azure-portal)
