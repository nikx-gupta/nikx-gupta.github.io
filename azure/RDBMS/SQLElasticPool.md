---
title: Azure SQL Elastic Pool
---

### Create SQL Elastic Pool {#successMsg}
- ### Create SQL Server
    ```azcli
    az sql server create -l eastus -g lab -n cloudxlabserver -u myadmin -p demo@123
    ```
   
- ### Create database instance in above SQL server
   ```azcli
   az sql db create --name service-sub-db -g lab \
      --server cloudxlabserver \
      --license-type 'LicenseIncluded' \
      -z false \
      --service-objective Basic \
      --yes
   ```
   
- ### Create Elastic Pool with above SQL Server
   ```azcli   
   az sql elastic-pool create \
      --name cloudxlabpool \
      -g lab \
      --server cloudxlabserver \
      --capacity 4 \
      --edition GeneralPurpose \
      --family Gen5
   ```

### CLI Commands {#cli}
- ### az sql
 ```shell
   Group
    az sql : Manage Azure SQL Databases and Data Warehouses.

   Subgroups:
       db                      : Manage databases.
       dw                      : Manage data warehouses.
       elastic-pool            : Manage elastic pools.
       failover-group          : Manage SQL Failover Groups.
       instance-failover-group : Manage SQL Instance Failover Groups.
       instance-pool [Preview] : Manage instance pools.
       mi                      : Manage SQL managed instances.
       midb                    : Manage SQL managed instance databases.
       server                  : Manage SQL servers.
       virtual-cluster         : Manage SQL virtual clusters.
       vm            [Preview] : Manage SQL virtual machines.
   
   Commands:
       list-usages             : Gets all subscription usage metrics in a given location.
       show-usage              : Gets a subscription usage metric.
 ```

- ### az sql server create
```shell
   az sql server create : Create a server.

   Arguments
   --admin-password -p       [Required] : The administrator login password (required for server creation).
   --admin-user -u           [Required] : Administrator username for the server. Once created it  cannot be changed.
   --name -n                 [Required] : Name of the Azure SQL server. You can configure the default using `az configure --defaults sql-server=<name>`.
   --resource-group -g       [Required] : Name of resource group. You can configure the default  group using `az configure --defaults group=<name>`.
   --assign-identity -i                 : Generate and assign an Azure Active Directory Identity for this server for use with key management services like    Azure KeyVault.
   --enable-public-network -e [Preview] : Set whether public network access to server is allowed or not. When false,only connections made through Private Links can reach this server.  
                                          Allowed values: false, true.
   
   Argument '--enable-public-network' is in preview. It may be changed/removed in a future release.
   --location -l                        : Location. Values from: `az account list-locations`. You can configure the default location using `az configure
   --defaults location=<location>`.
   --minimal-tls-version                : The minimal TLS version enforced by the sql server for inbound connections.  Allowed values: 1.0, 1.1, 1.2.
   --no-wait                            : Do not wait for the long-running operation to finish.
   
   Examples
   Create a server.
   az sql server create -l westus -g mygroup -n myserver -u myadminuser -p myadminpassword

   Create a server with disabled public network access to server.
     az sql server create -l westus -g mygroup -n myserver -u myadminuser -p myadminpassword -e
     false
```

- ### az sql database create
```shell
   Command
       az sql db create : Create a database.
           A full list of performance level options can be seen by executing `az sql db list-editions
           -a -o table -l LOCATION`.
   
   Arguments
       --name -n              [Required] : Name of the Azure SQL Database.
       --resource-group -g    [Required] : Name of resource group. You can configure the default group
                                           using `az configure --defaults group=<name>`.
       --server -s            [Required] : Name of the Azure SQL server. You can configure the default
                                           using `az configure --defaults sql-server=<name>`.
       --backup-storage-redundancy --bsr : Backup storage redundancy used to store backups. Allowed
                                           values include: Local, Zone, Geo.
       --license-type                    : The license type to apply for this database.
                                           `LicenseIncluded` if you need a license, or `BasePrice` if
                                           you have a license and are eligible for the Azure Hybrid
                                           Benefit.  Allowed values: BasePrice, LicenseIncluded.
       --max-size                        : The max storage size. If no unit is specified, defaults to
                                           bytes (B).
       --no-wait                         : Do not wait for the long-running operation to finish.
       --read-replicas                   : The number of readonly replicas to provision for the
                                           database. Only settable for Hyperscale edition.
       --read-scale                      : If enabled, connections that have application intent set to
                                           readonly in their connection string may be routed to a
                                           readonly secondary replica. This property is only settable
                                           for Premium and Business Critical databases.  Allowed
                                           values: Disabled, Enabled.
       --tags                            : Space-separated tags: key[=value] [key[=value] ...]. Use ""
                                           to clear existing tags.
       --yes -y                          : Do not prompt for confirmation.
       --zone-redundant -z               : Specifies whether to enable zone redundancy.  Allowed
                                           values: false, true.
   
   Creation Arguments
       --catalog-collation               : Collation of the metadata catalog.  Allowed values:
                                           DATABASE_DEFAULT, SQL_Latin1_General_CP1_CI_AS.
       --collation                       : The collation of the database.
       --sample-name                     : The name of the sample schema to apply when creating this
                                           database.  Allowed values: AdventureWorksLT.
   
   Performance Level (components) Arguments
       --capacity -c                     : The capacity component of the sku in integer number of DTUs
                                           or vcores.
       --edition --tier -e               : The edition component of the sku. Allowed values include:
                                           Basic, Standard, Premium, GeneralPurpose, BusinessCritical,
                                           Hyperscale.
       --family -f                       : The compute generation component of the sku (for vcore skus
                                           only). Allowed values include: Gen4, Gen5.
   
   Performance Level Arguments
       --elastic-pool                    : The name or resource id of the elastic pool to create the
                                           database in.
       --service-objective               : The service objective for the new database. For example:
                                           Basic, S0, P1, GP_Gen4_1, GP_Gen5_S_8, BC_Gen5_2,
                                           HS_Gen5_32.
   
   Serverless offering Arguments
       --auto-pause-delay                : Time in minutes after which database is automatically
                                           paused. A value of -1 means that automatic pause is
                                           disabled.
       --compute-model                   : The compute model of the database.  Allowed values:
                                           Provisioned, Serverless.
       --min-capacity                    : Minimal capacity that database will always have allocated,
                                           if not paused.
   
   Examples
       Create a Standard S0 database.
           az sql db create -g mygroup -s myserver -n mydb --service-objective S0
   
       Create a database with GeneralPurpose edition, Gen4 hardware and 1 vcore
           az sql db create -g mygroup -s myserver -n mydb -e GeneralPurpose -f Gen4 -c 1
   
       Create a database with zone redundancy enabled
           az sql db create -g mygroup -s myserver -n mydb -z
   
       Create a database with zone redundancy explicitly disabled
           az sql db create -g mygroup -s myserver -n mydb -z false
   
       Create a GeneralPurpose Gen5 2 vcore serverless database with auto pause delay of 120 minutes
           az sql db create -g mygroup -s myserver -n mydb -e GeneralPurpose -f Gen5 -c 2 --compute-
           model Serverless --auto-pause-delay 120
   
       Create a Hyperscale Gen5 2 vcore database with 2 read replicas
           az sql db create -g mygroup -s myserver -n mydb -e Hyperscale -f Gen5 -c 2 --read-replicas 2
   
       Create a GeneralPurpose database with locally redundant backup storage
           az sql db create -g mygroup -s myserver -n mydb -e GeneralPurpose --backup-storage-
           redundancy Local
```

- ### az sql elastic pool create
```shell
   az sql elastic-pool create : Create an elastic pool.
   
   Arguments
       --name -n                        [Required] : The name of the elastic pool.
       --resource-group -g              [Required] : Name of resource group. You can configure the default group using `az configure --defaults group=<name>`.
       --server -s                      [Required] : Name of the Azure SQL server. You can configure the default using `az configure --defaults sql-server=<name>`.
       --db-dtu-max --db-max-capacity --db-max-dtu : The maximum capacity (in DTUs or vcores) any one database can consume.
       --db-dtu-min --db-min-capacity --db-min-dtu : The minumum capacity (in DTUs or vcores) each database is guaranteed.
       --license-type                              : The license type to apply for this elastic pool.
                                                     Allowed values: BasePrice, LicenseIncluded.
       --max-size --storage                        : The max storage size. If no unit is specified, defaults to bytes (B).
       --no-wait                                   : Do not wait for the long-running operation to finish.
       --tags                                      : Space-separated tags: key[=value] [key[=value] 
                                                     ...]. Use "" to clear existing tags.
       --zone-redundant -z                         : Specifies whether to enable zone redundancy. 
                                                     Allowed values: false, true.
   
   Performance Level (components) Arguments
       --capacity --dtu -c                         : The capacity component of the sku in integer number of DTUs or vcores.
       --edition --tier -e                         : The edition component of the sku. 
                                                     Allowed values include: Basic, Standard, Premium, GeneralPurpose, BusinessCritical.
       --family -f                                 : The compute generation component of the sku (for vcore skus only). Allowed values include: Gen4, Gen5.
   
   Examples
       Create elastic pool with zone redundancy enabled
           az sql elastic-pool create -g mygroup -s myserver -n mypool -z
   
       Create elastic pool with zone redundancy explicitly disabled
           az sql elastic-pool create -g mygroup -s myserver -n mypool -z false
   
       Create a Standard 100 DTU elastic pool.
           az sql elastic-pool create -g mygroup -s myserver -n mydb -e Standard -c 100
   
       Create an elastic pool with GeneralPurpose edition, Gen4 hardware and 1 vcore.
           az sql elastic-pool create -g mygroup -s myserver -n mydb -e GeneralPurpose -f Gen4 -c 1
 ```
