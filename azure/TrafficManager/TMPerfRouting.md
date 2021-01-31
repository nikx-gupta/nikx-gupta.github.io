---
title: Traffic Manager profile using performance routing
---

### Provisioning

- Create New Traffic Manager Profile

  ```azcli
  az network traffic-manager profile create \
    --resource-group Sandbox resource group  \
    --name TM-MusicStream-Performance \
    --routing-method Performance \
    --unique-dns-name TM-MusicStream-Performance-$RANDOM \
    --output table
  ```

  - Parameters
    - `routing-method` - Performance
    - `unique-dns-name` - Unique Traffic Manager DNS Endpoint

- Deploy Web Application

  ```azcli
  WestId=$(az network public-ip show \
    --resource-group Sandbox resource group  \
    --name westus2-vm-nic-pip \
    --query id \
    --out tsv)

  az network traffic-manager endpoint create \
      --resource-group Sandbox resource group  \
      --profile-name TM-MusicStream-Performance \
      --name "WestUS" \
      --type azureEndpoints \
      --target-resource-id $WestId

  EastId=$(az network public-ip show \
      --resource-group Sandbox resource group  \
      --name eastasia-vm-nic-pip \
      --query id \
      --out tsv)

  az network traffic-manager endpoint create \
      --resource-group Sandbox resource group  \
      --profile-name TM-MusicStream-Performance \
      --name "EastAsia" \
      --type azureEndpoints \
      --target-resource-id $EastId
  ```

- Test the endpoints

  ```azcli
  echo http://$(az network traffic-manager profile show \
    --resource-group Sandbox resource group  \
    --name TM-MusicStream-Performance \
    --query dnsConfig.fqdn \
    --output tsv)

  # Use nslookup to resolve the Traffic Manager profile domain name.
  nslookup $(az network traffic-manager profile show \
        --resource-group Sandbox resource group  \
        --name TM-MusicStream-Performance \
        --query dnsConfig.fqdn \
        --output tsv)
  ```
