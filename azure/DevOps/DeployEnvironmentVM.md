---
title: Deploy in Environment Resource as Virtual Machine
---

### Provisioning
1. ### Create Environment and [Add Virtual Machine](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/environments-virtual-machines?view=azure-devops) resource
2. ### [Source Code](https://github.com/cloudxlabs/cmi-service-onboarding-dotnet)
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
    - stage: Build
      displayName: Build
      jobs:  
      - job: Build
        displayName: Build
        pool:
          vmImage: 'ubuntu-latest'
        steps:
        - task: DotNetCoreCLI@2
          inputs:
            command: 'restore'
            projects: 'src/CMI.Services.Onboarding.csproj'
            feedsToUse: 'select'
        - task: DotNetCoreCLI@2
          inputs:
            command: 'build'
            projects: 'src/CMI.Services.Onboarding.csproj'
        - task: DotNetCoreCLI@2
          inputs:
            command: 'publish'
            publishWebProjects: false
            projects: 'src/CMI.Services.Onboarding.csproj'
            arguments: '-c Release -o $(Build.ArtifactStagingDirectory)'
            modifyOutputPath: false
        - task: PublishBuildArtifacts@1
          inputs:
            PathtoPublish: '$(Build.ArtifactStagingDirectory)'
            ArtifactName: 'drop'
            publishLocation: 'Container'
    - stage: Deploy
      displayName: Deploy to Environment Resource
      jobs:
        - deployment: VMDeploy
          displayName: Environment VM Deploy
          environment:
            name: DEV
            resourceType: VirtualMachine
          strategy:
            runOnce:
              deploy:
                steps:
                  - task: DownloadBuildArtifacts@0
                    inputs:
                      buildType: 'current'
                      downloadType: 'single'
                      artifactName: 'drop'
                      downloadPath: '$(System.ArtifactsDirectory)'
                  - task: Bash@3
                    inputs:
                      targetType: 'inline'
                      script: |
                        unzip $(System.ArtifactsDirectory)/drop/a.zip
                  - task: CmdLine@2
                    inputs:
                      script: |
                        dotnet CMI.Services.Onboarding.dll --environment DEV
                    
    ```
    - ### Params 
        - `deployment` : should be `VMDeploy`
        - `resourceType` : should be `VirtualMachine`
        
### References
