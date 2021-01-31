---
title: Azure DevOps
---

### Important
- [Possible Hosted Agent Names](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops&tabs=yaml)

### Index
- ### [Repo](GitRepo)
- ### [Trigger](Triggers)
- ### [Environments](Environments)
- ### [Deploy using Docker Image](DeployDocker)
- ### [Deploy using Environment Resource Virtual Machine](DeployEnvironmentVM)
- ### [Publish & Download Artifacts](PublishnDownloadArtifacts)
- ### [Artifact Feed](ArtifactFeed)
- ### [Publish Package](PublishPackage)
- ### [Add Test Coverage](AddCoverage)
- ### [Setup VM with Boot Diagnostics]

### Notes
- ### Configuration Management
    - Versioning of Application and Dependent components
    - Desired State Configuration files (Declarative)
    - Configuration Drift
        - Ensure configuration changes done in source control to track
- ### Release Management - Controlling the Flow of versions through CD
        - Immutable Artifacts
        - Versioning
        - Controls / Approvals
        - Quality Checks before each environment
- ### [Continous Integration](ContinousIntegration)
- ### Continous Deployment
    - Automate Deployment
- ### Infratructure as a code
    - Toolings
        - Ansible
        - Puppet/Chef
        - Powershell DSC
        - Azure ARM
- ### Test Automation
- ### Application Performance Monitoring
    - USE Method
        - Utilization - representing the time over a given interval a resource is busy rather than idle
        - Saturation - how many requests the resource processed over the same interval
        - Errors - The number of incidents of unhandled exceptions and unfulfilled requests during the same period
    - RED method
        - Rate - The number of requests a service processes over a given interval (usually one second)
        - Errors - The number of failed requests in that same interval
        - Duration - The average time a service consumes in responding to a request before rendering a response
![Center_800_Flow](/images/devops_01.png)

### References
- [Azure Boards](https://docs.microsoft.com/en-us/learn/modules/choose-an-agile-approach/index)
- [Pipeline Resources](https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=example)
- [Hosting Agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/proxy?view=azure-devops&tabs=windows)
