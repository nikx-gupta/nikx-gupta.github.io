---
title: Create Azure AD Interactive Single Sign On
---

- ### Create a new AspNetCore Application (3.1 and above) with Authentication Option Azure Active Directory (Single Tenant)
- ### Keep only following profile in `Properties/launchSettings.json`
   ```json
   {
      "profiles": {
      "Lab.ActiveDirectory.OAuth": {
      "commandName": "Project",
      "dotnetRunMessages": "true",
      "launchBrowser": false,
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
      "ASPNETCORE_ENVIRONMENT": "Development"
           } 
        }
      }
   }
   ```
- ### Register New Application in AzureAD AppRegistrations
- ### Add Redirect URI to the above app `https://localhost:5001,https://localhost:signin-oidc`
- ### Copy ClientId and other details `appsettings.json` file as below
   ```json
   "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "lab.devignite.in",
    "TenantId": "cd9445d1-5bdf-4531-829f-85e8e10b1eab",
    "ClientId": "186ca965-1503-486f-a3cb-63464a6adc91",
    "CallbackPath": "/signin-oidc"
   }
   ```
- ### Add below code to `ConfigureServices` method (otherwise redirection error will occur)
    ```csharp
    services.AddControllersWithViews(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            });
    ```
