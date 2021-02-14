---
title: Builder Pattern
---

## Builder Pattern
- Builder pattern is used to create objects using step by step approach, where the intermediate behaviors are buffered until final invocation is executed.
- ### Example
	- We will create a `HtmlBuilder` where we will have following different intermediate behaviours we can invoke
		- `appendElement()` - - to add new element to the document (intermediate operation, internally stored in collection)
		- `appendElementStyle()` - to append content to the element (intermediate operation)
		- `appendElementContent()` - to append content to the element (intermediate operation)
		- `Build()` - returns final document
	
	```csharp
    public class HtmlBuilder : IBuilder {
        private List<HtmlElement> _elements;
        public IElement appendElement(string elementName) {
            var element = new HtmlElement();
            _elements.Add(element);
            return element;
        }

        public void appendElementStyle(HtmlElement element) { }

        public void appendElementContent(HtmlElement element) { }

        public IDocument Build() {
            HtmlDocument htmlDocument = new HtmlDocument();
            foreach (var element in _elements) {
                // write to the document
            }

            return htmlDocument;
        }
    }
	```	
    - When we are done operation on intermediate elements we can invoke `Build` command to get the final html
 

- ### Example for Builder Abstraction
	- Builder pattern can have different forms, most famous is abstracting out the builder and objects we create
	- Create abstract `IDocument`, `IElement` which are final and intermediate components 
	```csharp
    public interface IElement {}
	public interface IDocument {}
	```
	- Create abstract `IBuilder` which will be responsible for creating abstract document
		```csharp
		public interface IBuilder {
	        public IElement appendElement(string elementName);
	        public void appendElementStyle(IElement element);
	        public void appendElementContent(IElement element);
	        public IDocument Build();
	    }
		```
	- Now we can create concrete implementation IElement as `HtmlElement` and `XmlElement` and IDocument as `HtmlDocument` and `XmlDocument`
		```csharp
		public class HtmlElement : IElement {}
        public class HtmlDocument : IDocument {}
        
        public class XmlElement : IElement {}
        public class XmlDocument : IDocument {}
		```
	- Now we can create concrete implementation for IBuilder as `HtmlDocumentBuilder` and `XmlDocumentBuilder`
		```csharp
		public class HtmlBuilder : IBuilder {
			private List<IElement> _elements;
			public IElement appendElement(string elementName) {
			    var element = new HtmlElement();
			    _elements.Add(element);
			    return element;
			}
			
			public void appendElementStyle(IElement element) { }
			
			public void appendElementContent(IElement element) { }
			
			public IDocument Build() {
			    HtmlDocument htmlDocument = new HtmlDocument();
			    foreach (var element in _elements) {
			        // write to the document
			    }
			
			    return htmlDocument;
			}
		}
  
        public class XmlBuilder : IBuilder {
	        private List<IElement> _elements;
	        public IElement appendElement(string elementName) {
	            var element = new HtmlElement();
	            _elements.Add(element);
	            return element;
	        }
	
	        public void appendElementStyle(IElement element) { }
	
	        public void appendElementContent(IElement element) { }
	
	        public IDocument Build() {
	            XmlDocument xmlDocument = new XmlDocument();
	            foreach (var element in _elements) {
	                // write to the document
	            }
	
	            return xmlDocument;
	        }
		}
		```

![Center_300](/assets/images/pattern_builder.png)
	
- ### Virtual Machine Builder using Configuration & Director
	- Another form of builder where the configuration or static values is used to generate builder without manually invoking intermediate functions
	- ### We will declare a configuration which will contain basic specific information to create Virtual Machines
		```csharp
		public class VirtualMachineConfiguration {
			  public int MemoryLimit { get; set; }
			  public int CpuCores { get; set; }
			  public int StorageSize { get; set; }
		}
		```
    - ### Let's declare an abstract Builder for creating Virtual Machines
      - #### We have used `abstract class` instead of `interface` here to enforce configuration injection through constructor on the derived classes.
      ```csharp
	   public abstract class VirtualMachineBuilder {
            protected readonly VirtualMachineConfiguration _config;

            public VirtualMachineBuilder(VirtualMachineConfiguration config) {
                _config = config;
            }

            public abstract void AssignMemory();
            public abstract void AssignCpu();
            public abstract void AssignStorage();
      }
	  ```
	- ### For Next Step, Let's define respective builders for Azure and AWS which will create virtual machines in their respective clouds
	  - #### Each builder can apply their own respective configuration on top of basic configuration provided to them
	  ```csharp
        public class AzureVirtualMachineBuilder : VirtualMachineBuilder {
	        private VirtualMachine _vm;
	
	        public AzureVirtualMachineBuilder(VirtualMachineConfiguration config) : base(config) {
	            _vm = new VirtualMachine();
	        }
	
	        #region Overrides of VirtualMachineBuilder
	
	        public override void AssignMemory() {
	            _vm.MemorySize = _config.MemoryLimit;
	        }
	
	        public override void AssignCpu() {
	            _vm.CpuCount = _config.CpuCores;
	        }
	
	        public override void AssignStorage() {
	            _vm.CpuCount = _config.StorageSize;
	        }
	
	        #endregion
	      }
        
	      public class AWSVirtualMachineBuilder : VirtualMachineBuilder {
		        private VirtualMachine _vm;
		
		        public AWSVirtualMachineBuilder(VirtualMachineConfiguration config) : base(config) {
		            _vm = new VirtualMachine();
		        }
		
		        #region Overrides of VirtualMachineBuilder
		
		        public override void AssignMemory() {
		            _vm.MemorySize = _config.MemoryLimit;
		        }
		
		        public override void AssignCpu() {
		            _vm.CpuCount = _config.CpuCores * 2;
		        }
		
		        public override void AssignStorage() {
		            _vm.CpuCount = _config.StorageSize * 2;
		        }
	            #endregion
	      }   
	  ```
	- ### Next step is to create a Director.
		- #### we pass the required builder to the Director which then leverage builder abstraction to create Virtual Machine
		```csharp
        public class VirtualMachineDirector {
		        private readonly VirtualMachineBuilder _machineBuilder;
		
		        public VirtualMachineDirector(VirtualMachineBuilder machineBuilder) {
		            _machineBuilder = machineBuilder;
		        }
		
		        public void CreateVirtualMachine() {
		            _machineBuilder.AssignMemory();
		            _machineBuilder.AssignCpu();
		            _machineBuilder.AssignStorage();
		        }
		}
		```	
		- Note that this can also be included in the builder itself, but this is just to show another type of usability
