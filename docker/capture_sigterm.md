---
title: Capture Container Kill event
---

# Write code to capture SIGTERM event inside Docker container
- The standard C library does not allow handler to be registered for the `SIGKILL` signal, though you can register for `SIGTERM` event
- ## Python 
  - ### Create a python file capture_event.py
    ```python
    #!/usr/bin/env python

    import signal
    import sys
    
    def signal_handler_term(signal, frame):
      print("Caught SIGTERM signal")
      sys.exit(0)
    
    signal.signal(signal.SIGTERM, signal_handler_term)
    
    while True:
      pass
    ```

  - ### Execute above code. As, there is infinite loop at the end it will block the terminal where it is executed
    ```bash
    python2 capture_event.py
    ```
  - ### Open new Terminal and find the process for the above code
    ```bash
    ps -af | grep capture_event.py
    ```
    - ##### Response
      - ##### Note the `process id` which is `2354` in below example.
      ```text
      nikx        2354    2298 99 04:57 pts/0    00:01:36 python2 capture_event.py
      ```
  - ### Kill the process with above process id
    ```bash
    kill 2354
    ```
    - ##### Response
      - ##### see the terminal in which python code is running for below response
      ```text
      Caught SIGTERM signal
      ```
  - ### Create `Dockerfile` to run the above code in container
    ```python
    FROM python:latest

    WORKDIR src
    COPY capture_event.py .
    
    CMD ["python", "capture_event.py"]
    ```
  - ### Build and run container image
      - As, there is infinite loop in the code the container will not exit and terminal will wait
    ```bash
    docker build -t capture_image:v1 .
    docker run --name capture capture_image:v1
    ```
  - ### Stop the running container using the name provided in above script
    ```bash
    docker stop capture
    ```
    - ##### Response (observe the blocked terminal)
      ```text
      Caught SIGTERM signal
      ```

