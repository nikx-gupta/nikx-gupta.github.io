---
title: HttpTrigger Function
---

### Important
- #### Install enviornment before executing command. All are `nodejs` commands. [(Link - Install)]()
- #### Function name can be anything. Actual function name is displayed as per `Function Attribute` 
- #### You can have multiple functions inside same `.cs` class

1. ### Creates placeholder for Azure Function App specific to `nodejs` language. Execute in `empty folder`
    ```nodejs
    func init --worker-runtime nodejs
    ```

2. ### Add a new Function with name `SimpleNodejsTimerTriggerFunc` to Function App
    ```nodejs
    func new --name SimpleNodejsTimerTriggerFunc --language javascript --template TimerTrigger
    ```
    - Creates a new folder with function name `SimpleNodejsTimerTriggerFunc`
    - `index.json` - Executable function code (with parameters)
    - `function.json` - Actual function definition

4. ### Execute Function locally
    ```nodejs
    func host start
    ```
    - Each binding becomes a property of the context object with the same name set in the JSON

5. ### Check `function.json` for each Trigger Function in `(/bin/output/{FunctionName}/function.json)`
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

6. ### Execute Pre-compiled function using `script-root`
    - Copy the `bin` folder to a seperate folder name `published`
    ```nodejs
    func host start --script-root <<Path of published folder>>
    ```
    - `dotnet publish` will not work

7. ### Add Different function in same file with custom route
    ```csharp
    [FunctionName("TriggerGetParams")]
    public static async Task<IActionResult> Route02(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = "GetParams")] HttpRequest req,
            ILogger log)
    ```
    - Starting Host again will deploy another function with name `GetParams`
    ![Small_HostImg_01](/images/Func_Lab01_01.png)
