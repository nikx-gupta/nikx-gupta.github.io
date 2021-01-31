---
title: Azure Traffic Manager
---

### Important
- Routes only endpoints across different regions. Cannot look into data and queries
- Endpoints supported
  - Azure Endpoint
    - Cloud Service / App Service
    - App Service Slot
    - Public IP Address in azure
  - External Endpoint - External `FQDN` or `IP Address`
  - Nested Endpoint - Nested Traffic Manager Profiles
- Routing Methods
  - `Weighted Routing` - Weights Assigned to each endpoint
    ![Center_500_TM01](/images/TM_01.svg)
  - `Performance Routing` - Internet latency table
    ![Center_500_TM02](/images/TM_02.svg)
  - `Geographic Routing` - Geo Fencing requests to specific regions based on DNS Query origination
    ![Center_500_TM03](/images/TM_03.svg)
  - `Multivalue Routing` - Return multiple endpoints for DNS query where user can choose between them
  - `Subnet Routing` - Add subnets at time of configuration from which endpoints will be provided based on user's IPAddress
  - `Priority Routing` - Each Service endpoint is given priority
    ![Center_500_TM04](/images/TM_04.svg)

### Index
- ### To Monitor `Network Latency` send Real User Measurements to Azure Traffic Manager using Javascript
  - `Generate a new key` from Traffic Manager Dashboard and use provided `Javascript code snippet` into the web page to report realtime latency measurements

- [Enable Automatic Failover by using Priority Routing](TMPriorityRouting)
- [Traffic Manager using Performance Routing](TMPerfRouting)

### References
- [Routing](https://docs.microsoft.com/en-us/learn/modules/distribute-load-with-traffic-manager/2-priority-routing)
