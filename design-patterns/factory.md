---
title: Factory Pattern
---

## Factory Pattern
- Factory pattern is used to create different type of objects similar to how factory produces different products as a high level.
- The idea is to hide the object creation from consumer due which can vary due to below reasons
	- We want to keep the product objects as private and don't want client to instantiate them directly
	- The products creation require some initial configuration which can be read from external sources or hard coded
	- There might be changes in future to how you are creating products and you don't want clients to change their source code	

## Important
- This pattern is high level creation and it should not include the procedure framework to create objects, we have other patterns for that. 
- This pattern can leverage Builder, Facade and other patterns as dependency to create objects but should not contain code which is meant for these patterns

## Factory Method
- We will create a `VirtualMachineFactory` which will create VirtualMachine object depending on `VirtualMachineType`
	```csharp
    public class VirtualMachineFactory {
        public VirtualMachine CreateMachine<T>() where T : class {
            var reqType = typeof(T);
            if (reqType == typeof(WindowsVirtualMachine)) return new WindowsVirtualMachine();

            if (reqType == typeof(LinuxVirtualMachine)) return new LinuxVirtualMachine();

            throw new Exception("Type not found");
        }

        public VirtualMachine CreateMachine(string machineType) {
            if (machineType == "Windows")
                return new WindowsVirtualMachine();
            if (machineType == "Linux")
                return new LinuxVirtualMachine();

            return null;
        }

        public VirtualMachine CreateMachine(VirtualMachineType machType) {
            switch (machType) {
                case VirtualMachineType.Linux:
                    return new LinuxVirtualMachine();
                case VirtualMachineType.Windows:
                    return new WindowsVirtualMachine();
                default:
                    return null;
            }
        }
    }
 
    public enum VirtualMachineType {
        Windows,
        Linux
    }
	```
    - ### `Note` - there are three different type of implementation showed above
        - `Generic` - which infers which target type of object we want to create
        - `Pass by String` - the target type name is passed as string
        - `Pass by Enum` - type Enum is required
    
 - ### Let's define our products
	```csharp
	public class LinuxVirtualMachine {
		internal LinuxVirtualMachine() {
		    }
		}

	public class WindowsVirtualMachine {
		internal WindowsVirtualMachine() {
		    }
		}
	```
	- ### `Note` - The constructor is internal, this means this product can only be created using provided Factory from same library

## Abstract Factory
- Another major implementation of factory, where Product Factories are themselves abstracted to generalize the product creation.
- Each concrete factory will make sure to handle their respective product families
- ### Each cloud provider provide different types of Virtual Machine, sizes, class etc. due to which it is difficult to re-use same factory to instantiate Virtual Machines for both cloud.
  - So, we will declare concrete factories for each type of cloud where they will create Virtual Machine families for respective cloud

	```csharp
    public interface IVirtualMachineFactory {
        public VirtualMachine CreateMachine<T>() where T : class;
        public VirtualMachine CreateMachine(string machineType);
        public VirtualMachine CreateMachine(VirtualMachineType machType);
    }

	public class AzureVirtualMachineFactory : IVirtualMachineFactory { }
    public class AwsVirtualMachineFactory: IVirtualMachineFactory { }
    
	public class CloudVirtualMachineFactory {
		public IVirtualMachineFactory CreateFactory<T>() {
			var reqType = typeof(T);
			if (reqType == typeof(AzureVirtualMachineFactory)) return new AzureVirtualMachineFactory();
			if (reqType == typeof(AwsVirtualMachineFactory)) return new AwsVirtualMachineFactory();
			
            throw new Exception("Type not found");
		}
	}
	```
    - ### `Note` 
        - The product returned are abstracted their respective Product Family level. Each Product Family can have different basic configuration respective to their cloud provider
		- The CloudVirtualMachineFactory is used to create Concrete Cloud factory for respective cloud
	    
- ### Let's create abstract VirtualMachine and Virtual machines for respective cloud can derive from it.  
  ```csharp
  public abstract class AzureVirtualMachine : VirtualMachine { }
  public abstract class AzureN1VirtualMachine : AzureVirtualMachine { }
  public abstract class AzureN2VirtualMachine : AzureVirtualMachine { }

  public abstract class AwsVirtualMachine : VirtualMachine { }
  public class AwsC1VirtualMachine : AwsVirtualMachine { }
  public class AwsC2VirtualMachine : AwsVirtualMachine { }
  ```
	
