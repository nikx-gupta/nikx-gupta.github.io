---
title: Using RBAC with Azure AppService
---

1. ### Register a New Application in Azure Active Directory
![Center_AddApplication](/assets/images/MIP_01.png)

2. ### Modify Manifest for the Registered Application
![Center_ModifyManifest](/assets/images/MIP_02.png)

3. ### Update `appRoles` in the manifest. `For each role you require a unique Guid`
```powershell
New-Guid
```
```json
{
	"appRoles": [{
			"allowedMemberTypes": [
				"User"
			],
			"description": "User readers can read basic profiles of all users in the directory ",
			"displayName": "UserReaders",
			"id": "a816142a-2e8e-46c4-9997-f984faccb625",
			"isEnabled": true,
			"lang": null,
			"origin": "Application",
			"value": "UserReaders"
		},
		{
			"allowedMemberTypes": [
				"User"
			],
			"description": "Directory viewers can view objects in the whole directory.",
			"displayName": "DirectoryViewers",
			"id": "72ff9f52-8011-49e0-a4f4-cc1bb26206fa",
			"isEnabled": true,
			"lang": null,
			"origin": "Application",
			"value": "DirectoryViewers"
		}
	]
}
```
4. ### Create new Client Secret under `Certificates and Secrets`
    - ### Copy the generated secret value. you will not be able to copy afterwards
    ![Center_200](/assets/images/MIP_03.png)

5. ### [Link - Create WebApplication](CreateIdentityWebApp)
6. ### Modify `appsettings.json`
    ```json
    "AzureAd": {
        "Instance": "https://login.microsoftonline.com/",
        "Domain": "",
        "TenantId": "",
        "ClientId": "",
        "CallbackPath": "/signin-oidc",
        "SignedOutCallbackPath ": "/signout-callback-oidc",
        // To call an API
        "ClientSecret": "[Copy the client secret added to the app from the Azure portal]"
    },
    ```
    - ### Parameters
        - `Domain` - `Name of the tenant domain`
        - `TenantId` - `TenantId for the domain`
            ![Small_DomainName](/assets/images/MIP_04.png)

        - `ClientId` - `ClientId from the App Registered Above`

            ![Small_AppInfo](/assets/images/MIP_05.png)

        - `ClientSecret` - `Client secret copied from Step 4`


7. ### Add Redirect and Signout URI's to the Registered Application
    ### Change port as per your application settings
    ![Small_AddUri](/assets/images/MIP_06.png)

8. ### Create Options class to pull `GraphAPI` url from config
    ```csharp
    public class GraphOptions
    {
        public string GraphApiUrl { get; set; }
    }
    ```
9. ### Create Constants for custom Authorization Policies
    ```csharp
    public static class AppRole
    {
        /// <summary>
        /// User readers can read basic profiles of all users in the directory.
        /// </summary>
        public const string UserReaders = "UserReaders";

        /// <summary>
        /// Directory viewers can view objects in the whole directory.
        /// </summary>
        public const string DirectoryViewers = "DirectoryViewers";
    }

    public static class AuthorizationPolicies
    {
        public const string AssignmentToUserReaderRoleRequired = "AssignmentToUserReaderRoleRequired";
        public const string AssignmentToDirectoryViewerRoleRequired = "AssignmentToDirectoryViewerRoleRequired";
    }
    ```

10. ### Configure OAuth Middleware in `ConfigureServices` method
    ```csharp
     // Sign-in users with the Microsoft identity platform
    services.AddMicrosoftIdentityWebAppAuthentication(Configuration)
        .EnableTokenAcquisitionToCallDownstreamApi(new string[] { Constants.ScopeUserRead })
        .AddInMemoryTokenCaches();

    // Add Graph
    services.Configure<GraphOptions>(Configuration);

    // The following lines code instruct the asp.net core middleware to use the data in the "roles" claim in the Authorize attribute and User.IsInrole()
    // See https://docs.microsoft.com/aspnet/core/security/authorization/roles?view=aspnetcore-2.2 for more info.
    services.Configure<OpenIdConnectOptions>(OpenIdConnectDefaults.AuthenticationScheme, options =>
    {
        // The claim in the Jwt token where App roles are available.
        options.TokenValidationParameters.RoleClaimType = "roles";
    });

    // Adding authorization policies that enforce authorization using Azure AD roles.
    services.AddAuthorization(options =>
    {
        options.AddPolicy(AuthorizationPolicies.AssignmentToUserReaderRoleRequired, policy => policy.RequireRole(AppRole.UserReaders));
        options.AddPolicy(AuthorizationPolicies.AssignmentToDirectoryViewerRoleRequired, policy => policy.RequireRole(AppRole.DirectoryViewers));
    });

    services.AddControllersWithViews(options =>
    {
        var policy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
        
        options.Filters.Add(new AuthorizeFilter(policy));

    }).AddMicrosoftIdentityUI();

    services.AddRazorPages();
    ```
11. ### Configure OAuth Middleware in `Configure` method
    ```csharp
    app.UseAuthentication();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");
        endpoints.MapRazorPages();
    });
    ```
12. ### Enable `ID Token` in AppRegistration
    ![Small_EnableIDToken](/assets/images/MIP_08.png)

13. ### Start the Application and consent screen will open up for first time login
    ![Small_Consent](/assets/images/MIP_09.png)

14. ### Register Custom Authentication Provider for our Roles using Graph API
    ```csharp
    public class GraphServiceClientFactory
    {
        public static GraphServiceClient GetAuthenticatedGraphClient(Func<Task<string>> acquireAccessToken,
            string baseUrl = null)
        {

            return new GraphServiceClient(baseUrl, new CustomAuthenticationProvider(acquireAccessToken));
        }
    }

    public class CustomAuthenticationProvider : IAuthenticationProvider
    {
        public CustomAuthenticationProvider(Func<Task<string>> acquireTokenCallback)
        {
            acquireAccessToken = acquireTokenCallback;
        }

        private Func<Task<string>> acquireAccessToken;

        public async Task AuthenticateRequestAsync(HttpRequestMessage request)
        {
            string accessToken = await acquireAccessToken.Invoke();

            // Append the access token to the request.
            request.Headers.Authorization = new AuthenticationHeaderValue(
                Infrastructure.Constants.BearerAuthorizationScheme, accessToken);
        }
    }
    ```
15. ### Modify `HomeController` to enable Authorization as per our Roles
    - ### Inject `ITokenAcquisition` and `IOptions<GraphOptions>` in HomeController
    - ### Create new `Profile` method which checks if User under `User.Read` role
    ```csharp
    [AuthorizeForScopes(Scopes = new[] { Constants.ScopeUserRead })]
    public async Task<IActionResult> Profile() {
      
        // Initialize the GraphServiceClient.
        GraphServiceClient graphClient = GraphServiceClientFactory.GetAuthenticatedGraphClient(async () =>
        {
            // Get AccessToken for the Current Logged in User for "User.Read" role
            string result = await _tokenAcquisition
                .GetAccessTokenForUserAsync(new[] { Constants.ScopeUserRead });

            return result;
        }, _webOptionValue.Value.GraphApiUrl);

        var me = await graphClient.Me.Request().GetAsync();
        ViewData["Me"] = me;
     }
    ```
    - ### Create a new View named `Profile` and display profile from ViewData

### Issues
> ### If you are facing below issue you might have skipped Step 12.
    
![Small_Issue_01](/assets/images/MIP_07.png)
