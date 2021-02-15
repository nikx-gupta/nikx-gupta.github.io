---
title: Async/Await
category: Asynchronous programming
----

### What happens when execution encounters `await` operator
- `await` known as `asynchronous wait`
- `async` method executes Synchronously until `await` operator starts a `asynchronous wait`
	- ### It enables compiler to generate a State Machine for the method
	- ### When method execution encounters `await` operator, it captures the current `Synchronization Context` and starts execution of the task which may or may not be in a new thread
	- ### When the task completes any thread can resume the operation using the Captured Context Information


## Important
- ### Never block an asynchronous operation. Blocking an asynchronous operation will block calling thread from starting other tasks which can cause a deadlock in certain conditions
- ### It is possible to return `void` from async method, but it should only be used for event handler
- ### Try to cache the use of `Task.Result` if you are using same result repeatedly as each Task objects incurs penalty
	```csharp
	public static readonly Task<int> emptyTask = Task.FromResult(0);
	```
