---
title: Async-Await
---

## Important
- ### `async` method executes Synchronously until `await` operator starts a `asynchronous wait`
- ### `async` keyword enable compiler to generate a State Machine for the method, similar to `yield` due to which it enables returning result in future
- ### It is possible to return `void` from async method, but it should only be used for event handler

## How it works
- when a task is `awaited` a ***context*** is captured when await decides to pause the method. If current `SynchronizationContext` is null
  then current `Task Scheduler` is used. When, the synchronous process completed the method resumes execution within that captured context.
  
