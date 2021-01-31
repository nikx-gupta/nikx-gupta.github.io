---
title: Linux AppService using ARM
---

### Important
- After ACR creation note down credentials for pushing image to repository

### Commands
- ### Create ACR Registry and Enable `admin user`
    ```azurecli
    az acr create -g lab -n cmiregistry --admin-enabled true --sku Basic
    ```
    - #### Parameters
        - `sku` - Basic, Standard, Premium

- ### [Build and Push Image to Repository](/Azure/ACS/Registry)
- ### [Sample App to Deploy]({{ page.lab }}/services/onboarding) //TODO Fix
- ### Deploy using ARM template
    ```json
    {
        "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "command": {
                "type": "string",
                "defaultValue": "dotnet CMI.Services.Onboarding.dll"
            },
            "password": {
                "type": "string"
            },
            "username": {
                "type": "string"
            },
            "image": {
                "type": "string",
                "defaultValue": "DOCKER|cmiregistry.azurecr.io/cmi-onboarding:6"
            },
            "registry": {
                "type": "string",
                "defaultValue": "https://cmiregistry.azurecr.io"
            },
            "group-name": {
                "type": "string",
                "defaultValue": "lab"
            },
            "sku": {
                "type": "object",
                "defaultValue": {
                    "tier": "Standard",
                    "name": "S1"
                }
            }
        },
        "variables": {
            "lab-id": "[parameters('group-name')]",
            "hostingPlanName": "[concat(variables('lab-id'),'-cmi-onboarding-hp')]",
            "webSiteName": "[concat(variables('lab-id'),'-cmi-onboarding')]"
        },
        "resources": [
            {
                "apiVersion": "2018-11-01",
                "name": "[concat(variables('webSiteName'))]",
                "type": "Microsoft.Web/sites",
                "location": "[resourceGroup().location]",
                "tags": {
                    "lab": "[variables('lab-id')]"
                },
                "dependsOn": [
                    "[concat('Microsoft.Web/serverfarms/', variables('hostingPlanName'))]"
                ],
                "properties": {
                    "name": "[variables('webSiteName')]",
                    "siteConfig": {
                        "appSettings": [
                            {
                                "name": "DOCKER_REGISTRY_SERVER_URL",
                                "value": "[parameters('registry')]"
                            },
                            {
                                "name": "DOCKER_REGISTRY_SERVER_USERNAME",
                                "value": "[parameters('username')]"
                            },
                            {
                                "name": "DOCKER_REGISTRY_SERVER_PASSWORD",
                                "value": "[parameters('password')]"
                            },
                            {
                                "name": "WEBSITES_ENABLE_APP_SERVICE_STORAGE",
                                "value": "false"
                            }
                        ],
                        "linuxFxVersion": "[parameters('image')]",
                        "appCommandLine": "[parameters('command')]",
                        "alwaysOn": true
                    },
                    "serverFarmId": "[concat('/subscriptions/', subscription().subscriptionId,'/resourcegroups/',parameters('group-name'), '/providers/Microsoft.Web/serverfarms/', variables('hostingPlanName'))]",
                    "clientAffinityEnabled": false
                }
            },
            {
                "apiVersion": "2018-02-01",
                "name": "[variables('hostingPlanName')]",
                "type": "Microsoft.Web/serverfarms",
                "location": "[resourceGroup().location]",
                "kind": "linux",
                "tags": {
                    "lab": "[variables('lab-id')]"
                },
                "dependsOn": [],
                "properties": {
                    "name": "[variables('hostingPlanName')]",
                    "workerSize": 3,
                    "workerSizeId": 3,
                    "numberOfWorkers": "2",
                    "reserved": true
                },
                "sku": {
                    "Tier": "[parameters('sku').tier]",
                    "Name": "[parameters('sku').name]"
                }
            }
        ]
    }
    ```
