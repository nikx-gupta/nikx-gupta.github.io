---
title: Soft Delete
---

### Important
- ### Soft delete works for root blob and snapshots
- ### Soft delete does not afford overwrite protection for blobs in the archive tier

1. ### Create a container and upload a Blob file
    ```azurecli
    az storage container create -n softdelete --account-name lab204storage
    az storage blob upload -f films.json -n films.json --account-name lab204storage -c softdelete
    ```

2. ### Enable soft delete for uploaded blob file
    ```azurecli
    az storage blob service-properties delete-policy update --days-retained 7  --account-name lab204storage --enable true
    ```
3. ### Create Snapshot for the root file
    ```azurecli
    az storage blob snapshot -c softdelete --account-name lab204storage -n stores.json
    ```
4. ### Try Deleting the blob and receive the specified error
    ```azurecli
    az storage blob delete -c softdelete --account-name lab204storage -n stores.json 
    ```
    ![Soft_Delete](/images/SoftDelete_01.png)

5. ### Recover the blob or deleted snapshots from root blob properties

### References
- ### [Soft Delete](https://docs.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable?tabs=azure-CLI)
