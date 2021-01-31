---
title: Event Hubs
---

### Important
- Partitions & Buffer
    - It divides messages into partition and buffer them for `24 hrs` so that events are not missed
- Capture
    - For Persistency, hubs can send capture messages to Data Lake and Blob Storage

### Create
```azurecli
az eventhubs eventhub create --name $HUB_NAME --namespace-name $NS_NAME
```

### Show
```azurecli
az eventhubs eventhub show --namespace-name $NS_NAME --name $HUB_NAME
```

### Important
- #### Init and Start Azure Storage Emulator
    - Navigate to Path `C:\Program Files (x86)\Microsoft SDKs\Azure\Storage Emulator`
    ```cmd
    AzureStorageEmulator init
    AzureStorageEmulator start
    AzureStorageEmulator stop
    ```
- #### Install Cosmos DB Emulator from `https://aka.ms/cosmosdb-emulator`
### References
 - [Test Event hub Resiliency](https://docs.microsoft.com/en-us/learn/modules/enable-reliable-messaging-for-big-data-apps-using-event-hubs/7-exercise-evaluate-the-performance-of-the-deployed-event-hub-using-the-azure-portal)
