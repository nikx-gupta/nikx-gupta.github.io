---
title: Azure Functions
description: Create and learn first function using HttpTrigger
permalink: /Labs/AzureFunctions/Learn
---

### Important
- Install environment before executing command. All are `nodejs` commands. [(Link - Install)]()
- Function name can be anything. Actual function name is displayed as per `Function Attribute` 
- You can have multiple functions inside same `.cs` class

### Provisioning
- #### Creates placeholder for Azure Function App specific to `dotnet` language. Execute in `empty folder`
    ```bash
    func init --worker-runtime dotnet
    ```
    - #### Following files are created under the current folder
        - `host.json` - Used to configure Host Environment specific Properties
        - `local.settings.json` - Use to configure Local Environment and point to Emulators
        - `*.csproj` - CSharp Project file
        
- #### Update `Sdk Functions` package
    ```bash
    dotnet add package Microsoft.NET.Sdk.Functions
    ```

- #### Add a new Function with name `SimpleHttpTriggerFunc` to Function App
    ```nodejs
    func function new --template HttpTrigger --name SimpleHttpTriggerFunc
    ```
    - Creates a CSharp file with the name of `SimpleHttpTriggerFunnc`
    - It's not mandatory to add file reference to csproject file.

- #### Execute Function locally
    ```nodejs
    func host start
    ```
    - Hit function using Postman or browser on `http://localhost:7071/api/SimpleHttpTriggerFunc?name=SimpleCall`
    - Change the `Port` number as per your settings

- #### **Check `function.json` for each Trigger Function in `(/bin/output/{FunctionName}/function.json)`**
    ```json
    {
        "generatedBy": "Microsoft.NET.Sdk.Functions-3.0.9",
        "configurationSource": "attributes",
        "bindings": [
            {
            "type": "httpTrigger",
            "methods": [
                "get",
                "post"
            ],
            "authLevel": "function",
            "name": "req"
            }
        ],
        "disabled": false,
        "scriptFile": "../bin/SimpleHttpTrigger.dll",
        "entryPoint": "dotnet.SimpleHttpTriggerFunc.WithoutRoute"
    }
    ```
    - Parameters
        - `bindings`
            - `input` - Triggers
            - `output` - Destination to operate on 
        - `type`
            - Timer
            - Blob
            - EventHub
            - Http
            - Queue
            - Webhook
            - Github Webhook
        - `authLevel` - `anonymous` or `function (for RBAC)`
        - `entryPoint` - format `{root folder}.{function name}.{method name}`

- #### **Execute Pre-compiled function using `script-root`**
    - Copy the `bin` folder to a seperate folder name `published`
    ```nodejs
    func host start --script-root <<Path of published folder>>
    ```
    - `dotnet publish` will not work

- #### **Add Different function in same file with custom route**
    ```csharp
    [FunctionName("TriggerGetParams")]
    public static async Task<IActionResult> Route02(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "GetParams")] HttpRequest req,
            ILogger log)
    ```
    - Starting Host again will deploy another function with name `GetParams`
    ![Small_HostImg_01](/images/Func_Lab01_01.png)
