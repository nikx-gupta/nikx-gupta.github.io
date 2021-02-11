---
title: MongoDB Queries
---

# Important
- ### Database `sample_mflix` and collection `movies` is used for all examples

# Syntax
```bash
db.<collection name>.<query function>(<query criteria>)
```
# Shell Commands
- ### Mongo shell iterates over the cursor returned from query and show first 20 results
- ### `pretty` - to print in well formatted output append `pretty()` function to end of any command
- ### To iterate cursor manually store the result of the query in variable
	```bash 
    var movies = db.movies.find({'year': 2000})
	```
- ### `next` - move to the next record in results iterations
   ```bash 
   movies.next()
   ```
- ### `hasNext` - to check whether we next record is available in the results
	```bash 
    movies.hasNext()
    ```
	- #### Response
	```text
    true
	```

# Initialize Collection
- ## DotNet
  - ### Get Collection
	```csharp
	var coll = _client.GetDatabase("sample_mflix").GetCollection<Movie>("movies")
	```
  - ### BsonDocument Serializer to Movie Class (used in advanced queries)
    ```csharp
	public static IEnumerable<T> ConvertBson<T>(this IAsyncCursor<BsonDocument> results) {
            while (results.MoveNext()) {
                foreach (BsonDocument retValue in results.Current) {
                    yield return BsonSerializer.Deserialize<T>(retValue);
                }
            }
        }
	```

# Filter Functions
- ## `find`
	- ### all documents
	  - #### Mongo Shell
		  ```bash
		  db.movies.find({}).pretty()
		  ```
	- ### with projection
	  - `projection` is used to explicitly include or exclude fields from results
	  - it is provided as second argument in the `find` function  
	  - `1`- includes the field, `0` - excludes the field
	  - the `_id` is included by default, but it can be explicitly excluded   
		- #### Mongo Shell
		    ```bash
			db.movies.find({}, {'name': 1, 'year': 1 }).pretty()
			```
- ## `distinct`
	- ### without filter
		- #### Mongo Shell
		  ```bash
		  db.movies.distinct('year')
		  ```
		- #### .NET Core
		  ```csharp
		  var movies = await coll.FindAsync(Builders<Movie>.Filter.Eq(x => x.year, year));
		  return await movies.ToListAsync();
		  ```
	- ### with filter `Example`- find distinct years, where rating was 'APPROVED'
		- #### Mongo Shell
		  ```bash
		  db.movies.distinct('year', { 'rated': 'APPROVED' })
		  ```
		- #### .NET Core
		  ```csharp
		  var movies = await coll.FindAsync(Builders<Movie>.Filter.Eq(x => x.year, year));
		  return await movies.ToListAsync();
		  ```
- ## `counting` the documents
    - ### `count`
		- ### Count doesn't scan documents instead uses metadata to count documents
	    - ### `count` can count all documents in collection without providing filter 
	       ```bash
		   db.movies.count()
		   ```
	    - ### with filter
		   ```bash
		   db.movies.count({'year': 2000 })
		   ```
	- ### `countDocuments` - cannot be used without filter
		- does not use metadata instead scan documents as per the query and hence can take long time
		- provides accurate count of documents
		- ### with filter
		   ```bash
		   db.movies.countDocuments({'year': 2000 })
		   ```
	- ### `estimatedDocumentCount` - cannot be used with filter
		- always use metadata and count all documents
		- better performance
		- ### without filter
		   ```bash
		   db.movies.estimatedDocumentCount()
		   ```

- ## `Logical Operators` - Below are the various logical operators in Mongo
    - Every Logical operator is an Array which can contain all the filters and sub logical operators
	- ### `$and` - also an implicit operator
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'year' : 2000, 'rated': 'UNRATED' }).pretty()
		  ```
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ $and: [
                             { 'year' : 2000 },
                             { 'rated': 'UNRATED' } 
                          ]}).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  (await _coll
                .FindAsync(
                        Builders<Movie>.Filter.And(
                            Builders<Movie>.Filter.Eq(x => x.year, year),
                            Builders<Movie>.Filter.Eq(x => x.rated, rating)))).ToList()
		  ```
  - ### `$or` - either of the filter satisfy condition
	  - #### Mongo Shell
	    ```bash
		db.movies.find({ $or: [
						   { 'year' : 2000 },
						   { 'rated': 'UNRATED' } 
						]}).pretty()
		```
	  - #### .NET Core
	    ```csharp
		(await _coll
			  .FindAsync(
					  Builders<Movie>.Filter.Or(
						  Builders<Movie>.Filter.Eq(x => x.year, year),
						  Builders<Movie>.Filter.Eq(x => x.rated, rating)))).ToList()
		```
  - ### `$nor` - neither of the filter satisfy condition
	  - #### Mongo Shell
	    ```bash
		db.movies.find({ $nor: [
						   { 'year' : 2000 },
						   { 'rated': 'APPROVED' } 
						]}).pretty()
		```
	  - #### .NET Core
	    ```csharp
		(await _coll
			  .FindAsync(
					  Builders<Movie>.Filter.Nor(
						  Builders<Movie>.Filter.Eq(x => x.year, year),
						  Builders<Movie>.Filter.Eq(x => x.rated, rating)))).ToList()
		```
  - ### `$not` - negate the given condition
	  - #### Mongo Shell
	    ```bash
		db.movies.find({ 'year' : { $not: { $lte : 2000 } } }).pretty()
		```
	  - #### .NET Core
	    ```csharp
		(await _coll
			  .FindAsync(
					  Builders<Movie>.Filter.Not(
						  Builders<Movie>.Filter.Eq(x => x.year, year),
						  Builders<Movie>.Filter.Eq(x => x.rated, rating)))).ToList()
		```
  - ### `$regex` - provides below filters
    - Is `Case Sensitive` by default
    - ### `contains` - implicit without any operators
	  - #### Mongo Shell
	    ```bash
		db.movies.find({ 'title' : { $regex: 'Lord of' } }, { title: 1 }).pretty()
		```
	  - #### .NET Core
		```csharp
        ```
        - ##### Response
            ```json
            {
			    "_id" : ObjectId("573a1395f29313caabce200c"),
		        "title" : "Lord of the Flies"
		    }
		    {
		        "_id" : ObjectId("573a1397f29313caabce6d21"),
		        "title" : "The Lord of the Rings"
		    }
		    {
		        "_id" : ObjectId("573a1398f29313caabce913f"),
		        "title" : "Greystoke: The Legend of Tarzan, Lord of the Apes"
		    }
		    {
		        "_id" : ObjectId("573a1399f29313caabcec0e2"),
		        "title" : "Lord of the Flies"
		    }
		    {
		        "_id" : ObjectId("573a1399f29313caabcee9db"),
		        "title" : "Phantasm III: Lord of the Dead"
		    }
		    {
		        "_id" : ObjectId("573a139af29313caabcef4a2"),
		        "title" : "Lord of Illusions"
		    }
		    {
		        "_id" : ObjectId("573a139af29313caabcf0f07"),
		        "title" : "The Lord of the Rings: The Fellowship of the Ring"
		    }
		    {
		        "_id" : ObjectId("573a139ef29313caabcfbd6a"),
		        "title" : "The Lord of the Rings: The Return of the King"
		    }
		    {
		        "_id" : ObjectId("573a139ef29313caabcfbd80"),
		        "title" : "The Lord of the Rings: The Two Towers"
		    }
		    {
		        "_id" : ObjectId("573a13aef29313caabd2dc94"),
		        "title" : "Ringers: Lord of the Fans"
		    }
		    { "_id" : ObjectId("573a13aff29313caabd3230f"), "title" : "Lord of War" }
		    {
		        "_id" : ObjectId("573a13d3f29313caabd9515c"),
		        "title" : "Lord of Darkness"
		    }
            ```
    - ### `startsWith` - start the value with `^`
	    - #### Mongo Shell
	      ```bash
		  db.movies.find({ 'title' : { $regex: '^The Lord of' } }, { title: 1 }).pretty()
		  ```
	    - #### .NET Core
	      ```csharp
          ```
    - ### `endsWith` - end the value with `$`
	    - #### Mongo Shell
	      ```bash
		  db.movies.find({ 'cast' : { $regex: 'Caprio$' } }, { title: 1 }).pretty()
		  ```
	    - #### .NET Core
	      ```csharp
	      ```
    - ### `case in-sensitive` - use the `$options` with value `i`
	    - #### Mongo Shell
	      ```bash
		  db.movies.find({ 'cast' : { $regex: 'caprio$', $options: "i" } }, { title: 1 }).pretty()
		  ```
	    - #### .NET Core
	      ```csharp
	      ```
- ## `Array Filter Operators`
  - ### `By Elements` - Search the field data that contains at least one of the provided values
	  - #### field `cast` is an array
	    ```bash
		db.movies.find({ 'cast' : 'Adam Sandler' }, { title: 1, cast: 1 }).pretty()
		```
	  - #### .NET Core
	    ```csharp
		```
  - ### `Multiple By Elements` - Search the field data that contains at least one of the provided values
	- #### field `cast` is an array
	  ```bash
	  db.movies.find({ 'cast' : 'Adam Sandler', 'cast' : 'John Turturro' }, { title: 1, cast: 1 }).pretty()
	  ```
	- #### .NET Core
	  ```csharp
	  ```
  - ### `Array By Array` - Search the field data that contains the values in exactly same order
	- #### field `languages` is an array
	  ```bash
      db.movies.find({ 'languages' : ['English', 'German'] }, { title: 1, languages: 1 }).pretty()
		
      // Different results are obtained as provided values order is changed  
      db.movies.find({ 'languages' : ['German', 'English'] }, { title: 1, languages: 1 }).pretty()
	  ```
	- #### .NET Core
	  ```csharp
	  ```
  - ### `$all` - where the value of the field contains all the elements, irrespective of order
	- #### Mongo Shell
	  ```bash
      db.movies.find({ 'languages' : { $all: ['English', 'German'] } }, { title: 1, languages: 1 }).pretty()
		
      // Same results are obtained because of $all operator  
      db.movies.find({ 'languages' : { $all: ['German', 'English'] } }, { title: 1, languages: 1 }).pretty()
	  ```
	- #### .NET Core
	  ```csharp
	  ```

- ## `Limiting & Batch Size of Result`
  - ### `limit` - limit the results as per provided value
      ```bash
	  db.movies.find({ 'languages' : 'English' }, { title: 1, languages: 1 }).limit(10).pretty()
	  ```
  - ### `batchSize` - divide the output into provided value
      - #### While batch result is returned Mongo continues to execute in background and might return the continous result without noticeable difference
      ```bash
	  db.movies.find({ 'languages' : 'English' }, { title: 1, languages: 1 }).batchSize(5).pretty()
	  ```
- ## `Skipping Documents`
	- ### `skip` - skips the provided no. of documents
	  - ##### Skip does not use index, so performance may be degraded for large results
	    ```bash
		db.movies.find({ 'languages' : 'English' }, { title: 1, languages: 1 }).skip(5).pretty()
		```
- ## `Sorting Documents`
	- ### `sort` - sorts the results as per specified fields
	  	- ##### Array field values are not sorted
	    - ##### Different fields can have different sorting orders
		- ##### default behavior is ascending
		  ```bash
		  db.movies.find({ 'languages' : 'English' }, { title: 1, languages: 1 }).sort({ 'title': 1 }).pretty()
		  ```
		- ##### change sort behaviour to descending
		  ```bash
		  db.movies.find({ 'languages' : 'English' }, { title: 1, languages: 1 }).sort({ 'title': -1 }).pretty()
		  ```

