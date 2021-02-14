---
title: Github Actions
---

## Trigger Types
- ### `branch`
	```yaml
	on:
	  push:
	    branches: [ main ]
	```
- ### `multiple branches`
	```yaml
	on:
	push:
	  branches:
        - main
        - develop
	```
- ### `paths`
	- ##### Individual Paths can be specified within each/multiple branch. Any changes to the file pattern will trigger workflow

  ```yaml
  on:
  push:
	branches:
	  - main
	paths:
	  - "src/core/**/*.cs"  
  ```

- ### `manual`
	- `Inputs` - need to be entered at time of manually invoking workflow

  ```yaml
  workflow_dispatch:
    inputs:
      version:
        description: "<this will be diplayed in GitHub workflow UI>"
        required: true
  ```

