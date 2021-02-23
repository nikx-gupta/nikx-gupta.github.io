---
title: Gorilla RPC
description: RPC HTTP Server using Gorilla RPC
---

## Description
- [Know About RPC](/basics/rpc)
- [Go RPC](rpc)

## Description
- Gorilla allows creating RPC server which can response on HTTP Requests
- Supports multiple Codecs like JSON, XML data types
- Preferred when multiple type of Clients wants to connect to RPC service

## Packages Used
	```golang
		import (
			jsonparse "encoding/json"
			"github.com/gorilla/mux"
			"github.com/gorilla/rpc"
			"github.com/gorilla/rpc/json"
			"io/ioutil"
			"log"
			"net/http"
			"os"
		)
	```

## Create an Gorilla RPC HTTP Server
- ### Declare structure which will be used to communicate between Client and server
	```golang
		type RpcArgs struct {
			Title string
		}

		type Movie struct {
			Title string `"json:title,omitempty"`
			Rated string `"json:rated,omitempty"`
		}
		
		type JSONServer struct {
		}
	```
	- #### Explaination
		- `JSONServer` struct is used to register to Gorilla mux server
		- `reply` struct act as pointer to which client will receive the value
		
- ### Create RPC handler which will read local file `movies.json` and return the matching movie as per received Title
	```golang
		func (t *JSONServer) MovieDetails(r *http.Request, args *RpcArgs, reply *Movie) error {
			log.Printf("Received Title: %s", args.Title)
			var movies []Movie
			// Read JSON from request
			raw, err := ioutil.ReadFile("./movies.json")
			if err != nil {
				log.Println("error:", err)
				os.Exit(1)
			}

			// Parse Json movies data into array
			marshalmovies := jsonparse.Unmarshal(raw, &movies)
			if marshalmovies != nil {
				log.Println("error:", marshalmovies)
				os.Exit(1)
			}

			// Loop over movies
			for _, movie := range movies {
				if movie.Title == args.Title {
					log.Printf("Matching movie found %s", movie)
					*reply = movie
					break
				}
			}

			return nil
		}
	```

## Create RPC Server using Gorilla Mux
- ### Declare same `Args` struct we declared in server and create RPC Client
	```golang
	// Create a Gorilla RPC server
	s := rpc.NewServer()
	
	// Register JSON Serializer for incoming requests
	s.RegisterCodec(json.NewCodec(), "application/json")
	
	// Create a new json server which can serve requests over http
	s.RegisterService(new(JSONServer), "")
	
	// Create Mux Router and listen to the requests
	r := mux.NewRouter()
	r.Handle("/rpc", s)
	http.ListenAndServe(":9000", r)
	```


