---
title: Azure App Service
---

### Topics
- ### [Linux App](LinuxApp)
- ### [Linux App Using Container](LinuxAppTemplate)
- ### [App Service with Database](WithDatabase)
- ### Automated Deployment Options
    - Azure Devops
    - Github
    - Bitbucket
    - One Drive
    - Dropbox
- ### Manual Deployment Options
    - `Git`
        - App Service web apps feature a Git URL that you can add as a remote repository. Pushing to the remote repository will deploy your app.
    - `az webapp up`
        - It can package your app and deploys it
        - It can create a new App Service web app for you if you haven't already created one
    - `Zipdeploy`
        - Use az webapp deployment source config-zip to send a ZIP of your application files to App Service
    - `Visual Studio`
    - `FTP/S`
