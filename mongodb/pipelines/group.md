---
title: MongoDB Group Command
description: Use of Group Command in Aggregation Pipeline
---

## Important
 - In group command `_id` field value is an expression and not related to _id field of document
- `_id` can be an literal, expression object, operator or field path
- you can refer the current document in group iteration by using $$ROOT

## Valid Accumulator Functions
- `$sum`
- `$avg` 
- `$add`
- `$first` - refer to first document from respective group
  ```bash
  var pipeline = [
        { 
            $group: { 
              _id: '$rated',
              "first_title": { $first: "$title" }    
            } 
        }
  ]
  ```
- `$sample` - random selection of records to reduce execution time in initial stages of building pipeline
  ```bash
  var pipeline = [
		  { $sample: { size: 100 } }
	  ]
  ```

## Group Queries  
- ## `using field path` - group movies by year
	- `$group` - group by field year
	- `$limit` - limit output to 5 records
	  ```bash
	  var pipeline = [
		  { $group: { _id: '$rated'  } }
	  ]
	  db.movies.aggregate(pipeline).toArray()
	  ```
		- ##### Response
	  ```json
	  [
			{
				"_id" : "PG"
			},
			{
				"_id" : "X"
			},
			{
				"_id" : "M"
			},
			{
				"_id" : "G"
			},
			{
				"_id" : null
			},
			{
				"_id" : "TV-PG"
			},
			{
				"_id" : "R"
			},
			{
				"_id" : "NOT RATED"
			},
			{
				"_id" : "GP"
			},
			{
				"_id" : "Approved"
			},
			{
				"_id" : "PASSED"
			},
			{
				"_id" : "NC-17"
			},
			{
				"_id" : "AO"
			},
			{
				"_id" : "UNRATED"
			},
			{
				"_id" : "TV-MA"
			},
			{
				"_id" : "APPROVED"
			},
			{
				"_id" : "OPEN"
			},
			{
				"_id" : "TV-14"
			},
			{
				"_id" : "Not Rated"
			},
			{
				"_id" : "TV-Y7"
			},
			{
				"_id" : "PG-13"
			},
			{
				"_id" : "TV-G"
			}
	  ]
	  ```

- ## `Accumulator Expressions`
	```bash
    field: { accumulator: expression }
	```
    - `field` - the field to store value for accumulator expression
	- `accumulator` - from supported list of operators like $sum
	- `expression` - field value passed to accumulator 

	- ### group by year and find how many movies are there in each year
	  - `field` - titleCount
	  - `accumulator` - $sum
	  - `expression` - 1 (means value 1 for each document will be sent to accumulator function)	
	  ```bash
	  var pipeline = [{ 
            $group: { 
                _id: '$rated',
                "titleCount": { $sum: 1 }
            }
          }
	  ]
	  db.movies.aggregate(pipeline).toArray()
	  ```
	  - ### group by year and find total comments each year
		  - `field` - totalComments
		  - `accumulator` - $sum
		  - `expression` - $num_mflix_comments (value of field of document to be sent to accumulator function)
	    ```bash
		var pipeline = [{ 
			  $group: { 
				  _id: '$rated',
				  "totalComments": { $sum: '$num_mflix_comments' }
			  }
			}
		]
		db.movies.aggregate(pipeline).toArray()
		```

## `Activity`
- ### collect grouped documents for each group key in array
	- `$match` - filter by year lte than 2000 to limit the output data
	- `$group` - group by year
	  ```bash
	  var pipeline = [
          { $match: { 'year': { $lte: 2000 } } },
          { $group: { 
                _id: '$year',
                records: { $push: "$$ROOT" }
            }
          },
          { $limit: 2 }
	  ]
	  db.movies.aggregate(pipeline).toArray()
	  ```
  
- ### find movies between 2000 and 2018 and get avg imdb rating for each genre (primary genre is first genre of field value), sort by popularity (by imdb votes) and calculate length of longest movie in each genre
	- `$match` - filter by year lte than 2000 and gte 2018 (implicit and)
	- `$group` - group by genre (first index of genre field is primary genre)
	  ```bash
	  var pipeline = [
          { $match: { 'year': { $gte: 2000 }, 'year': { $lte: 2018 } } },
          { $group: { 
                _id: { $arrayElemAt: ['$genres',0] },
                'avgRated': { $avg: '$imdb.rating' },
                'topRating': { $max: '$imdb.rating' },
                'length': { $max: '$runtime' }
            }
          },
          { $sort: { '$topRating': -1 }  
	  ]
	  db.movies.aggregate(pipeline).toArray()
	  ```
		- ##### Response
	  ```json
	  [
			{
				"_id" : "PG"
			},
			{
				"_id" : "X"
			},
			{
				"_id" : "M"
			},
			{
				"_id" : "G"
			},
			{
				"_id" : null
			},
			{
				"_id" : "TV-PG"
			},
			{
				"_id" : "R"
			},
			{
				"_id" : "NOT RATED"
			},
			{
				"_id" : "GP"
			},
			{
				"_id" : "Approved"
			},
			{
				"_id" : "PASSED"
			},
			{
				"_id" : "NC-17"
			},
			{
				"_id" : "AO"
			},
			{
				"_id" : "UNRATED"
			},
			{
				"_id" : "TV-MA"
			},
			{
				"_id" : "APPROVED"
			},
			{
				"_id" : "OPEN"
			},
			{
				"_id" : "TV-14"
			},
			{
				"_id" : "Not Rated"
			},
			{
				"_id" : "TV-Y7"
			},
			{
				"_id" : "PG-13"
			},
			{
				"_id" : "TV-G"
			}
	  ]
	  ```

