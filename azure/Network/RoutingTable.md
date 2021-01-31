---
title: Azure Routing Table
---

### Index
- ### [Create Virtual Network with name `lab-vnet` and subnet `FrontEnd`](VirtualNetwork)
- ### Create Route Table
    ```azcli
    az network route-table create \
        -n lab-frontend-route -g lab
    ```
- ### Two Steps are mandatory to configure Route Table
    - Association to Subnets
    - Create Routing Rules
    
- ### Associate Route table to subnet
    ```azcli
    az network vnet subnet update \
        --route-table lab-frontend-route \
        --vnet-name lab-vnet \
        --name FrontEnd \
        -g lab
    ```
- ### Create Routing Rule (Below example with redirect traffic going gto 10.0.0.0/16 to Internet)
    ```azcli
    az network route-table route create \
        -n lab-default-redirect-route \
        --address-prefix 10.0.0.0/16 \
        --route-table-name lab-frontend-route \
        --next-hop-type Internet \
        -g lab \
    ```


---
### Network Route CLI options {#successMsg}
```bash
    az network route-table route create/update

Arguments
    --address-prefix    [Required] : The destination CIDR to which the route applies.
    --name -n           [Required] : Route name.
    --next-hop-type     [Required] : The type of Azure hop the packet should be sent to.  Allowed
                                     values: Internet, None, VirtualAppliance,
                                     VirtualNetworkGateway, VnetLocal.
    --resource-group -g [Required] : Name of resource group. You can configure the default group
                                     using `az configure --defaults group=<name>`.
    --route-table-name  [Required] : Route table name.
    --next-hop-ip-address          : The IP address packets should be forwarded to when using the
                                     VirtualAppliance hop type.


```