## **Amazon EKS Cheat Sheet**

* A managed service that allows you to run Kubernetes on AWS without installing, operating, or maintaining your own Kubernetes control plane or nodes.  
* It provides a fully managed, certified Kubernetes-conformant control plane, making it easy to build, secure, and maintain Kubernetes clusters.  
* Integration with various AWS services to provide scalability and security for your applications:  
  * [Amazon ECR](https://tutorialsdojo.com/amazon-elastic-container-registry-amazon-ecr/) for container images  
  * [Elastic Load Balancing](https://tutorialsdojo.com/aws-elastic-load-balancing-elb/) for load distribution  
  * [IAM](https://tutorialsdojo.com/aws-identity-and-access-management-iam/) for authentication  
  * [Amazon VPC](https://tutorialsdojo.com/amazon-vpc/) for isolation

 

## **Amazon EKS Components**

* Clusters  
  * An EKS cluster is made up of two main components:  
    * EKS control plane  
      * It is made up of nodes that run the Kubernetes software (API server & *etcd*).  
      * Each cluster is single-tenant and unique, and runs on its own set of EC2 instances.  
      * Cluster control plane is provisioned across multiple AZs and fronted by an ELB Network Load Balancer.  
      * Use AWS KMS to encrypt data stored by *etcd* nodes and associated EBS volumes.  
    * EKS nodes   
      * A cluster consists of one or more EC2 nodes or AWS Fargate compute on which pods are scheduled.  
      * Connects to the cluster’s control plane via the API server endpoint.  
  * The API server endpoint is public to the internet by default, but you can enable private access to keep communication between nodes and the API server within the VPC.  
  * EKS supports two autoscaling products:  
    * Cluster Autoscaler – uses AWS Auto Scaling groups.  
    * Karpenter – works directly with the [Amazon EC2](https://tutorialsdojo.com/amazon-elastic-compute-cloud-amazon-ec2/) Fleet.  
  * By default, cluster control plane logs aren’t sent to CloudWatch Logs. In order to send logs for your cluster, you have to enable each log type individually.  
  * [EKS](https://tutorialsdojo.com/amazon-elastic-kubernetes-service-eks/) cluster uses IAM / OIDC for authentication and Kubernetes RBAC for authorization.  
  * **EKS Pod Identity** provides a simplified alternative to IRSA for granting AWS permissions to pods. It allows you to associate IAM roles with Kubernetes service accounts without needing to configure an OIDC provider.  
* Nodes  
  * Nodes must be in the same [VPC](https://tutorialsdojo.com/amazon-vpc/) as the subnets you chose when creating a cluster.  
  * From the perspective of the Kubernetes API, nodes represent the compute resources provisioned for your cluster.  
  * Taints and tolerations prevent pods from being scheduled on the wrong nodes.  
  * Self-managed nodes  
    * A cluster can have several node groups.  
    * A node group is a collection of one or more EC2 instances deployed in an Amazon EC2 Auto Scaling group.  
    * In a node group, instances must have the following characteristics:  
      * Same instance type  
      * Running the same AMI  
      * Uses the same EKS node IAM role  
    * Node groups with different instance types and host operating systems can exist in a cluster.  
    * There are two methods for updating self-managed node groups in a cluster to use a new AMI:  
      * Migrating to a new node group  
      * Updating an existing self-managed node group  
  * Managed node groups  
    * Automates the provisioning and lifecycle management of nodes in EKS clusters.  
    * Every managed node is provisioned as part of Amazon EC2 Auto Scaling group.  
    * When nodes are launched as part of a managed node group, they are automatically tagged for auto-discovery by Kubernetes Cluster Autoscaler.  
    * Use node group to apply Kubernetes labels to nodes.  
    * Multiple managed node groups can exist in a single cluster.  
    * When you create a managed node group, you have the option of selecting On-Demand or Spot instances.  
    * To ensure that your applications remain available, node updates and terminations drain nodes automatically.  
  * AWS Fargate  
    * You must first define a [Fargate](https://tutorialsdojo.com/aws-fargate/) profile before scheduling pods on Fargate in your cluster.  
    * If a pod matches more than one Fargate profile, Amazon EKS picks one at random.  
    * Fargate profiles are immutable and contain the following components:  
      * Pod execution role  
      * Subnets  
      * Selectors  
      * Namespace  
      * Labels  
    * Fargate runs only one pod per node.  
    * Pod storage is ephemeral, and data is encrypted with AWS Fargate managed keys.  
    * To encrypt ephemeral pod storage, you can use AWS Fargate managed keys.  
  *    
  * Amazon EKS Auto Mode  
    * The EKS Auto Mode is a newer operational mode for EKS clusters (running Kubernetes 1.29+).  
    * It fully automates cluster management, including provisioning infrastructure, scaling resources, managing core add-ons, and optimizing costs.  
    * AWS takes responsibility for securing, configuring, and managing the AWS infrastructure (EC2 instances) in the cluster.  
    * This approach is recommended for new EKS clusters because it simplifies operations.  
* Workloads  
  * Workloads are deployed in containers and define the applications that run on a Kubernetes cluster  
  * A pod can contain one or more containers.  
  * Vertical Pod Autoscaler adjusts your pods’ CPU and memory reservations.  
  * Horizontal Pod Autoscaler adjusts the number of pods in a deployment, replication controller, or replica set based on CPU utilization.  
* EKS Connector  
  * Enables you to register and connect any Kubernetes cluster to AWS.  
  * You can view the status, configuration, and workloads of the cluster in the Amazon EKS console after it has been connected.

###  

## **Amazon EKS Storage**

* Container Storage Interface (CSI) enables third-party storage providers to create and deploy plugins in Kubernetes that provide alternative storage systems without modifying the core Kubernetes code.  
* Amazon EBS CSI driver  
  * The lifecycle of persistent volumes, such as EBS volumes, is handled by EKS clusters.  
  * To make calls to AWS APIs, the EBS CSI plugin requires IAM permissions.  
  * Although the Amazon EBS CSI controller can be run on Fargate, volumes cannot be mounted to Fargate pods.  
  * You can also manage the EBS CSI driver as an EKS add-on.  
* Amazon EFS CSI driver  
  * EKS clusters manage the EFS file system lifecycle.  
  * Container images based on Windows are incompatible with the EFS CSI driver.  
  * Fargate nodes only support static provisioning.  
  * A pod running on Fargate automatically mounts an EFS file system.  
* Amazon FSx for Lustre CSI driver  
  * EKS clusters can also manage the lifecycles of FSx file systems.  
  * Fargate does not support the Lustre CSI driver.  
* Amazon FSx for NetApp ONTAP CSI driver  
  * A storage service for fully-managed ONTAP file systems in the cloud.  
* Amazon FSx for OpenZFS CSI driver  
  * Provides a CSI interface to manage the lifecycle of Amazon FSx for OpenZFS file systems.  
* Amazon File Cache  
  * Can be used with a CSI driver to provide a high-speed cache for data stored in S3 or other file systems.

###  

## **Amazon EKS Networking**

* There are three ways to create a VPC for an EKS cluster:  
  * Private subnets  
    * Three private subnets are distributed across different AZs.  
    * Nodes have the option of sending and receiving internet traffic via a NAT instance or NAT gateway.  
    * The cluster endpoint can only be accessed via your VPC. Traffic from worker nodes to the endpoint will remain within your VPC.  
  * Public subnets  
    * Three public subnets are distributed across different AZs.  
    * Nodes are assigned public IPv4 addresses by default and can send and receive internet traffic via an internet gateway.  
    * The cluster endpoint can be accessed from outside your VPC. Traffic from worker nodes will leave your VPC to connect to the endpoint.  
  * Public and private subnets  
    * Each AZ has one private and public subnet.  
      * Nodes are deployed to private subnets.  
      * Load balancers are assigned to public subnets to load balance traffic to pods running on nodes.  
    * Public IPv4 addresses are automatically assigned to nodes deployed in public subnets.  
    * IPv6 addresses can be assigned to nodes in both public and private subnets.  
    * A NAT gateway (IPv4) or an egress-only Internet gateway (IPv6) can be used to allow pods to communicate outbound to the internet.  
    * The cluster endpoint can be accessed from outside your VPC. Traffic from worker nodes to the endpoint will remain within your VPC.  
* The cluster security group manages communication between the control plane and the cluster’s compute resources (worker nodes and Fargate pods).  
* You can use AWS PrivateLink to privately access the management APIs of Amazon EKS from within your VPC.  
* Pod networking  
  * Container Network Interface (CNI) is a plugin that assigns a private IPv4/IPv6 address from VPC to each pod.  
  * VPC CNI plugin is deployed to each EC2 node in a Daemonset under the name *aws-node* and consists of two components:  
    * L-IPAM daemon  
      * Creates and attaches network interfaces to EC2 instances.  
      * Assigns secondary IP addresses to network interfaces.  
      * Maintains a warm pool of IP addresses that will be assigned to pods on each node.  
    * CNI plugin  
      * Configures the host network and adds the correct network interface to the pod namespace.  
  * You can’t assign both IPv4 and IPv6 addresses (dual-stacked) to pods and services.  
  * With security groups for pods, you can control the inbound and outbound network traffic to and from your pods.  
  * Attach multiple network interfaces to a pod using the Multus CNI plugin.  
  * CNI metrics helper is a tool that allows you to:  
    * Scrape network interface and IP address information.  
    * Aggregate metrics at the cluster level.  
    * Publish the cluster’s CNI metrics to CloudWatch.  
* AWS Load Balancer Controller   
  * In charge of managing [AWS Elastic Load Balancers](https://tutorialsdojo.com/aws-elastic-load-balancing-elb/) in a Kubernetes cluster and provisions the following load balancers:  
    * ALB when you create a Kubernetes *Ingress*.  
    * NLB when you create a Kubernetes service of type *LoadBalancer*.  
* CoreDNS  
  * A DNS service within EKS clusters that allows individual containers to easily discover and connect to other containers in the cluster.  
  * By default, two replicas of the CoreDNS image are deployed to an EKS cluster.  
* Kube-proxy  
  * Maintains network rules on each Amazon EC2 node.  
  * Enables network communication to pods from network sessions inside/outside of the cluster.  
* Calico  
  * A network policy engine to implement network segmentation and tenant isolation.  
  * Pod selectors and labels can be used to assign network policies to pods.

##  

## **Amazon EKS Security**

* By default, IAM users and roles do not have permission to create or modify Amazon EKS resources. An IAM administrator must first create IAM policies and attach them to the IAM users or groups that require those permissions.  
* In the Amazon EKS control plane, the IAM user or role that creates the cluster is automatically granted *system: masters* permissions in the cluster’s RBAC configuration.  
* To grant additional AWS users or roles access to a cluster, edit the *aws-auth ConfigMap* within Kubernetes and create a Kubernetes *rolebinding* or *clusterrolebinding* with the name of a group specified in the *aws-auth ConfigMap*.  
* EKS Pod Identity  
  * A newer, simplified way to manage IAM credentials for applications.  
  * It allows you to associate IAM roles with Kubernetes service accounts without needing an OIDC provider or managing the `aws-auth` ConfigMap for pod permissions.  
* A service-linked role is predefined by Amazon EKS and includes all of the permissions that the service requires to call other AWS services. You can use this roles for:  
  * EKS clusters  
  * EKS node groups  
  * EKS Fargate profiles  
  * EKS cluster connector  
* Before you can create an EKS cluster, you must have an IAM role with the policy: *AmazonEKSClusterPolicy*.  
* The EKS node kubelet daemon makes calls to AWS APIs. When creating nodes, you will need to have an IAM role with the following IAM policies:  
  * AmazonEKSWorkerNodePolicy  
  * AmazonEC2ContainerRegistryReadOnly  
  * AmazonEKS\_CNI\_Policy (IPv4) or IPv6 policy  
* In order to run pods on AWS Fargate, you need to attach the Amazon EKS pod execution role.  
* To view a Kubernetes cluster to Amazon EKS, you will need to create an Amazon EKS connector IAM role.  
* You can use *eksctl* or the AWS Management Console to create an OIDC provider for your cluster in order to use IAM roles for service accounts.  
* You can enable envelope encryption of Kubernetes secrets using AWS KMS.  
* The AWS Secrets and Configuration Provider (ASCP) can be used to display secrets from [AWS Secrets Manager](https://tutorialsdojo.com/aws-secrets-manager/) and parameters from [AWS Systems Manager](https://tutorialsdojo.com/aws-systems-manager/) Parameter Store as files mounted in Amazon EKS pods.

###  

## **Amazon EKS Monitoring**

* Amazon EKS control plane logging provides audit and diagnostic logs directly to [Amazon CloudWatch](https://tutorialsdojo.com/amazon-cloudwatch/) Logs.  
  * API server (kube-apiserver)  
  * Audit (kube-apiserver-audit)  
  * Authenticator (authenticator)  
  * Controller manager (kube-controller-manager)  
  * Scheduler (kube-scheduler)  
* Logs are sent as log streams to a group in Amazon CloudWatch for each Amazon EKS cluster.  
* Amazon EKS Dashboard  
  * A centralized, native AWS console feature that provides a unified view of all your Kubernetes resources (clusters, node groups, add-ons) across all AWS accounts and Regions in your organization.  
  * It helps monitor cluster health, Kubernetes version status, and forecasts costs for extended support.  
* Amazon EKS is integrated with AWS CloudTrail, and all API calls are recorded as events.  
* Each event or log entry includes information about who initiated the request:  
  * Root or AWS IAM user credentials.  
  * Temporary security credentials for a role or Federated user  
  * AWS service

## **Amazon EKS Deployment Options**

* You can deploy your Kubernetes cluster in various ways in AWS and can include additional networking add-ons to improve your containerized architecture.  
* A Kubernetes container can be deployed via the following options:  
  * Amazon EKS cluster in your AWS account  
  * Amazon EKS on AWS Outposts  
  * Amazon EKS Anywhere  
  * Amazon EKS Distro  
  * Amazon EKS Hybrid Nodes  
* The first option allows you to launch a Kubernetes cluster using managed or self-managed Amazon EC2 nodes that you can customize and control. You can also choose to deploy your Kubernetes pods on AWS Fargate to make the cluster serverless and extremely cost-effective.

![Amazon EKS Deployment Options][image1]

## **Amazon EKS On AWS Outposts**

* This is a deployment option that uses a physical AWS Outpost rack on your on-premises network to run your Kubernetes workloads. The data plane is also located on-premises, so you can have more control compared with running it exclusively in AWS.

 

## **Amazon EKS Anywhere**

* Using Amazon EKS Anywhere is another way to deploy your containers on-premises. It works like Amazon ECS Anywhere, which allows you to run your containerized cluster entirely on your own. This means that the hardware, app deployment location, control plane, and data plane are all controlled on your own physical network. This gives you extensive control over all the components of your containerized application suite while maintaining official support from AWS.

###  

## **Amazon EKS Distro**

* The other deployment option that you can choose is Amazon EKS Distro. The word “distro” simply refers to the distribution of the same open-source Kubernetes software deployed by Amazon EKS in the AWS cloud. Amazon EKS Distro follows the same Kubernetes version release cycle as Amazon EKS and is provided to you as an open-source project that you can deploy on your own computer or on-site environment. It’s similar to the Amazon EKS Anywhere option, except that it does not include support services offered by AWS.

 

## **Amazon EKS Hybrid Nodes**

* This option unifies Kubernetes management across your cloud and on-premises environments.  
* It allows you to use your *existing* on-premises and edge infrastructure (bare metal or virtualized) as worker nodes that connect to a *managed EKS control plane* running in the AWS cloud.

 

## **Amazon EKS Pricing**

* For each Amazon EKS cluster you create, you are charged an hourly rate.  
* You are charged for the AWS resources that you create to run Kubernetes worker nodes in Amazon EC2 with Amazon EKS managed node groups.  
* In Amazon EKS on AWS Fargate, you are charged for the vCPU and memory resources.  
* Amazon EKS on AWS Outposts charges an hourly rate for EKS clusters deployed in the cloud, but there is no additional charge for Kubernetes worker nodes running on Outposts EC2.  
* Amazon EKS Extended Support   
  * EKS provides 14 months of standard support for each Kubernetes version. After that, you can optionally pay an increased hourly fee for Extended Support for up to 12 more months (total 26 months) to receive ongoing security patches.

 

## **Amazon EKS Cheat Sheet References:**

[https://aws.amazon.com/eks/faqs/](https://aws.amazon.com/eks/faqs/)  
[https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)

[image1]: <data:image/png;base64,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>