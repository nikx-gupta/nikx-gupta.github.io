---
title: Technology Dashboard
---

Driver	    |   Description
none        |   No log output for the specific container is produced.
json-file   |   This is the default driver. The logging information is stored in files, formatted as JSON.
journald    |   If the journals daemon is running on the host machine, we can use this driver. It forwards logging to the journald daemon.
syslog      |   If the syslog daemon is running on the host machine, we can configure this driver, which will forward the log messages to the syslog daemon.
gelf        |   When using this driver, log messages are written to a Graylog Extended Log Format (GELF) endpoint. Popular examples of such endpoints are Graylog and Logstash.
fluentd     |   Assuming that the fluentd daemon is installed on the host system, this driver writes log messages to it.
