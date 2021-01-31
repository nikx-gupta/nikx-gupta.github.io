---
title: Azure Functions
---

### Important
- ### Azure Function SDK is based on Azure WebJobs SDK
- ### Only one function app instance can be created every 10 seconds, for up to 200 total instances. But no limit for traffic per instance

### Topics
- ### [Learn Azure Function](Learn)
    - What is `host.json`
    - Create a simple HttpTrigger
    - Learn Routing, Multiple Functions
    - Create Function in languages below
        - ### [Nodejs](CreateNodeJs)
- ### [Durable Functions](DurableFunctions)
- ### [Create custom WeatherTrigger](CustomWeatherTrigger)
    - Startup and Runtime Binding
    - Using IWebJosStartup, IExtensionConfigProvider
    - Understanding Providers ITriggerBindingProvider, IBindingProvider
- ### [Deploy Function](Deployment)


### Environment
- ### Install Azure Function core tools for nodejs [Link](https://www.npmjs.com/package/azure-functions-core-tools)
    ```bash
    npm i -g azure-functions-core-tools@3 --unsafe-perm true
    ```

- ### Install core tools [Installer Link](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash)
```azurecli
az functionapp create -g learn-7b76d2a7-1f53-4ace-bb4e-472a3c4e8799 -s labazureapp -c eastus --os-type Linux --runtime dotnet -n simplehttptrigger
```

### References
- [Azure Function Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- [Code and test Azure Functions locally](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local)
- [Develop Azure Functions using Visual Studio](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs)
- [Triggers and Bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)
- [Chain Azure Functions together using input and output bindings](https://docs.microsoft.com/en-us/learn/modules/chain-azure-functions-data-using-bindings/)
