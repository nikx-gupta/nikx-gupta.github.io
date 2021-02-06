---
title: Need for Container Orchestration
---

# Container Interactions
- Today, the applications have distributed architecture due to which multiple components of applications are deployed in
different containers which needs to  communicate with each other. Example, backend component is backend container and frontend which
needs to retrieve data is in frontend container. It is uncommon for containers or machines to fail due to unexpected issues
So, the containers must be discoverable instead of hard coding IP address which is flexible and keeps on changing as containers 
are started and restarted.
  
# Network
- ### To ensure different containers across different machines are able to connect to each other to enable distributed systems
- ### To resolve network connectivity issues

# Storage
- ### Enabling Local or temporary on disk storage 
- ### Enable different storage types for different type of workloads
- ### Mounting of multiple disks or shared disk across different containers

# Resource Management
- ### Abstractions of resource like CPU, RAM, disk and GPU
- ### Provision to free resources in time to achieve high cluster utilization
- ### Schedule appropriate container for respective workloads
- ### Distribution of workloads across multiple containers instead of single host or physcial machine

# Failover and Recovery
- ### Enable redundancy in container, network, storage to prevent failovers due to machine errors
- ### Able to detect faults in network, machine or storage and reschedule the containers on healthy resources
- ### Make reconciliation process autonomous to ensure application is running in desired state

# Scalability
- ### Enable load balancing and replicas to distribute the traffic among several containers
- ### Support different type of load balancing rules based on performance, load etc.

# Service Exposure
- ### Enable and secure external access to the applications outside cluster network
- ### Enable TLS Termination

# Monitoring
- ### Enable logging and performance monitoring of the infrastructure and applications



