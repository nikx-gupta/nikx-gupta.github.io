---
title: Async/Await
category: Asynchronous programming
----

### What happens when execution encounters `await` operator
- `await` known as `asynchronous wait`
- `async` method executes Synchronously until `await` operator starts a `asynchronous wait`
	- ### It enables compiler to generate a State Machine for the method
	- ### When method execution encounters `await` operator, it captures the `Execution Context` of `Current Thread` and starts execution of the task which may or may not be in a new thread
	- ### When the task completes any thread can resume the operation using the Captured Context Information, generally a pool thread

### What classes are responsible for Async State Machine
- `AsyncTaskMethodBuilder` in System.Runtime.CompilerServices
	- Used by a compiler to generate code for Async method
- `AsyncMethodBuilderCore` in System.Runtime.CompilerServices
	- It captures the ExecutionContext and is responsible fo starting the awaited Task
	
## Important
- ### Never block an asynchronous operation. Blocking an asynchronous operation will block calling thread from starting other tasks which can cause a deadlock in certain conditions
- ### It is possible to return `void` from async method, but it should only be used for event handler, also it is difficult to propagate exceptions when return type is not Task
- ### Try to cache the use of `Task.Result` if you are using same result repeatedly as each Task objects incurs penalty
	```csharp
	public static readonly Task<int> emptyTask = Task.FromResult(0);
	```

## AsyncMethod can complete in a different Thread than starting thread
- ### Create a Console Program and make the entry method as async
	```csharp
    static async Task Main(string[] args) {
        var th = Thread.CurrentThread;
        Console.WriteLine($"{th.ManagedThreadId}, IsPooled: {th.IsThreadPoolThread}");
        
        Console.WriteLine("Completed");
        Console.Read();
    }
	```
    - #### Response
		```text
	    1, IsPooled: False
		```
        - `Note`
            - As this is the Primary thread this is not from Thread pool and is Assigned Thread Id of 1
			- if we start this program in two windows the result will be same as those have their individual process
	
- ### Next Step is to create an async worker method
  - Whenever thread encounters `Task.Delay` it asynchronously waits for the specified duration and resumes operation
  ```csharp
  static async Task ExecuteWorkerAsync() {
    for (int i = 0; i < 20; i++) {
        Console.WriteLine($"Awaited on Thread: {Thread.CurrentThread.ManagedThreadId}, IsPooled: {Thread.CurrentThread.IsThreadPoolThread}");
        await Task.Delay(TimeSpan.FromMilliseconds(200));
        Console.WriteLine($"Resumed on Thread: {Thread.CurrentThread.ManagedThreadId}, IsPooled: {Thread.CurrentThread.IsThreadPoolThread}");
    }    
  }
  ```
	- #### Response
	  ```text
        1, IsPooled: False
		Awaited on Thread: 1, IsPooled: False
		Resumed on Thread: 4, IsPooled: True
		Awaited on Thread: 4, IsPooled: True
		Resumed on Thread: 5, IsPooled: True
		Awaited on Thread: 5, IsPooled: True
		Resumed on Thread: 4, IsPooled: True
		Awaited on Thread: 4, IsPooled: True
		Resumed on Thread: 5, IsPooled: True
		Awaited on Thread: 5, IsPooled: True
		Resumed on Thread: 4, IsPooled: True
		Awaited on Thread: 4, IsPooled: True
		Resumed on Thread: 4, IsPooled: True
		Awaited on Thread: 4, IsPooled: True
	  ```
		- `Note`
			- The First await in a program always happens at main thread
			- Observing rest of the output we can see that all Threads are pooled threads. 
			- The thread in which await operation starts and Thread on which it resumes operation may or may not be different

## Functions for executing multiple tasks
- ### `WhenAll`
	- The `taskWhen` will be completed only when all the tasks are successfully completed
	- If any of the task get faulted the execution will still continue on other tasks and result will be the exception of first exception raised
	- If multiple tasks throws exceptions, then only first exception will be thrown  

	- #### Declare multiple Tasks and provide it in `WhenAll` function
		- The tasks are not executed until `WhenAll` task is awaited
	
	```csharp
    public static async Task ExecuteWorkerAsync() {
            for (int i = 0; i < 20; i++) {
                Console.WriteLine($"Awaited on Thread: {Thread.CurrentThread.ManagedThreadId}, IsPooled: {Thread.CurrentThread.IsThreadPoolThread}");
                await Task.Delay(TimeSpan.FromMilliseconds(200));
                Console.WriteLine($"Resumed on Thread: {Thread.CurrentThread.ManagedThreadId}, IsPooled: {Thread.CurrentThread.IsThreadPoolThread}");
            }    
    }
    
    public static async Task ThrowNullReferenceException() {
            throw new NullReferenceException();
    }
        
    public static async Task ThrowArgumentNullException() {
            throw new ArgumentNullException();
    }
 
    public static async Task ExecuteWhenAllAsync() {
            Task t1 = Task.Delay(TimeSpan.FromMilliseconds(500));
            Task t3 = AsyncExceptions.ThrowArgumentNullException();
            Task t4 = AsyncExceptions.ThrowNullReferenceException();
            Task t2 = ExecuteWorkerAsync();

            Task taskWhen = Task.WhenAll(t1, t2, t3, t4);
            try {
                await taskWhen;
            }
            catch (Exception e) {
                var ex = e as AggregateException;
                Console.WriteLine(e);
            }
    }
	```

## Execute Async Tasks in Parallel
- ### Due to the nature of async/await parallel execution is not in conventional manner
- ### Declare & Execute multiple async tasks methods
    - Wrap each Task in a separate Async method call
	- Even when the tasks are iterated in decreasing order i.e. 3,2,1 the output will be 1,2,3 because all tasks are executed in parallel
	
	```csharp
    public static async Task<int> DelayTask(int delayInSeconds) {
            await Task.Delay(TimeSpan.FromSeconds(delayInSeconds));
            return delayInSeconds;
        }
  
    public static async Task ProcessParallelAsync() {
            Task<int> t1 = DelayTask(1);
            Task<int> t3 = DelayTask(3);
            Task<int> t2 = DelayTask(2);

            var taskArray = new [] { t3, t2, t1 };

            Task[] executionTasks = taskArray.Select(async x => {
                var result = await x;
                Trace.WriteLine(result);
            }).ToArray();

            await Task.WhenAll(executionTasks);
        }
	```
    - #### Response
		```csharp
		1
		2
		3
		```
- ### Wrong way of Parallel Execution
	- The tasks are iterated in decreasing order i.e. 3,2,1 and the output will be 3,2,1 as they are executed sequentially
	
  ```csharp
  public static async Task<int> DelayTask(int delayInSeconds) {
		  await Task.Delay(TimeSpan.FromSeconds(delayInSeconds));
		  return delayInSeconds;
	  }

  public static async Task ProcessParallelAsync() {
		  Task<int> t1 = DelayTask(1);
		  Task<int> t3 = DelayTask(3);
		  Task<int> t2 = DelayTask(2);

		  // Note: The Tasks are in decreasing order of delay time i.e. 3,2,1 but response should be 1,2,3
		  var taskArray = new [] { t3, t2, t1 };
		  
          foreach (var task in taskArray) {
            var result = await task;
            Trace.WriteLine(result);
          }
	  }
  ```
  - #### Response
	```csharp
	  3
	  2
	  1
	```
