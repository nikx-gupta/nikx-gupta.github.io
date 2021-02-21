---
title: Index
---

# Note
- All `.NET` solution currently use `.NET Core 5.0`
- All Commands/Code are editable, you can edit in place as required and copy

# Topics
- ## Containers
	- ### [Docker](docker)
	- ### [Kubernetes](kubernetes)
- ## Cloud
	- ### [Google Cloud Paltform (GCP)](gcp)
    - ### [Azure](azure)
	- ### [AWS](aws)
- ### [Hosting](hosting)
- ## Database
	- ### [MongoDb](mongodb)
	- ### [SQL](sql)
	- ### [MySQL](mysql)
- ## Virtualization
	- [Vagrant](vagrant)
- ## [DevOps](devops)
    - ### [Github Actions](github/actions)
- ## Tools
    - [OpenSSL](openssl)
  	- [Nuget](nuget)
- ## [Basics](basics)
	- ### Networking
		- ### [TCP/IP](basics/networking/TcpIp)
- ## [Languages and Frameworks](frameworks)
    - ### [C#](frameworks/csharp)
        - #### [Testing](frameworks/csharp/testing)
    - ### [AspNetCore](frameworks/aspnetcore)
	- ### [Java](frameworks/java)
	- ### [Golang](frameworks/golang)
- ## [Design Patterns](design-patterns)
  - ### [SOLID](design-patterns/solid)
- ### Setup
	- ### Interactive JMES Queries
		- Install jpterminal package from python
		  ```bash
		  pip install `jmsepath-terminal`
		  ```
		  ```azurecli
		  az role definition list --output json | jpterm
		  ```
	- ### Install Team City on Docker
		```bash
        docker run -it --name teamcity-server-instance -v /home/nikx/team-city/datadir:/data/teamcity_server/datadir -v /home/nikx/team-city/logs:/opt/teamcity/logs -p 9000:8111 jetbrains/teamcity-server
		docker run -it --name agent-01 -e SERVER_URL="http://192.168.136.129:9000/" -v /home/nikx/config:/data/teamcity_agent/conf jetbrains/teamcity-agent		
        ```

# TODO
- ### Design patterns & design principals
- ### Web api
- ### Angular 6 & above
- ### microservices
- ### Containers
- ### Dockers
- ### Kuberenets
- ### AWS
- ### GCP
- ### Devops
- ### Sql server\my sql
- ### Test frameworks like MS test, Nunit, Xunit etc. & undestanding on TDD, BDD, DDD.
- ### Commonly used tools for app monitoring (dynatrace\app dynamics), code scan (fortify scans), code coverages(Sonar qube),  etc.

## References
- [Liquid Expressions](https://shopify.github.io/liquid/)
