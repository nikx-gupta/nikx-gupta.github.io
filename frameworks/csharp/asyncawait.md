---
title: Async-Await
---

## Important
- ### What are `CPU-Bound` operations
  - The Tasks which have only computational complexity and may take some CPU time to process existing data
- ### What are `IO-Bound` operations  
  - If your program needs to fetch/retrieve data from Network/Disk which have their own device drivers api's. RAM is not considered a IO-Bound operation under normal conditions
  - `Examples`
    - Calling a WebAPI (Network IO)
    - Writing/Reading a file (Disk IO)
    - SqlServer or any database (Network IO)
- ### What is Program Execution respective to Thread
  - In normal program execution, one process executes all program instruction for your application.
  - This process we call as `Application Process` has its own set of threads (ThreadPool) provided by respective OS, but it depends on application type also
    - ASP.NET classic (w3p process with one UI thread of each Request. Same thread will always handle the one complete request)
    - ASP.NET Core (One thread is assigned to each request, but it is possible that different threads handles different parts and end it)
    - Windows Application (single UI parent thread)
  - `Multi-Threading` is not a new concept but is there from the beginning. Application can request a new thread at any point of time and it is responsibility of OS to provide a thread to the owner

- ### What is Multi Threading
  - As we have seen the parent owner process of the application can request for additional threads from the OS as required to complete the task.
    After, task completion these thread return to the OS thread pool and are available to other application processes.
    
  - Example of `CPU Bound Operations`
    - #### Use Single Parent Thread
        - Execution is done on main thread only
      
      ```csharp
      for(int i = 0;i < 10000; i++) {
         // Operation
      }          
      ```

    - #### Use Multi Threading
      - Execution is done on multiple threads as provided by `Thread Pool` owned by application process. 
        `Note` - this is unblocking in nature and the next line of code will execute immediately without waiting for results
  
      ```csharp
      Parallel.For(0, 10000, (index) => {
           // Operation
      });
      ```

    - #### Use Multi Thread with Task explicitly
      - The program will try to spawn as much as 10000 threads as each Task requests a new Thread. 
      - The main thread is blocked on line `WhenAll`, which means main thread will only resume execution after all tasks are processed.   

      ```csharp
      List<Task> tasks = new List<Task>()
        foreach (var i in Enumerable.Range(0, 10000)) {
            tasks.Add(Task.Run(() => {
                // Operation
            }));
        }

      Task.WhenAll(tasks.ToArray());
      ```
        - `Note` - This is particular example of bad multi threading, which results in Thread Starvation. Even with the previous approach Thread starvation can occur if used too many times
  - Generally, CPU bound Operations do not require Multi-Threading, until we are dealing with large datasets in memory as in AI/Machine Learning

  - Example of `IO Bound Operations`
    - #### Use Single Parent Thread
      - Main thread is blocked until file is read
      
      ```csharp
      for(int i = 0;i < 10; i++) {
         File.ReadAllText("temp_file.txt");
      }          
      ```
  
    - #### Use Multi Threading
      - HttpClient is invoked on multiple threads attached to parent thread

      ```csharp
      HttpClient client = new HttpClient();
      Parallel.For(0, 10000, (index) => {
           var result = client.Get("http://getsometext.com");
      });
      ```
      - #### Important
        - When we were running CPU bound operation this would have returned almost immediately, but here we are calling an External API to fetch data.
        - As, this is `Network IO` the request will take to travel through the network to the target and to fetch the data. The whole time that is spend in IO operation, the thread on which it was running is blocked
          to other operations and even inside same application.
        - This means we cannot treat IO bound operations similar to CPU Bound operations in respect to multi threading
  
- ### What is `Thread Block or Wait`
  - `Task Implicit Wait`
    - Taking above example, we have spawn multiple threads from Thread Pool to perform a IO bound task. Until this task is complee the Thread cannot return to the thread pool or perform any other
      task.
  - `Task explicit wait`
    - The program will try to spawn as much as 10000 threads as each Task requests a new Thread.
    - The main thread is blocked on line `WhenAll`, which means main thread will only resume execution after all tasks are processed.

    ```csharp
    List<Task> tasks = new List<Task>()
    HttpClient client = new HttpClient();
    foreach (var i in Enumerable.Range(0, 10000)) {
          tasks.Add(Task.Run(() => {
              var result = client.Get("http://getsometext.com");
          }));
      }

    Task.WhenAll(tasks.ToArray());
    ```
    - `Note` - This is particular example of bad multi threading, which results in Thread Starvation. Even with the previous approach Thread starvation can occur if used too many times
  - Generally, CPU bound Operations do not require Multi-Threading, until we are dealing with large datasets in memory as in AI/Machine Learning

- ### Issues with `Multi Threading`
  - Though Mutli-Threading is an powerful concept, it can easily become bottleneck if exploited.
  - If an application requests too many threads, the parent application process can starve of the threads and thus can crash
  - Also, if you are using a shared system resources then one application can starve other application of system resources


- ### What happens when execution encounters `await` operator
  - 
async` method executes Synchronously until `await` operator starts a `asynchronous wait`
- `await` known as `asynchronous wait`
    - ### It enables compiler to generate a State Machine for the method
    - ### When method execution encounters `await` operator, it captures the current `Synchronization Context` and executes the operation
  similar to `yield` due to which it enables returning to the point of await so as to resume execution
- ### It is possible to return `void` from async method, but it should only be used for event handler

## How it works
- when a task is `awaited` a ***context*** is captured when await decides to pause the method. If current `SynchronizationContext` is null
  then current `Task Scheduler` is used. When, the synchronous process completed the method resumes execution within that captured context.
  
