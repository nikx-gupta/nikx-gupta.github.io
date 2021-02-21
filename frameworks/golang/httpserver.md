---
title: GoLang Http Server
---

## Impportant
- ### Internally http listener functions use instant `DefaultServerMux` which is default implementation of internal struct `ServeMux`

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
		
	

				