---
title: Logging
---

## Logging using Middleware
- #### Use Package `github.com/gorilla/handlers`. gorilla has inbuilt middlewares for many utilities. 
- ### Declare mux router and add Main handler function
	```golang
	func logMainHandler(w http.ResponseWriter, r *http.Request) {
		log.Println("Processing Main Handler")
		w.Write([]byte("OK"))
		log.Println("Request Completed")
	}

	func main() {
		r := mux.NewRouter()
		r.HandleFunc("/", mainHandler)
	}
	```
- ### Create instance of Logging middleware and pass it to the Listener function. middleware will internally wrap router middlewares
	```golang
		logMiddleware := handlers.LoggingHandler(os.Stdout, r)
		http.ListenAndServe(":9000", logMiddleware)
	```
	- #### Response
	```bash
	{0xc0000c6370 0xc0000c6370 0xc0000c6370 0xc0000c6370 0xc0000c6370} Executing Main Handler
	192.168.29.155 - - [22/Feb/2021:08:14:43 -0800] "GET / HTTP/1.1" 200 0
	{0xc000100050 0xc000100050 0xc000100050 0xc000100050 0xc000100050} Executing Main Handler
	192.168.29.155 - - [22/Feb/2021:08:14:49 -0800] "GET / HTTP/1.1" 200 0
	```
