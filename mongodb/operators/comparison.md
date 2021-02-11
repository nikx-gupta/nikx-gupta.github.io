---
title: Comparison Operators
description: $eq, $gt, $gte, $in, $lt, $lte, $ne, $nin
---

## Data Preparation
- ## Collection used - 

- ### `$eq` - `Equals`
	- #### It is also an implicit operator, so we can use as below without specifying `eq`
	  ```bash
	  db.movies.find({ 'year' : 2000 }).pretty()
	  ```
	  ```bash
	  db.movies.find({ 'year' : { $eq : 2000 } }).pretty()
	  ```
	- #### if target field is array it will search the provided value in array values
	  ```bash
	  db.movies.find({ 'year' : { $eq : 2000 } }).pretty()
	  ```
	- #### .NET Core
	  ```csharp
	  var movies = await coll.FindAsync(Builders<Movie>.Filter.Eq(x => x.year, year));
	  ```
- ### `$ne` - `Not Equal to`
	- #### Default usage
	  ```bash
	  db.movies.find({ 'year' : { $ne : 2000 } }).pretty()
	  ```
	- #### .NET Core
	  ```csharp
	  var movies = coll.FindAsync(Builders<Movie>.Filter.Ne(x => x.year, year));
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
