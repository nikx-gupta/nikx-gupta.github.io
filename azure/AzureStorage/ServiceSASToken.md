---
title: SAS Token
---

### Create Access Policy
- ### Using Azure CLI
    ```azurecli
    az storage container policy create --name ReadOnly --expiry "2020-08-30T13:27:32Z" --permissions r -c datasets --account-name lab204storage `
        --account-key GuOAipkr16gZksbot2H+0NndfebPM3OuTHbzuEURn9+YvLVYGgN/qB+lDEm4lpXTjwKkFsnAd2XL5opuSLXwiQ==
    
    ```

- ### Using C#
    - ### Install nuget packages `Azure.Identity`, `Azure.Storage.Blobs`
    ```csharp
    await containerClient.SetAccessPolicyAsync(PublicAccessType.None, new List<BlobSignedIdentifier>()
                {
                    new BlobSignedIdentifier()
                    {
                        Id = "ReadOnly",
                        AccessPolicy = new BlobAccessPolicy()
                        {
                            ExpiresOn = DateTimeOffset.UtcNow.AddHours(4),
                            Permissions = "r",
                        }
                    }
                });
    ```
- ### Parameters
    - `--permissions` ::  `(a)dd`  `(c)reate`  `(d)elete` `(l)ist`  `(r)ead`  `(w)rite`
    - `Resource` ::
        - `b` : `Applied to blob and it's metadata`
        - `c` : `Applies to container and all it's blob and their metadata`
        - `bs` : `for blob snapshot only`
        - `bv` : `for versions of Blob`

- ### Create SAS Token using above Access Policy
    - ### Do not specify ExpiryDate, StartDate and Permissions. Those are inherited from Policy
    ```csharp
    BlobSasBuilder builder = new BlobSasBuilder()
            {
                BlobContainerName = _containerName,
                Identifier = "ReadOnly",
                Resource = "c",
            };
    
    var token = builder.ToSasQueryParameters(new StorageSharedKeyCredential(_accountName, _sharedKey));
    ```
