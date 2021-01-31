---
title: "Virtual Machine"
description: Virtual Machine Scale Set
---

### Notes <em class="notes">word</em>
- ### Scaling Types
    - #### Scheduled Scaling
        - You can proactively schedule the scale set to deploy one or N number of additional instances to accommodate a spike in traffic and then scale back down when the spike ends.
        - Best to use when schedule of load/peak load known beforehand
    - #### Autoscaling
        - If the workload is variable and can't always be scheduled, you can use metric-based threshold scaling. Autoscaling horizontally scales out based on node usage. It then scales back in when the resources return to a baseline.
        - Best to use when peak load is not quantifiable or not known
    - #### Low Priority Scale Set
        - Temporary low cost VM's at 80% of cost
        - No SLA
        - User to receive a notification about the VM that will be removed from your scale set
        - Kind of removals
            - `Delete` - The entire VM is removed including all assets
            - `Deallocate` - Hard Disks are left intact and incur charges for storage
            
### Provisioning {#custom-id}
- ### Create `cloud-init.yaml` with below contents. It will install nginx on VM
    ```yaml
    #cloud-config
    package_upgrade: true
    packages:
      - nginx
    write_files:
      - owner: www-data:www-data
      - path: /var/www/html/index.html
        content: |
            Hello world from Virtual Machine Scale Set !
    runcmd:
      - service nginx restart
    ```
- ### Create new scale set
    ```azcli
    az vmss create \
      --resource-group lab \
      --name webServerScaleSet \
      --image UbuntuLTS \
      --upgrade-policy-mode automatic \
      --custom-data cloud-init.yaml \
      --admin-username azureuser \
      --generate-ssh-keys
    ```
- ### Add a health probe for Load Balancer
    - if health probe fails traffic is no longer routed to the server
    ```azcli
    az network lb probe create \
      --lb-name webServerScaleSetLB \
      --resource-group scalesetrg \
      --name webServerHealth \
      --port 80 \
      --protocol Http \
      --path /
    ```
- ### Configure Load balancer to route traffic to the server
    ```azcli
    az network lb rule create \
      --resource-group scalesetrg \
      --name webServerLoadBalancerRuleWeb \
      --lb-name webServerScaleSetLB \
      --probe-name webServerHealth \
      --backend-pool-name webServerScaleSetLBBEPool \
      --backend-port 80 \
      --frontend-ip-name loadBalancerFrontEnd \
      --frontend-port 80 \
      --protocol tcp
    ```
- ### Manually Scale Virtual Machine scale set
    ```azcli
    az vmss scale \
        --name MyVMScaleSet \
        --resource-group MyResourceGroup \
        --new-capacity 6
    ```
 
- ### Update application across Scale set using Custom Script Extension
    - save json file with below data
    ```json
        {
          "fileUris": ["https://raw.githubusercontent.com/yourrepo/master/custom_application_v2.sh"],
          "commandToExecute": "./custom_application_v2.sh"
        }
    ```
    ```azcli
    az vmss extension set \
        --publisher Microsoft.Azure.Extensions \
        --version 2.0 \
        --name CustomScript \
        --resource-group yourResourceGroup \
        --vmss-name yourScaleSet \
        --settings @yourConfigV2.json
    ```
- ### Mention Upgrade policy for Upgrading VM when creating Scale Set. 
    - The policy can be specified only at the time of creation of scale set
    ```azcli
    az vmss create \
      --resource-group MyResourceGroup \
      --name MyScaleSet \
      --image UbuntuLTS \
      --upgrade-policy-mode automatic \
      --admin-username azureuser \
      --generate-ssh-keys
    ```
