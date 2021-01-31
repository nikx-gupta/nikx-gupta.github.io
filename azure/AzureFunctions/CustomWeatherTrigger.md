---
title: Function Pipeline
---

### Important
- ### The runtime uses reflection to find methods that implements `AzureFunctionAttribute`
- ### Framework skips the function with wrong Binding Providers or Providers not found
- ### For each Trigger runtime creates a new Listener
- ### It's responsibility of the Binder to bind input values to the values used by function
- ### Responsibilities
    - `TriggerConfigProvider` - to configure the entire Trigger process
    - `TriggerAttribute` - contains the incoming trigger data
    - `TriggerBindingProvider` - creates the actual binding object
    - `TriggerBinding` - creates the listener interface
    - `TriggerListener` - reacts to events and executes the function. Different listener for each function
- ### [Source Code]({{ page.lab }}/AzureFunctions/src/Lab02)
---

1. ### Process flow
    ![Center_600_Flow](\images\Func_Lab02_01.png)
        
2. ### Register on [OpenAPI Url](https://openweathermap.org/) and Get APIKey
3. ### Create custom Startup to register All components
    ```csharp
    public class WeatherFunctionStartup : IWebJobsStartup
    {
        public void Configure(IWebJobsBuilder builder)
        {
            builder.UseWeatherTrigger();
        }
    }

    // Extension method to Add WeatherTrigger to the Pipeline
    public static class WeatherJobBuilderExtensions
    {
        public static IWebJobsBuilder UseWeatherTrigger(this IWebJobsBuilder builder)
        {
            builder.AddExtension<WeatherTriggerExtensionConfigurationProvider>();
            builder.Services.AddTransient<WeatherService>();

            return builder;
        }
    }
    ```
4. ### Inject our Startup file as EntryPoint on WebJob
    - ### Add the above code on main namespace and ignore warnings

    ```csharp
    [assembly: WebJobsStartup(typeof(WeatherFunctionStartup))]
    ```

5. ### Create custom Weather function 
    ```csharp
    [assembly: WebJobsStartup(typeof(WeatherFunctionStartup))]
    ```
6. ### Create `WeatherTriggerConfigurationProvider` used to configure pipeline 
    ```csharp
    public class WeatherTriggerExtensionConfigurationProvider : IExtensionConfigProvider
    {
        private readonly INameResolver _nameResolver;
        private readonly ILoggerFactory _loggerFactory;
        private readonly WeatherService _weatherService;

        public WeatherTriggerConfigurationProvider(INameResolver nameResolver
                    , ILoggerFactory loggerFactory, WeatherService weatherService)
        {
            _nameResolver = nameResolver;
            _loggerFactory = loggerFactory;
            _weatherService = weatherService;
        }

        public void Initialize(ExtensionConfigContext context)
        {
            var triggerBindingRule = context.AddBindingRule<WeatherTriggerAttribute>();
            triggerBindingRule
                .BindToTrigger<WeatherPayload>(
                    new WeatherTriggerBindingProvider(_nameResolver, _loggerFactory, _weatherService));
        }
    }
    ```

7. ### Create `WeatherTriggerBindingProvider` used to configure binding Provider
    - ### Get Properties from `EnvironmentVariable` or `NameResolver`
    ```csharp
    public class WeatherTriggerBindingProvider : ITriggerBindingProvider
    {
        private readonly INameResolver _nameResolver;
        private readonly ILoggerFactory _loggerFactory;
        private readonly WeatherService _weatherService;

        public WeatherTriggerBindingProvider(INameResolver nameResolver, 
                ILoggerFactory loggerFactory, WeatherService weatherService)
        {
            _nameResolver = nameResolver;
            _loggerFactory = loggerFactory;
            _weatherService = weatherService;
        }

        public Task<ITriggerBinding> TryCreateAsync(TriggerBindingProviderContext context)
        {
            var triggerAttribute = context.Parameter.GetCustomAttribute<WeatherTriggerAttribute>();
            if (triggerAttribute is null)
            {
                return Task.FromResult<ITriggerBinding>(null);
            }

            // Use NameResolver or Environment Variable
            triggerAttribute.ApiKey = _nameResolver.Resolve("WeatherApiKey");

            return Task.FromResult<ITriggerBinding>(new WeatherTriggerBinding(context.Parameter, _nameResolver, _weatherService, triggerAttribute));
        }
    }
    ```
8. ### Create `WeatherTriggerBinding` used to configure binding
    ```csharp
    public class WeatherTriggerBinding : ITriggerBinding
    {
        private readonly ParameterInfo _contextParameter;
        private readonly INameResolver _nameResolver;
        private readonly WeatherService _weatherService;
        private readonly WeatherTriggerAttribute _triggerAttribute;

        public WeatherTriggerBinding(ParameterInfo contextParameter,
            INameResolver nameResolver, WeatherService weatherService,
            WeatherTriggerAttribute triggerAttribute)
        {
            _contextParameter = contextParameter;
            _nameResolver = nameResolver;
            _weatherService = weatherService;
            _triggerAttribute = triggerAttribute;
        }

        public Task<ITriggerData> BindAsync(object value, ValueBindingContext context)
        {
            // Should return WeatherPayload

            return Task.FromResult<ITriggerData>(new TriggerData(null, new Dictionary<string, object>()));
        }

        public Task<IListener> CreateListenerAsync(ListenerFactoryContext context)
        {
            return Task.FromResult<IListener>(
                new WeatherListener(context.Executor, _weatherService, _triggerAttribute));
        }

        public ParameterDescriptor ToParameterDescriptor()
        {
            return new TriggerParameterDescriptor();
        }

        public Type TriggerValueType => typeof(WeatherPayload);
        public IReadOnlyDictionary<string, Type> BindingDataContract { get; }
    }
    ```

9. ### Create `WeatherListener` used to execute the main function
    ```csharp
    public class WeatherListener : IListener
    {
        private ITriggeredFunctionExecutor _executor;
        private WeatherService _weatherService;
        private WeatherTriggerAttribute _triggerAttribute;

        public WeatherListener(ITriggeredFunctionExecutor executor, WeatherService weatherService,
             WeatherTriggerAttribute triggerAttribute)
        {
            this._executor = executor;
            this._weatherService = weatherService;
            this._triggerAttribute = triggerAttribute;
        }

        public void Dispose()
        {
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var data = await _weatherService.GetWeatherData(_triggerAttribute.ApiKey);

            await _executor.TryExecuteAsync(
                new TriggeredFunctionData() { TriggerValue = data }, CancellationToken.None);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        public void Cancel()
        {
        }
    }
    ```
10. ### Create `WeatherService` used to get the data from the OpenWeather API
    ```csharp
    public class WeatherService
    {
        private readonly HttpClient _client;

        public WeatherService(HttpClient client)
        {
            _client = client;
        }

        public async Task<WeatherPayload> GetWeatherData()
        {
             var res =
                await _client.GetAsync(
                    new Uri($"http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid={weatherApiToken}"));

            var data = await res.Content.ReadAsAsync<WeatherPayload>();
            data.Timestamp = DateTime.UtcNow;

            return data;
        }
    }
    ```
