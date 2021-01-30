---
title: Join two containers in same Network Namespace
---

### Topics
- ### [Create and Launch container with Simple Application](SimpleApp)
- ### Launch another container in same Network Namespace
    ```bash
    docker run -it --net container:app-01 nicolaka/netshoot
    ```
- ### Test the first container is able to access the other container port
    ```bash
    curl localhost:8080
    ```

