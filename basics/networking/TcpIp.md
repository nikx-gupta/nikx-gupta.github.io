---
title: Networking TCP/IP
---

### TCP/IP Stack
![Center_200](/assets/images/topics_network_tcpip_01.png)

### Private IP Addressing
In classes A, B, and C a range of IP addresses are set aside for private networks. These IP ranges aren't accessible via the internet.
All public routers ignore any packets sent to them that contain such an address.

Class	|   Start address	|   End address	|   Number of networks	|   IP addresses per network    |	Total IP addresses available	|   Subnet mask
A       |	0.0.0.0	    |   127.255.255.255	|   128         |	16,777,216      |	2,147,483,648   |	255.0.0.0       |
B	    |   128.0.0.0   |	191.255.255.255 |	16,384	    |   65,536	        |   1,073,741,824	|   255.255.0.0     |
C	    |   192.0.0.0	|   223.255.255.255	|   2,097,152   |	256	            |   536,870,912	    |   255.255.255.0   |
D	    |   224.0.0.0	|   239.255.255.255	|       -	    |       -	        |   268,435,456	    |       -           |
E	    |   240.0.0.0	|   255.255.255.255	|       -	    |       -	        |   268,435,456	    |       -           |

Network devices on a private network can't communicate with devices on a public network. Communication can happen only through network address translation at a routing gateway.
The only way to connect two private networks in different geographical areas is to use a virtual private network (VPN). A VPN encapsulates each private network packet. 
The VPN can further encrypt the packet before it sends it across a public network from one private network to another private network.

Name            |	CIDR block	    |   Address range	            |   Number of addresses	|   Classful description
24-bit block    |   10.0.0.0/8      |	10.0.0.0–10.255.255.255     |	16,777,216  |	Single class A
20-bit block	|   172.16.0.0/12	|   172.16.0.0–172.31.255.255	|   1,048,576	|   Contiguous range of 16 class B blocks
16-bit block	|   192.168.0.0/16	|   192.168.0.0–192.168.255.255	|   65,536	    |   Contiguous range of 256 class C blocks
