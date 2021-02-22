---
title: Closure Functions
---

## Important
- ### Closure function has two parts. Outer function and Inner function
- ### Outer function returns the inner function whenever Outer function is called
- ### Inner function captures the variables in scope of it's outer function which are used by inner function.
- ### These captured variables retains its value on multiple calls of same instance of function

## Run Closure Function
- ### Declare a closure Function
	- Here `NumGenFunc` is outer function and it is returning inner anonymous function. Here inner anonymous function is `closure` function
	```golang
		func NumGenFunc() func() int {
			var i = 0
			return func() int {
				i++
				return i
			}
		}
	```
- ### Create instance of closure function in main
	```golang
		numgen := NumGenFunc()
		for i := 0; i < 5; i++ {
			fmt.Print(numgen(), "\t")
		}
	```
	- #### Response
	```bash
	1 2 3 4 5
	```
	- #### Explain
		- Value is incrementing instead of 0 because of feature of closure function
		- When the instance of a closure function is created it it captured the variable `int i` declared in outer scope
		- As we are calling the same instance `numgen` of Outerfunc again the function which was returned retains its value for
		  subsequent calls


## Two instances of Closure function	are independent of each other 
- ### Create two instances of function we declared previously 
	```golang
		numgen1 := NumGenFunc()
		numgen2 := NumGenFunc()
		for i := 0; i < 5; i++ {
			fmt.Print("first function - ", numgen1(), "\t")
			fmt.Print("second function - ", numgen2(), "\n")
		}
	```
	- #### Response
	```bash
	first function - 1      second function - 1
	first function - 2      second function - 2
	first function - 3      second function - 3
	first function - 4      second function - 4
	first function - 5      second function - 5
	```
	
