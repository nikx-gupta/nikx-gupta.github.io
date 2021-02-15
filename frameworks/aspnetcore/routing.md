---
title: Routing
---

## Areas in WebAPI
- For WebAPI project, we don't need to specify [Area] attribute or any other configuration. In API controller
  the Route attribute is enough to provide Area routing.

- ### Create a Directory Structure with `Areas` folder in root. It should look like
  ![Center_200](/assets/images/AspNetCore_01.PNG)

- ### Add `Route` attribute to the controllers 
  ```csharp
  [ApiController]
  [Route("<area name>/[controller]/[action]")]
  public class MoviesController { }
  ```
