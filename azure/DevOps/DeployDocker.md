---
title: Deployment to ACS
---

### Important
- `checkout` : self
    - checkout is required for `Deploy` job when we need files from source repo and not artifacts

### Provisioning
1. ### Create Azure Container Registry and create a Service connection named as `cmi-container-registry`
2. ### Create Library for Shared Variables across pipelines namely `LabVariables` and `Services`
3. ### Add below parameters to LabVariables
  - `connection` - Azure Subscription Name with Id (get it when you connect Azure DevOps with Azure Subscription)
  - `groupName` - Resource group name 
  - `location` - Resource location 
  - `subscriptionId` - Azure Subscription Id
4. ### Add below parameters to `Services`
  - `password` and `username` - ACR username password from  `ACR -> Access Keys`
  - `registryConnection` - Service Connection name created in Step 1
  - `registryName` - ACR name without `.azurecr.io`
  
1. ### [Source Code](https://github.com/cloudxlabs/cmi-service-onboarding-dotnet)
    ```yaml
    trigger:
      branches:
        include:
          - master
          - main
      paths:
        include:
          - src

    resources:
    - repo: self

    variables:
    - group: Services
    - group: LabVariables
    - name: tag
      value: '$(Build.SourceBranchName).$(Build.BuildId)'

    stages:
    - stage: Build_and_Push
      displayName: Build and Push Image
      jobs:  
      - job: Build
        displayName: Build
        pool:
          vmImage: 'ubuntu-latest'
        steps:
        - task: Docker@2
          displayName: Build and Push an image
          inputs:
            command: buildAndPush
            repository: $(repositoryName)
            dockerfile: '$(Build.SourcesDirectory)/Dockerfile'
            containerRegistry: $(registryConnection)
            tags: |
              $(tag)
    - stage: Deploy
      displayName: Create Service
      jobs:
        - deployment: DeployWeb
          displayName: Deploy WebApp
          pool:
            vmImage: 'ubuntu-latest'
          environment: DEV
          strategy:
            runOnce:
                deploy:
                    steps:
                    - checkout: self
                    - script: ls -a
                    - task: AzureResourceManagerTemplateDeployment@3
                      inputs:
                        deploymentScope: 'Resource Group'
                        azureResourceManagerConnection: $(connection)
                        subscriptionId: $(subscriptionId)
                        action: 'Create Or Update Resource Group'
                        resourceGroupName: $(groupName)
                        location: $(location)
                        templateLocation: 'Linked artifact'
                        csmFile: 'arm-onboarding.json'
                        overrideParameters: '-username $(username) -password $(password) -imageTag $(tag) -registryName $(registryName)'
                        deploymentMode: 'Incremental'
                    
    ```
    - ### Params 
        - `environment` : DEV
        - `script` : To check the contents of current directory after checkout. Regular Build Variables will not work in `Deploy` Job
        
### References
