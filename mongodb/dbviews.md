---
title: MongoDB Views
---

# Important
- ## Database `sample_mflix` and collection `movies` is used for all examples
- ## All Query commands can be used on Views. Refer [Query](query)

# Topics
- ### Syntax for Simple View with Projection
  	```bash
    db.createView("<view name>", "<collection name>", [{$project: {<field 1> :1, <field 2> :1 }}])
  	```
- ### After creation Views lists as collections when `show collections` is ran
- ## Creating a DbView
	- ### Mongo Shell
		```bash
        db.createView("short_movie_info", "movies", [{$project: {"year": 1, "title": 1, "plot": 1 }}])
		```
- ## Query
  	```bash
    db.short_movie_info.findOne()
  	```
