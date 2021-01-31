---
title: Azure Virtual Network Interface
---

### Index
- ### [Create Virtual Network Interface with name `lab-vnet` and subnet `FrontEnd`](VirtualNetwork)
- ### Create New Virtual Network Interface
    ```azcli
    az network nic create \
        -g lab -n lab-nic-frontend --vnet-name lab-vnet --subnet FrontEnd
    ```

### CLI
- ### Create Network Interface Response
  ```json
  {
    "NewNIC": {
      "dnsSettings": {
        "appliedDnsServers": [],
        "dnsServers": [],
        "internalDnsNameLabel": null,
        "internalDomainNameSuffix": "k1wo4zaeyxmetfiuoznl3xe0pb.bx.internal.cloudapp.net",
        "internalFqdn": null
      },
      "dscpConfiguration": null,
      "enableAcceleratedNetworking": false,
      "enableIpForwarding": false,
      "etag": "W/\"3fb2cf28-b0be-47d0-972f-0c1aed5d0a10\"",
      "hostedWorkloads": [],
      "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkInterfaces/lab-nic-frontend",
      "ipConfigurations": [
        {
          "applicationGatewayBackendAddressPools": null,
          "applicationSecurityGroups": null,
          "etag": "W/\"3fb2cf28-b0be-47d0-972f-0c1aed5d0a10\"",
          "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/networkInterfaces/lab-nic-frontend/ipConfigurations/ipconfig1",
          "loadBalancerBackendAddressPools": null,
          "loadBalancerInboundNatRules": null,
          "name": "ipconfig1",
          "primary": true,
          "privateIpAddress": "10.0.2.4",
          "privateIpAddressVersion": "IPv4",
          "privateIpAllocationMethod": "Dynamic",
          "privateLinkConnectionProperties": null,
          "provisioningState": "Succeeded",
          "publicIpAddress": null,
          "resourceGroup": "lab",
          "subnet": {
            "addressPrefix": null,
            "addressPrefixes": null,
            "delegations": null,
            "etag": null,
            "id": "/subscriptions/eea0fb5b-573c-4db0-a31b-6da13aa8a53c/resourceGroups/lab/providers/Microsoft.Network/virtualNetworks/lab-vnet/subnets/FrontEnd",
            "ipAllocations": null,
            "ipConfigurationProfiles": null,
            "ipConfigurations": null,
            "name": null,
            "natGateway": null,
            "networkSecurityGroup": null,
            "privateEndpointNetworkPolicies": null,
            "privateEndpoints": null,
            "privateLinkServiceNetworkPolicies": null,
            "provisioningState": null,
            "purpose": null,
            "resourceGroup": "lab",
            "resourceNavigationLinks": null,
            "routeTable": null,
            "serviceAssociationLinks": null,
            "serviceEndpointPolicies": null,
            "serviceEndpoints": null
          },
          "type": "Microsoft.Network/networkInterfaces/ipConfigurations",
          "virtualNetworkTaps": null
        }
      ],
      "location": "eastus",
      "macAddress": null,
      "name": "lab-nic-frontend",
      "networkSecurityGroup": null,
      "primary": null,
      "privateEndpoint": null,
      "provisioningState": "Succeeded",
      "resourceGroup": "lab",
      "resourceGuid": "e38ac092-3d92-4188-bea0-c835af9ccb50",
      "tags": null,
      "tapConfigurations": [],
      "type": "Microsoft.Network/networkInterfaces",
      "virtualMachine": null
    }
  }
  ```
