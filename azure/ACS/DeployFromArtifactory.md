---
title: Docker Image Using Artifactory
---

### Important
- ### Create or use existing [JFrog Registry](https://cloudxlabs.jfrog.io/)
- ### Create Environment Variables `Jfrog_UserName` and `Jfrog_Password` with jfrog credentials 
- ### Default Values 
    - registry-url - `cloudxlabs.jfrog.io`
    - repo-name - `lab-docker`

### Commands
- ### Skip to Last step if you want to use default Image
- ### Pull [Source Code]({{ page.cloudxLab }}/service-appstore-dotnet)
- ### Create docker image and push to JFrog Repository from root
    ```azcli
    docker build -t appstore:v1 --build-arg Jfrog_UserName --build-arg Jfrog_Password .
    ```
- ### Push the Image to Artifactory
    ```bash
    docker login <registry-url>
    docker tag appstore:v1 <registry-url>/<repo-name>/appstore:v1
    docker push <registry-url>/<repo-name>/appstore:v1
    ```

- ### Create Container Task (using default values)
    ```azcli
    az container create \
        --resource-group lab \
        --name acr-appstore \
        --image cloudxlabs.jfrog.io/lab-docker/appstore:v1 \
        --registry-login-server cloudxlabs.jfrog.io \
        --ip-address Public \
        --location eastus \
        --registry-username <jfrog-username> \
        --registry-password <jfrog-password> \
        -e ASPNETCORE_ENVIRONMENT=DEV
    ```
- ### Enable CI on source control to deploy automatically when code change
    ```azcli
    az acr task create --registry <container_registry_name> \
        --name buildwebapp \
        --image webimage \
        --context https://github.com/MicrosoftDocs/mslearn-deploy-run-container-app-service.git \
        --branch master --file Dockerfile \ 
        --git-access-token <access_token>
    ```
