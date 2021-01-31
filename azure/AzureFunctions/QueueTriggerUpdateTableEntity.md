---
title: Create Storage Queue Trigger
---

- ### Create Storage Account
    ```azurecli
    az storage account create -n testfileshareconnect -g lab204 --kind StorageV2 --l eastus --sku Standard_LRS

    $STORAGEKEY=$(az storage account keys list -g lab204 --account-name $STORAGEACCT \
        --query "[0].value" | tr -d '"')
    ```
    ```powershell
    New-AzStorageAccount -ResourceGroupName lab204 -Name testfileshareconnect -SkuName Standard_LRS -Location eastus -Kind StorageV2 
    ```
- ### Create File Shares
    ```azurecli
    az storage share create --account-name testfileshareconnect --account-key $STORAGEKEY --name "reports"
    az storage share create --account-name testfileshareconnect --account-key $STORAGEKEY --name "data"
    ```
    ```powershell
    $storageContext = Get-AzStorageAccount -StorageAccountName testfileshareconnect -ResourceGroupName lab204
    New-AzStorageShare -Name reports  -Context $storageContext.Context
    New-AzStorageShare -Name data  -Context $storageContext.Context
    Set-AzStorageShareQuota -ShareName reports -Quota 1 -Context $storageContext.Context 
    ```
- ### Create VM and Connect File Shares
    ```azurecli
    az vm create -g lab204 --name 2019FileServer --image Win2019Datacenter --admin-username azureuser
    ```
- ### Enable NSG Rules
    ```azurecli
    az storage account network-rule add -g lab204 --account-name "testfileshareconnect" --ip-address {self IP address}
    az storage account update -g lab204 --name testfileshareconnect --https-only true
    ```
    ```powershell
    Add-AzStorageAccountNetworkRule -ResourceGroupName lab204 -AccountName testfileshareconnect -IPAddressOrRange {self IP}
    Set-AzStorageAccount -Name testfileshareconnect -ResourceGroupName lab204 -EnableHttpsTrafficOnly $True
    ```

