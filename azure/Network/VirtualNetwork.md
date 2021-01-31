---
title: Azure Virtual Network
---

### Index
- ### Create New Virtual Network
    ```azcli
    az network vnet create \
        -g lab -n lab-vnet --address-prefix 10.0.0.0/16 --subnet-name default --subnet-prefix 10.0.1.0/24
    ```
- ### Add FrontEnd subnet to existing network
    ```azcli
    az network vnet subnet create \
        -g lab \
        --vnet-name lab-vnet \
        -n FrontEnd \
        --address-prefixes 10.0.2.0/24
    ```
  
---
### Create Network Response

```json
{
  "newVNet": {
    "addressSpace": {
      "addressPrefixes": [
        "10.0.0.0/16"
      ]
    },
    "bgpCommunities": null,
    "ddosProtectionPlan": null,
    "dhcpOptions": {
      "dnsServers": []
    },
    "enableDdosProtection": false,
    "enableVmProtection": false,
    "etag": "W/\"f1d90cab-c965-4ace-b4a1-cc20a187f8f2\"",
    "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/virtualNetworks/lab-vnet",
    "ipAllocations": null,
    "location": "eastus",
    "name": "lab-vnet",
    "provisioningState": "Succeeded",
    "resourceGroup": "lab",
    "resourceGuid": "64efec56-c504-49d8-9514-765abedc9a79",
    "subnets": [
      {
        "addressPrefix": "10.0.1.0/24",
        "addressPrefixes": null,
        "delegations": [],
        "etag": "W/\"f1d90cab-c965-4ace-b4a1-cc20a187f8f2\"",
        "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/virtualNetworks/lab-vnet/subnets/default",
        "ipAllocations": null,
        "ipConfigurationProfiles": null,
        "ipConfigurations": null,
        "name": "default",
        "natGateway": null,
        "networkSecurityGroup": null,
        "privateEndpointNetworkPolicies": "Enabled",
        "privateEndpoints": null,
        "privateLinkServiceNetworkPolicies": "Enabled",
        "provisioningState": "Succeeded",
        "purpose": null,
        "resourceGroup": "lab",
        "resourceNavigationLinks": null,
        "routeTable": null,
        "serviceAssociationLinks": null,
        "serviceEndpointPolicies": null,
        "serviceEndpoints": null,
        "type": "Microsoft.Network/virtualNetworks/subnets"
      }
    ],
    "tags": {},
    "type": "Microsoft.Network/virtualNetworks",
    "virtualNetworkPeerings": []
  }
}
```
