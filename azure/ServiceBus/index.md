---
title: Service Bus
---

### Important
- Partitions & Buffer
    - It divides messages into partition and buffer them for `24 hrs` so that events are not missed
- Capture
    - For Persistency, hubs can send capture messages to Data Lake and Blob Storage
    
### Create Service Bus
```azurecli
    az servicebus namespace authorization-rule keys list --resource-group learn-051030e2-0f07-467a-a603-9903d39b16c2 \
        --name RootManageSharedAccessKey --query primaryConnectionString --output tsv \
        --namespace-name lab400namespace
```

### Show Service Bus Queue
```azurecli
    az servicebus queue show --resource-group learn-051030e2-0f07-467a-a603-9903d39b16c2 \
        --name salesmessages --query messageCount --namespace-name lab400namespace
```

### References
- [Use ServiceBus Queue](https://docs.microsoft.com/en-us/learn/modules/implement-message-workflows-with-service-bus/5-exercise-write-code-that-uses-service-bus-queues)
