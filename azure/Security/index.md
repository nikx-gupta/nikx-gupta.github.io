---
title: Azure Security
---

### Topics
- ### [AzureAD](../AzureAD)
  - ### Privileged Identity Management (PIM)
    - ### SignIn Risks
    
      Risk Type	                                |   Risk Level	
      Users with Leaked Credentials             |	High
      Signs in from anonymous IP addresses      | Medium
      Impossible travels to atypical locations  | Medium
      Sign-In from unfamiliar location          | Medium
      Sign-Ins from Infected devices            | Low
      
  - ### Azure AD Connect
    - ### Implementation Requirements
        - On-Premise user account must be in `Enterprise Admins` role
        - Azure user account must be `Global Administrator`
    - ### Control what users can be synched using `Synchronization Rules Editor`
  - ### [Access Reviews](../AzureAD/AccessReviews)
    - Access Reviews can be sent out to users to confirm they need `Assigned Roles`
    - Automated actions can be taken to `keep or remove access` based on `Azure Threat Protection` risk score 
      right from Access Review dashboard
    - For `Multiple Access Reviews or Workflow` use [Access Review Program](../AzureAD/AccessReviewProgram)  
  - ### Security Groups
    - A Security Group can either be only one of `Assigned`, `Dynamic User` or `Dynamic Device`
- ### [Key Vault](../KeyVault)
  - `Enable Purge Protection (Former Soft Delete)` to retain accidentally deleted objects from >7 and maximum 90 days
  - [`Key Rotation` using Azure Automation Runbook](../KeyVault/KeyRotationWithRunbook)
    - [Reference](https://docs.microsoft.com/en-us/azure/key-vault/secrets/tutorial-rotation-dual#key-rotation-using-azure-automation)
- RBAC (Role Based Access Control)
- ### Database Protection
    - ### Azure SQL DB
      - [Always Encrypted](https://docs.microsoft.com/en-us/azure/azure-sql/database/always-encrypted-certificate-store-configure)
        - Encrypt Columns at rest
        - Certificate key can be stored in Windows Certificate Store, Azure KeyVault or HSM
    - ### [CosmosDB (SQL API)](../CosmosDB)
        - [Prefer User & Resource Token over Authorization Keys](../CosmosDB/ResourceToken)
            - When temporary permissions required
            - Provides access to specific container, partition keys, documents, attachments, stored procedures, triggers and UDF
- Azure Information Protection
- Azure Advanced Threat Protection
- Azure Security Center

