---
title: Using DSC Configuration
---

### Commands
- ### [Source Code](https://github.com/MicrosoftDocs/mslearn-choose-compute-provisioning.git)

- ### DSC Configuration Script
    ```powershell
    Configuration Webserver
    {
        param ($MachineName)
    
        Node $MachineName
        {
            #Install the IIS Role
            WindowsFeature IIS
            {
                Ensure = "Present"
                Name = "Web-Server"
            }
    
            #Install ASP.NET 4.5
            WindowsFeature ASP
            {
                Ensure = "Present"
                Name = "Web-Asp-Net45"
            }
    
            WindowsFeature WebServerManagementConsole
            {
                Name = "Web-Mgmt-Console"
                Ensure = "Present"
            }
        }
    }
    ```
- ### Deploy the ARM Template (Refer ARM Templates Section)
    ```azcli
    az deployment group create \
        --resource-group learn-91a49381-2291-4877-8098-b045583f209a \
        --template-file template.json \
        --parameters vmName=hostVM1 adminUsername=serveradmin
    ```
- ### Verify IIS is installed post ARM deployment
    ```azcli
    echo http:// $(az vm show \
        --show-details \
        --resource-group learn-91a49381-2291-4877-8098-b045583f209a \
        --name hostVM1 \
        --query publicIps \
        --output tsv)
    ```
  
### ARM Templates
- ### Configure ARM Template to use the DSC Script
    - Add Parameter `modulesUrl` `defaultValue` - "https://github.com/MicrosoftDocs/mslearn-choose-compute-provisioning/raw/master/Webserver.zip"
    ```json
    {
        "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {  
            "diskType": {
            "type": "string",
            "defaultValue": "Standard_LRS",
            "allowedValues": [
                "Standard_LRS",
                "Premium_LRS"
            ],
            "metadata": {
                "description": "Type of Storage for disks"
                }
            },
            "vmName": {
                "type": "string",
                "metadata": {
                    "description": "Name of the VM"
                }
            },
            "vmSize": {
                "type": "string",
                "defaultValue": "Standard_DS2_v2",
                "metadata": {
                    "description": "Size of the VM"
                }
            },
            "imageSKU": {
                "type": "string",
                "defaultValue": "2012-R2-Datacenter",
                "allowedValues": [
                    "2008-R2-SP1",
                    "2012-Datacenter",
                    "2012-R2-Datacenter"
                ],
                "metadata": {
                    "description": "Image SKU"
                }
            },
            "adminUsername": {
                "type": "string",
                "metadata": {
                    "description": "Admin username"
                }
            },
            "adminPassword": {
                "type": "securestring",
                "metadata": {
                    "description": "Admin password"
                }
            },
            "modulesUrl": {
                "type": "string",
                "defaultValue": "https://github.com/MicrosoftDocs/mslearn-choose-compute-provisioning/raw/master/Webserver.zip",
                "metadata": {
                    "description": "URL for the DSC configuration module."
                }
            },
            "configurationFunction": {
                "type": "string",
                "defaultValue": "Webserver.ps1\\Webserver",
                "metadata": {
                    "description": "DSC configuration function to call"
                }
            },
            "location": {
                "type": "string",
                "defaultValue": "[resourceGroup().location]",
                "metadata": {
                    "description": "Location for all resources."
                }
            }
        },
        "variables": {
            "virtualNetworkName": "dscVNET",
            "vnetID": "[resourceId('Microsoft.Network/virtualNetworks', variables('virtualNetworkName'))]",
            "vnetAddressPrefix": "10.0.0.0/16",
            "subnet1Name": "dscSubnet-1",
            "subnet1Prefix": "10.0.0.0/24",
            "subnet1Ref": "[concat(variables('vnetID'),'/subnets/', variables('subnet1Name'))]",
            "publicIPAddressType": "Dynamic",
            "publicIPAddressName": "dscPubIP",
            "nicName": "dscNIC",
            "imagePublisher": "MicrosoftWindowsServer",
            "imageOffer": "WindowsServer",
            "vmExtensionName": "dscExtension"
        },
        "resources": [
            {
                "apiVersion": "2019-09-01",
                "type": "Microsoft.Network/publicIPAddresses",
                "name": "[variables('publicIPAddressName')]",
                "location": "[parameters('location')]",
                "properties": {
                    "publicIPAllocationMethod": "[variables('publicIPAddressType')]"
                }
            },
            {
                "apiVersion": "2019-09-01",
                "type": "Microsoft.Network/virtualNetworks",
                "name": "[variables('virtualNetworkName')]",
                "location": "[parameters('location')]",
                "properties": {
                    "addressSpace": {
                        "addressPrefixes": [
                            "[variables('vnetAddressPrefix')]"
                        ]
                    },
                    "subnets": [
                        {
                            "name": "[variables('subnet1Name')]",
                            "properties": {
                                "addressPrefix": "[variables('subnet1Prefix')]"
                            }
                        }
                    ]
                }
            },
            {
                "apiVersion": "2019-09-01",
                "type": "Microsoft.Network/networkInterfaces",
                "name": "[variables('nicName')]",
                "location": "[parameters('location')]",
                "dependsOn": [
                    "[concat('Microsoft.Network/publicIPAddresses/', variables('publicIPAddressName'))]",
                    "[concat('Microsoft.Network/virtualNetworks/', variables('virtualNetworkName'))]"
                ],
                "properties": {
                    "ipConfigurations": [
                        {
                            "name": "ipconfig1",
                            "properties": {
                                "privateIPAllocationMethod": "Dynamic",
                                "publicIPAddress": {
                                    "id": "[resourceId('Microsoft.Network/publicIPAddresses', variables('publicIPAddressName'))]"
                                },
                                "subnet": {
                                    "id": "[variables('subnet1Ref')]"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "apiVersion": "2019-07-01",
                "type": "Microsoft.Compute/virtualMachines",
                "name": "[parameters('vmName')]",
                "location": "[parameters('location')]",
                "dependsOn": [
                    "[concat('Microsoft.Network/networkInterfaces/', variables('nicName'))]"
                ],
                "properties": {
                    "hardwareProfile": {
                        "vmSize": "[parameters('vmSize')]"
                    },
                    "osProfile": {
                        "computerName": "[parameters('vmName')]",
                        "adminUsername": "[parameters('adminUsername')]",
                        "adminPassword": "[parameters('adminPassword')]"
                    },
                    "storageProfile": {
                        "imageReference": {
                            "publisher": "[variables('imagePublisher')]",
                            "offer": "[variables('imageOffer')]",
                            "sku": "[parameters('imageSKU')]",
                            "version": "latest"
                        },
                        "osDisk": {
                            "name": "[concat(parameters('vmName'), '_OSDisk')]",
                            "caching": "ReadWrite",
                            "createOption": "FromImage",
                            "managedDisk": {
                                "storageAccountType": "[parameters('diskType')]"
                            }
                        }
                    },
                    "networkProfile": {
                        "networkInterfaces": [
                            {
                                "id": "[resourceId('Microsoft.Network/networkInterfaces', variables('nicName'))]"
                            }
                        ]
                    }
                }
            },
            {
                "type": "Microsoft.Compute/virtualMachines/extensions",
                "name": "[concat(parameters('vmName'),'/', variables('vmExtensionName'))]",
                "apiVersion": "2019-07-01",
                "location": "[parameters('location')]",
                "dependsOn": [
                    "[concat('Microsoft.Compute/virtualMachines/', parameters('vmName'))]"
                ],
                "properties": {
                    "publisher": "Microsoft.Powershell",
                    "type": "DSC",
                    "typeHandlerVersion": "2.19",
                    "autoUpgradeMinorVersion": true,
                    "settings": {
                        "ModulesUrl": "[parameters('modulesUrl')]",
                        "ConfigurationFunction": "[parameters('configurationFunction')]",
                        "Properties": {
                            "MachineName": "[parameters('vmName')]"
                        }
                    },
                    "protectedSettings": null
                }
            }
        ]
    }
    ```


