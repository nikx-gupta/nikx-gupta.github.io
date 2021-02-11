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
- Let's assume we have mapped the above model to a software system and manny developers are working on it both in Main branch. Developers create a library which contains functionality and is delivered to all sub systems (different post offices here)
  Now, some sub systems or clients want to enable different modes of delivery like airways and some wants to add feature for road delivery. The maintainers of library added all this functionality in
  method `deliverMails`
  ```csharp
  public void deliverMails() { 
    deliveryByRoad();
    deliverByAir();
  } 
  ```	
  - Let's identify issues with this type of system
    - Isues Fix and Bugs will overlap each other because of changes in same method all the time
    - Different versions are created and if not there will be delay in feature implementation for different functionalities
	- If different delivery system needs to be added, that will add more complexity and more issues
  	  
  - Let's apply OCP principle and see how we can try to solve this
  ```csharp
  public interface IDeliverySystem { 
    public void deliverMail();
  }
  
  public class RoadDeliverySystem : IDeliverySystem { public void deliverMail() { 
        // code to deliver through road
    } 
  }
  public class AirwayDeliverySystem : IDeliverySystem { public void deliverMail() { 
        // code to deliver through Airways
    } 
  }
  ```
  - As per OCP principle, we `Closed` the system `IDeliverySystem` for modification by declaring it as interface, but being an interface it is `Open` for Extension
    which means, the behavior of the system can be extended in multiple and independent ways without modifying the base system.

## `L`iskov Substitution Principle
- If we substitute a super class reference with an object of any of its subclass, the program should not break. Few of the restrictions are posed by compiler 
  in different langguages, when using polymorphism in OOPS.
  

## [`I`nterface Seggregation](https://www.baeldung.com/java-interface-segregation)

## [`D`ependency Inversion](https://stackify.com/dependency-inversion-principle/)
- High Level modules should not depend on low level modules directly. Both should depend on abstraction.

