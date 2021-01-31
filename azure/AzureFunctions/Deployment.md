---
title: Deploy Azure Functions
---

1. ### ARM template for deployment
    ```json
    {
        "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "storageName": {
                "type": "string",
                "defaultValue": "lab400storage"
            },
            "createStorage": {
                "type": "bool",
                "defaultValue": false
            }
        },
        "variables": {
            "lab-id": "lab400",
            "hostingPlanName": "[concat(variables('lab-id'),'-function-hp')]",
            "webSiteName": "[concat(variables('lab-id'),'-function-app')]",
            "storageName": "[parameters('storageName')]"
        },
        "resources": [
            {
                "name": "[variables('storageName')]",
                "condition": "[parameters('createStorage')]",
                "type": "Microsoft.Storage/storageAccounts",
                "apiVersion": "2019-06-01",
                "location": "[resourceGroup().location]",
                "kind": "StorageV2",
                "sku": {
                    "name": "Standard_LRS",
                    "tier": "Premium"
                }
            },
            {
                "name": "[variables('hostingPlanName')]",
                "type": "Microsoft.Web/serverfarms",
                "apiVersion": "2018-02-01",
                "location": "[resourceGroup().location]",
                "sku": {
                    "name": "S1",
                    "tier": "Dynamic"
                },
                "properties": {
                    "name": "[variables('hostingPlanName')]"
                }
            },
            {
                "name": "[variables('webSiteName')]",
                "type": "Microsoft.Web/sites",
                "apiVersion": "2018-11-01",
                "location": "[resourceGroup().location]",
                "kind": "functionapp",
                "dependsOn": [
                    "[resourceId('Microsoft.Web/serverfarms', variables('hostingPlanName'))]",
                    "[resourceId('Microsoft.Storage/storageAccounts', variables('storageName'))]"
                ],
                "properties": {
                    "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', variables('hostingPlanName'))]",
                    "siteConfig": {
                        "appSettings": [
                            {
                                "name": "AzureWebJobsDashboard",
                                "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', 'storageAccountName', ';AccountKey=', listKeys(variables('storageName'),'2015-05-01-preview').key1)]"
                            },
                            {
                                "name": "AzureWebJobsStorage",
                                "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', 'storageAccountName', ';AccountKey=', listKeys(variables('storageName'),'2015-05-01-preview').key1)]"
                            },
                            {
                                "name": "WEBSITE_CONTENTAZUREFILECONNECTIONSTRING",
                                "value": "[concat('DefaultEndpointsProtocol=https;AccountName=', 'storageAccountName', ';AccountKey=', listKeys(variables('storageName'),'2015-05-01-preview').key1)]"
                            },
                            {
                                "name": "WEBSITE_CONTENTSHARE",
                                "value": "[toLower(variables('webSiteName'))]"
                            },
                            {
                                "name": "FUNCTIONS_EXTENSION_VERSION",
                                "value": "~3"
                            },
                            {
                                "name": "FUNCTIONS_WORKER_RUNTIME",
                                "value": "dotnet"
                            }
                        ]
                    }
                }
            }
        ]
    }
    ```
    - ### Parameters
        - `storageName` - if existing provide in `defaultValue` and keep `createStorage` as false
        
2. ### Deploy template to create basic infrastructure to host function app
    ```azurecli
    az deployment group create -n lab400-function-deploy -f template_consumption_plan.json -g lab400
    ```

3. ### Publish the function
    - ### Navigate to the source code folder which has `function.json` or `.csproj` file
    - ### Change `lab400cloudxfunctionapp` to your function app name you used while deploying `arm template`
    ```nodejs
    func azure functionapp publish lab400cloudxfunctionapp --force
    ```
    ![Center_200](/assets/images/Func_Lab03_01.png)

4. ### Test the function from URL's
