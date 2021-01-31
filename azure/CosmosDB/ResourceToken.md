---
title: Resource Token
---

### Important
- Using Resource Token end user can access the MongoDB directly as per `resource token permissions`

### Using Resource Token (SQL API) {#notes}
- ### Create CosmosDb SQL account - [Command Ref](index)
```azcli
az cosmosdb create -g lab -n cloudxlabsql --enable-free-tier true
```

- ### Create mongodb database in above cosmos account
```azcli
az cosmosdb mongodb database create --account-name cloudxlabsql -g lab -n inserttest
```

- ### Create a container in above database
```azcli
 az cosmosdb sql container create --account-name cloudxlabsql --database-name subscriptions -n testContainer
```

- ### Create User with `Read Permission` on above Container using DotNetSdk
    - ### Install Package Microsoft.Azure.Cosmos
    - ### Create Cosmos Client and add User
      ```csharp
      var client = new CosmosClient("https://cloudxlabsql.documents.azure.com:443", <primary key>);
      var db = client.GetDatabase("subscriptions");
      var user = db.CreateUserAsync("testUser");
      var container = client.GetContainer(db.Id, "testContainer");
      await user.CreatePermissionAsync(new PermissionProperties("read", PermissionMode.Read, container))
      
      // With Optional Expiry for short lived tokens (in seconds)
      await user.CreatePermissionAsync(new PermissionProperties("read", PermissionMode.Read, container), TimeSpan.FromMinutes(5).Seconds);
      ```
    - ### Permission Response
        ```json
        {
          "permission": {
          "id": "read"
          },
          "headers": [
          "Cache-Control",
          "Pragma",
          "Transfer-Encoding",
          "Server",
          "Strict-Transport-Security",
          "x-ms-activity-id",
          "x-ms-last-state-change-utc",
          "ETag",
          "x-ms-resource-quota",
          "x-ms-resource-usage",
          "x-ms-schemaversion",
          "lsn",
          "x-ms-request-charge",
          "x-ms-alt-content-path",
          "x-ms-content-path",
          "x-ms-quorum-acked-lsn",
          "x-ms-current-write-quorum",
          "x-ms-current-replica-set-size",
          "x-ms-xp-role",
          "x-ms-global-Committed-lsn",
          "x-ms-number-of-read-regions",
          "x-ms-transport-request-id",
          "x-ms-cosmos-llsn",
          "x-ms-cosmos-quorum-acked-llsn",
          "x-ms-session-token",
          "x-ms-request-duration-ms",
          "x-ms-serviceversion",
          "x-ms-gatewayversion",
          "Date",
          "Content-Type"
          ],
          "resource": {
          "id": "read",
          "resourceUri": "dbs/subscriptions/colls/testContainer",
          "resourcePartitionKey": null,
          "permissionMode": 1,
          "token": "type=resource&ver=1&sig=XZOjNNFujFt2L1NHk3cc2w==;Z3DkOPLbJJV9CrvQMAuzEoJ+4ifsWBprzH73043rOw9WgrBa/o0CZleVe3qs1dKocOhHw/t8t74e3Ren46phuBFXPBnl5/JBPyV4cqFMWXBhyGcq3YcmWJIpZsunQYRPWbbVMD+mhpo2Xi2fa60vHXGhy7UaV7OaWzKl9bO2Moj1QDbCqbQsKcwmS6qhx8P16bWQwnuicCtuFnCbwtIx8Q==;",
          "eTag": "\"0000a400-0000-0100-0000-5fd5ee5a0000\"",
          "lastModified": "2020-12-13T10:35:06Z",
          "selfLink": "dbs/5gsyAA==/users/5gsyAExBMAA=/permissions/5gsyAExBMACFaCY5tI5qAA==/"
          },
          "statusCode": 201,
          "diagnostics": {},
          "requestCharge": 4.95,
          "activityId": "a5d0d592-147a-42fd-9351-8f061956a273",
          "eTag": "\"0000a400-0000-0100-0000-5fd5ee5a0000\""
        }
        ```
  
- ### [Create Resource Token](https://docs.microsoft.com/en-us/azure/cosmos-db/secure-access-to-data#resource-tokens)
