---
title: Azure Storage Account
---

### Topics
- ### [Generate User Delegation Key](UserDelegationKey)
- ### [Service SAS Token](ServiceSASToken)
- ### [Storage Account with Access Restriction](RestrictedAccess)
- ### [File Share Management](FileShareManagement)
- ### [Soft Delete](SoftDelete)
- ### [Demo RA_GRS](Demo_RA_GRS)

### Azure Table
- Queries Type
    - `Point Query` - With Partitionkey and RowKey. Best Performance
    - `Range Query` - With Range of values for RowKey. Less than Point Query
    - `Partition Scan` - Properties other than RowKey. Less than Range Query
    - `Table Scan` - Without PartitionKey. Always a Table scan lookup. Worst Performance

### Cosmos DB
- Consistencies
    - `Strong` - Most recent writes guranteed. Most Latency
    - `Bounded Staleness` - Reads are guaranteed under pre-defined interval
    - `Session` - Scoped to Client Session. Balance between Eventual and Strong consistency
    - `Consistent Prefix` - Always read data in same order as Write, but no guarantee on data
    - `Eventual` - No Guarantee for the order. Better performance over cost of complexity

### Service Bus
- ### Filters
    - `Boolean` - Default Filter (Either enable or disable all messages for the subscription)
    - `CoRelation` - Match value against Properties of messages mainly Corelation but also like 
                     `ContentType`, `Label`, `MessageId`, `ReplyTo`, `ReplyToSessionId`, `SessionId` 
    - `SQL` -  Enable SQL Queries on the message properties

### Storage Queues
- ### Delivery Gurantee
    - `At-Least-Once Delivery` - Guranteed to be delivered at leat once. 
        - Eg. if there are two instances of a web app retrieving messages from a queue, ordinarily each message goes to only one of those instances. However, if one instance takes a long time to process the message, and a time-out expires, the message may be sent to the other instance as well.
    - `At-Most-Once Delivery` - Message is not guaranteed to be delivered with automatic duplicate detection
    - `First-In-First-Out (FIFO)` -  Same order as they arrive

### Important
- ### See Connection string for Storage Account
    ```azcli
    az storage account show-connection-string \
        --name $STORAGEACCT \
        --resource-group lab
    ```
- ### Manual Failover storage account
    ```azcli
    az storage account failover --name "storageaccountname"
    ```
  
- ### Init and Start Azure Storage Emulator
    - Navigate to Path `C:\Program Files (x86)\Microsoft SDKs\Azure\Storage Emulator`
    ```cmd
    AzureStorageEmulator init
    AzureStorageEmulator start
    AzureStorageEmulator stop
    ```
- ### Install Cosmos DB Emulator from `https://aka.ms/cosmosdb-emulator`

### References
- [Storage Account Failover](https://docs.microsoft.com/en-us/learn/modules/ha-application-storage-with-grs/3-exercise-create-storage-account)
