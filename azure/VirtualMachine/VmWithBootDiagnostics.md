---
title: Boot Diagnostics
---

### Commands
- ### Declare Variable for Storage Name
    ```azcli
    STORAGE=metricsstorage$RANDOM
    ```
- ### Create Storage Account
    ```azcli
    az storage account create \
        --name $STORAGE \
        --sku Standard_LRS \
        --location eastus2 \
        -g lab
    ```
- ### Create VM with Boot Diagnostics Storage
    ```azcli
    az vm create \
        --name monitored-linux-vm \
        --image UbuntuLTS \
        --size Standard_B1s \
        --location eastus2 \
        --admin-username azureuser \
        --boot-diagnostics-storage $STORAGE \
        --resource-group learn-9250bc57-dde5-4640-accb-94062756c201 \
        --generate-ssh-keys
    ```
- ### Enable Boot Diagnostics
    ```azcli
    az vm boot-diagnostics enable --name monitored-linux-vm -g lab
    ```
