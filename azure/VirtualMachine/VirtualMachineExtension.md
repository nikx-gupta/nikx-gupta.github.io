---
title: "Virtual Machine"
description: Virtual Machine Extensions
---

### Comparison
- ### Custom Script Extension
    - Setup - It is built into the Azure portal. Doesn't support Storage.
    - Management - Good for small scale configuration after provisoning
    - Interoperability - Can be used in ARM template or can deploy it using Azure PowerShell or the Azure CLI.
    - Language - PowerShell and Bash.
    - Limitations - If your script needs more than one and a half hours to apply your configuration. Avoid any configuration that needs reboots
- ### DSC Extension
    - Setup - Can be downloaded from Storage.
    - Management - Complex scripts can be managed and stored.
    - Interoperability - Used with Azure Automation State Configuration. Configuration can be done using Portal, CLI, ARM template.
    - Language - Only PowerShell
    - Limitations - Only powershell and if using without Azure Automation has to rely on self orchestration and management
- ### Azure Automation State Configuration
    - Setup - Easy but require familiarity with Azure Portal.
    - Management - Insights and dashboards for centrally managing all configuration and servers.
    - Interoperability - work with DSC only. Can be used to manage OnPrem server or any cloud provider.
    - Language - Only PowerShell
    - Limitations - Only powershell

- ### Custom Script Extension
    ```json
    {
        "apiVersion": "2019-06-01",
        "type": "Microsoft.Compute/virtualMachines/extensions",
        "name": "[concat(variables('virtual machineName'),'/', 'InstallWebServer')]",
        "location": "[parameters('location')]",
        "dependsOn": [
            "[concat('Microsoft.Compute/virtualMachines/',variables('virtual machineName'))]"
        ],
        "properties": {
            "publisher": "Microsoft.Compute",
            "type": "CustomScriptExtension",
            "typeHandlerVersion": "1.7",
            "autoUpgradeMinorVersion":true,
            "settings": {
                "fileUris": [
                    "https://your-potential-file-location.com/your-script-file.ps1"
                ],
                "commandToExecute": "powershell.exe -ExecutionPolicy Unrestricted -File your-script-file.ps1"
           	}
        }
    }
    ```

- ### DSC Extension
    ```json
    {
    	"type": "Microsoft.Compute/virtualMachines/extensions",
    	"name": "Microsoft.Powershell.DSC",
    	"apiVersion": "2018-06-30",
    	"location": "<region>",
    	"dependsOn": [
    		"[concat('Microsoft.Compute/virtualMachines/', parameters('virtual machineName'))]"
    	],
    	"properties": {
    		"publisher": "Microsoft.Powershell",
    		"type": "DSC",
    		"typeHandlerVersion": "2.77",
    		"autoUpgradeMinorVersion": true,
    		"settings": {
    			"configuration": {
    				"url": "https://demo.blob.core.windows.net/iisinstall.zip",
    				"script": "IisInstall.ps1",
    				"function": "IISInstall"
    			}
    		},
    		"protectedSettings": {
    			"configurationUrlSasToken": "odLPL/U1p9lvcnp..."
    		}
    	}
    }
    ```

