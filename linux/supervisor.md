---
title: Supervisor Linux
description: simple background Task scheduler
---

## Important
- ### command `supervisorctl` is used to control background daemon `supervisord`
- ### Install `supervisor`
	```bash
	sudo apt-get install -y supervisor
	```
- ### Create Configuration file `webapi.conf` for your in directory `/etc/supervisor/conf.d`
	```bash
    [supervisord]
	logfile = /tmp/supervisord.log
	
	[program:webapi]
	command = /home/nikx/src/lab-golang/golang/bin/webapi
	autostart=true
	autorestart=true
	redirect_stderr=true
	```
- ### Notify daemon to update and restart itself
	```bash
    supervisorctl reread
    supervisorctl update
	```
- ### Verify if your process is running
  ```bash
  supervisorctl
  ```
