---
title: Aggregation Pipelines
---

## Description
- As implied by name, It allows to define a series of stages that can filter, merge and organize data which are much more powerful and precise in compare to
find command. It also allows query and combine data from multiple collections
  
## Important
- Take backup of collection as the activities contains disruptive operations

## Topics
- ### [Group Command](group)

## Activities
- ### [Duplicate Records](dup-records)


  
- ### Example Pipeline
  - `$match` - to filter on state matching 'SD'. Similar to filter parameter in find command
  - `$project` - only include city in output
  - `$limit` - limit output to 3 records  
	```bash
    var pipeline = [
        { $match: { 'location.address.state': 'SD' }  },
        { $project: { 'location.address.city': 1 }  },
        { $sort: { 'location.address.city': 1 }  },
        { $limit: 3 },
    ]
    db.theaters.aggregate(pipeline).toArray()
	```
    - ##### Response
	```json
    [
		{
			"_id" : ObjectId("59a47287cfa9a3a73e51ed07"),
			"location" : {
				"address" : {
					"city" : "Rapid City"
				}
			}
		},
		{
			"_id" : ObjectId("59a47287cfa9a3a73e51e8cf"),
			"location" : {
				"address" : {
					"city" : "Sioux Falls"
				}
			}
		},
		{
			"_id" : ObjectId("59a47287cfa9a3a73e51e9ca"),
			"location" : {
				"address" : {
					"city" : "Sioux Falls"
				}
			}
		}
	]
	```

- ### `Simple Activity` - Return top 5 movies for cast Keanu Reeves sorted by rated. Movies shall have a release date after 1986
	- `$match` - to filter on cast and year
	- `$sort` - to sort by column rated
	- `$project` - to limit the columns in output
	- `$limit` - limit output to 5 records
	  ```bash
	  var pipeline = [
		  { $match: { 'cast': 'Keanu Reeves', year: { $gte: 1986 } }  },
		  { $sort: { rated: 1 }  },
	      { $project: { cast: 1, title: 1, year: 1, genre: 1  } },  
		  { $limit: 5 },
	  ]
	  db.movies.aggregate(pipeline).toArray()
	  ```
	  - ##### Response
		```json
		[
			{
				"_id" : ObjectId("573a1399f29313caabcec633"),
				"cast" : [
					"Keanu Reeves",
					"Alex Winter",
					"William Sadler",
					"Joss Ackland"
				],
				"title" : "Bill & Ted's Bogus Journey",
				"year" : 1991
			},
			{
				"_id" : ObjectId("573a1399f29313caabcedd01"),
				"cast" : [
					"Keanu Reeves",
					"Ruocheng Ying",
					"Chris Isaak",
					"Alex Wiesendanger"
				],
				"title" : "Little Buddha",
				"year" : 1993
			},
			{
				"_id" : ObjectId("573a13b0f29313caabd34bfc"),
				"year" : 2006,
				"title" : "The Lake House",
				"cast" : [
					"Keanu Reeves",
					"Sandra Bullock",
					"Christopher Plummer",
					"Ebon Moss-Bachrach"
				]
			},
			{
				"_id" : ObjectId("573a1398f29313caabceb534"),
				"year" : 1989,
				"title" : "Bill & Ted's Excellent Adventure",
				"cast" : [
					"Keanu Reeves",
					"Alex Winter",
					"George Carlin",
					"Terry Camilleri"
				]
			},
			{
				"_id" : ObjectId("573a139af29313caabcef93b"),
				"cast" : [
					"Keanu Reeves",
					"Aitana Sènchez-Gijèn",
					"Anthony Quinn",
					"Giancarlo Giannini"
				],
				"title" : "A Walk in the Clouds",
				"year" : 1995
			}
		]
	    ```

- ### `Simple Activity` - Return top 5 movies for cast Keanu Reeves sorted by rated. Movies shall have a release date after March 1986 
	- `$match` - to filter on cast and released column (which is a date column)
	- `$sort` - to sort by column rated
	- `$project` - to limit the columns in output
	- `$limit` - limit output to 5 records
	  ```bash
	  var pipeline = [
		  { $match: { 'cast': 'Keanu Reeves', released: { $gte: new Date("1986-03-01") } }  },
		  { $sort: { rated: 1 }  },
	      { $project: { cast: 1, title: 1, released: 1, genre: 1  } },  
		  { $limit: 5 },
	  ]
	  db.movies.aggregate(pipeline).toArray()
	  ```
		- ##### Response
		  ```json
		  [
			{
				"_id" : ObjectId("573a1399f29313caabcec633"),
				"cast" : [
				"Keanu Reeves",
				"Alex Winter",
				"William Sadler",
				"Joss Ackland"
				],
				"title" : "Bill & Ted's Bogus Journey",
				"released" : ISODate("1991-07-19T00:00:00Z")
			},
			{
				"_id" : ObjectId("573a1399f29313caabcedd01"),
				"cast" : [
					"Keanu Reeves",
					"Ruocheng Ying",
					"Chris Isaak",
					"Alex Wiesendanger"
				],
				"title" : "Little Buddha",
				"released" : ISODate("1994-05-25T00:00:00Z")
			},
			{
				"_id" : ObjectId("573a13b0f29313caabd34bfc"),
				"title" : "The Lake House",
				"released" : ISODate("2006-06-16T00:00:00Z"),
				"cast" : [
					"Keanu Reeves",
					"Sandra Bullock",
					"Christopher Plummer",
					"Ebon Moss-Bachrach"
				]
			},
			{
				"_id" : ObjectId("573a1398f29313caabceb534"),
				"title" : "Bill & Ted's Excellent Adventure",
				"released" : ISODate("1989-02-17T00:00:00Z"),
				"cast" : [
					"Keanu Reeves",
					"Alex Winter",
					"George Carlin",
					"Terry Camilleri"
				]
			},
			{
				"_id" : ObjectId("573a139af29313caabcef93b"),
				"cast" : [
					"Keanu Reeves",
					"Aitana Sènchez-Gijèn",
					"Anthony Quinn",
					"Giancarlo Giannini"
				],
				"title" : "A Walk in the Clouds",
				"released" : ISODate("1995-08-11T00:00:00Z")
			}
		  ]
		  ```
