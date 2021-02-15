---
title: Index
---

# Note
- All `.NET` solution currently use `.NET Core 5.0`
- All Commands/Code are editable, you can edit in place as required and copy

# Topics
- ### [Docker](docker)
- ### [Kubernetes](kubernetes)
- ## Cloud
	- ### [Google Cloud Paltform (GCP)](gcp)
    - ### [Azure](azure)
- ### [Hosting](hosting)
- ## Database
	- ### [MongoDb](mongodb)
- ## Virtualization
	- [Vagrant](vagrant)
- ## CICD Tools
    - ### [Github Actions](github/actions)
- ## Tools
    - [OpenSSL](openssl)
  	- [Nuget](nuget)
- ## [Basics](basics)
	- ### Networking
		- ### [TCP/IP](basics/networking/TcpIp)
- ### [Languages and Frameworks](frameworks)
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
Design patterns & design principals
C#
Asp.net MVC
Web api
Angular 6 & above
Asp.net core
microservices
Containers
Dockers
Kuberenets
Azure
AWS
GCP
Devops
Sql server\my sql
Test frameworks like MS test, Nunit, Xunit etc. & undestanding on TDD, BDD, DDD.
Commonly used tools for app monitoring (dynatrace\app dynamics), code scan (fortify scans), code coverages(Sonar qube),  etc.

## References
- [Liquid Expressions](https://shopify.github.io/liquid/)
