---
title: Namespaces
---

## Description
Originated in 2002 in the 2.4.19 kernel, Namespace is an abstraction of global resources
- File System (virtualfs / unionfs)
- Network Access
- Process id (pid) or system group id's
- User id's

- ## PID Namespace
PID namespace provide isolation of different processes running inside different containers on same machine
Process might have a different PID inside container and different on host machine. Example two containers running on same machine
might have PID 1 in their respective container, but they will have unique PID on host machine.

- ## UnionFS
It allows directories of different file systems to be overlaid in a single coherent file system.
Individual file systems are called branches. Contents of the directories are seen as single merged directory.
When merging branches the priority between the branches is specified and one with the higher priority is seen in final branch.

# Activity
- ## Observe namespace structure
	- ### Pull and run simple nginx image
	```bash
    docker run -d --name nginx -p 8080:80 nginx
	```
    - ### Get the `PID` of the running container in HOST os
	```bash
    ps -af | grep nginx
	```
    - ### Get the PID namespace files
      Below commands checks the `proc` folder created with start of the container containing different namespaces
      use `PID` received from above step
	```bash
	ls -al /proc/<PID>/ns
	```
	    - ##### Response
		![Center_300](/assets/images/docker_02_pid.PNG)
			
		- ##### Output Params
			- #### `uts` 
				- Container hostname instead of host's hostname. Default value is `ContainerId`. It can be changed by providing the `-h` parameter when running the container
