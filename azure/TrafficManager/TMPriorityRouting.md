---
title: Automatic Failover by using Priority Routing
---

### Important

### Provisioning

- Create New Traffic Manager Profile
  ```azcli
  az network traffic-manager profile create \
      -g lab --name TM-MusicStream-Priority \
      --routing-method Priority --unique-dns-name TM-MusicStream-Priority-$RANDOM
  ```
  - Parameters
    - `routing-method` - Priority Routing
    - `unique-dns-name` - Unique Traffic Manager DNS Endpoint
- Deploy Web Application
  ```azcli
  az deployment group create \
      -g lab --template-uri  https://raw.githubusercontent.com/MicrosoftDocs/mslearn-distribute-load-with-traffic-manager/master/azuredeploy.json \
      --parameters password="$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32)"
  ```
- Add the endpoints to Traffic Manager

  ```azcli
  WestId=$(az network public-ip show \
      -g lab \
      --name westus2-vm-nic-pip \
      --query id \
      --out tsv)
  ```
  ```azcli
  az network traffic-manager endpoint create \
      -g lab \
      --profile-name TM-MusicStream-Priority \
      --name "Primary-WestUS" \
      --type azureEndpoints \
      --priority 1 \
      --target-resource-id $WestId
  ```
  ```azcli
  EastId=$(az network public-ip show \
      -g lab \
      --name eastasia-vm-nic-pip \
      --query id \
      --out tsv)
  ```
  ```azcli
  az network traffic-manager endpoint create \
      -g lab \
      --profile-name TM-MusicStream-Priority \
      --name "Failover-EastAsia" \
      --type azureEndpoints \
      --priority 2 \
      --target-resource-id $EastId
  ```

- Verify Endpoint List
  ```azcli
  az network traffic-manager endpoint list \
      -g lab \
      --profile-name TM-MusicStream-Priority \
      --output table
  ```
- Perform `nslookup` for the endpoint

  ```bash
  # Retrieve the address for the West US 2 web app
  nslookup $(az network public-ip show -g lab --name westus2-vm-nic-pip --query dnsSettings.fqdn \
              --output tsv)

  # Retrieve the address for the East Asia web app
  nslookup $(az network public-ip show \
              -g lab --name eastasia-vm-nic-pip --query dnsSettings.fqdn \
              --output tsv)

  # Retrieve the address for the Traffic Manager profile
  nslookup $(az network traffic-manager profile show \
              -g lab --name TM-MusicStream-Priority --query dnsConfig.fqdn \
              --out tsv)
  ```
