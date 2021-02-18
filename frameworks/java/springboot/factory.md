---
title: Factory Pattern
category: SpringBoot
---

## Description
- As SpringBoot is completely Annotation Driven and all dependencies must be defined explicitly and are configured when application is booted.
- ### Problem
	- If we want to create beans with some settings provided form user input it is not possible until those are pre-defined in the system
	- Even if you use LazyBeans you still need to declare then statically
	
## Create DataProvider Factory
- ### Declare DataSourceType enum and generalize DataProviderSettings
	- We will create a generic DataProvider factory so that if consumer needs to ask for a DataProvider type and provide its respective settings. It will be initialized by SpringBoot container on demand
    
	```java
    public enum DatasourceType {
        MONGO
	}

	public class DataProviderSettings {
	
	}
	```	
- ### Create `IDataSource` interface
	```java
	public enum DatasourceType {
		MONGO
	}
	
	public class DataProviderSettings {
	
	}
    ```	
- ### Declare Factory
  ```java
    @Component
	public class ReportComponentFactory implements ApplicationContextAware {
		private ApplicationContext ctx;
	
	    public IDataSource createDataProvider(DatasourceType datasourceType, DataProviderSettings settings) {
	        switch (datasourceType) {
	            case MONGO:
	                IDataSource dataSource = ctx.getAutowireCapableBeanFactory().createBean(MongoDataSource.class);
	                dataSource.initSettings(settings);
	                return dataSource;
	            default:
	                throw new UnsupportedOperationException("Unsupported DataSource");
	        }
	    }
	
	    @Override
	    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
	        this.ctx = applicationContext;
	    }
  }
  ```
  - #### Description
	- `ApplicationContext` is the spring boot IOC container and contains all registered beans in the system. It has myriad of methods to create the autowired beans from the context.
	- Here we are not initializing any instance by ourselves neither we are changing the scope, we are just demanding an Bean from the context in simlar way how it injects the beans in the system
	- All the dependencies of the Bean are resolved by container and the instance is provided.
	- Now if we want to update any settings in Bean we need to provide a interface method of our `IDataSource`. Example - `initSettings` will update the collection name while creating the datasource so that person requesting the data does not need to know
	
