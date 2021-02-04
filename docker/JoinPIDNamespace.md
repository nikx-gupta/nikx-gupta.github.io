---
title: Join two containers with PID namespace
---

# Steps
- ### Run a nginx container image
  ```bash
  docker run -d --name nginx -p 8080:80 nginx
  ```
- ### Get PID for the container
  ```bash
  ps -af | grep nginx
  ```
- ### Launch another container in same PID Namespace
    ```bash
    docker run -it --pid container:nginx --name netshoot nicolaka/netshoot
    ```
- ### Get PID for above container
    ```bash
    ps -af | grep netshoot
    ```
- ### Observe both containers PID namespace values. They should have same values
    ```bash
    ls -l /proc/<PID for nginx>/ns/pid
    ls -l /proc/<PID for netshoot>/ns/pid
    ```

