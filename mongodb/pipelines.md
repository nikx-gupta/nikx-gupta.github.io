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
	```bash
    var pipeline = [
        { $match: { 'location.address.state': 'MN' }  },
        { $project: { 'location.address.city': 1 }  },
        { $sort: { 'location.address.city': 1 }  },
        { $limit: 3 },
    ]
    db.theaters.aggregate(pipeline)
	```
