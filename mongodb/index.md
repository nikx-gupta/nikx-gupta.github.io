---
title: MongoDB Database
---

# Topics
- ## [Concepts](concepts)
- ## Database
- ## [Collections](collections)
- ## [Database Views](dbviews)  
- ## [Queries](query)
- ## [Projections](projections)  
- ## [CRUD Operation](crud)
- ## [Aggregate Operators](aggregations)
- ## [Aggregate Pipelines](pipelines)
- ## [Issues & Fixes](issues)


# Installation
- ## [Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu)
	- ###  To connect remotely change to below value in `/etc/mongod.conf`
		```text
	    net:
	      port: 27017
	      bindIp: 0.0.0.0
		```

# MongoDB Driver
- ## Connection Strings
	- ### For local database or in virtual machine (Non cluster)  
	```text
	mongodb://<localhost or Ip address>:27017    
	```
    - ### For Atlas Cloud or other externally hosted MongoDB hosted services
	```text
		mongodb+srv://user:pass@hostname:port/database_name?options
	 
	    // default port of 27017
	    mongodb://user:pass@hostname/database_name?options
	  
	    // password is prompted at connection time
	    mongodb://hostname/database_name?options --username guest 
	```
	
- ## DotNet
	- ### Install Package `MongoDB.Driver`
	- ### Initialize `MongoClient`
	```csharp
    MongoClient client = new ("<connection-string>");
	```
- ## Python
	- ### Install package `pymongo` and `DNSPython` module to leverage DNS SRV record
		```bash
	    pip install pymongo
	    pip install dnspython
		```
    - ### Python Script to create MongoClient
		```python
        from pymongo import MongoClient
		uri = "mongodb://localhost:27017"
		
		client = MongoClient(uri)
		
		# switch to mflix database
		mflix = client['sample_mflix']
		
		# get collection names
		for name in mflix.list_collection_names():
		  print('Collection Name: ' + name)
		```
	
# References
- ### [MongoDB Driver - Github](https://github.com/mongodb/mongo-csharp-driver)
- ### [MongoDB Driver Documentation](http://mongodb.github.io/mongo-csharp-driver/2.11/reference/driver/definitions/#projections)
