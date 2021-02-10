---
title: MongoDB Projection Operators
description: Usage of $slice, $split, $concat
---

# Projection Operators
- ## `Array Projection Operators`
	- ### `array projection` - with help of `$` operator we can exclude undesired values from the array field we are searching for
		- #### Without the projection - output contains other languages as well
		  ```bash
		  db.movies.find({ 'languages' : 'English' }, { title: 1, languages: 1 }).pretty()
		  ```
		- #### With Projection - output is limited to first matching element
		  ```bash 			
		  db.movies.find({ 'languages' : 'English' }, { title: 1, 'languages.$': 1 }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  _coll.Find(Builders<Movie>.Filter.Eq(x => x.languages, new[] { "English" }))
			.Project(Builders<Movie>.Projection.Include(x => x.languages).Include(x => x.title))
			.ToCursor()
			.ConvertBson<Movie>();
		  ```
	- ### `$slice` - limit the output values of any array field
		- #### Without the `$slice` - languages field contains other languages as well
		  ```bash
		  db.movies.find({ 'languages' : 'English' }, { title: 1, languages: 1 }).pretty()
		  ```
		- #### With `$slice` - limit the languages field output to first 3 values. Note that this field is not in filter criteria
		  ```bash 			
		  db.movies.find({ 'title': 'Youth Without Youth' }, { title: 1, 'languages': { $slice: 3 } }).pretty()
		  ```
		- #### With `$slice` - negative value starts from the end of array
		  ```bash 			
		  db.movies.find({ 'rated': 'APPROVED' }, { title: 1, 'languages': { $slice: -1 } }).pretty()
		  ```
		- #### With `$slice` - two values
			- `$slice` : [`skip elements` : `elements to return after skip index`]
		  ```bash 			
		  db.movies.find({ 'rated': 'APPROVED' }, { title: 1, 'languages': { $slice: [1, 3] } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  _coll.Find(Builders<Movie>.Filter.Eq(x => x.languages, new[] { "English" }))
				.Project(Builders<Movie>.Projection.Include(x => x.languages).Include(x => x.title).Slice(x => x.languages, 3))
				.ToCursor()
				.ConvertBson<Movie>();
		  ```
	- ### `$arrayElemAt` -  access value of array at given index
		- #### get second index value of `languages` field where languages field contains `French`
		```bash
		db.movies.find({ 'languages' : 'Fench' }, { title: 1, languages: { $arrayElemAt: [ "$languages", 1] } }).pretty()
		```

- ## `$split` - Split the field value as per seperator value
	```bash
    $split: ["$<field name>", "<seperator char>"]
	```
    - ### Split the name of the user using space and store it in field `name_split`
		- `$name` is reference to the existing field in the document
	    ```bash
	    db.users.findOne({ },{
	            name_split: {
	                 $split: [ '$name', " "] 
	            } 
	        })
	    ```
	        - ##### Response
			```json
	        {
				  "_id" : ObjectId("59b99db4cfa9a34dcd7885b6"),
				  "name_split" : [
					  "Ned",
					  "Stark"
				  ]
			}
	        ```


