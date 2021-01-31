---
title: Git Merging With Rebase
---

### Activity
1. ### Create and empty folder and init git repo
    ```bash
    git init
    touch inital.txt && git add -A
    git commit -m "initial"
    ```
2. ### Create a repository in Azure Devops and add remote origin to local repo and push
    ```bash
    git remote add origin https://cloudxlabs@dev.azure.com/cloudxlabs/lab-devops-priv/_git/lab-git-merge-rebase

    git push -u origin --all
    ```
3. ### Create a branch with name `f-rebase`. you will see master commits in new branch
    ```bash
    git checkout -b f-rebase
    git push --set-upstream origin f-rebase
    ```
4. ### Switch to master branch and push 2 files with commit format `master-{ndex}`
    ```bash
    echo 'master branch file 02 content' > master-file-02.txt && git add -A && git commit -m "master-02" && git push
    
    echo 'master branch file 03 content' > master-file-03.txt && git add -A && git commit -m "master-03" && git push
    ```
5. ### switch to `f-rebase` and create 2 commits
    ```bash
    echo 'rebase branch file 02 content' > f-rebase-file-02.txt && git add -A && git commit -m "f-rebase-02"

    echo 'rebase branch file 03 content' > f-rebase-file-03.txt && git add -A && git commit -m "f-rebase-03"
    ```
4. ### Repeat step 4 with master branch
    ```bash
    echo 'file_01 content' > file_01.txt && git add -A && git commit -m "master-1" && git push
    
    echo 'file_02 content' > file_01.txt
    git add -A && git commit -m "master-2" && git push
    ```
5. ### Switch to `f-rebase` branch and create a pull request. Complete and select `Rebase and Fast Forward`
    - All source branch commits appear first and then all target branch commits
    ![Center_200_rebase](/images/devops_git_06.png)
