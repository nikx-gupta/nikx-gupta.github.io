---
title: Vagrant
---

# Installation
- ## Virtualization Driver (default Virtualbox)
  - ### [Download Virtualbox](https://www.virtualbox.org/wiki/Linux_Downloads)
	- #### Download and Save key
	  ```bash
	  curl -o vbox_key.asc https://www.virtualbox.org/download/oracle_vbox_2016.asc 	
	  ```
	- #### Add below line to `/etc/apt/sources.list` (below example is for Ubuntu 20 focal)
	  ```bash
      echo deb [arch=amd64] https://download.virtualbox.org/virtualbox/debian focal contrib | sudo tee -a /etc/apt/sources.list
      ``` 
	- #### Get Updates
	  ```bash
      sudo apt-get update
      ``` 
- ## Vagrant
	- ### Linux
		- #### [Download vagrant bin package](https://www.vagrantup.com/downloads)
	    - #### Extract on desktop or a folder location
	      ```bash
	      unzip <archive name>
	      ```
		- #### Create a symbolic link to the executable
		  - ##### In command the vagrant is extracted on Desktop
		  ```bash
	      sudo ln -s /home/nikx/Desktop/vagrant /usr/local/bin
	      ```  
