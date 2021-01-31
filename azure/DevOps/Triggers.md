---
title: DevOps Triggers
---

### Topics
1. ### Include
    ```yml
    trigger:
        branches:
            include:
            - master
            - main
        paths:
            include:
            - src
    ```
2. ### Exclude
    ```yml
    trigger:
        paths:
            exclude:
            - /data
    ```

### References

- [Trigger](https://docs.microsoft.com/en-us/azure/devops/pipelines/build/triggers?view=azure-devops)
