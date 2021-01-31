---
title: Using Network Watcher
---

### Commands

- Setup Frontend and Backend Subnet
   - Create Frontend Subnet
      ```azcli
      az network vnet create \
        --resource-group $RG \
        --name MyVNet1 \
        --address-prefix 10.10.0.0/16 \
        --subnet-name FrontendSubnet \
        --subnet-prefix 10.10.1.0/24
      ```

    - Create Backend Subnet
      ```azcli
      az network vnet subnet create \
        --address-prefixes 10.10.2.0/24 \
        --name BackendSubnet \
        --resource-group $RG \
        --vnet-name MyVNet1
      ```

- Setup VM in Frontend Sunet
  ```azcli
  az vm create \
    --resource-group $RG \
    --name FrontendVM \
    --vnet-name MyVNet1 \
    --subnet FrontendSubnet \
    --image Win2019Datacenter \
    --admin-username azureuser \
    --admin-password demopassword@123
  ```
  ```azcli
  az vm extension set \
    --publisher Microsoft.Compute \
    --name CustomScriptExtension \
    --vm-name FrontendVM \
    --resource-group $RG \
    --settings '{"commandToExecute":"powershell.exe Install-WindowsFeature -Name Web-Server"}' \
    --no-wait
  ```

- Setup Backend VM
    ```azcli
    az vm create \
      --resource-group $RG \
      --name BackendVM \
      --vnet-name MyVNet1 \
      --subnet BackendSubnet \
      --image Win2019Datacenter \
      --admin-username azureuser \
      --admin-password demopassword@123
    ```
    ```azcli
    az vm extension set \
      --publisher Microsoft.Compute \
      --name CustomScriptExtension \
      --vm-name BackendVM \
      --resource-group $RG \
      --settings '{"commandToExecute":"powershell.exe Install-WindowsFeature -Name Web-Server"}' \
      --no-wait
    ```

- Create NSG
  ```azcli
  az network nsg create \
    --name MyNsg \
    --resource-group $RG
  ```

- Create NSG that prevent communication between VM's
  ```azcli
  az network nsg rule create \
    --resource-group $RG \
    --name MyNSGRule \
    --nsg-name MyNsg \
    --priority 4096 \
    --source-address-prefixes '*' \
    --source-port-ranges '*' \
    --destination-address-prefixes '*' \
    --destination-port-ranges 80 443 3389 \
    --access Deny \
    --protocol TCP \
    --direction Outbound \
    --description "Deny from specific IP address ranges on 80, 443 and 3389."
  ```

- Associate NSG with BackendSubnet
```azcli
  az network vnet subnet update \
    --resource-group $RG \
    --name BackendSubnet \
    --vnet-name MyVNet1 \
    --network-security-group MyNsg
  ```

- Verify Network Topology
  ![Center_400_NT_01](/images/Network_Topology_01.PNG)

### References
- [Network Watcher Setup](https://docs.microsoft.com/en-us/learn/modules/troubleshoot-azure-network-infrastructure/3-exercise-troubleshoot-networking-with-network-watcher)
