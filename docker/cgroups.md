---
title: CGroups
---

# Description
Control Groups (cgroups) provide a mechanism for easily managing and monitoring system resources, by partitioning below things across all `cgroups`
- CPU time
- System memory
- Disk Bandwidth
- Network Bandwidth
- Monitoring

# Properties of cgroup
- All cgroups are created under path `sys/fs/cgroups/<cgroup type>`
- cgroup inherit proerties from parent cgroup in hierarchical manner upto the root cgroup

# Commands  
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

# References
- ### [Red Hat](https://www.redhat.com/sysadmin/cgroups-part-one)
- ### [SysAdmin Control Groups](https://sysadmincasts.com/episodes/14-introduction-to-linux-control-groups-cgroups)
- ### [Linux Manual](https://www.man7.org/linux/man-pages/man7/cgroups.7.html)
