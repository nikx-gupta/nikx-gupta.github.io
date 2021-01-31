---
title: Publish Github Package
---

### Important
- Generate PAT token in `Developer Settings` Github Repository 

### Provisioning
- ### Add Nuget source to local

    ```bash
    dotnet nuget add source https://nuget.pkg.github.com/cloudxlabs/index.json -n github -u cloudxlabs -p GH_TOKEN [--store-password-in-clear-text]
    ```
- ### Push Package to `MyGET` repository
    ```bash
    dotnet nuget push .\CMI.Services.Core.1.0.0.nupkg -k <api-key> -s https://www.myget.org/F/cloudxlabs/api/v2/package
    ```
- ### Push to Artifactory
    ```bash
    dotnet nuget push .\CMI.Services.Core.1.0.0.nupkg -k nikx-gupta@outlook.in:<api-key> -s https://cloudxlabs.jfrog.io/artifactory/api/nuget/cloudxlabs
    ```

### References
- [Github Packages](https://github.com/cloudxlabs?package_type=NuGet&tab=packages)
- [MyGet Packages](https://www.myget.org/feed/Details/cloudxlabs)
