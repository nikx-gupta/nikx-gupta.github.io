---
title: SpringBoot
---

## Important
- ### `ApplicationContext` is IOC container which registers all the different @Attribute Annotations like @Service, @Component, @Autowired etc.
- ### `spring-boot-starter-web` package is required for Creating Controllers

## Topics
- ### [Factory in SpringBoot](factory)
- ### [Return File Content in Response](filewrite)

## Gradle Setup
- ### Add below packages for a minimal starting application with Controllers and Swagger
	```text
	implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springdoc:springdoc-openapi-ui:1.5.2'
	compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
	```
- ### Setup Swagger UI path to default url. For more refer [Swagger-UI](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config)
	```text
	springdoc.swagger-ui.path=/
	```

## References
- ### [Swagger-UI](https://www.baeldung.com/spring-rest-openapi-documentation)