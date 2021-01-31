---
title: Durable Functions
---

### Topics
- ### Durable Function Patterns
    - ### Chain - Calls Functions in exact order and pass the result serially
    ![Center_400_Chain](/assets/images/Durable_Func_01.png)
    - ### Fan Out/Fan In - Multiple functions in Parallel. Wait for all functions to aggregate results
    ![Center_400_FanOut](/assets/images/Durable_Func_02.png)
    - ### Async HTTP API- Long Time Operation with polling for state of operation
    ![Center_400_Async](/assets/images/Durable_Func_03.png)
    - ### Monitor- Periodic process in a workflow
    ![Center_300_Monitor](/assets/images/Durable_Func_04.png)
    - ### Human Interaction - Orchestrations depends on Human Interaction
    ![Center_300_Human](/assets/images/Durable_Func_05.png)
    - ### Stateful Entity - Collect group of data in single business entity or state store
    ![Center_300_Stateful](/assets/images/Durable_Func_06.png)
- ### Durable Function Patterns
    - ### Client Functions
    - ### Orchestrator Functions
    - ### Activity Functions
    ![Center_300_Relationship](/assets/images/Durable_Func_07.png)

### Environment
- ### Same as Azure Functions
- ### Import Nuget package `Microsoft.AzureWebJobs.Extensions.DurableTask`

### References
- [Azure Function Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
