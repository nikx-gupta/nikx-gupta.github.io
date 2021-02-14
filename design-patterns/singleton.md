---
title: Singleton Pattern
---

# Singleton Pattern
- ### Description
	- This pattern ensures there is only single instance of the class that is declared Singleton
	- The class contains a static instance of itself which is non-destructible or act as root in garbage collection
	- It must be thread safe, so that multiple threads do not create their own instances. For this reason, a lock is used which decreases the performance for first few invocations.
	- The scope of single instance can very as per programming language like jvm in Java and AppDomain in Dotnet but the high level concept is same

- ## Simple Singleton
	```csharp
    public class SimpleSingleton {
        private static SimpleSingleton _instance;
        private static readonly object _syncLock = new();

        private SimpleSingleton() { }

        public static SimpleSingleton Instance() {
            if (_instance == null)
                lock (_syncLock) {
                    return _instance == null ? _instance = new SimpleSingleton() : _instance;
                }

            return _instance;
        }
    }
	```

- ## Singleton with LazyInstance (Specific to DotNet)
  ```csharp
  public class SingletonLazy {
        private static readonly Lazy<SingletonLazy> _instance = new(() => new SingletonLazy()
                                                    , LazyThreadSafetyMode.ExecutionAndPublication);
        private Guid _uniqueId;

        private SingletonLazy() {
            _uniqueId = Guid.NewGuid();
        }

        public string UniqueId => _uniqueId.ToString();

        public static SingletonLazy Instance(ILogger logger) {
            var val = _instance.Value;
            logger.Log(LogLevel.Information, $"Created: {_instance.IsValueCreated.ToString()}, UniqueId: {val.UniqueId}");
            return val;
        }
  }
  ```

## Issues with above or legacy ways of using Singleton
	- It is not modular, means we cannot inject any type of dependency in our instance
	- You cannot inject the Singleton class itself in other modules. You have to directly consume it which makes it difficult to Unit Test
	- We cannot define scope for singleton. Example if we want to define singleton scope to user instead of application scope. This makes it less flexible

- ## Singleton with Dependency Injection
	- This is most widely and recommended form of Singleton
	- Depends on different type of container libraries

	- ### Autofac
	```csharp
     _builder.RegisterType<AzureContextService>().As().SingleInstance()
	```
        - #### `_builder` - ContainerBuilder
    
	- ### .NET core
	  ```csharp
	   services.AddSingleton<AzureContextService>();
	  ```
		- #### `_services` - IServiceCollection 
 
