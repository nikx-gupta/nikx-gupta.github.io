---
title: Network Security Group
---

### Index
- ### [Create Virtual Network with name `lab-vnet` and subnet `FrontEnd`](VirtualNetwork)
- ### Create New Network Security Group (NSG)
    ```azcli
    az network nsg create \
        --name lab-nsg-frontend -g lab
    ```
- ### Add Rule to NSG (Deny All Incoming Calls to Http PORT 80)
    ```azcli
    az network nsg rule create \
        --nsg-name lab-nsg-frontend -g lab \
        --name lab-frontend-rule-80 --priority 100 \
        --source-address-prefixes '*' --source-port-ranges 80 \
        --destination-address-prefixes '*' --destination-port-ranges 80 \
        --access Deny --protocol Tcp --description "Sample Lab to block 80 port"
    ```
- ### Update Subnet to Associate NSG with FrontEnd Subnet
    ```azcli
    az network vnet subnet update \
        -g lab -n FrontEnd --vnet-name lab-vnet --nsg lab-nsg-frontend
    ```
  
- ### Update Network Interface to Associate NSG
    ```azcli
    az network nic update \
        --name lab-nic-frontend -g lab --network-security-group lab-nsg-frontend
    ```
---
### Create Network Security Group Response {#successMsg}

```json
{
  "NewNSG": {
    "defaultSecurityRules": [
      {
        "access": "Allow",
        "description": "Allow inbound traffic from all VMs in VNET",
        "destinationAddressPrefix": "VirtualNetwork",
        "destinationAddressPrefixes": [],
        "destinationApplicationSecurityGroups": null,
        "destinationPortRange": "*",
        "destinationPortRanges": [],
        "direction": "Inbound",
        "etag": "W/\"2f58e7da-62f9-412f-9f16-6d17a9292b6f\"",
        "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowVnetInBound",
        "name": "AllowVnetInBound",
        "priority": 65000,
        "protocol": "*",
        "provisioningState": "Succeeded",
        "resourceGroup": "lab",
        "sourceAddressPrefix": "VirtualNetwork",
        "sourceAddressPrefixes": [],
        "sourceApplicationSecurityGroups": null,
        "sourcePortRange": "*",
        "sourcePortRanges": [],
        "type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
      },
      {
        "access": "Allow",
        "description": "Allow inbound traffic from azure load balancer",
        "destinationAddressPrefix": "*",
        "destinationAddressPrefixes": [],
        "destinationApplicationSecurityGroups": null,
        "destinationPortRange": "*",
        "destinationPortRanges": [],
        "direction": "Inbound",
        "etag": "W/\"2f58e7da-62f9-412f-9f16-6d17a9292b6f\"",
        "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowAzureLoadBalancerInBound",
        "name": "AllowAzureLoadBalancerInBound",
        "priority": 65001,
        "protocol": "*",
        "provisioningState": "Succeeded",
        "resourceGroup": "lab",
        "sourceAddressPrefix": "AzureLoadBalancer",
        "sourceAddressPrefixes": [],
        "sourceApplicationSecurityGroups": null,
        "sourcePortRange": "*",
        "sourcePortRanges": [],
        "type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
      },
      {
        "access": "Deny",
        "description": "Deny all inbound traffic",
        "destinationAddressPrefix": "*",
        "destinationAddressPrefixes": [],
        "destinationApplicationSecurityGroups": null,
        "destinationPortRange": "*",
        "destinationPortRanges": [],
        "direction": "Inbound",
        "etag": "W/\"2f58e7da-62f9-412f-9f16-6d17a9292b6f\"",
        "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/DenyAllInBound",
        "name": "DenyAllInBound",
        "priority": 65500,
        "protocol": "*",
        "provisioningState": "Succeeded",
        "resourceGroup": "lab",
        "sourceAddressPrefix": "*",
        "sourceAddressPrefixes": [],
        "sourceApplicationSecurityGroups": null,
        "sourcePortRange": "*",
        "sourcePortRanges": [],
        "type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
      },
      {
        "access": "Allow",
        "description": "Allow outbound traffic from all VMs to all VMs in VNET",
        "destinationAddressPrefix": "VirtualNetwork",
        "destinationAddressPrefixes": [],
        "destinationApplicationSecurityGroups": null,
        "destinationPortRange": "*",
        "destinationPortRanges": [],
        "direction": "Outbound",
        "etag": "W/\"2f58e7da-62f9-412f-9f16-6d17a9292b6f\"",
        "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowVnetOutBound",
        "name": "AllowVnetOutBound",
        "priority": 65000,
        "protocol": "*",
        "provisioningState": "Succeeded",
        "resourceGroup": "lab",
        "sourceAddressPrefix": "VirtualNetwork",
        "sourceAddressPrefixes": [],
        "sourceApplicationSecurityGroups": null,
        "sourcePortRange": "*",
        "sourcePortRanges": [],
        "type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
      },
      {
        "access": "Allow",
        "description": "Allow outbound traffic from all VMs to Internet",
        "destinationAddressPrefix": "Internet",
        "destinationAddressPrefixes": [],
        "destinationApplicationSecurityGroups": null,
        "destinationPortRange": "*",
        "destinationPortRanges": [],
        "direction": "Outbound",
        "etag": "W/\"2f58e7da-62f9-412f-9f16-6d17a9292b6f\"",
        "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/AllowInternetOutBound",
        "name": "AllowInternetOutBound",
        "priority": 65001,
        "protocol": "*",
        "provisioningState": "Succeeded",
        "resourceGroup": "lab",
        "sourceAddressPrefix": "*",
        "sourceAddressPrefixes": [],
        "sourceApplicationSecurityGroups": null,
        "sourcePortRange": "*",
        "sourcePortRanges": [],
        "type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
      },
      {
        "access": "Deny",
        "description": "Deny all outbound traffic",
        "destinationAddressPrefix": "*",
        "destinationAddressPrefixes": [],
        "destinationApplicationSecurityGroups": null,
        "destinationPortRange": "*",
        "destinationPortRanges": [],
        "direction": "Outbound",
        "etag": "W/\"2f58e7da-62f9-412f-9f16-6d17a9292b6f\"",
        "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend/defaultSecurityRules/DenyAllOutBound",
        "name": "DenyAllOutBound",
        "priority": 65500,
        "protocol": "*",
        "provisioningState": "Succeeded",
        "resourceGroup": "lab",
        "sourceAddressPrefix": "*",
        "sourceAddressPrefixes": [],
        "sourceApplicationSecurityGroups": null,
        "sourcePortRange": "*",
        "sourcePortRanges": [],
        "type": "Microsoft.Network/networkSecurityGroups/defaultSecurityRules"
      }
    ],
    "etag": "W/\"2f58e7da-62f9-412f-9f16-6d17a9292b6f\"",
    "flowLogs": null,
    "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkSecurityGroups/lab-nsg-frontend",
    "location": "eastus",
    "name": "lab-nsg-frontend",
    "networkInterfaces": null,
    "provisioningState": "Succeeded",
    "resourceGroup": "lab",
    "resourceGuid": "7c0cf798-4418-44f5-91ed-0d91f4c32ad1",
    "securityRules": [],
    "subnets": null,
    "tags": null,
    "type": "Microsoft.Network/networkSecurityGroups"
  }
}
```
