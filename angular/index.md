---
title: Hosting Angular App in Docker using Nginx
---

### Index
- ### Install Angular CLI
  ```sh
  npm install -g @angular/cli
  ```

- ### Build Angular app
  ```sh
  ng build --prod
  ```

- ### Download docker Nginx image
  ```sh
  docker pull nginx
  ```

- ### Host Angular App using local mount for verification
  ```sh
  docker run --name nginx-ang -d -p 81:80 -v /home/nikx/src/cmi/ui/dist:/usr/share/nginx/html:ro nginx
  ```
