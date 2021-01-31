---
title: AspNetCore Authentication Policy with AzureAD
---

### MFA Authentication using AzureAD
- ### [Link - Create Web App](UsingAzureADAccount)
- ### Create new AspNetCore app and Add below code in `Startup.cs -> ConfigureServices` method
```csharp
    services.AddAuthorization((options) => 
        options.AddPolicy("Require MFA",policy => 
            policy.RequireClaim("http://schemas.microsoft.com/claims/authnmethodsreferences", "mfa")));
```

- ### Create a new controller and create `Index` method with `Authorize` attribute and `Policy` we created above
```csharp
    public class SecureController : Controller
    {
        [Authorize(Policy = "Require MFA")]
        public IActionResult Index()
        {
            return Ok("Authorized");
        }
    }
```

- ### Add corresponding Views for Secure Controller with blank html. The folder structure should look like below
- ### [Link - Enable MultiFactor Auth](/Azure/AzureAD/AddMultiFactorAuth) for the user
- ### Try Login with the User into your application. you shall be able to login now
