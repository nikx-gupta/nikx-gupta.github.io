---
title: Environments
---

### Important
- `checkout` : self
    - checkout is required for `Deploy` job when we need files from source repo and not artifacts

### Index

1. ### Target Environment from Deployment Job
    ```yaml
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
    ```
    - ### Params 
        - `environment` : DEV
        - `script` : To check the contents of current directory after checkout
        
### References

- [Environments](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/environments?view=azure-devops)
