---
title: Change Default Logging Driver
---

As we are changing docker daemon file, which has machine wide effects, please make a backup of the existing `daemon.json`

# Steps

- ### Update docker daemon file `daemon.json` in `/etc/docker` 
```bash
sudo gedit /etc/docker/daemon.json
```

- ### Add below json to the file
```json
{
  "Log-driver": "json-log",
  "log-opts": {
    "max-size": "10m",
    "max-file": 3
  }
}
```

- ### Send a signal to docker daemon to reload configuration
```bash
sudo kill -SIGHUP $(pidof dockerd)
```

# References
- ### [Docker Logging](https://docs.docker.com/config/containers/logging/)
- ### [Logging Drivers](https://docs.docker.com/config/containers/logging/configure/)
