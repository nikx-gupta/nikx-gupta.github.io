---
title: Azure Dashboard
---

### Topics
- ### Compute
    - [Virtual Machine](VirtualMachine)
    - [Serverless](AzureFunctions)
    - [App Services](AppService)
- ### Storage
    - [Azure Storage](AzureStorage)
    - [CosmosDB](CosmosDB)
    - [SQL/MYSQL](RDBMS)
- ### [Network](Network)
    - [VPN](Network/VPN)
    - [Traffic Manager](TrafficManager)
- ### Messaging
    - [Event Hubs](EventHubs)
    - [Service Bus](ServiceBus)
- ### Active Directory
    - [Authentication](Authentication)
    - [AzureAD](AzureAD)
- ### [Resource Management](ResourceManagement)
    - [Locks](ResourceManagement/Locks)
    - [Management Groups](ResourceManagement/ManagementGroups)
    - [Resource Movement](ResourceManagement/Movement)
- ### [Security](Security)
    - [Key Vault](KeyVault)
- ### Container
    - [Azure Container Registry](ACS)
    - [Docker](Docker)
- ### [DevOps](DevOps)
- ### Apply policies to control and audit resource creation
    - Azure Policy
    - Azure Blueprint
- ### Review Microsoft's policies and privacy guarantees
    - Compliance Manager
- ### Exam Content
    - ### [AZ-204 (Developing Solutions for Microsoft Azure)](Exams/AZ204)
    - ### [AZ-500 (Azure Security Expert)]()
        - Management Groups
        - Azure Policy
        - Identity and RBAC
        - Azure Blueprint
        - Naming Standards
        - Resource Groups
        - Azure Resource Graph
- ### Setup
    - ### Azure CLI with Service Principal
        ```azcli
        az ad sp create-for-rbac --sdk-auth -n lab --scopes /subscriptions/{subscription id}
        ```
