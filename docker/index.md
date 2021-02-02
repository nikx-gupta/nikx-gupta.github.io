---
title: Docker
---

# Topics
- ### [Cgroups](cgroups)
- ### [Build & launch simple Go App](SimpleApp)
- ### [Join two containers in same Network Namespace](SameNetworkNamespace)
- ### [Capture Container Kill Event](capture_sigterm)

# Commands
- ### All Running Containers
```bash
docker ps -a
```
	- ##### Response
	```text
	CONTAINER ID   IMAGE         COMMAND       CREATED        STATUS                    PORTS     NAMES
	4a25dd4a4066   ubuntu        "/bin/bash"   15 hours ago   Up 15 hours                         ubuntu
	c70ec89bf8c6   hello-world   "/hello"      15 hours ago   Exited (0) 15 hours ago             hello
	```
  
- ### All Running Container Id's
```bash
docker ps -aq
docker container ls -a
```
	- ##### Response
	```text
	4a25dd4a4066
	c70ec89bf8c6
	```
		
- ### Remove all running containers
```bash
docker rm -f $(docker ps -aq)
```

- ### To exit the container without stopping it `Ctrl+P Ctrl+Q`
  
- ### Provide Environment variables to container
```bash
docker exec -it -e VAR_NAME=VAR_VALUE <container name> /bin/sh
# echo $VAR_NAME
# exit
```
- ### Command `exec` is used to run commands in `running` container
```bash
docker exec -it <container name> /bin/sh
# echo $VAR_NAME
# exit
```
  
- ### Run two containers in same `network namespace`
```bash
docker rm -f $(docker ps -aq)
```

# Logs
- ### See `tail` logs. Needs to run again for latest logs
```bash
docker container logs --tail 5 nginx
```
- ### See continuous log stream with tail logs using `follow`
```bash
docker container logs --tail 5 --follow nginx
```
- ## Logging Drivers
	- ### `docker container logs` command is only available for `json-file` and `journald` drivers

	Driver	  |   Description
	none        |   No log output for the specific container is produced.
	json-file   |   This is the default driver. The logging information is stored in files, formatted as JSON.
	journald    |   If the journals daemon is running on the host machine, we can use this driver. It forwards logging to the journald daemon.
	syslog      |   If the syslog daemon is running on the host machine, we can configure this driver, which will forward the log messages to the syslog daemon.
	gelf        |   When using this driver, log messages are written to a Graylog Extended Log Format (GELF) endpoint. Popular examples of such endpoints are Graylog and Logstash.
	fluentd     |   Assuming that the fluentd daemon is installed on the host system, this driver writes log messages to it.

	- ### Change Logging driver
	```bash
	docker container run --name nginx -d -p:8080:80 --log-driver json-file nginx 
	```
	
# CLI Json
- ### docker inspect JSON
```json
 {
      "Id": "ab9fab7cc9614e3bee627e2239a6b757c38bd71d9434d3f59fb03e77a45d5d91",
      "Created": "2020-12-20T10:19:14.358100143Z",
      "Path": "/output",
      "Args": [],
      "State": {
        "Status": "running",
        "Running": true,
        "Paused": false,
        "Restarting": false,
        "OOMKilled": false,
        "Dead": false,
        "Pid": 3584,
        "ExitCode": 0,
        "Error": "",
        "StartedAt": "2020-12-20T10:19:14.763161035Z",
        "FinishedAt": "0001-01-01T00:00:00Z"
      },
      "Image": "sha256:7a9ea0a3158e96525b97d68b3a0836cb532f3c65e1467a7ba7c55c318d723ae3",
      "ResolvConfPath": "/var/lib/docker/containers/ab9fab7cc9614e3bee627e2239a6b757c38bd71d9434d3f59fb03e77a45d5d91/resolv.conf",
      "HostnamePath": "/var/lib/docker/containers/ab9fab7cc9614e3bee627e2239a6b757c38bd71d9434d3f59fb03e77a45d5d91/hostname",
      "HostsPath": "/var/lib/docker/containers/ab9fab7cc9614e3bee627e2239a6b757c38bd71d9434d3f59fb03e77a45d5d91/hosts",
      "LogPath": "/var/lib/docker/containers/ab9fab7cc9614e3bee627e2239a6b757c38bd71d9434d3f59fb03e77a45d5d91/ab9fab7cc9614e3bee627e2239a6b757c38bd71d9434d3f59fb03e77a45d5d91-json.log",
      "Name": "/app-01",
      "RestartCount": 0,
      "Driver": "overlay2",
      "Platform": "linux",
      "MountLabel": "",
      "ProcessLabel": "",
      "AppArmorProfile": "docker-default",
      "ExecIDs": null,
      "HostConfig": {
        "Binds": null,
        "ContainerIDFile": "",
        "LogConfig": {
          "Type": "json-file",
          "Config": {}
        },
        "NetworkMode": "default",
        "PortBindings": {
          "8080/tcp": [
            {
              "HostIp": "",
              "HostPort": "8080"
            }
          ]
        },
        "RestartPolicy": {
          "Name": "no",
          "MaximumRetryCount": 0
        },
        "AutoRemove": false,
        "VolumeDriver": "",
        "VolumesFrom": null,
        "CapAdd": null,
        "CapDrop": null,
        "CgroupnsMode": "host",
        "Dns": [],
        "DnsOptions": [],
        "DnsSearch": [],
        "ExtraHosts": null,
        "GroupAdd": null,
        "IpcMode": "private",
        "Cgroup": "",
        "Links": null,
        "OomScoreAdj": 0,
        "PidMode": "",
        "Privileged": false,
        "PublishAllPorts": false,
        "ReadonlyRootfs": false,
        "SecurityOpt": null,
        "UTSMode": "",
        "UsernsMode": "",
        "ShmSize": 67108864,
        "Runtime": "runc",
        "ConsoleSize": [
          0,
          0
        ],
        "Isolation": "",
        "CpuShares": 0,
        "Memory": 0,
        "NanoCpus": 0,
        "CgroupParent": "",
        "BlkioWeight": 0,
        "BlkioWeightDevice": [],
        "BlkioDeviceReadBps": null,
        "BlkioDeviceWriteBps": null,
        "BlkioDeviceReadIOps": null,
        "BlkioDeviceWriteIOps": null,
        "CpuPeriod": 0,
        "CpuQuota": 0,
        "CpuRealtimePeriod": 0,
        "CpuRealtimeRuntime": 0,
        "CpusetCpus": "",
        "CpusetMems": "",
        "Devices": [],
        "DeviceCgroupRules": null,
        "DeviceRequests": null,
        "KernelMemory": 0,
        "KernelMemoryTCP": 0,
        "MemoryReservation": 0,
        "MemorySwap": 0,
        "MemorySwappiness": null,
        "OomKillDisable": false,
        "PidsLimit": null,
        "Ulimits": null,
        "CpuCount": 0,
        "CpuPercent": 0,
        "IOMaximumIOps": 0,
        "IOMaximumBandwidth": 0,
        "MaskedPaths": [
          "/proc/asound",
          "/proc/acpi",
          "/proc/kcore",
          "/proc/keys",
          "/proc/latency_stats",
          "/proc/timer_list",
          "/proc/timer_stats",
          "/proc/sched_debug",
          "/proc/scsi",
          "/sys/firmware"
        ],
        "ReadonlyPaths": [
          "/proc/bus",
          "/proc/fs",
          "/proc/irq",
          "/proc/sys",
          "/proc/sysrq-trigger"
        ]
      },
      "GraphDriver": {
        "Data": {
          "LowerDir": "/var/lib/docker/overlay2/ae8e8bc4ca9a31c1dff5338444cd18e40933d89494f0aaf87cdfb4e0a41294b5-init/diff:/var/lib/docker/overlay2/5e50bfac3b136282ac1b84df4c5ea45f83142940ed52abbb3b5f31b42b798dc6/diff:/var/lib/docker/overlay2/038c5c81adbd4ad617aece1b8a69356383e5c5141a2c15857f6b3ab2a594331e/diff",
          "MergedDir": "/var/lib/docker/overlay2/ae8e8bc4ca9a31c1dff5338444cd18e40933d89494f0aaf87cdfb4e0a41294b5/merged",
          "UpperDir": "/var/lib/docker/overlay2/ae8e8bc4ca9a31c1dff5338444cd18e40933d89494f0aaf87cdfb4e0a41294b5/diff",
          "WorkDir": "/var/lib/docker/overlay2/ae8e8bc4ca9a31c1dff5338444cd18e40933d89494f0aaf87cdfb4e0a41294b5/work"
        },
        "Name": "overlay2"
      },
      "Mounts": [],
      "Config": {
        "Hostname": "ab9fab7cc961",
        "Domainname": "",
        "User": "",
        "AttachStdin": false,
        "AttachStdout": false,
        "AttachStderr": false,
        "ExposedPorts": {
          "8080/tcp": {}
        },
        "Tty": false,
        "OpenStdin": false,
        "StdinOnce": false,
        "Env": [
          "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
        ],
        "Cmd": [
          "/output"
        ],
        "Image": "app-01:v1.0",
        "Volumes": null,
        "WorkingDir": "",
        "Entrypoint": null,
        "OnBuild": null,
        "Labels": {}
      },
      "NetworkSettings": {
        "Bridge": "",
        "SandboxID": "2e424250f2e4166e8fb09f35e68807c3812256ebad06c727a2cf22753c2a81a1",
        "HairpinMode": false,
        "LinkLocalIPv6Address": "",
        "LinkLocalIPv6PrefixLen": 0,
        "Ports": {
          "8080/tcp": [
            {
              "HostIp": "0.0.0.0",
              "HostPort": "8080"
            }
          ]
        },
        "SandboxKey": "/var/run/docker/netns/2e424250f2e4",
        "SecondaryIPAddresses": null,
        "SecondaryIPv6Addresses": null,
        "EndpointID": "18b9dcdf77ca93c05bf0828c58bb6c5fb62c06709e0d2b3b69882d8184bc79ea",
        "Gateway": "172.17.0.1",
        "GlobalIPv6Address": "",
        "GlobalIPv6PrefixLen": 0,
        "IPAddress": "172.17.0.2",
        "IPPrefixLen": 16,
        "IPv6Gateway": "",
        "MacAddress": "02:42:ac:11:00:02",
        "Networks": {
          "bridge": {
            "IPAMConfig": null,
            "Links": null,
            "Aliases": null,
            "NetworkID": "e127de84a7a9bbdf40465cba63cddd657a9542e598b58c0bfbf45ea8d5b7764d",
            "EndpointID": "18b9dcdf77ca93c05bf0828c58bb6c5fb62c06709e0d2b3b69882d8184bc79ea",
            "Gateway": "172.17.0.1",
            "IPAddress": "172.17.0.2",
            "IPPrefixLen": 16,
            "IPv6Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "MacAddress": "02:42:ac:11:00:02",
            "DriverOpts": null
          }
        }
      }
  }
```
	- ##### Extract State from response
	```text
	docker container inspect -f "{{ "{{ json .State "}} }}" <container name> | jq	
	```
