---
title: Code Coverage (DotNetCore)
---

### Important

### Provisioning
- #### Add Code Coverage Tool
  ```bash
  dotnet tool install dotnet-reportgenerator-globaltool
  dotnet add <project name> package coverlet.msbuild
  ```
- #### Run Code Coverage
    ```bash
    dotnet test --no-build \
      --configuration Release \
      /p:CollectCoverage=true \
      /p:CoverletOutputFormat=cobertura \
      /p:CoverletOutput=./TestResults/Coverage/
    ```
- #### Convert CodeCoverage report to HTML
    ```bash
    dotnet tool run reportgenerator \
      -reports:./Tailspin.SpaceGame.Web.Tests/TestResults/Coverage/coverage.cobertura.xml \
      -targetdir:./CodeCoverage \
      -reporttypes:HtmlInline_AzurePipelines
    ```
- ### Add to Azure Pipeline (After previous steps)
  ```bash
  - task: PublishCodeCoverageResults@1
    displayName: 'Publish code coverage report'
    inputs:
      codeCoverageTool: 'cobertura'
      summaryFileLocation: '$(Build.SourcesDirectory)/**/coverage.cobertura.xml'
  ```
### References
- [DotNetCore Code Coverage](https://docs.microsoft.com/en-us/learn/modules/run-quality-tests-build-pipeline/6-perform-code-coverage)
