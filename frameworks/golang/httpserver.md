---
title: GoLang Http Server
description: Mux HttpListener
---

## Impportant
- ### Internally http listener functions use instant `DefaultServerMux` which is default implementation of internal struct `ServeMux`
- ### It allows only simle Urls. It doesn't support complex patterns like paramters in Url and REST patterns. Use [HttpRouter](httprouter) for that

## Listener Functions in `net/http` library
- ### Method `http.ListenAndServe` requires second argument as `Handler` Interface. The object which is passed should have that method implemented
	- #### Handler interface is as defined below	
	```golang
		type Handler interface {
			ServeHTTP(ResponseWriter, *Request)
		}
	```
- ### Method `http.HandleFunc` requires argument as `path` and a function with below signature
	- We can map different paths to different functions
	```golang
	func HandleFunc(pattern string, handler func(ResponseWriter, *Request)) { }
	```
	
## Using `http.HandleFunc`
- ### In main function you can assign route as below using `anonymous functions`
	```golang
	http.HandleFunc("/", func(writer http.ResponseWriter, r *http.Request) {
		urlFragments := strings.Split(r.URL.Path, "/")
		if urlFragments[1] == "basic" {
				w.WriteHeader(http.StatusAccepted)
				w.Write([]byte("Hello Basic world"))
			}
		}
	})
	```
	- #### Explaination
		- The above handler is bind to root `/`. Every call on default path if not matches any other route will be handled by this route
		- The response is written back only when the first argument in path is `/basic`

## Using `Server Mux`		
- ### Outside main function you can declare function
	```golang
		type ManualServerMux struct { }
		func (p *ManualServerMux) ServeHTTP(w http.ResponseWriter, req *http.Request) {
			fmt.Fprintf(w, "Your random number is: %f", rand.Float64())
			return
		}
	```
	- #### Explaination
		- We are implementing `Handler` interface in custom struct `ManualServerMux`
		- The function name should be `ServerHTTP` as this is the name of method in interface `Handler`

- ### You can pass the mux to the Listener function but cannot bind it to the path. There is another to way to do that in next section. Only one mux object can be passed to the listener function
	```golang
	mux := &ManualServerMux{}
	http.ListenAndServe(":9000", mux)
	```

- ### Using Mux for multi path handling
	```golang
		func CreateMultiMux() *http.ServeMux {
			var multiMux = http.NewServeMux()
			multiMux.HandleFunc("/randomFloat", func(w http.ResponseWriter, req *http.Request) {
				fmt.Fprintln(w, rand.Float64())
			})

			multiMux.HandleFunc("/randomInt", func(w http.ResponseWriter, req *http.Request) {
				fmt.Fprintln(w, rand.Int31())
			})

			return multiMux
		}
	```
	- #### Explaination
		- We are leveraging same mux to handle different paths
		
# Gorilla Mux
- ## Important
	- ### Path based matching
	- ### Query based matching
	- ### Domain/Subdomain based matching (CORS)
	- ### Reverse URL generation
- ### Gorilla mux provides all path parameters in single method `Vars`

## Use Multipath Routing
- ### Declare a handler function to handle multi parameters in request path
	```golang
		func MovieHandler(w http.ResponseWriter, r *http.Request){
			// mux returns all path paramters as a map
			vars := mux.Vars(r)
			w.WriteHeader(http.StatusOK)
			fmt.Fprintf(w,"Genre is: %v\n", vars["genre"])
			fmt.Fprintf(w,"Rating is: %v\n", vars["rated"])
		}
	```
	- #### Explaination
		- `mux.Vars` function returns all the paramters as a set

- ### Attach the function to the Listener and assign Gorilla mux router to Handler
	```golang
	r := mux.NewRouter()
	
	// Attach a path with Handler
	r.HandleFunc("/movies/{genre}/{rated}", MovieHandler)
	srv := &http.Server{
		Handler: r,
		Addr: ":9000",
	}

	log.Fatal(srv.ListenAndServe())
	```

## Make Reverse Mapping URL
- ### Assign a name when binding route handler to the Mux router. Taking above example
	```golang
	r.HandleFunc("/movies/{genre}/{rated}", MovieHandler).Name("movieRoute")
	```

- ### Reverse mapping url is making Url with the data
	```golang
	url, err := r.Get("movieRoute").URL("genre", "horror", "rated", "UG")
	// Prints URL /movies/horror/UG
	fmt.Printf(url.URL)
	```
	
## Subrouting with Path Prefix
- ### Define two path prefix with respective Handler functions
	```golang
	s:= r.PathPrefix("/movies").Subrouter()
	s.HandleFunc("{id}/directors", DirectorHandler)
	s.HandleFunc("{id}/details", DetailsHandler)
	```

- ### Define the sub router handler functions
	- SubRoute `/movies/{id}/directors` redirect to DirectorHandler
	- SubRoute `/movies/{id}/details` redirect to DetailsHandler
	```golang
		func DirectorHandler(w http.ResponseWriter, r *http.Request){
			w.WriteHeader(http.StatusOK)
			fmt.Fprintf(w,"This is Directors path: %v\n", mux.Vars(r)["id"])
		}

		func DetailsHandler(w http.ResponseWriter, r *http.Request){
			fmt.Fprintf(w,"This is Details path: %v\n", mux.Vars(r)["id"])
		}
	```

## Query based Path Filter
- ### Pass QueryHandler to the HandleFunc which can handle Query parameters `?title=Matrix&genre=horror`
	- #### Pass expected query parameters in `Queries` function of Router
	```golang
	r.HandleFunc("/movies", QueryHandler)
	r.Queries("title","genre")
	```

- ### Define theQuery Handler Function to print Query Parameters
	```golang
		func QueryHandler(w http.ResponseWriter, r *http.Request) {
			queryParams := r.URL.Query()
			w.WriteHeader(http.StatusOK)
			fmt.Fprintf(w, "Query Parameter: %s", queryParams["title"])
			fmt.Fprintf(w, "Query Parameter: %s", queryParams["genre"])
		}
	```
	

	