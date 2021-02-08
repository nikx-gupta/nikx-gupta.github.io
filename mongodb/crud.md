---
title: MongoDB CRUD Operations
description: MongoDB Create/Insert/Update/Upsert/Delete Functions
---

# Inserting Documents
- ## `insert` - Insert simple document
    - #### Inserting document without id will create `auto-generated` id from mongo driver
	```bash
    db.new_movies.insert({ 'title': 'Criminal without Id' })
    ```
    - #### `new ObjectId()` creates a unique value of type ObjectId
	```bash
    db.new_movies.insert({ '_id': new ObjectId(), 'title': 'Criminal' })
	```
- ## `insertMany` - Insert many documents
  ```bash
  db.new_movies.insertMany([
	        { '_id': new ObjectId(), 'title': 'Avenger - Age of Ultron' },
	        { '_id': new ObjectId(), 'title': 'Avenger 1' }
        ])
  ```
  - ### while inserting documents if any error is generated the documents prior to that error will remain inserted
	- Trying to insert duplicate record will generate an error in 3rd document, but the first two documents get inserted 
	```bash
    db.new_movies.insertMany([
            { '_id': 1, 'title': 'Record-1' },
            { '_id': 2, 'title': 'Record-2' },
            { '_id': 2, 'title': 'Duplicate-Record-2' }
        ])
    ```
    - ##### Response
	```json
    [{
		"writeErrors" : [
			{
				"index" : 2,
				"code" : 11000,
				"errmsg" : "E11000 duplicate key error collection: sample_mflix.new_movies index: _id_ dup key: { _id: 2.0 }",
				"op" : {
					"_id" : 2,
					"title" : "Duplicate-Record-2"
				}
			}
		],
		"writeConcernErrors" : [ ],
		"nInserted" : 2,
		"nUpserted" : 0,
		"nMatched" : 0,
		"nModified" : 0,
		"nRemoved" : 0,
		"upserted" : [ ]
	}]
	```

# Deleting Documents
- Delete commands support filter
- ## `deleteOne` - Delete single document
  ```bash
  db.new_movies.deleteOne({ 'title': 'Criminal' })
  ```
- ## `deleteMany` - Insert many documents
	- Deletes all the documents where title starts with Avenger
  ```bash
  db.new_movies.deleteMany({ 'title': { $regex: '^Avenger' } })
  ```
- ## `findOneAndDelete` - Find and delete the first document
	- It returns the deleted document which can be useful in some use cases
  ```bash
  db.new_movies.deleteMany({ 'title': { $regex: '^Avenger' } })
  ```

# Replacing Documents
- Replace command first Argument is filter and second argument is replacement document
- ## `replaceOne` - Replace first document as result of filter.
	- No existing document fields will be retained and get replaced by new document
  ```bash
  db.new_movies.replaceOne({ '_id': 1 }, { 'title': 'Record-1', 'new_field': 'new_value_1' })
  ```

# Upsert Documents
- Replace or insert if document does not exist
- ## `replaceOne`
  - add `upsert: true` to the command to make it as upsert
  ```bash
  db.new_movies.replaceOne({ '_id': 10 }, { 'title': 'Record-Upsert', 'new_field': 'new_value_1' }, { upsert: true })
  ```

# Update Documents
- Updates the document instead of replacing. If new fields are present they are added to the existing document and if existing fields are provided
  their values are updated.
- If provided field value is same as old no document changes are done  
  ```bash
  db.collection.updateOne(<query condition>, <update expression>, <options>)
  ```
- ## `$set`
	- ### using `updateOne` - update first document from filter condition
	```bash
    db.new_movies.insert({ 'title': 'Avenger 1', 'rating': 7.2 })
    db.new_movies.updateOne({ 'title': 'Avenger 1' }, { $set: { 'rating': 9 } })
	```
	- ## `findOneAndUpdate` - Find and delete the first document
		- It returns the updated document which can be useful in some use cases
	  ```bash
	  db.new_movies.findOneAndUpdate({ 'title': { $regex: '^Avenger' } }, { $set: { 'rating': 10 }})
	  ```
        - ### Return the updated document instead of default old one    
		  ```bash
		  db.new_movies.findOneAndUpdate({ 'title': { $regex: '^Iron Man' } }, { $set: { 'rating': 9.4 } }, { 'returnNewDocument': true })
		  ```
	- ### using `updateMany` - update first document from filter condition
	```bash
    db.new_movies.updateMany({ 'title': { $regex: '^Avenger' } }, { $set: { 'viewer.comments': 30 } })
    ```
    
