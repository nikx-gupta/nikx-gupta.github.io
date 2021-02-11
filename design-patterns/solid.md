---
title: SOLID Design Pattern
---

- When the problem scope was small it was efficient and performant enough to ignore the principle, but as soon as scope has increased many factors start coming into play
  which degrades the overall performance, increases the chances of failures and at one point of time the system breaks down.
- To prevent this scenario, it becomes important to follow few design patterns which make life easier. Let's observe some design patterns in this regard.

## `S`ingle Responsibility Principle
- Imagine we are running a small post office with 3 employees and 3 bicycles for each of them. It is small town, so you have assigned every one of them same responsibilities
	- Collecting posts from mailbox
	- Organize the collected mails
	- Deliver them
	- If any issue occurs in their respective vehicles, if any fault occurs <br>

- looking back at the case study, we will try to map the problem to models
  ```csharp
  public class Postman {
    public void collectPosts() { }
    public void sortMails() { }
    public void deliverMails() { }
    public void fixTransportVehicle() { }
  }
  ```
- This model we are looking at is popularly known as `Monolithic Monstrosity` of `God Object` where each function of the system is performed by same object.  
- Let's try to solve this problem by dividing each responsibility to a different object. the solution will look like
  ```csharp
  public class PostmanCollector {
    public void collectPosts() { }
  }
  
  public class PostmanOrganizer {
    public void sortMails() { }
  }

  public class PostmanDistributor {
    public void deliverMails() { }
  }
  
  public class PostmanMaintenance {
    public void fixTransportVehicle() { }
  }
  ```
- Now we again look at the system it has become easy to understand and `Seperation of Concern` is clearly visible. Now, we can add/remove features independently to
  each of the responsibility model without affecting the others. They can be scaled, optimized independently.

## `O`pen Closed Principle
- Referred as `Open for Extension, but Closed for Modification`
- Looking back at problem, lets say you have deployed the libraries to different post offices. Some offices come with requirement of add feature to deliver the mail through Roadways
  and some through Airways. Now, as there was a method `deliverMails` developers added all the requirements in the same method and delivered it to all the sub systems (post office in our case).
  Now there was some bug in the airways implementation and thus it was fixed and new version was recirculated.   
