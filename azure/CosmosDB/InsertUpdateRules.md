---
title: CosmosDB Insert/Update Rules
---

### Commands
- ### Create CosmosDb account with SQL or mongoapi
    ```azcli
    az cosmosdb create -g lab -n nikxlabcosmos --enable-free-tier true
    ```
- ### Create mongodb database in above cosmos account
    ```azcli
    az cosmosdb mongodb database create --account-name lab-mongo -g lab -n inserttest
    ```

### `SQL API` Insertion rules {#notes}
- ### Partition and Unique key combination is unique
- ### `Partition Key and Unique key` combination is unique
    - ### Create a collection with Partition Key as `/name`
        ```azcli
        az cosmosdb mongodb collection create \
            --account-name lab-mongo \
            --database-name sqlcoll \
            --name collinsert -g lab \
            --shard "name"
        ```
        - ### Parameters {#parameters}
            - `shard` - Partition Key
    
    - ### Insert below document `without Partition Key`
    
        ```json
        {
          "id" : "1",
          "category" : "test"
        }
        ```
    - ### Try Inserting another document `without Partition Key`
        - ### Success - No error for duplicate blank record for Partition Key `name` for `different Id` {#successMsg}
        
        ```json
        {
          "id" : "12",
          "category" : "test-2"
        }
        ```
    - ### Try Inserting another document `without Partition Key` but same Id
        - ### Error - Not allowed {#errorMsg}
        
        ```json
        {
          "id" : "1",
          "category" : "test-2"
        }
        ```
      
### Insertion Rules for `Mongo API` {#notes}
- ### Record cannot be inserted `without Partition key value` (applicable only for Mongo API)
    - ### Create a collection with Partition Key as `/id`
        ```azcli
        az cosmosdb mongodb collection create \
            --account-name lab-mongo \
            --database-name inserttest \
            --name collinsert -g lab \
            --shard "id"
        ```
        - ### Parameters {#parameters}
            - `shard` - Partition Key
    
    - ### Insert below document
        ```json
        {
          "id" : "1",
          "category" : "test",
          "name" : "record-first"
        }
        ```
    - ### Try Inserting another document with same `id`
        ```json
        {
          "id" : "1",
          "category" : "test-2",
          "name" : "record-second"
        }
        ```
    - ### Try Inserting another document without value for `id`
        - ### Error - Cannot insert record without providing value for `Partition Key` {#error}
        
        ```json
        {
          "category" : "test-3",
          "name" : "record-third"
        }
        ```


