---
title: Using Delegation Key
---

### Important
- User Delegation Key only works with Azure Blob Storage and not GeneralPurposev1 or v2
- Assign Appropriate permissions
   - Owner
   - Contributor
   - Storage Account Contributor
   - Storage Blob Data Contributor
   - Storage Blob Data Owner
   - Storage Blob Data Reader
   - Storage Blob Delegator

### Generate user Delegation Key

- ### Using Azure CLI
```azurecli
az storage container generate-sas --account-name "lab204storage" --name "testlifetier" `
    --permissions "acdlrw" --expiry "2020-08-26T13:27:32Z" --auth-mode "login" --as-user
```

- ### Using C#
    > Install nuget packages `Azure.Identity`, `Azure.Storage.Blobs`

    ```csharp
    // Construct the blob endpoint from the account name.
    string blobEndpoint = string.Format("https://{0}.blob.core.windows.net", accountName);

    // Create a new Blob service client with Azure AD credentials.  
    BlobServiceClient blobClient = new BlobServiceClient(new Uri(blobEndpoint), new DefaultAzureCredential());

    // Get a user delegation key for the Blob service that's valid for 1 hour.
    // You can use the key to generate any number of shared access signatures over the lifetime of the key.
    UserDelegationKey key = await blobClient.GetUserDelegationKeyAsync(DateTimeOffset.UtcNow,
                                                                    DateTimeOffset.UtcNow.AddHours(1));

    // Create a SAS token that's valid for one hour.
    BlobSasBuilder sasBuilder = new BlobSasBuilder()
    {
        BlobContainerName = containerName,
        BlobName = blobName,
        Resource = "b",
        StartsOn = DateTimeOffset.UtcNow,
        ExpiresOn = DateTimeOffset.UtcNow.AddHours(1)
    };

    // Specify read permissions for the SAS.
    sasBuilder.SetPermissions(BlobSasPermissions.Read);

    // Use the key to get the SAS token.
    string sasToken = sasBuilder.ToSasQueryParameters(key, accountName).ToString();
    ```
- ### Parameters
    - `--permissions` ::  `(a)dd`  `(c)reate`  `(d)elete` `(l)ist`  `(r)ead`  `(w)rite`
    - `Resource` ::
        - `b` : `Applied to blob and it's metadata`
        - `c` : `Applies to container and all it's blob and their metadata`
        - `bs` : `for blob snapshot only`
        - `bv` : `for versions of Blob`

- ### Response Format
    ```text    
        "se=2020-08-26T13%3A27%3A32Z&sp=racwdl&sv=2018-11-09&sr=c&skoid=b428cc59-5962-4c3a-9fa9-3103fde6c169&sktid=5a9a6394-2cfe-49b3-87a2-b055b3729b46&skt=2020-08-26T08%3A21%3A59Z&ske=2020-08-26T13%3A27%3A32Z&sks=b&skv=2018-11-09&sig=GsvP9JI4Gdd0dJrEswHSvqgZp8e%2BsijPXhI5YPNm1kA%3D"
    ```
- ### Read Blob using SAS Token ([Complete Code](src/Az.Storage/UserDelegationKeyDemo.cs))
```csharp
    // Create a blob client object for blob operations without Identity.
    BlobClient blobClient = new BlobClient(sasUri.Uri, null);

    // Download blob contents to a stream and read the stream.
    BlobDownloadInfo blobDownloadInfo = await blobClient.DownloadAsync();
```

- ### Possible Container Permissions
    ![ContainerPermission](/images/Storage_SAS_Delegation_01.png)

- ### Possible Blob Permissions
    ![BlobPermission](/images/Storage_SAS_Delegation_02.png)
