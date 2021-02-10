---
title: MongoDB Performance
---

## `explain` function options
- `queryPlanner` - default. prints winning plan, rejected plans
- `executionStats` - quryPlanner + detailed execution statistics
- `allPlansExecution` - executionStats + details of rejected execution plans
- syntax
	```bash
    db.movies.explain('option').aggregate()
	```
- can be used on following commands
	- remove()
	- update()
	- count()
	- aggregate()
	- distinct()
	- findAndModify()
	
## indexes
- Types of Indexes
  - `uniqe`
  - `wildcard` 
  - `text` - for string and string array fields only
  - `multikey` - fields of an array type
  - `ttl`  - puts expiry on documents so that they are deleted when time is expired
  - `sparse` - only allow documents where field value exists including null at the time of creation of index	
  - `partial` - index based on filter expression. Only allowed operators are $exists, $gt, $lte, $gte, $lt, $type, $and
  - `case-insensitive`	

- ### `createIndex` - creating an index on the collection
	- Syntax
	```bash
    db.collection.createIndex(
		{ <field name 1>: 1, <field name 2>: 1 } ,
		{ name: <optional index name>}
	)
	```
