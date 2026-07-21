## **AWS Wavelength Cheat Sheet**

* **AWS Wavelength** enables developers to build applications that require edge computing infrastructure to deliver ultra-low latency to mobile devices and end users.  
* It deploys standard AWS compute and storage services to the edge of communications service providers’ (CSP) networks (typically 5G networks).  
* Wavelength Zones can be used to extend an [Amazon VPC](https://tutorialsdojo.com/amazon-vpc/) in order to run ultra-low latency applications that use the same AWS services, APIs, tools, and functionalities.

 

## **Features**

* Supports standard AWS compute instances, including General Purpose, Memory Optimized, and GPU-accelerated types for diverse edge workloads.  
  * Provides persistent block storage via Amazon EBS gp2 volumes with snapshot and restore capabilities to parent Regions.  
  * Extend your existing VPC to Wavelength Zones via Carrier Gateways for direct, low-latency connectivity to 5G networks.  
  * Enables the orchestration of containerized applications using familiar services such as Amazon EKS and Amazon ECS.  
  * Integrates seamlessly with standard AWS management tools, including CloudFormation, CloudWatch, and Auto Scaling.  
* Use cases:  
  * Real-time game streaming and rendering high-fidelity Augmented Reality/Virtual Reality (AR/VR) content directly to mobile devices with minimal lag.  
  * Processing telemetry data from vehicles in near-real-time to support Advanced Driver Assistance Systems (ADAS) and autonomous driving safety.  
  * Running AI/ML video analytics at the edge to detect manufacturing defects or safety hazards instantly on the factory floor.  
  * Real-time medical image analysis and remote diagnostics, where latency is critical for doctor-patient interaction.

 

## **AWS Wavelength Concepts**

* **Wavelength** is the AWS infrastructure used to run workloads that require ultra-low latencies over mobile networks.  
* **Wavelength Zone (WZ)**   
  * A logical extension of the Region. It is where the Wavelength infrastructure is deployed and is managed by the Region’s control plane.  
  * Use WZs for application components that require ultra-low latency, enhanced bandwidth, or improved service quality across 5G mobile networks.  
  * To give the most scalable, robust, and cost-effective alternatives for components, AWS recommends that you design the edge applications in a hub and spoke model with the Region.  
  * For latency-sensitive applications, you need to have multiple WZs.  
  * To discover the closest WZ endpoint, you must register the EC2 instance with a discovery service such as AWS Cloud Map.  
  * For data and app replication, AWS recommends you use an AZ in a different Region as a failover zone.  
  * Apps running on 4G/LTE mobile phones and devices connected to 4G/LTE networks can also connect to Wavelength Zones’ application servers.  
  * Note: Wavelength Zones are not available in all AWS Regions. They are strictly tied to specific geographic locations and telecommunication carrier partnerships.  
* An application that you run on an AWS resource in a WZ is called **Wavelength Application**.  
* **Carrier Gateway**  
  * Provides connectivity between WZ and telecommunication carrier.  
  * Enables inbound traffic from a carrier network in a specific location, as well as outbound traffic to the carrier network and the internet.   
  * Supports IPv4 traffic.  
  * Only available for VPCs with WZ subnets.  
  * To assign a network interface, use a carrier IP address from the network border group.  
  * Performs NAT (Network Address Translation) to translate the private IP of your Wavelength instance to a Carrier IP address.  
* You can create AWS compute, storage services, and carrier gateways in WZs.  
* You’ll also need VPC, Subnet, and Network Border Group to be able to leverage the 5G edge computing infrastructure of AWS Wavelength.  
* To manage your resources and WZs, you can use the following interfaces:  
  * AWS Management Console  
  * AWS CLI  
  * AWS SDKs

 

## **AWS Wavelength Pricing**

* Prices for AWS resources (EC2 instances, EBS volumes) in Wavelength Zones are different from those in the parent Region.  
* **On-Demand:** Instances in Wavelength Zones are primarily available on demand.   
* **Savings Plans:** You can reduce costs using Compute Savings Plans and EC2 Instance Savings Plans, which apply to Wavelength usage just as they do in the parent Region.

 

## **Amazon Wavelength Cheat Sheet References:**

[https://aws.amazon.com/wavelength/](https://aws.amazon.com/wavelength/)  
[https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html](https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html)

