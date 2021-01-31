---
title: Site to Site VPN (Both Networks in Azure)
---

### Important
- Support for `IKEv1` only
- Uses `Static Routing`. The Source and Destination are declared through Policy rather than routing tables.
- Compatible with Legacy On-Premises devices


![Left_600_VPN_01](/images/VPN_01.svg)

### Provisioning
- ### Create Virtual Network in Azure 
    ```azurecli
    az network vnet create \
        -g lab --name Azure-VNet-1 --address-prefix 10.0.0.0/16 --subnet-name Services \
        --subnet-prefix 10.0.0.0/24

    az network vnet subnet create \
        -g lab --vnet-name Azure-VNet-1 --address-prefix 10.0.255.0/27 --name GatewaySubnet
    
    az network local-gateway create \
        -g lab --gateway-ip-address 94.0.252.160 --name LNG-HQ-Network \
        --local-address-prefixes 172.16.0.0/16
    ```

- ### Create Simulated On-Prem Network
    ```azurecli
    az network vnet create \
        -g lab --name HQ-Network --address-prefix 172.16.0.0/16 \
        --subnet-name Applications --subnet-prefix 172.16.0.0/24

    az network vnet subnet create \
        -g lab --address-prefix 172.16.255.0/27 --name GatewaySubnet \
        --vnet-name HQ-Network

    az network local-gateway create \
        -g lab --gateway-ip-address 94.0.252.160 --name LNG-Azure-VNet-1 \
        --local-address-prefixes 10.0.0.0/16    
    ```

- ### Create Azure Side VPN gateway
    ```azurecli
    az network public-ip create \
        -g lab --name PIP-VNG-Azure-VNet-1 --allocation-method Dynamic

    az network vnet-gateway create \
        -g lab --name VNG-Azure-VNet-1 --public-ip-address PIP-VNG-Azure-VNet-1 \
        --vnet Azure-VNet-1 --gateway-type Vpn --vpn-type RouteBased \
        --sku VpnGw1 --no-wait
    ```

- ### Create simulated OnPrem VPM Gateway
    ```azurecli
    az network public-ip create \
         -g lab --name PIP-VNG-HQ-Network --allocation-method Dynamic

    az network vnet-gateway create \
        -g lab  --name VNG-HQ-Network --public-ip-address PIP-VNG-HQ-Network \
        --vnet HQ-Network --gateway-type Vpn \
        --vpn-type RouteBased --sku VpnGw1 \
        --no-wait
    ```

- ### Verify Topology
    ```azurecli
    az network vnet list --output table

    az network local-gateway list \
        -g lab --output table
    ```

- ### Watch for updates
    ```azurecli
    watch -d -n 5 az network vnet-gateway list \
        -g lab --output table
    ```

- ### Update the remote gateway IP address references that are defined in the local network gateways
    ```azurecli
    PIPVNGAZUREVNET1=$(az network public-ip show \
        -g lab --name PIP-VNG-Azure-VNet-1 \
        --query "[ipAddress]" \
        --output tsv)

    az network local-gateway update \
        -g lab --name LNG-Azure-VNet-1 \
        --gateway-ip-address $PIPVNGAZUREVNET1
    ```

- ### Update the remote gateway IP address references that are defined in the local network gateways
    ```azurecli
    PIPVNGHQNETWORK=$(az network public-ip show \
        -g lab  --name PIP-VNG-HQ-Network \
        --query "[ipAddress]" --output tsv)

    az network local-gateway update \
        -g lab --name LNG-HQ-Network --gateway-ip-address $PIPVNGHQNETWORK
    ```

    ![Center_500_VPN_06](/images/VPN_06.svg)

    ![Center_500_VPN_07](/images/VPN_07.svg)

### References
- [VPN Gateway](https://docs.microsoft.com/en-us/learn/modules/connect-on-premises-network-with-vpn-gateway/4-exercise-create-a-site-to-site-vpn-gateway-using-azure-cli-commands)
