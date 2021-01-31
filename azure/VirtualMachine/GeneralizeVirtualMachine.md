---
title: Generalize Virtual Machine
---

### Topics
- ### Generalizing Virtual Machine
    - A generalized image can be used as a base machine with required application/configuration to be used for creating several virtual machines
    - The generalized image will contain all the disks associated with Virtual Machine
    
### Commands
- ### Generalize Windows Virtual machine
    - ### Run `sysprep` on your machine and select shutdown
        
        ![Center_200_VM_sysprep](/assets/images/VM_sysprep.png)

    - ### DeAllocate Virtual Machine
        ```powershell
        Stop-AzVM -ResourceGroupName <resource group> `
            -Name <virtual machine name> `
            -Force
        ```
        ```azcli
        az vm deallocate \
            -g lab
            --name vm-name
        ```
    - ### Generalize the VM
        ```powershell
        Set-AzVM -ResourceGroupName <resource group> `
             -Name <virtual machine name> `
             -Generalize
        ```
        ```azcli
        az vm generalize \
             --name virtual-machine-name
        ```
- ### Generalize Linux Virtual Machine
    - ### Login into VM and run
        ```bash
        waagent -deprovision+user
        ```  
    - ### Generalize the VM
        ```powershell
        Set-AzVM -ResourceGroupName <resource group> `
             -Name <virtual machine name> `
             -Generalize
        ```
        ```azcli
        az vm generalize \
             --name virtual-machine-name
        ```
- ### Create Virtual Machine using above De-Allocated image
    ```powershell
    $vm = Get-AzVM -ResourceGroupName <resource group> `
        -Name <generalized virtual machine>
    
    $image = New-AzImageConfig -SourceVirtualMachineId `
        $vm.ID -Location<virtual machine location>
    
    New-AzImage -Image $image `
        -ImageName image-name `
        -ResourceGroupName $resource-group
    ```
    ```azcli
    az image create \
        --name <image name> \
        --resource-group lab \
        --source generalized-virtual-machine
    ```
- ### Create new Virtual Machine using above image
    ```azcli
    az vm create \
      --name MyVMFromImage \
      --computer-name MyVMFromImage \
      --image MyVMImage \
      --admin-username azureuser
    ```
- ### Update default WebPage with custom name
    ```azcli
    az vm extension set \
        --name CustomScriptExtension \
        --vm-name MyVMFromImage \
        --publisher Microsoft.Compute \
        --settings '{"commandToExecute":"powershell Clear-Content -Path \"C:\\inetpub\\wwwroot\\Default.htm\"; Add-Content -Path \"C:\\inetpub\\wwwroot\\Default.htm\" -Value $(hostname)"}'
    ```
