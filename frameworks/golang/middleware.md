---
title: HTTP Middleware
---

## Description
- ### Middleware requires [Closure](closure) functions

## Single Middleware
- ### Declare a handler closure function. This function will wrap the actual function. We can execute code before and after the main
      handler function. Also, if we can short circuit the pipeline is required.
	```golang
		func middleware(handler http.Handler) http.Handler {
			return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
				fmt.Println("Executing middleware before request phase")
				
				// Actual Handler function
				handler.ServeHTTP(w, req)
				
				fmt.Println("Executing middleware after response phase")
			})
		}
	```

- ### Main Handler Function
	```golang
		func handlerFunc(w http.ResponseWriter, r *http.Request) {
			fmt.Println("Executing Middleware")
			w.Write([]byte("OK"))
		}
	```

- ### Get Main Handler and wrap middleware
	```golang
		mainHandler := http.HandlerFunc(handlerFunc)
		http.Handle("/", middleware(mainHandler))
		http.ListenAndServe(":9000", nil)
	```
	
## Chain Middleware
- ### Declare main Handler function
	```golang
	func mainHandler(w http.ResponseWriter, r *http.Request) {
		fmt.Println(w, "Executing Main Handler")
	}
	```
	
- ### Declare middleware function `verifyHeaderToken`, which will be the first to execute and verifies a header value. If header value not match it will
      short cirtuit the pipeline and return error
	```golang
	func verifyHeaderToken(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Validate Heaader Token and short circuit the pipeline if not present
			if r.Header.Get("x-token") == "" {
				w.Write([]byte("Token Not Present"))
				w.WriteHeader(http.StatusOK)
				return
			}

			handler.ServeHTTP(w, r)
		})
	}
	```

- ### Declare another middleware function `addTraceId`. This header will be next in chain and will add a header `x-traceId` in response headers
	```golang
	func addTraceId(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Add TraceId to the Response Header
			w.Header().Add("traceId", "testId")
			handler.ServeHTTP(w, r)
		})
	}
	```

- ### Chain the middlewares
	```golang
	handler := http.HandlerFunc(mainHandler)
	log.Fatal(http.ListenAndServe(":9000", verifyHeaderToken(addTraceId(handler))))
	```
