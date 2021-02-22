---
title: GoLang Http Router
---

## Important
- Library ***github.com/julienschmidt/httprouter***
- ### Supports
	- Variables & parameters in Route Path
	- REST Verb matches (GET, PUT, POST etc.)
	- Serve static content

## Use Router with Params
- ### Declare `GET` routes using `httprouter`
	```golang
		router := httprouter.New()
		router.GET("/api/v1/randomInt", func(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
			fmt.Fprintf(writer, "%f", rand.Float64())
		})
		router.GET("/api/v1/randomInt/:name", func(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
			fmt.Fprintf(writer, "the param is %s", params.ByName("name"))
		})
	```
- ### Bind the router to the Listener
	```golang
	http.ListenAndServe(":9000", router)
	```

## Serve the Static Content
- ### Declare `static` route
	```golang
		router := httprouter.New()
		router.ServeFiles("/static/*filepath", http.Dir("/Users/nikx/static"))
	```
	- #### Explaination
		- It require two arguments
			- First is request path `/static/*filepath`. It should always ends with `/*filepath`
			- Second is the absolute physical directory path

