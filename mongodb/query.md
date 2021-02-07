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
	```csharp
	var coll = _client.GetDatabase("sample_mflix").GetCollection<Movie>("movies")
	```
	
# Query Functions
- ### `pretty` - to print in well formatted output append `pretty()` function to end of any command
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
- ## `Filters` - Below are the various filter operators in Mongo
	- ### `eq` - `Equals` is also an implicit operator when provided in below format
	    - if target field is array eq will search the provided value in array values
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'year' : 2000 }).pretty()
		  ```
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'year' : { $eq : 2000 } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  var movies = await coll.FindAsync(Builders<Movie>.Filter.Eq(x => x.year, year));
		  return await movies.ToListAsync();
		  ```
	- ### `ne` - `Not Equal to`
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'year' : { $ne : 2000 } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  coll.FindAsync(Builders<Movie>.Filter.Ne(x => x.year, year));
		  return await movies.ToListAsync();
		  ```
	- ### `gte` - `Greater Than or Equal to`
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'year' : { $gte : 2000 } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
          string releaseDate = "2016-01-01";  
		  coll.FindAsync(Builders<Movie>.Filter.Gte(x => x.released, DateTime.Parse(releaseDate)));
		  return await movies.ToListAsync();
		  ```
	- ### `lt` - `Less than`
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'year' : { $lt : 2000 } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
          string releaseDate = "2016-01-01";  
		  coll.FindAsync(Builders<Movie>.Filter.Lt(x => x.released, DateTime.Parse(releaseDate)));
		  return await movies.ToListAsync();
		  ```
	- ### `lte` - `Less than or Equal to`
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'year' : { $lte : 2000 } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  coll.FindAsync(Builders<Movie>.Filter.Lte(x => x.year, 2000));
		  return await movies.ToListAsync();
		  ```
	- ### `in` - `In a list of allowed values`
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'countries' : { $in : [ "China", "Hong Kong" ] } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  string coutriesCsv = "China, Hong Kong";
          coll.FindAsync(Builders<Movie>.Filter.In(x => x.countries, new[] { coutriesCsv.Split(",") }))
		  return await movies.ToListAsync();
		  ```
	- ### `nin` - `Not In a list of values including records where field does not exist`
		- #### Mongo Shell
		  ```bash
		  db.movies.find({ 'countries' : { $nin : [ "China", "Hong Kong" ] } }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  string coutriesCsv = "China, Hong Kong";
          coll.FindAsync(Builders<Movie>.Filter.In(x => x.countries, new[] { coutriesCsv.Split(",") }))
		  return await movies.ToListAsync();
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
		  db.movies.find({ $and: [ { 'year' : 2000 }, { 'rated': 'UNRATED' } ] }).pretty()
		  ```
		- #### .NET Core
		  ```csharp
		  (await _coll
                .FindAsync(
                        Builders<Movie>.Filter.And(
                            Builders<Movie>.Filter.Eq(x => x.year, year),
                            Builders<Movie>.Filter.Eq(x => x.rated, rating)))).ToList()
		  ```
    
