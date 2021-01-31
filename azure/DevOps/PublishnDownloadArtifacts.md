---
title: Publish and Download Artifacts
---

### Important
- Use new `Pipeline Artifacts` instead of `Build Artifacts`

### Use below as Prefix YAML for all below tasks
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

  ```
### Provisioning
- ### Publish and Download Artifact using Task
    ```yaml
    - task: PublishPipelineArtifact@1
      inputs:
        targetPath: $(System.DefaultWorkingDirectory)/release
        artifactName: Onboarding
    - task: DownloadPipelineArtifact@2
      inputs:
        artifactName: onboarding
        path: $(System.DefaultWorkingDirectory)/download
    - script: ls -a download
    ```
- ### Publish and Download using steps 
    ```yaml
    - publish: $(System.DefaultWorkingDirectory)/release
      artifact: Onboarding
    - download: current
      artifact: Onboarding
    ```
