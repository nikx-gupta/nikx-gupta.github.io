---
title: Gmail API
---

# Topics
- ## [Link - Create Credentials](index)
- ## .NET Core
  - ### Initialize Service Instance
	```csharp
    var gmail_service = new GmailService(new BaseClientService.Initializer() {
                HttpClientInitializer = credential,
                // Application Name provided when creating credentials
                ApplicationName = ApplicationName,
    });
	```
  - ### Get Message List
	```csharp
    UsersResource.MessagesResource.ListRequest request = _gmailService.Users.Messages.List("me");
    request.Q = query;
    IList<Message> messages = request.Execute().Messages;
    foreach (var message in messages) {
        MessageProperties prop = new();

        var req_msg = _gmailService.Users.Messages.Get("me", message.Id);
        req_msg.Format = UsersResource.MessagesResource.GetRequest.FormatEnum.Full;
        var full_msg = req_msg.Execute();
        var attachment = full_msg.Payload.Parts.FirstOrDefault(x => !string.IsNullOrEmpty(x.Filename));
        var msg_att = _gmailService.Users.Messages.Attachments
            .Get("me", full_msg.Id, attachment.Body.AttachmentId).Execute();

        // foreach (var messagePartHeader in full_msg.Payload.Headers) {
        //     Console.WriteLine($"{messagePartHeader.Name} => {messagePartHeader.Value}");
        // }
        var date = full_msg.Payload.Headers.FirstOrDefault(x => x.Name == "Date").Value;
        prop.Date = DateTime.Parse(date);
        prop.Subject = full_msg.Payload.Headers.FirstOrDefault(x => x.Name == "Subject")?.Value;
        prop.AttachmentData = msg_att.Data;
        prop.AttachmentName = attachment.Filename;
        saveStatementFunc(prop);
        _gmailService.Users.Messages.Delete("me", message.Id).Execute();
        Console.WriteLine($"Deleted Message: {prop.Subject}");
    }
	```

# References
- ### [Create and Populate Folders](https://developers.google.com/drive/api/v3/folder)
- ### [File and Folders Overview](https://developers.google.com/drive/api/v3/about-files)
