---
title: Capture Memory Hogging by a container
---

# Description
Dynamic memory can be assigned to the container and is controlled through cgroup by docker
when docker memory is exceeded the specified limit the container is killed

# Steps
- ### Write code to capture memory in increments of 50MB strings 
  ```golang
  package main

  import (
  "fmt"
  "strings"
  "time"
  )
  
  func main() {
    var longStrs []string
    for i := 1; i <= 50; i++ {
      fmt.Printf("========%d========\n", i)
      longStrs = append(longStrs, buildString(1000000, byte(i)))
    }
    
    time.Sleep(3600 * time.Second)
  }
  
  func buildString(n int, b byte) string {
    var builder strings.Builder
    builder.Grow(n)
    for i := 0; i < n; i++ {
    builder.WriteByte(b)
    }
    
        return builder.String()
  }
  ```

- ### Create a `Dockerfile`
    ```dockerfile
    FROM golang:1.14 as base
    WORKDIR /app
    COPY main.go .
    RUN CGO_ENABLED=0 GOOS=linux go build -o output

    FROM alpine:3.10
    COPY --from=base /app/output .
    CMD ["/output"]
    ```

- ### Create and run the docker image 
    ```bash
    docker build -t mem_test .
    docker run -d --name memtest mem_test
    ```

- ### Get the ContainerId
    ```bash
    docker container inspect -f "{{ "{{ json .Id "}} }}" memtest | jq	
    ```

- ### Observe the mem stats for the container
    ```bash
    cat /sys/fs/cgroup/memory/docker/<container id>/memory.stat
    ```
    - ##### Response
    ```text
    cache 0
    rss 52445184
    rss_huge 0
    shmem 0
    mapped_file 0
    dirty 0
    writeback 0
    swap 0
    pgpgin 13497
    pgpgout 685
    pgfault 13860
    pgmajfault 0
    inactive_anon 0
    active_anon 2973696
    inactive_file 50012160
    active_file 0
    unevictable 0
    hierarchical_memory_limit 104857600
    hierarchical_memsw_limit 104857600
    total_cache 0
    total_rss 52445184
    total_rss_huge 0
    total_shmem 0
    total_mapped_file 0
    total_dirty 0
    total_writeback 0
    total_swap 0
    total_pgpgin 13497
    total_pgpgout 685
    total_pgfault 13860
    total_pgmajfault 0
    total_inactive_anon 0
    total_active_anon 2973696
    total_inactive_file 50012160
    total_active_file 0
    total_unevictable 0
    ```
      - ##### Observe the memory_limit has been increased to the amount we specified while executing the container

- ### Observe logs for the container
    - #### There shall be logs lines for each time memory limit is increased i.e. no. of iterations
    ```bash
    docker logs memtest
    ```
  
