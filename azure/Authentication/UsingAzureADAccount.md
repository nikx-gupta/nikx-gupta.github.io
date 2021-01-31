---
title: Azure Ad Account with AspNetCore
---

### Use AzureAD account for Authentication
- ### Create new AspNetCore Application
	![Center_200](/assets/images/AzAuth_Create_App.png)
	
- ### App is automatically registered in Azure Applications when creating the Application with above selection
- ### Get the details and assign in `appsettings.json` in your application
  ```json
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "nikxlab01.onmicrosoft.com",
    "TenantId": "5a9a6394-2cfe-49b3-87a2-b055b3729b46",
    "ClientId": "db753704-1d11-41d0-acee-f2b842402f31",
    "CallbackPath": "/signin-oidc"
  }
  ```
- ### Once App is Started you will be asked to Login with AzureAD account
