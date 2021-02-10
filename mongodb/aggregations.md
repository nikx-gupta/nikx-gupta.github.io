---
title: MongoDB Aggregations
description: MongoDB Update Commands Aggregation
---

# Requirements
- ## MongoDB version >= 4.2

# Description
- An aggregation pipeline consists of multiple stages of update expressions
- The output of first stage act as input for the next stage
- Pipeline supports use of field references in update expressions

# Aggregate Operators
- Below operators only can be used with update expression which are part of aggregation pipeline example `findOneAndUpdate`, `deleteOneAndUpdate`, `updateOne`
- ## `$concat` - Concat multiple fields
  - Do not mix different data types, otherwise the result value will be null `Example` - concat with string and int field with result in null 
  ```bash
  $concat: ["$<value or field reference>", "<value or field reference>"]
  ```
	- ### Concat the `rated` and `type` fields
    ```bash
    db.movies.updateOne({ },
        [{
            $project: {
	            "rating_text": {
	                 $concat: [ "$rated", "-", "$type" ] 
	            }
           } 
        }])
    ```
      - ##### Response
      ```json
          {
            "_id" : ObjectId("573a1390f29313caabcd4135"),
            "rating_text" : "UNRATED-movie"
          }
      ```
- ## `$toUpper`
  - ### change the uppercase of the field `type`
    ```bash
    db.movies.updateOne({ },
        [{
            $project: {
	            "up_movie_type": {
	                 $toUpper: "type" 
	            }
           } 
        }])
    ```
    - ##### Response
    ```json
          {
            "_id" : ObjectId("573a1390f29313caabcd4135"),
            "up_movie_type" : "TYPE"
          }
    ```
- ## `$push` - Add single element to the array field
  - ### Add new language to the `languages` field in movie with title 'selma'
    ```bash
    db.movies.updateOne({ title: 'Selma' },
        {
            $push: {
	            "languages": "Cantonese"
           } 
        }, { 'returnNewDocument': true })
    ```
    - ##### Response
    ```json
    {
          "_id" : ObjectId("573a13bdf29313caabd59893"),
          "title" : "Selma",
          "languages" : [
              "English",
              "Cantonese"]
    }
    ```
- ## `$pop` - Remove single element from the array field
  - ### `1` for removing element from top and `-1` for removing from bottom
    ```bash
    db.movies.updateOne({ title: 'Selma' },
        {
            $pop: {
	            "languages": 1
           } 
        }, { 'returnNewDocument': true })
    ```
    - ##### Response
    ```json
    {
          "_id" : ObjectId("573a13bdf29313caabd59893"),
          "title" : "Selma",
          "languages" : [
              "English",
              "Cantonese"]
    }
    ```    

- ## `$pullAll` - Remove multiple elements from the array field
  - ### Remove `English` and `German` language from languages field
    ```bash
    db.movies.updateOne({ title: 'Selma' },
        {
            $pullAll: {
	            "languages": [ "Canadian", "English" ]
           } 
        }, { 'returnNewDocument': true })
    ```

- ## `$pull` - Remove elements using filter condition from array field
  - ### Remove the edition_price record where edition is 'Standard'
    ```bash
    db.movies.findOneAndUpdate({ title: 'Selma' },
        {
            $pull: {
	         "edition_price": {
                "edition": { $regex: 'Standard' }
              }   
           } 
        }, { 'returnNewDocument': true })
    ```
- ## `$` - Update elements of array using index 
  - ### Replace All elements of genre array with value - `Action`
    ```bash
    db.movies.findOneAndUpdate({ title: 'Selma' },
        {
            $set: {
	         "genre.$[]": "Action"
           } 
        }, { 'returnNewDocument': true })
    ```
- ## `arrayFilters` - Update elements of array using array filter
  - ### Replace edition_price field value where edition is Definitive 
    ```bash
    db.movies.findOneAndUpdate({ title: 'Selma' },
        {
            $set: {
	         "edition_price.$[filterEdition]": {
                  'edition': 'Definitve',
                  'amount': 300
              }
           } 
        }, { 
          'returnNewDocument': true,
          'arrayFilters': [{'filterEdition.edition': 'Definitive' }]
     })
    ```    


- ## `$each` - Add multiple elements along with $push
  - ### Add multiple languages to the `languages` field in movie with title 'selma'
    ```bash
    db.movies.updateOne({ title: 'Selma' },
        {
            $push: {
	            "languages": {
                  $each: [ "German", "Canadian" ]
              }
           } 
        }, { 'returnNewDocument': true })
    ```
    - ##### Response
    ```json
    {
          "_id" : ObjectId("573a13bdf29313caabd59893"),
          "title" : "Selma",
          "languages" : [
              "English",
              "Cantonese",
              "German",
		      "Canadian"
            ]
    }
    ```
- ## `$addToSet` - Add unique values only to the target array field
  - ### Add multiple genres to the `genres` field in the document with title 'Centurion' where one of the genre already exist
    ```bash
    db.movies.updateOne({ title: 'Centurion' },
        {
            $addToSet: {
	            "genres": {
                  $each: [ "Horror", "Drama" ]
              }
           } 
        }, { 'returnNewDocument': true })
    ```
    - ##### Response
    ```json
    {
          "title" : "Centurion",
          "genres" : [
            "Action",
            "Adventure",
            "Drama",
            "Horror"
            ]
    }
    ```

# Activities
- ### `Activity` - Find user with email `mark_addy@gameofthron.es` and split field `name` in `users` collection and convert firstName field to upper case
  - #### Find record with email
    ```bash
    db.users.findOne({ email: 'mark_addy@gameofthron.es' })
    ```
  - #### split field name and assign to temporary field `name_split`
    ```bash
    {
      $set: { name_split: { $split: [ $name, " " ] } }
    }  
    ```
  - #### Assign split value to the fields firstName and lastName using `arrayElemAt`
    ```bash
      {
        $set: { 
          firstName: { $arrayElemAt: [ $name_split, 0 ] }, 
          lastName: { $arrayElemAt: [ $name_split, 1 ] } 
        }
      }  
    ```
  - #### Combine firstName and lastName and convert firstName to UpperCase
    ```bash
      {
        $project: { 
          fullName: {
            $concat: [ { $toUpper: firstName }, " ", $lastName ]
          } 
        }
      }  
    ```
  - #### Combine All previous commands to final projection and complete the query
    ```bash
    db.users.updateOne({ email: 'mark_addy@gameofthron.es' }, [
      {
        $set: { name_split: { $split: [ "$name", " " ] } }
      },
      {
        $set: { 
          firstName: { $arrayElemAt: [ "$name_split", 0 ] }, 
          lastName: { $arrayElemAt: [ "$name_split", 1 ] } 
        }
      },  
      {
        $project: { 
          firstName: 1,
          lastName: 1,
          fullName: {
            $concat: [ { $toUpper: "$firstName" }, " ", "$lastName" ]
          } 
        }
      }
    ])  
    ```
    - ##### Response
    ```json
      {
          "_id" : ObjectId("59b99db4cfa9a34dcd7885b7"),
          "firstName" : "Robert",
          "lastName" : "Baratheon",
          "fullName" : "ROBERT Baratheon"
      }
    ```

- ### `Activity` - Sort field values where field is an array of string for movie title 'Selma'
  ```bash
  db.movies.findOneAndUpdate(
      { title: 'Selma' },
      {
        $push: {
          languages: {
            $each: [],
            $sort: 1
          }
        }
      }
  )
  ```

- ### `Activity` - Sort field values where field is an array of objects for movie title 'Selma'
  - #### Insert a field of multiple objects
  ```bash
  db.movies.findOneAndUpdate(
      { title: 'Selma' },
      {
        $set: {
          edition_price: [
            { edition: 'Collectors', amount: 100  },
            { edition: 'Standard', amount: 200.50  },
            { edition: 'Definitve', amount: 200.60  }
          ]
        }
      }
  )
  ```
  - #### Sort the `edition_price` field by nested field `amount`
  ```bash
  db.movies.findOneAndUpdate(
      { title: 'Selma' },
      {
        $push: {
          edition_price: {
            $each: [],
            $sort: { amount: 1 }
          }
        }
      }
  )
  ```
    - ##### Response
      ```json
      {
          "edition_price" : [
              {
                  "edition" : "Definitve",
                  "amount" : 200.6
              },
              {
                  "edition" : "Standard",
                  "amount" : 200.5
              },
              {
                  "edition" : "Collectors",
                  "amount" : 100
              }
          ]
      }
      ```

