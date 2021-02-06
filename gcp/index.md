---
title: Google Cloud Platform (GCP)
---

# Topics
- ## [Gmail API](gmail)

# Setup
- ## Create Credentials File for API Authentication
	- ### [Navigate to Console](https://console.cloud.google.com/)
	- ### Create Project (Either of below two ways)
		- #### Create Organization (Only available for Google Workspace)
		    - ##### ***In Progress***
		- #### Create Project without Organization
			![Center_200](/assets/images/gcp_01.PNG)
		  
            ![Center_200](/assets/images/gcp_02.PNG)
	- ### Navigate to API Services Dashboard
		![Center_200](/assets/images/gcp_03.PNG)
	- ### Click `Enable APIS AND SERVICES` and add required API
	- ### Select Credentials on left menu and click `+ Create Credentials` on page and select `OAuth Client ID`
		- ### `OAuth Client ID` - When needs to be consumed from service on which require Interactive consent from user 
		- ### `Service Account` - When using in cloud
	- ### Select Application Type and Save. This Name is important as it will be used when consuming the Client SDK
	- ### Select `OAuth Consent Screen` from left Menu
		- ### Provide `App Name` and other required fields.
			- #### For normal API access `Authorized Domains` can have any value
		- ### Click on `Save and Continue`
		- ### Add or Remove Required Scopes for corresponding API's you have enabled previously.
			- #### Until you have enabled API you will not be able to add scope
		- ### Click on `Save and Continue` and add current user in `Test Users`
- ## Code for Consuming SDK
  - ### Download and save credentials created in above steps. Example `client_secret.json`
  - ### Add respective SDK libraries for the language
  - ### .NET Core
    - #### Example Package Name `Google.Apis`, `Google.Apis.Gmail.v1`
    - #### First time running this code will open a browser to provide consent for the user
		```csharp
	    string[] Scopes = new[] { GmailService.Scope.MailGoogleCom, DriveService.Scope.Drive };
	    UserCredential credential;
	
	    using (var stream = new FileStream("client_secret.json", FileMode.Open, FileAccess.Read)) {
	        // The file token.json stores the user's access and refresh tokens, and is created
	        // automatically when the authorization flow completes for the first time.
	        string credPath = "token.json";
	        credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
	            GoogleClientSecrets.Load(stream).Secrets,
	            Scopes,
	            "user",
	            CancellationToken.None,
	            new FileDataStore(credPath, true)).Result;
	        Console.WriteLine("Credential file saved to: " + credPath);
	 
	    var gmail_service = new GmailService(new BaseClientService.Initializer() {
	                HttpClientInitializer = credential,
	                ApplicationName = ApplicationName,
	            });
	    }
		```
