---
title: Aggregation Pipelines
---

## Description
- As implied by name, It allows to define a series of stages that can filter, merge and organize data which are much more powerful and precise in compare to
find command. It also allows query and combine data from multiple collections
  
## Important
- Take backup of collection as the activities contains disruptive operations

## Activities
- ### `Activity` - Example Pipeline
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

