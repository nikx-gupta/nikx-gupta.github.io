---
title: Create Go App in Docker
---

### Topics
- ### Create a simple `Http Listener` in file main.go
    ```go
    package main

    import (
        "fmt"
        "log"
        "net/http"
    )

    func main() {
        http.HandleFunc("/", handler)
        log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
    }

    func handler(w http.ResponseWriter, r *http.Request) {
        log.Printf("Ping from %s", r.RemoteAddr)
        fmt.Fprintln(w, "Main Page, Kubernetes sample-app-01")
    }
    ```

- ### Create a `Dockerfile`
    ```dockerfile
    FROM golang:1.14 as base
    WORKDIR /app
    COPY src/ .
    RUN CGO_ENABLED=0 GOOS=linux go build -o output

    FROM alpine:3.10
    COPY --from=base /app/output .
    CMD ["/output"]
    ```

- ### Create docker image with name
    ```bash
    docker build -t app-01:v1 .
    ```

- ### Run the docker container with above image
    ```bash
    docker run -d -p 8080:8080 --name app-01 app-01:v1
    ```
