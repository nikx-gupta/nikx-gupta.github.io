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
    - ### Don't need to specify type while declaring array on RHS
    ```csharp
    // Previous Method
    int[] intArray = new int[] {1,2,3};
  
    // Now
    var intArrayRHS = new [] { 1,2,3 }
    int[] intArrayLHS = [1,2,3];
	```
	
- ## Features (8.0)
	- ### Reference types can be assigned Nullables
	```csharp
	    public class Sample {
	        public string? _IamRefTypeFieldAndNullable;
	        public string? ThisIsRefAndNullable {get;set;}
	    }
	```

