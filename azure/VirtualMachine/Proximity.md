---
title: Proximity Placement Groups
---

### Important
- Proximity Placement Groups places Virtual machines close to each other in same Datacenter and cannot span Zones
- Virtual Machines with different families and SKU's can be placed in same placement group

### Commands
- ### Create Proximity Placement Group
    ```powershell
    $pp = New-AzProximityPlacementGroup -ResourceGroupName "lab204" -Name "pg-eastus" -Location "eastus"
    ```
    ```azcli
    az ppg create --name "pg-cli-eastus" --location "eastus"
    ```
- ### Create Virtual Machine with above Placement Group
    ```powershell
    New-AzVM -ResourceGroupName "lab204" -Location "eastus"  -Name "ByShell-PP-0" -Image "Win2019Datacenter" `
        -ProximityPlacementGroupId "pg-eastus"
    ```
- ### Code for multiple Virtual Machines inside same proximity placement group
    ```csharp
    public class VirtualMachineFactory
        {
            public IAzure AzureContext { get; }
    
            public VirtualMachineFactory(IAzure azureContext)
            {
                AzureContext = azureContext;
            }
    
            public async Task Create(int index = 0)
            {
                string vm_name = $"bycode-{index}";
                
                // Add Network
                var network = await AzureContext.Networks.Define($"{vm_name}-vnet")
                    .WithRegion(VARS.CurrentRegion)
                    .WithExistingResourceGroup(VARS.ResourceGroup)
                    .WithAddressSpace("10.0.0.0/16")
                    .WithSubnet("subnet-0", "10.0.1.0/24")
                    .CreateAsync();
    
                var nic = await AzureContext.NetworkInterfaces.Define($"{vm_name}-nic")
                    .WithRegion(VARS.CurrentRegion)
                    .WithExistingResourceGroup(VARS.ResourceGroup)
                    .WithExistingPrimaryNetwork(network)
                    .WithSubnet("subnet-0")
                    .WithPrimaryPrivateIPAddressDynamic()
                    .CreateAsync();
    
                var vm = await AzureContext.VirtualMachines.Define(vm_name)
                    .WithRegion(VARS.CurrentRegion)
                    .WithExistingResourceGroup(VARS.ResourceGroup)
                    .WithExistingPrimaryNetwork(network)
                    .WithSubnet("subnet-0")
                    .WithPrimaryPrivateIPAddressDynamic()
                    .WithoutPrimaryPublicIPAddress()
                    .WithLatestWindowsImage("MicrosoftWindowsServer", "WindowsServer", "2019-Datacenter")
                    .WithAdminUsername("nikx")
                    .WithAdminPassword("Password@123")
                    .WithComputerName("byCodeVM")
                    .WithSize(VirtualMachineSizeTypes.StandardB1s)
                    .CreateAsync();
            }
        }
    ```

- ### ARM Templates 
  - ### Create Proximity Placement Group
    ```json
    {
        "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
        "contentVersion": "1.0.0.0",
        "parameters": {
            "vm-count": {
                "type": "int",
                "defaultValue": 3
            },
            "withAvailabilitySet": {
                "type": "bool",
                "defaultValue": false
            }
        },
        "variables": {
        },
        "resources": [
            {
                "name": "byArm-ppg-eastus",
                "type": "Microsoft.Compute/proximityPlacementGroups",
                "apiVersion": "2019-03-01",
                "location": "[resourceGroup().location]"
            },
            {
                "name": "byArm-ppg-ip",
                "type": "Microsoft.Network/publicIPAddresses",
                "apiVersion": "2019-11-01",
                "location": "[resourceGroup().location]",
                "tags": {
                    "displayName": "byArm-ppg-ip"
                },
                "properties": {
                    "publicIPAllocationMethod": "Dynamic",
                    "dnsSettings": {
                        "domainNameLabel": "byarm-ppg-01"
                    }
                }
            },
            {
                "name": "byArm-ppg-nsg",
                "type": "Microsoft.Network/networkSecurityGroups",
                "apiVersion": "2018-08-01",
                "location": "[resourceGroup().location]",
                "properties": {
                    "securityRules": [
                        {
                            "name": "rule-remote",
                            "properties": {
                                "description": "description",
                                "protocol": "Tcp",
                                "sourcePortRange": "*",
                                "destinationPortRange": "3389",
                                "sourceAddressPrefix": "*",
                                "destinationAddressPrefix": "*",
                                "access": "Allow",
                                "priority": 100,
                                "direction": "Inbound"
                            }
                        }
                    ]
                }
            },
            {
                "name": "byArm-ppg-vnet",
                "type": "Microsoft.Network/virtualNetworks",
                "apiVersion": "2019-11-01",
                "location": "[resourceGroup().location]",
                "dependsOn": [
                    "[resourceId('Microsoft.Network/networkSecurityGroups', 'byArm-ppg-nsg')]"
                ],
                "tags": {
                    "lab": "lab204"
                },
                "properties": {
                    "addressSpace": {
                        "addressPrefixes": [
                            "10.0.0.0/16"
                        ]
                    },
                    "subnets": [
                        {
                            "name": "subnet-01",
                            "properties": {
                                "addressPrefix": "10.0.0.0/24",
                                "networkSecurityGroup": {
                                    "id": "[resourceId('Microsoft.Network/networkSecurityGroups', 'byArm-ppg-nsg')]"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "byArm-ppg-nic-1",
                "type": "Microsoft.Network/networkInterfaces",
                "apiVersion": "2019-11-01",
                "location": "[resourceGroup().location]",
                "dependsOn": [
                    "[resourceId('Microsoft.Network/publicIPAddresses','byArm-ppg-ip')]",
                    "[resourceId('Microsoft.Network/virtualNetworks', 'byArm-ppg-vnet')]"
                ],
                "tags": {
                    "lab": "lab204"
                },
                "properties": {
                    "ipConfigurations": [
                        {
                            "name": "ipConfig1",
                            "properties": {
                                "privateIPAllocationMethod": "Dynamic",
                                "publicIPAddress": {
                                    "id": "[resourceId('Microsoft.Network/publicIPAddresses','byArm-ppg-ip')]"
                                },
                                "subnet": {
                                    "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets','byArm-ppg-vnet', 'subnet-01')]"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "[concat('byArm-ppg-nic-',copyIndex(2))]",
                "type": "Microsoft.Network/networkInterfaces",
                "apiVersion": "2019-11-01",
                "location": "[resourceGroup().location]",
                "copy": {
                    "name": "copyNic",
                    "count": "[sub(parameters('vm-count'), 1)]"
                },
                "dependsOn": [
                    "[resourceId('Microsoft.Network/virtualNetworks', 'byArm-ppg-vnet')]"
                ],
                "tags": {
                    "lab": "lab204"
                },
                "properties": {
                    "ipConfigurations": [
                        {
                            "name": "ipConfig1",
                            "properties": {
                                "privateIPAllocationMethod": "Dynamic",
                                "subnet": {
                                    "id": "[resourceId('Microsoft.Network/virtualNetworks/subnets','byArm-ppg-vnet', 'subnet-01')]"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "[concat('byArm-ppg-0', copyIndex(1))]",
                "type": "Microsoft.Compute/virtualMachines",
                "apiVersion": "2019-07-01",
                "location": "[resourceGroup().location]",
                "dependsOn": [
                    "[resourceId('Microsoft.Network/networkInterfaces', concat('byArm-ppg-nic-', copyIndex(1)))]",
                    "[resourceId('Microsoft.Compute/proximityPlacementGroups','byArm-ppg-eastus')]"
                ],
                "copy": {
                    "name": "copyVm",
                    "count": "[parameters('vm-count')]"
                },
                "tags": {
                    "lab": "lab204"
                },
                "properties": {
                    "hardwareProfile": {
                        "vmSize": "Standard_B1s"
                    },
                    "osProfile": {
                        "computerName": "byArmProximity",
                        "adminUsername": "nikx",
                        "adminPassword": "Password@123"
                    },
                    "storageProfile": {
                        "imageReference": {
                            "publisher": "MicrosoftWindowsServer",
                            "offer": "WindowsServer",
                            "sku": "2019-Datacenter",
                            "version": "latest"
                        },
                        "osDisk": {
                            "name": "[concat('vmdisk-ppg-0', copyIndex(1))]",
                            "caching": "ReadWrite",
                            "createOption": "FromImage"
                        }
                    },
                    "proximityPlacementGroup": {
                        "id": "[resourceId('Microsoft.Compute/proximityPlacementGroups','byArm-ppg-eastus')]"
                    },
                    "networkProfile": {
                        "networkInterfaces": [
                            {
                                "id": "[resourceId('Microsoft.Network/networkInterfaces', concat('byArm-ppg-nic-', copyIndex(1)))]"
                            }
                        ]
                    },
                    "diagnosticsProfile": {
                        "bootDiagnostics": {
                            "enabled": false
                        }
                    }
                }
            }
        ],
        "outputs": {
            "siteUri": {
                "type": "string",
                "value": "success"
            }
        }
    }
    ```
