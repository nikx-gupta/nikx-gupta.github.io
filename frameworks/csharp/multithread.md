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
  - The parent owner process has its own set of thread pool and also it can request for additional threads from the OS as required to complete the task.
    After, task completion these thread return to the OS thread pool and are available to other application processes.
  - Citing an example. In previous ASP.NET whenever a client hits a page, the application process spawns a new thread or reuse thread from its pool and assign to the request. Until this request
    completes the thread cannot return to the main process thread pool.
  - Example of `CPU Bound Operations`
    - #### Use Single Parent Thread
        - Execution is done on main thread only
      
      ```csharp
      for(int i = 0;i < 20; i++) {
         // Operation
      }          
      ```

    - #### Use Multi Threading
      - Execution is done on multiple threads as provided by `Thread Pool` owned by application process. 
        `Note` - this is unblocking in nature and the next line of code will execute immediately without waiting for results
      
      ```csharp
      Parallel.For(0, 20, (index) => {
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
    
  - `IO Bound Operations`
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
    - It always happens on main thread only
    - Taking below example, this operation will block the main thread until it completes
      ```csharp
      var result = client.Get("http://getsometext.com");
      ```
      
  - `Task explicit wait`
    - Repeating previous example the thread is explicitly blocked from processing further, when it reaches line `WhenAll`

    ```csharp
    List<Task> tasks = new List<Task>()
    HttpClient client = new HttpClient();
    foreach (var i in Enumerable.Range(0, 20)) {
          tasks.Add(Task.Run(() => {
              var result = client.Get("http://getsometext.com");
          }));
    }

    Task.WhenAll(tasks.ToArray());
    ```

- ### Issues with `Multi Threading`
  - Though Mutli-Threading is an powerful concept, it can easily become bottleneck if exploited.
  - If an application requests too many threads, the parent application process can starve of the threads and thus can crash
  - Also, if you are using a shared system resources then one application can starve other application of system resources
  - Citing and Example of Classic ASP.NET application
    - Imagining, one particular request path has some code written like below
      ```csharp
      var result = client.Get("http://getsometext.com");
      ```
      `OR`
      ```csharp
      var result = Task.Run(() => client.Get("http://getsometext.com"));
      result.Wait();
      ```
    - Both above examples, mean each request cannot complete and the thread cannot be returned to the pool until this dependent task is complete
    - If this particular path is taking 100 hits at a time, imagine what will happen. There will be 100 not thousand of dependent tasks are created
      which will result in resource contention and performance will start degrading substantially.  

- ### When & how to use `Multi Threading`
  - There is no straight forward answer to it, but there are few rules
    - When you are not expecting a result or `fire and forget` task are best suited for multi threading
    - When you are expecting some result from the task, make sure to limit the parallel threads you are consuming
    - If some resource sharing is expected always use Thread safe Concurrent Collections
    - Avoid using `locks` in the tasks when they are part of multi thread. If locks cannot be avoided use `Lazy` classes wherever possible 
    - Generally, all the tasks which are part of multi threading should be independent of each other
  
- ### Introduction of `async/await`
  - Let's re-write the above multi threaded examples using async await
    ```csharp
    public async Task<string> callExternalAPI() {
      var result = await client.GetAsync("http://getsometext.com");
      return await result.Content.ReadAsStringAsync();
    }
    ```
    `OR`
    ```csharp
    public async Task<string> callExternalAPI() {
      Enumerable.Range(0,100).AsParallel().ForAll(async (index) => {
          var result = await client.GetAsync("http://getsometext.com");
          await result.Content.ReadAsStringAsync();
      });
    }
    ```
  - Run the above code in a loop of 100, 1000 or even 10000 the performance cannot be degraded. You will notice the thread count is not increasing linearly, but reusing most of the threads 

- ### What is Asynchronous Programming
  - Truly Asynchronous programming makes use of concept of `Thread Interleaving` extensively
  - There are few major changes in how main application process handles the request
  - Citing as Example of AspNetCore application
    - For each Request main application process pickups an existing thread from thread pool or request a new thread
    - if the main thread encounters any Asynchronous operation it saves the state and starts the operation but does not wait for its completion neither resumes the
      request. Instead, it returns back to the thread pool and becomes ready for new request or another task
    - When the asynchronous operation completes another thread from thread pool resumes the request using that saved state and the process goes continues
      if the request does not contain any other asynchronous operations this thread will complete the request otherwise process is repeated
      
