---
title: Docker
---

### Topics
- ### [Build & launch simple Go App](SimpleApp)
- ### [Join two containers in same Network Namespace](SameNetworkNamespace)

### Important
- ### When a container is created `cgroup` is created as folder in `sys/fs/cgroup`. Each folder is a control group
```bash
find /sys/fs/cgroup/* -name docker -type d
```

- ### Find a `memory` cgroup for a running container. Every entry returned is a file
```bash
find /sys/fs/cgroup/memory/docker/* -type d
```
```
group.clone_children   memory.kmem.limit_in_bytes          memory.kmem.tcp.usage_in_bytes   memory.oom_control          memory.use_hierarchy
cgroup.event_control   memory.kmem.max_usage_in_bytes      memory.kmem.usage_in_bytes       memory.pressure_level       notify_on_release
cgroup.procs           memory.kmem.slabinfo                memory.limit_in_bytes            memory.soft_limit_in_bytes  tasks
memory.failcnt         memory.kmem.tcp.failcnt             memory.max_usage_in_bytes        memory.stat
memory.force_empty     memory.kmem.tcp.limit_in_bytes      memory.move_charge_at_immigrate  memory.swappiness
memory.kmem.failcnt    memory.kmem.tcp.max_usage_in_bytes  memory.numa_stat                 memory.usage_in_bytes
```

- ### Open a `memory` file for running container from above list
```bash
cat /sys/fs/cgroup/memory/docker/<container id>/memory.limit_in_bytes
```

- ### Remove all running containers
```bash
docker rm -f $(docker ps -aq)
```

- ### Run two containers in same `network namespace`
```bash
docker rm -f $(docker ps -aq)
```

### CLI Commands {#cli}

- ### docker inspect response
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
