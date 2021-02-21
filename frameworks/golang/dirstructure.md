---
title: Directory Structure
category: golang go
---

## Important
- ### Golang `go get` command downloads package in format `https://github.com/<user name>/<repo name>`
	- Always try to use go module to avoid any project building issues
- ### `GOPATH` should point to your current `project root` directory
	- Some IDE's support multiple paths in GOPATH like GoLand
	- you might have to change GOPATH again if you change your project root directory but GOLand can handle those things automatically
- ### Any packages installed using `go get` command will get installed in current `GOPATH` directory
- ### Its not neccessary in latest golang version to have exactly same path as module path but is advisable

## Sample Program
- ### Navigate to directory `/home/<user>/src` if not exists create 
	```bash
    mkdir -p /home/nikx/src
    cd /home/nikx/src
	```
- ### Create a folder naming your project name
	```bash
    mkdir webapi
	cd webapi
	```
- ### Initialize a go module in current directory
	- The module path does not need to match folder path but advisable to point it to the git repository path, so as when you checkin source code in repo you can get your package using that path
	
	```bash
    go mod init github.com/nikx-gupta/webapi
    cat go.md
	```
- ### It is adivsable to create the go file with the name of leaf folder. in this case `webapi`
	```bash
    touch webapi.go
	```
- ### Edit the file and add your program code
	```bash
	package main

	import (
		"fmt"
		"net/http"
		"strconv"
		"strings"
	)

	func main() {
		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			urlFragments := strings.Split(r.URL.Path, "/")
			if urlFragments[1] == "report" {
				number, _ := strconv.Atoi(strings.TrimSpace(urlFragments[2]))
				if number >= 1 && number <= 10 {
					fmt.Fprintf(w, "%q", dataprovider.Numerals[number])
				} else {
					w.WriteHeader(http.StatusBadRequest)
					w.Write([]byte("Invalid number"))
				}
			}
		})

		server := http.Server{Addr: ":8000"}
		server.ListenAndServe()
	}	    
	```
- ### Run below command to build module from inside (webapi) folder. It also verifies the structure is working correctly
	```bash
	go install github.com/nikx-gupta/webapi
	```
- ### The `exe` file will be placed in `bin` folder inside project root folder. Navigate to `/home/nikx/src/bin` in above case

	
## References
- [Go Code](https://golang.org/doc/code)
