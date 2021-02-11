---
title: FAQ
---

- ### What are possible atomic operations in MongoDB
	- An update to a single document in a replica set or sharded cluster
	- An update to multiple documents in a replica set using transactions
	- 
	
- ### Why BSON is used rather than JSON
	- It supports more data types than JSON
	- It includes metadata to describe document / object.
	
- ### Valid types in BSON
	- Apart from native data types Int64, ObjectId, ISODate
	
- ### CRUD Operations which support Write Concern
	- It applies to all write operations `update, replace and insert`
	
- ### Factors to prioritize when considering good Data Model
	- Access Patterns
	- Potential Growth of embedded documents
	
# Indexes and Performance
- ### What setting can be specified to disable journaling for replica set members sing `Wired Storage Engine`
	- Journaling cannot be disabled for replicate set members
	
- ### Wired Tiger Storage Engine Features
	- Compression of data files
	- Index prefix compression
	- Document level concurrency
	- Dedicated cache of RAM

- ### Unique Index Features
	- The unique constraint ensures no two documents can share same value for a field in two documents
	- Hashed Indexes cannot be unique
	
- ### Adding Index does impact write operations performance like updateOne, insertOne etc.

- ### Requirements for Covered Query
	- All fields used in the filter must be part of index
	- All field in results are also part of the index
	
- ### Effective Index operations
	- Case-insensitive operations generally cannot use indexes effectively
	- Operation which restrict the scope of query are more efficient Example - ^a > ^a.*
	
- ### Effective Compound Index operations
    - Compound index can contain only one hashed index field
	- A query which makes use of all keys of compound indexes or index prefixes, it will make use of existing index
	- The order of fields listed in index matters as documents are first sorted based on first index, within each value of first field sorted by second field and so on
	- Compound index can be queries for any keys which are included in index, but the performance may differ if some keys are missed. Example
		- Consider a compound index `{ "item": 1, "stock": 1 }`
			- Either of the query can leverage index `{ "item": "<value>" } = { "item": "<value>", "stock": "<value>" }`
			- Query `{ "stock": "<value>" }` cannot leverage index as primary field `item` is missing

- ### `$match` pipeline stage
	- It should be the first stage in pipeline
	- It can be used multiple times
	- Syntax similar to find command

## Sharding
- ### Advantage of having a delayed replica set member ?
	- It provides a window of time to recover from an operator error
	
- ### Settings controlled by `rs.reconfig()`
	- Priority for each replica set member
	- which replica set members are hidden
	
- ### Traits of hashed _id as shard key relative to unhashed _id
	- As ObjectId is monotonically increasing values, keeping ObjectId as Shard key will result in one shard getting all the insert operations
	- Hashing ObjectId will uniformly distribute the values and hence the operations across all shards
	- Backdrop is the queries will become less efficient as now queries have to be sent to all shards

- ### Purpose of Primary Shard
	- To hold the unsharded collections for the database

- ### Problems with low cardinality (insufficiently granular) shard key
	- large chunks that cannot be split
	- More shards getting hit on certain queries

- ### In sharded cluster which of the following indexes should contain only unique values
	- The _id index. if _id is not unique across shards the movements of document to another shard is not possible failing migration of chunk
	- The shard key index

- ### When chunk is in flight from one shard to another during migration process, where are reads to that chunk directed
	- To shard from where it is being migrated. Until the chunk is fully migrated, the sending shard will handle read operations
