---
title: Creational Patterns
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
	- Builder pattern can have different forms, most famous is abstracting out the object created
	- Create abstract `IDocument`, `IElement` which are final and intermediate components 
	```csharp
    public interface IElement {}
	public interface IDocument {}
	```
	- Create abstract `IBuilder` which will be reponsible for creating abstract document
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
	
