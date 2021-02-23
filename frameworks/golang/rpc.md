---
title: RPC
description: Remote Procedure call
---

## Description
- [Know About RPC](/basics/rpc)

## Create an RPC Server
- ### Declare structure which will be used to communicate between Client and server
	```golang
		type Args struct{}
		type TimeServer int64

		func (t *TimeServer) ProvideServerTime(args *Args, reply *int64) error {
			*reply = time.Now().Unix()
			return nil
		}
	```
	- #### Explaination
		- `Args` struct can be used by cllient when calling the server function
		- `reply` struct act as pointer to which client will receive the value
		
- ### Create RPC server over HTTP Handler and listen to the client 
	```golang
		// Initialize new RPC server
		timeserver := new(TimeServer)
		
		// Register RPC
		rpc.Register(timeserver)
		rpc.HandleHTTP()
		
		// Open and Listen on port 9000
		l, e := net.Listen("tcp", ":9000")
		if e != nil {
			log.Fatal("listener error:", e)
		}

		http.Serve(l, nil)
	```


## Create an RPC Client
- ### Declare same `Args` struct we declared in server and create RPC Client
	```golang
	type Args struct {
	}
	```
	
- ### Create RPC client instance on Adress and port where the server is running (in out case localhost)
	```golang
	var reply int64
	args := Args{}
	client, err := rpc.DialHTTP("tcp", "localhost:9000")
	if err != nil {
		log.Fatal("dialing:", err)
	}
	```

- ### Call RPC Server function we declared in server
	```golang
	err = client.Call("RpcServer.ProvideServerTime", args, &reply)
	if err != nil {
		log.Fatal("Receiving Error:", err)
	}

	log.Printf("%d", reply)
	```

## Run the RPC Server and Client
- ### Run RPC server
	```golang
	go run rpcserver.go
	```
	
- ### Run RPC Client
	```golang
	go run rpc.go
	```
	- #### Response Each time RPC client is executed
	```bash
	2021/02/22 10:41:23 1614019283
	```
	
## Use Gorilla RPC with HTTP JSON Server


