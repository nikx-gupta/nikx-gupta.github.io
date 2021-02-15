---
title: Report Progress
description: Report Progress from Asychnronous Operation or a different thread
category: Parallel Programming, Parallelism
---

## Reporting Progress or Intermediate information from inside a Background Task
- ### Use of `IProgress<T>` and `Progress<T>` types
	- `T` is type of object you want to report. It can be Value or Ref type
	- When an instance is created for the `Progress<T>` is captures the current Thread context, and call its callback within that context. This means
	  it you can update the UI Thread (WindowsApp, Classic ASP.NET app) also within callback handler
- ## Important
	- if `T` is mutable type then always instantiate a new object while calling `Report` method
	
- ## Execute async task in background and report progress to UI thread
  - ### Declare the progress argument type as `ReportItem`
	```csharp
    public class ReportItem {
        public int Percent { get; }
        public int CurrentRecord { get; }

        public ReportItem(int percent, int currentRecord) {
            Percent = percent;
            CurrentRecord = currentRecord;
        }
    }
    ```
  - ### Declare the method which will run the task and reports back the progress
    ```csharp
    public class ProgressUsage {
        public async Task WorkerAsync(IProgress<ReportItem> progress = null) {
            for (int i = 0; i < 100; i++) {
                await Task.Delay(TimeSpan.FromMilliseconds(200));
                progress.Report(new ReportItem(i, i));
            }
        }
    }
	```
  - ### Invoke the WorkerAsync task from Main console thread
	```csharp
    static async Task ExecuteAsyncWorker() {
            // This is main thread

            // Creating a Progress Object here will capture the Main thread Context
            var progress = new Progress<ReportItem>();
 
            // Declare the callback Handler
            progress.ProgressChanged += (sender, args) => {
                // As this is executing on main thread context we can leverage Console which is on UI thread
                Console.WriteLine($"Progress: {args.Percent}");
            };
            
            await new ProgressUsage().WorkerAsync(progress);
    } 
	```

