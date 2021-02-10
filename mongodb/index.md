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

# Data for Learning
- ## Clone Repo [hack-mongodb]({{ page.repo }}/hack-mongodb) and Look for assets/data. Extract using 7-zip
	
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

# Mongo Shell Commands
- ##### mongorestore
	```text
	connection options:
	  -h, --host=<hostname>                                     mongodb host to connect to (setname/host1,host2
	                                                            for replica sets)
	      --port=<port>                                         server port (can also use --host hostname:port)
	
	ssl options:
	      --ssl                                                 connect to a mongod or mongos that has ssl enabled
	      --sslCAFile=<filename>                                the .pem file containing the root certificate
	                                                            chain from the certificate authority
	      --sslPEMKeyFile=<filename>                            the .pem file containing the certificate and key
	      --sslPEMKeyPassword=<password>                        the password to decrypt the sslPEMKeyFile, if
	                                                            necessary
	      --sslCRLFile=<filename>                               the .pem file containing the certificate
	                                                            revocation list
	      --sslFIPSMode                                         use FIPS mode of the installed openssl library
	      --tlsInsecure                                         bypass the validation for server's certificate
	                                                            chain and host name
	
	authentication options:
	  -u, --username=<username>                                 username for authentication
	  -p, --password=<password>                                 password for authentication
	      --authenticationDatabase=<database-name>              database that holds the user's credentials
	      --authenticationMechanism=<mechanism>                 authentication mechanism to use
	      --awsSessionToken=<aws-session-token>                 session token to authenticate via AWS IAM
	
	kerberos options:
	      --gssapiServiceName=<service-name>                    service name to use when authenticating using
	                                                            GSSAPI/Kerberos (default: mongodb)
	      --gssapiHostName=<host-name>                          hostname to use when authenticating using
	                                                            GSSAPI/Kerberos (default: <remote server's
	                                                            address>)
	
	uri options:
	      --uri=mongodb-uri                                     mongodb uri connection string
	
	namespace options:
	  -d, --db=<database-name>                                  database to use when restoring from a BSON file
	  -c, --collection=<collection-name>                        collection to use when restoring from a BSON file
	      --excludeCollection=<collection-name>                 DEPRECATED; collection to skip over during restore
	                                                            (may be specified multiple times to exclude
	                                                            additional collections)
	      --excludeCollectionsWithPrefix=<collection-prefix>    DEPRECATED; collections to skip over during
	                                                            restore that have the given prefix (may be
	                                                            specified multiple times to exclude additional
	                                                            prefixes)
	      --nsExclude=<namespace-pattern>                       exclude matching namespaces
	      --nsInclude=<namespace-pattern>                       include matching namespaces
	      --nsFrom=<namespace-pattern>                          rename matching namespaces, must have matching nsTo
	      --nsTo=<namespace-pattern>                            rename matched namespaces, must have matching
	                                                            nsFrom
	
	input options:
	      --objcheck                                            validate all objects before inserting
	      --oplogReplay                                         replay oplog for point-in-time restore
	      --oplogLimit=<seconds>[:ordinal]                      only include oplog entries before the provided
	                                                            Timestamp
	      --oplogFile=<filename>                                oplog file to use for replay of oplog
	      --archive=<filename>                                  restore dump from the specified archive file.  If
	                                                            flag is specified without a value, archive is read
	                                                            from stdin
	      --restoreDbUsersAndRoles                              restore user and role definitions for the given
	                                                            database
	      --dir=<directory-name>                                input directory, use '-' for stdin
	      --gzip                                                decompress gzipped input
	
	restore options:
	      --drop                                                drop each collection before import
	      --dryRun                                              view summary without importing anything.
	                                                            recommended with verbosity
	      --writeConcern=<write-concern>                        write concern options e.g. --writeConcern
	                                                            majority, --writeConcern '{w: 3, wtimeout: 500,
	                                                            fsync: true, j: true}'
	      --noIndexRestore                                      don't restore indexes
	      --convertLegacyIndexes                                Removes invalid index options and rewrites legacy
	                                                            option values (e.g. true becomes 1).
	      --noOptionsRestore                                    don't restore collection options
	      --keepIndexVersion                                    don't update index version
	      --maintainInsertionOrder                              restore the documents in the order of their
	                                                            appearance in the input source. By default the
	                                                            insertions will be performed in an arbitrary
	                                                            order. Setting this flag also enables the behavior
	                                                            of --stopOnError and restricts
	                                                            NumInsertionWorkersPerCollection to 1.
	  -j, --numParallelCollections=                             number of collections to restore in parallel
	      --numInsertionWorkersPerCollection=                   number of insert operations to run concurrently
	                                                            per collection
	      --stopOnError                                         halt after encountering any error during
	                                                            insertion. By default, mongorestore will attempt
	                                                            to continue through document validation and
	                                                            DuplicateKey errors, but with this option enabled,
	                                                            the tool will stop instead. A small number of
	                                                            documents may be inserted after encountering an
	                                                            error even with this option enabled; use
	                                                            --maintainInsertionOrder to halt immediately after
	                                                            an error
	      --bypassDocumentValidation                            bypass document validation
	      --preserveUUID                                        preserve original collection UUIDs (off by
	                                                            default, requires drop)
	      --fixDottedHashIndex                                  when enabled, all the hashed indexes on dotted
	                                                            fields will be created as single field ascending
	                                                            indexes on the destination	
	```

# References
- ### [MongoDB Driver - Github](https://github.com/mongodb/mongo-csharp-driver)
- ### [MongoDB Driver Documentation](http://mongodb.github.io/mongo-csharp-driver/2.11/reference/driver/definitions/#projections)
- ### [Mongo Documentation](https://docs.mongodb.com/manual/introduction/)
