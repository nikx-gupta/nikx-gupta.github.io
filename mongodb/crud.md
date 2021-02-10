---
title: MongoDB CRUD Operations
description: 
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
- ## `deleteMany` - Delete many documents
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
        - ### use `returnNewDocument` to return the updated document instead of default old one    
		  ```bash
		  db.new_movies.findOneAndUpdate({ 'title': { $regex: '^Iron Man' } }, { $set: { 'rating': 9.4 } }, { 'returnNewDocument': true })
		  ```
	- ### using `updateMany` - update first document from filter condition
	```bash
    db.new_movies.updateMany({ 'title': { $regex: '^Avenger' } }, { $set: { 'viewer.comments': 30 } })
    ```
    - ### multiple operators
    ```bash
    db.new_movies.updateMany({ 'title': { $regex: '^Avenger' } }, {
                 $set: { 'viewer.comments': 30 }, 
                 $set: { 'rating': 5.6 } 
        })
    ```
- ## `$inc` - Increment/decrement the numeric field value
	- `positive` number for increment and `negative` number for decrement
	- ### Increment the rating by 1 and comments by 2, if both field does not exist it will set the value as 1 and 2
	```bash
    db.movies.updateOne({ 'title': { $regex: 'Macbeth' } }, { $inc: { 'viewer.comments': 2, 'rating': 1 } })
	```
	- ### Decrement the rating by 2 and comments by 1, if both field does not exist it will set the value as 2 and 1
	```bash
    db.movies.updateOne({ 'title': { $regex: 'Macbeth' } }, { $inc: { 'viewer.comments': -1, 'rating': -2 } })
    ```
- ## `$mul` - Multiply the numeric field value
	- if target field does not exist it will set the value to zero because of initial value being null
	- ### Decrement the rating by 2 and comments by 1, if both field does not exist it will set the value as 2 and 1
    ```bash
    db.movies.updateOne({ 'title': { $regex: 'Macbeth' } }, { $mul: { 'viewer.comments': 2, 'rating': 3 } })
    ```
- ## `$rename` - Multiply the numeric field value
	- ### rename the existing field with a new name which also does not exist in document
		- #### rename title '3-Iron' field `rated` with `public_rating`
	    ```bash
	    db.movies.updateOne({ 'title': '3-Iron' } , { $rename: { 'rated': 'public_rating' } })
	    ```
	- ### if target field does not exist command will ignore the field
		- #### title '3-Iron' does not have a field rating so below command will have no effect
	    ```bash
	    db.movies.updateOne({ 'title': '3-Iron' } , { $rename: { 'rating': 'new_rating' } })
	    ```
	- ### if target field name exist in document, it will be removed
		- #### title '3-Iron' already has a field name `rated`, we will rename `metaritic` to `rated`.
	    ```bash
	    db.movies.findOneAndUpdate({ 'title': '3-Iron' } , { $rename: { 'metacritic': 'rated' } }, { 'returnNewDocument': true })
	    ```
            - ##### Response
			```json
			{
				  "_id" : ObjectId("573a13b1f29313caabd37f06"),
				  "title" : "3-Iron",
				  "rated" : 72
			}
            ```
- ## `$currentDate` - set value of field as current date or timestamp
	- ### set the audit fields in the document
		- #### value of `true` assign the `created_date` as `Date`
	    ```bash
	    db.movies.updateOne({ 'title': 'The Matrix' } , 
            { $currentDate: { 
                    'created_date': true,
                 } 
            })
	    ```
	        - ##### Response
		    ```json
		    {
				  "_id" : ObjectId("573a139bf29313caabcf3d23"),
				  "title" : "The Matrix",
				  "created_date" : ISODate("2021-02-09T04:33:36.360Z")
	        }
	  		```
		- #### `$type` operator can be used to assign value as `date` or `timestamp`
	    ```bash
	    db.movies.updateOne({ 'title': 'The Matrix' } , 
            { $currentDate: { 
                    'modified_date': { $type: "date" },
                    'modified_timestamp': { $type: "timestamp" }
                 } 
            })
	    ```
	        - ##### Response
	      ```json
	      {
	  		  "_id" : ObjectId("573a139bf29313caabcf3d23"),
			  "title" : "The Matrix",
			  "created_date" : ISODate("2021-02-09T04:33:36.360Z"),
			  "modified_date" : ISODate("2021-02-09T04:39:47.481Z"),
			  "modified_timestamp" : Timestamp(1612845587, 1)
          }
	      ```
- ## `$unset` - removes the field from document
	- ### remove the fields `tomatoes.critic` and `tomatoes.consenus` from document where title is `The Matrix`
		- #### the value can be null or anything as this has no effect on the operation
	```bash
	db.movies.updateOne({ 'title': 'The Matrix' } , 
        { $unset: { 
            'tomatoes.critic': '',
            'tomatoes.consensus': 'something'
            } 
        })
	```
