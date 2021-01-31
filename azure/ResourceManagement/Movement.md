---
title: Resource Movement
---

### Topics
- ### Moving Resources between different Subscriptions
  - Before movement, resource provider has to be registered in target Subscription. When using Azure Portal this is done automatically, but when moving from CLI it has to be added manually, when it is not present.
  
### Commands
- ### Display Resource Information
    ```powershell
    Get-AzResource -ResourceGroupName "lab-dns"
    Get-AzResource -ResourceGroupName "lab-dns" -ResourceType "Microsoft.Network"
    Get-AzResource -ResourceGroupName "lab-dns" -Name "cloudxlabs.in"
    ```
    ```azurecli
    az resource list --resource-group lab-dns
    az resource list -g lab-dns --namespace Microsoft.DomainRegistration --resource-type Domains
    ```
- ### Register Resource Provider if not exist in Target Subscription
    ```powershell
    Register-AzResourceProvider -ProviderNamespace "Microsoft.DomainRegistration"
    ```
- ### Move Resource in Target Subscription
    ```powershell
    $domain = Get-AzResource -ResourceGroupName "lab-dns" -ResourceName cloudx-labs.in -ResourceType Microsoft.DomainRegistration/domains
    Move-AzResource -DestinationGroupName lab204 -DestinationSubscrptionId 57caaa7f-3430-41c6-a1eb-3f4175601170 -ResourceId $domain.ResourceId
    ```
