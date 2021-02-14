---
title: Adapter Pattern
category: Design Patterns, Structural
---

## Definition
- Transforms an existing interface into another interface a client expects with help of a wrapper
- ### Why structural
	- As, it involves transformation of one interface to another which is a structural change
- ### When
	- when consumer expects a different interface from our existing interface. As, we cannot change the consumer implementation, and our existing interface we have to adapt
	
## Design
- Assuming, our application is exposing an interface which creates a CloudFoundryComponent in PCF Cloud
	```csharp
	public interface ICloudFoundryComponent {
	    public CloudFoundryComponent CreateComponent(CloudFoundryRequest);
	}
	
	public class CloudFoundryRequest {
	    public string ComponentName { get; set; }
	    public string ComponentUrl { get; set; }
	}
	
	public class CloudFoundryComponent { }
	```

- There is an existing application which creates components in Azure Cloud. Due to a decision of migrating enterprise applications to PCF
  this application now needs to create component in PCF. As, it is not possible for this application to change it's request format, we have to adapt the application's
  current request interface and create component in PCF. Below, is the application required request structure.

  ```csharp
  public interface IAzureComponent {
        public AzureComponent CreateComponent(AzureComponentRequest request);
  }

  public class AzureComponentRequest {
        public string WebSiteName { get; set; }
        public string RegionName { get; set; }
  }

  public class AzureComponent { }
  ```

- To adapt this we need to create a Adapter which will inherit the Consumer interface. Which, in this example is `IAzureComponent` and uses current `ICloudFoundryComponent`
  to create component in PCF and return data in client's expected format

  ```csharp
  public class CloudFoundryAdapter : IAzureComponent {
        private readonly ICloudFoundryComponent _component;

        public CloudFoundryAdapter() {
            // Initialize ICloudFoundryComponent here
        }
        
        public AzureComponent CreateComponent(AzureComponentRequest request) {
            var result = _component.CreateComponent(new CloudFoundryRequest() {
                ComponentName = request.WebSiteName,
                ComponentUrl = request.RegionName + "cfapps.devignite.in";
            });

            return new AzureComponent();
        }
  }
  ```
  - ### `Note`
    - The existing interface is initialized by adapter and used to create request to PCF
	- The Adapter inherits from Client's interface so that client can consume it without any code change
