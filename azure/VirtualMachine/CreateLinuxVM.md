---
title: Virtual Machine
---

### Topics
- ### Create Simple Virtual Machine
    ```azcli
    az vm create -n lab-204-linux -g lab-vm --image UbuntuLTS --admin-username nikx --size Standard_B2s `
        --admin-password Password@123 --public-ip-address-dns-name lab-204-linux-vm
    ```

- ### With specified virtual network
    ```azcli
    az vm create -n lab-204-linux -g lab-vm --image UbuntuLTS --admin-username nikx --size Standard_B2s `
        --admin-password Password@123  --public-ip-address-dns-name lab-204-linux-vm `
        --vnet-name lab204-vnet --subnet default
    ```

