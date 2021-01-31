---
title: Azure Network
---

### Important
- Container Networking with Azure CNI
    - Virtual network IP is assigned to very pod
    - Pods can connect to Azure Storage, Azure SQL, OnPrem over VPN and Peered Networks
    - NSG can be applied directly to pods
    - Pods can be placed behind Azure Internal/Public Load Balancer
    - Works with Kubernetes Ingress and Kube DNS.
    
    ![Center_300](/assets/images/Network_01.png)

### Topics
- ### [Create Virtual Network](CreateVNet)
- ### [Create Network Interface](NetworkInterface)
- ### [Network Security Group](NSG)
- ### [Application Security Group](NSG)
- ### VPN
    - [Site to Site VPN](SiteToSiteVPN)
- ### [Traffic Manager](TrafficManager)
- ### [Using Network Watcher monitoring and diagnostic tools](NetworkMonitor)
- ### Monitoring Tools
    - Topology
    - Connection Monitor
    - Network Performance Monitor
- ### Diagnositc Tools
    - IP Flow Verify
        - Packets are allowed or denied for a specific Virtual Machine by NSG
    - Next hop
        - To diagnose problems caused by incorrect routing tables
    - Effective Security Rules
        - See specific NSG rule blocking/allowing the traffic
    - Packet Capture
        - Require "Network Watcher Agent VM extension"
        - Capture Inflow/outflow to gather statistics and diagnose anomalies
    - Connection Troubleshoot
        - Verify connectivity between endpoints like VM/IP/FQDN/URI
        - Display latency issues associated with each hop in route
    - VPN Troubleshoot
        - Troubleshoot VPN gateway connections

### CLI
- ### az network
```bash
Subgroups:
    application-gateway                 : Manage application-level routing and load balancing
                                          services.
    asg                                 : Manage application security groups (ASGs).
    bastion                   [Preview] : Manage Azure bastion host.
    ddos-protection                     : Manage DDoS Protection Plans.
    dns                                 : Manage DNS domains in Azure.
    express-route                       : Manage dedicated private network fiber connections to
                                          Azure.
    lb                                  : Manage and configure load balancers.
    local-gateway                       : Manage local gateways.
    nat                                 : Commands to manage NAT resources.
    nic                                 : Manage network interfaces.
    nsg                                 : Manage Azure Network Security Groups (NSGs).
    private-dns                         : Manage Private DNS domains in Azure.
    private-endpoint                    : Manage private endpoints.
    private-endpoint-connection         : Manage private endpoint connections.
    private-link-resource               : Manage private link resources.
    private-link-service                : Manage private link services.
    profile                             : Manage network profiles.
    public-ip                           : Manage public IP addresses.
    route-filter              [Preview] : Manage route filters.
    route-table                         : Manage route tables.
    security-partner-provider [Preview] : Manage Azure security partner provider.
    service-endpoint                    : Manage policies related to service endpoints.
    traffic-manager                     : Manage the routing of incoming traffic.
    virtual-appliance         [Preview] : Manage Azure Network Virtual Appliance.
    vnet                                : Manage Azure Virtual Networks.
    vnet-gateway                        : Use an Azure Virtual Network Gateway to establish secure,
                                          cross-premises connectivity.
    vpn-connection                      : Manage VPN connections.
    vrouter                             : Manage the virtual router. This feature supports both
                                          VirtualHub and VirtualRouter. Considering VirtualRouter is
                                          deprecated, we recommend to create VirtualRouter with
                                          --hosted-subnet instead.
    watcher                             : Manage the Azure Network Watcher.

Commands:
    list-service-aliases                : List available service aliases in the region which can be
                                          used for Service Endpoint Policies.
    list-service-tags                   : List all service tags which are below to different
                                          resources.
    list-usages                         : List the number of network resources in a region that are
                                          used against a subscription quota.

```
