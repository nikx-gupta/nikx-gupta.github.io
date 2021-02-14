---
title: Middleware
category: AspNetCore
category: Routing, Endpoint
---

## Important
- ### `app.Run` is the last middleware in the AspNetCore pipeline, so there is no `next` RequestDelegate
- ### The middlewares are executed in order they are written in `Configure` method

## Types of Middleware
- ### Using Lambda Middleware
    - `Use`, `Map`, `MapWhen` extension methods on `IApplicationBuilder`
- ### Routing
    - It uses `UseRouting` extension methods on `IApplicationBuilder`
- ### Endpoint
	- It uses `UseEndpoints` extension methods on `IApplicationBuilder`

## Lambda Middleware
- ### Before using any code below, remove any boilerplate code in `Configure` method and add below code
  ```csharp
  app.Run(async (context) => {
			  await context.Response.WriteAsync("Response End \n");
		  });
  ```
  
- ### Signature `Use(this IApplicationBuilder app, Func<HttpContext, Func<Task>, Task> middleware)`
	- #### Execute Middleware for every request. Add below code before `app.Run`
	```csharp
    app.Use(async (context, next) => {
                // Writes response before next middleware
                await context.Response.WriteAsync("Pre Next Handler Invoke");

                await next();

                // Writes response after next middleware is executed
                await context.Response.WriteAsync("Post Next Handler Invoke");
            });
	```

- ### Performance Middleware as separate component
    - #### This middleware writes Response time for each request
	```csharp
    public class PerformanceMiddleware : IMiddleware {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next) {
            Stopwatch stopwatch = new();
            stopwatch.Start();

            await next(context);

            stopwatch.Stop();
            context.Response.WriteAsync($"Request Execution Time: {stopwatch.Elapsed.TotalMilliseconds}");
        }
    }
	```
	- #### Plugin middleware to the pipeline
	  ```csharp
	  app.UseMiddleware<PerformanceMiddleware>();
	  ```
	
