## **Amazon Lightsail Cheat Sheet**

* **Amazon Lightsail** is an easy-to-use cloud platform that offers everything needed to build an application or website, along with a cost-effective monthly plan.  
* It is a Virtual Private Server (VPS) provider designed for developers, small businesses, students, and anyone who needs a simple virtual server solution.  
* Lightsail includes everything you need for your websites and web applications – a virtual machine (choose either Linux or Windows OS), SSD-based storage, data transfer, DNS management, and a static IP address.

## **Features**

* Lightsail Instances and Volumes  
  * Lightsail offers virtual servers (instances) where you can launch your website, web application, or project. Manage your instances from the Lightsail console or API.  
  * You can choose from a variety of hardware configurations to suit your workload. See pricing section below for details.  
  * Lightsail uses SSD for its virtual servers. Each attached disk can be up to 16 TB, and you can attach up to 15 disks per Lightsail instance.  
  * Lightsail offers automatic and manual snapshots for your instances and SSD volumes.  
* Lightsail Container Service  
  * A compute resource that allows you to run containers in the cloud.  
  * You can deploy container images from the Lightsail private registry, Amazon ECR, or public registries.  
  * Automatically provisions the underlying infrastructure, handles load balancing, and provides a secure HTTPS endpoint for your application.  
* Lightsail Object Storage  
  * Offers highly available and durable storage for static content (images, videos, logs).  
  * Can be attached to your Lightsail instances or CDN distributions.  
  * Compatible with Amazon S3 APIs and provides a simpler alternative to S3 for Lightsail users.  
* Lightsail Load Balancers  
  * Lightsail’s load balancers route web traffic across your instances so that your websites and applications can accommodate variations in traffic, be better protected from outages, and deliver a better experience to your visitors.  
  * During load balancer creation, you will be asked to specify a path for Lightsail to ping. If the target instance can be reached using this path, then Lightsail will route traffic there. If one of your target instances is unresponsive, Lightsail will not route traffic to that instance.  
  * Lightsail load balancers direct traffic to your healthy target instances based on a round robin algorithm.  
  * Lightsail supports session persistence for applications that require visitors to hit the same target instances for data consistency.  
* Lightsail Certificates  
  * Lightsail load balancers include integrated certificate management, providing free SSL/TLS certificates that can be quickly provisioned and added to a load balancer. AWS handles your certificate renewals automatically.  
  * Lightsail certificates are domain validated, meaning that you need to provide proof of identity by validating that you own or have access to your website’s domain before the certificate can be provisioned by the certificate authority.  
  * You can add up to 10 domains or subdomains per certificate. Lightsail does not currently support wild card domains.  
* Managed Databases  
  * You can launch a fully configured MySQL or PostgreSQL managed database in minutes and leave the maintenance to Lightsail.  
  * Managed databases are available in Standard and High Availability plans. High Availability plans add redundancy and durability to your database, by automatically creating a standby database in a separate AZ from your primary database, synchronously replicating data to the standby database, and providing failover to the standby database in case of infrastructure failure and during maintenance.  
  * Lightsail automatically backs up your database and allows point-in-time restore from the past 7 days using the database restore tool.  
  * You can scale up your database by taking a snapshot of your database and creating a new, larger database plan from the snapshot or by creating a new, larger database using the emergency restore feature. You can also switch from Standard to High Availability plans and vice versa using either method. You cannot scale down your database.  
  * Lightsail also automatically encrypts your data at rest and in motion for increased security and stores your database password for easy and secure connections to your database.  
* You can easily migrate your projects to [Amazon EC2](https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/) by taking snapshots of your virtual servers and SSD volumes and launching them in the EC2 console.  
* Lightsail CDN, backed by [Amazon CloudFront](https://tutorialsdojo.com/amazon-cloudfront/), lets you create and manage content delivery network (CDN) distributions for your Lightsail applications.  
* Lightsail resources operate in dual-stack mode, accepting both IPv4 and IPv6 client connections. IPv6 is supported on Lightsail resources such as instances, containers, load balancers, and CDN. In addition to this, Lightsail also supports firewall rules for IPv6 traffic.  
* Supported Operating Systems  
  * Ubuntu  
  * Amazon Linux 2023  
  * Amazon Linux 2  
  * AlmaLinux OS 9  
  * Debian  
  * FreeBSD  
  * OpenSUSE  
  * CentOS  
  * Windows Server 2016, 2019, and 2022  
* Pre-configured Application Stacks  
  * WordPress  
  * WordPress Multisite  
  * Magento  
  * Drupal  
  * Joomla\!  
  * Ghost  
  * Redmine  
  * Plesk  
  * cPanel & WHM  
  * Django  
  * PrestaShop  
* Development Stacks  
  * Node JS  
  * Gitlab  
  * LAMP (Linux, MySQL, Apache, PHP)  
  * MEAN (MongoDB, ExpressJS, Angular JS, Node JS)  
  * Nginx

## **Amazon Lightsail Pricing**

* Included in all Lightsail plans  
  * Static IP address  
  * Intuitive management console  
  * DNS management  
  * 1-click SSH terminal access (Linux/Unix)  
  * 1-click RDP access (Windows)  
  * Powerful Lightsail API  
  * Highly available SSD storage  
  * Server monitoring  
* You don’t pay for a static IP if it is attached to an instance.  
* Your Lightsail instances are charged only when they’re in the running or stopped state.  
* Your cost will be based on the virtual server package you select. Windows packages cost more than Linux. Outbound data transfer beyond the cap of the package will incur additional costs.  
* For Linux virtual servers, you have the following configurations:

| Package | Memory | Core Processors | SSD Storage | Total Inbound and Outbound Data Transfer |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 512 MB | 1 | 20 GB | 1 TB |
| 2 | 1 GB | 1 | 40 GB | 2 TB |
| 3 | 2 GB | 1 | 60 GB | 3 TB |
| 4 | 4 GB | 2 | 80 GB | 4 TB |
| 5 | 8 GB | 2 | 160 GB | 5 TB |
| 6 | 16 GB | 4 | 320 GB | 6 TB |
| 7 | 32 GB | 8 | 640 GB | 7 TB |

  * For Windows virtual servers, you have the following configurations:

| Package | Memory | Core Processors | SSD Storage | Total Inbound and Outbound Data Transfer |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 512 MB | 1 | 30 GB | 1 TB |
| 2 | 1 GB | 1 | 40 GB | 2 TB |
| 3 | 2 GB | 1 | 60 GB | 3 TB |
| 4 | 4 GB | 2 | 80 GB | 4 TB |
| 5 | 8 GB | 2 | 160 GB | 5 TB |
| 6 | 16 GB | 4 | 320 GB | 6 TB |
| 7 | 32 GB | 8 | 640 GB | 7 TB |

  * You can also opt for managed databases, which have the following available configurations:

| Package | Memory | Core Processors | SSD Storage | Total Inbound and Outbound Data Transfer | Encrypted |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | 1 GB | 1 | 40 GB | 100 GB | No |
| 2 | 2 GB | 1 | 80 GB | 100 GB | Yes |
| 3 | 4 GB | 2 | 120 GB | 100 GB | Yes |
| 4 | 8 GB | 2 | 240 GB | 200 GB | Yes |

  * You can modify your managed database to be highly available for twice the price of the package.  
  * If you choose to run load balancers for your virtual servers, you are charged a fixed price per month no matter which package you select.  
  * Your load balancer does not consume your data transfer allowance. Traffic between the load balancer and the target instances is metered and counts toward your data transfer allowance for your instances, in the same way, traffic in from and out to the internet is counted toward your data transfer allowance for Lightsail instances that are not behind a load balancer.  
  * You can purchase additional EBS SSD storage for your Linux/Windows servers. Available options are 8 GB, 32 GB, 64 GB, 128 GB, or 256 GB. Costs 0.10 USD per allocated GB, per month.  
  * If you have point-in-time snapshots for your Lightsail instances, managed databases, or block storage, you are charged an additional USD $0.05 per GB of backup data, per month.  
* Free Tier: New AWS accounts receive **3 months free** on select bundles:  
  * Linux/Unix: Free on the $3.50, $5, and $10 plans.  
  * Windows: Free on the $8, $12, and $20 plans.  
  * Containers: 3 months free on the $10 Micro service (1 node).  
  * Databases: 3 months free on the $15 Standard plan.  
  * Object Storage: 12 months free on the $1 bundle (5 GB).

 

## **Amazon Lightsail Limits**

* You can currently create up to 20 Lightsail instances, 5 static IPs, 6 DNS zones, 20 TB of attached block storage, and 5 load balancers in a Lightsail account.   
* You can also generate up to 20 certificates during each calendar year.

 

## **Amazon Lightsail Cheat Sheet References:**

[https://aws.amazon.com/lightsail/](https://aws.amazon.com/lightsail/)  
[https://docs.aws.amazon.com/lightsail/?id=docs\_gateway](https://docs.aws.amazon.com/lightsail/?id=docs_gateway)  
[https://aws.amazon.com/lightsail/faq/](https://aws.amazon.com/lightsail/faq/)

