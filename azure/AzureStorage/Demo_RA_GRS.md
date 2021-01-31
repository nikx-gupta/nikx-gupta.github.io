---
title: GeoRedundant Storage
---

### Topics
1. ### Create a Storage Account
    ```azcli
    STORAGEACCT=$(az storage account create \
        --resource-group learn-4fcd8292-a5ba-4ad6-a5dc-0768aaf33749 \
        --name healthcareapp$RANDOM \
        --sku Standard_RAGRS \
        --output tsv \
        --query "name")

    echo $STORAGEACCT
    ```

2. ### Verify replication status
    ```azcli
    az storage account show \
        --name $STORAGEACCT \
        --query "[statusOfPrimary, statusOfSecondary]"

    az storage account show \
        --name $STORAGEACCT \
        --expand geoReplicationStats \
        --query "[primaryEndpoints, secondaryEndpoints, geoReplicationStats]"
    ```
