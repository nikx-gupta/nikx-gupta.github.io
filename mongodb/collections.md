---
title: MongoDB Collections
---

# Creating Collection
- ## Through shell
	```bash
    db.createCollection('<collectionName>', { 
        capped: <boolean>,
        size: <number>
    })
	```
    - ##### Response
      ```text
      { "ok" : 1 }
      ```
	- ##### `capped` and `size`
		- `size` field is required when `capped` is true
		- `size` can only be in multiples of `256`. It will be rounded off to next higher size limit. `Example` if provided 300 it will take size of 512
		- `size` is collective of all document sizes.
		- When `true` collection automatically purge old documents to limit the collection size at specified value of `size`
	- ##### `max`
		- `capped` needs to be `true` when `max` or `size` fields are present
		- `max` limits the no. of documents in the collection to specified value. Old documents will be purged to keep the collection size constant at this value

- ## Through Code
    - ### [Initialize Client](index)
	- ### DotNet
		```csharp
	    await client.GetDatabase("<datbase name>").CreateCollectionAsync("<collection name>");
		```
  
		
