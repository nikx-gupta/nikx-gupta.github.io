---
title: Git Repo
---

### Important
- Git Url format
    - https://{organization}@dev.azure.com/{organization}/{teamProject}/_git/{repository}

### Index
- ### Branching

### Notes
- ### Access Git Repo
    - Git url in format    
    ```bash
    git clone https://cloudxlabs@dev.azure.com/cloudxlabs/lab-devops-priv/_git/{repository}
    ```

- ### Branching Strategy
    - **GitHub flow**
        - `master` as release branch. multiple feature branches finally merge into release branch and master is deployed.
        ![Center_500_gitflow](/images/devops_git_01.png)
    - **GitFlow**
        - `develop` is updated from `master` for new version. multiple feature branches derive from `develop` and merged back for integration testing. for release, a new release branch is created from `develop` branch where final testing and bugfixes are done. al changes are released and merged back int develop.
        ![Center_500_gitflow](/images/devops_git_02.png)
    - [**Release Flow**](https://docs.microsoft.com/en-us/azure/devops/learn/devops-at-microsoft/release-flow#:~:text=The%20Release%20Flow%20model%20is,our%20developers%20can%20keep%20working)

- ### Merging
    - **Merge Commit**
        - Show all individual commits from source branch into target branch after merging. Pollution of target branch if many commits
            ![Center_500_merge](/images/devops_git_03.png)
    - **Squash Commit**
        - Combine and show merge as single commit into target branch. Loose individual tracking
            ![Center_500_squash](/images/devops_git_04.png)
    - [**Rebase**](GitMergeRebase)
        - Commits in target branch is merged first to the source branch and then all commits from target branch are re-applied
            ![Center_500_rebase](/images/devops_git_05.png)
