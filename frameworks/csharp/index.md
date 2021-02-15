---
title: CSharp
---

# Topics
- ### Change Language Version in Project `(.csproj)` Properties
- ### [Multi-Threading](multithread)
- ### [Async/Await](asyncawait)
- ### [Report Progress from Async Tasks](reportprogress)


- ## Features (9.0)
	- ### Initialization doesn't require providing Explicit Type on RHS. (Opposite of var)
	```csharp
	    SampleClass obj = new();
	 
	    // With Constructor
	    SampleClass obj = new(<param1>, <param2>);
	```
- ## Features (8.0)
	- ### Reference types can be assigned Nullables
	```csharp
	    public class Sample {
	        public string? _IamRefTypeFieldAndNullable;
	        public string? ThisIsRefAndNullable {get;set;}
	    }
	```

