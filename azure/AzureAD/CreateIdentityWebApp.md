---
title: Consume Identity in WebApplication
---

1. ### Create a new AspNetCore Application (3.1 and above) with following selection
2. ### Install packages
    - ### Microsoft.Identity.Web (preview)
    - ### Microsoft.Identity.Web.UI (preview)

3. ### Add Startup Code in `ConfigureServices` method
    ```csharp
    services.AddOptions();

    // This is required to be instantiated before the OpenIdConnectOptions starts getting configured.
    // By default, the claims mapping will map claim names in the old format to accommodate older SAML applications.
    // 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role' instead of 'roles'
    // This flag ensures that the ClaimsIdentity claims collection will be built from the claims in the token
    JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

     // Sign-in users with the Microsoft identity platform
    services.AddMicrosoftIdentityWebAppAuthentication(Configuration)
            .EnableTokenAcquisitionToCallDownstreamApi(new string[] { Constants.ScopeUserRead })
            .AddInMemoryTokenCaches();

     // Add Graph
    services.AddGraphService(Configuration);
    ```
4. ### Add Graph Scopes
    ```csharp
    public static class GraphScopes
    {
        public const string UserRead = "User.Read";
        public const string UserReadBasicAll = "User.ReadBasic.All";
        public const string DirectoryReadAll = "Directory.Read.All";
    }
    ```
4. ### Add following settings in `appsettings.json` (Refer Lab Activity for values)
    ```json
    "AzureAd" : {
        "Instance": "https://login.microsoftonline.com/",
        "Domain": "",
        "TenantId": "{tenantId}",
        "ClientId": "[Enter the Client Id (Application ID obtained from the Azure portal), e.g. ba74781c2-53c2-442a-97c2-3d60re42f403]",
        "CallbackPath": "/signin-oidc",
        "SignedOutCallbackPath ": "/signout-callback-oidc",
        "ClientSecret": "[Copy the client secret added to the app from the Azure portal]"
    }
    ```
