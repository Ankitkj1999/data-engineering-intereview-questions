## **Amazon Elastic Container Registry Cheat Sheet**

* A managed AWS Docker registry service that operates at the **regional level**. This design provides flexibility in how images are deployed. You can push and pull images to and from the same AWS Region where your Docker cluster is running, ensuring optimal performance.  
* **Amazon Elastic Container Registry (Amazon ECR)** is a fully managed container registry that provides high-performance hosting, enabling you to deploy application images and artifacts anywhere reliably.  
* It eliminates the need to operate your own container repositories or worry about scaling the underlying infrastructure.

## **Features**

* ECR supports Docker Registry HTTP API V2 allowing you to use Docker CLI commands or your preferred Docker tools in maintaining your existing development workflow.  
* ECR stores both the containers you create and any container software you buy through AWS Marketplace.  
* ECR stores your container images in [Amazon S3](https://tutorialsdojo.com/amazon-s3/).  
* ECR supports the ability to define and organize repositories in your registry using namespaces.  
* You can transfer your container images to and from Amazon ECR via HTTPS.

## **Components**

* **Registry**  
  * A registry is provided to each AWS account. You have a Private Registry (default) for internal images and a Public Registry for sharing images globally.  
  * The URL for your default registry is https://*aws\_account\_id*.dkr.ecr.*region*.amazonaws.com.  
  * You must authenticate via the AWS CLI (`aws ecr get-login-password`) to push or pull images.  
* **Authorization token**  
  * Your Docker client needs to authenticate to ECR registries as an AWS user before it can push and pull images. The AWS CLI *get-login* command provides you with authentication credentials to pass to Docker.  
* **Repository**  
  * An object that contains your Docker images, Open Container Initiative (OCI) images, and OCI compatible artifacts.  
  * ECR uses resource-based permissions to let you specify who has access to a repository and what actions they can perform on it.  
  * You can configure a repository to be “immutable,” which prevents image tags from being overwritten. This ensures that a specific tag (e.g., `v1.0`) always points to the exact same image digest, preventing accidental changes to deployed code.  
  * **ECR lifecycle policies** enable you to specify the lifecycle management of images in a repository.  
* **Repository policy**  
  * You can control access to your repositories and the images within them with repository policies.  
* **Image**  
  * Supports **Multi-architecture images**, allowing you to store variants for different CPU architectures (like x86-64 and ARM/Graviton) under a single image manifest list.  
  * You can push and pull Docker images to your repositories. You can use these images locally on your development system, or you can use them in ECS task definitions.  
  * You can replicate images in your private repositories across AWS regions.

 

## **Amazon Elastic Container Registry Security**

* By default, IAM users don’t have permission to create or modify Amazon ECR resources or perform tasks using the Amazon ECR API.  
* Use [IAM](https://tutorialsdojo.com/aws-identity-and-access-management-iam/) policies to grant or deny permission to use ECR resources and operations.  
* ECR partially supports resource-level permissions.  
* ECR supports the use of customer master keys (CMK) managed by [AWS Key Management Service](https://tutorialsdojo.com/aws-key-management-service-aws-kms/) (KMS) to encrypt container images stored in your ECR repositories.  
* **VPC Endpoints (PrivateLink):** You can configure interface VPC endpoints to allow your EC2 instances, ECS tasks, or EKS pods to pull images from ECR without traversing the public internet. This ensures that your traffic stays entirely within the AWS network.  
* **Image Scanning:**  
  * Basic Scanning: Uses the Common Vulnerabilities and Exposures (CVEs) database from the open-source Clair project.  
  * Enhanced Scanning: Integrates with **Amazon Inspector** to provide continuous, automated scanning for both operating system and programming language package vulnerabilities.  
* **Image Signing:**  
  * ECR integrates with **AWS Signer** (using the open-source Notation client) to cryptographically sign your container images.  
  * You can then configure your orchestrators (such as EKS) to verify the image’s signature before deployment, ensuring it comes from a trusted source and hasn’t been tampered with.

 

## **Amazon Elastic Container Registry Pricing**

* You pay only for the amount of data you store in your repositories and data transferred to the Internet.

**Storage Costs**

* **Standard Storage:** You pay for the data stored in your repositories (e.g., $0.10/GB/month in most Regions).  
* **Archive Storage:** A lower-cost storage tier for rarely accessed images.  
  * Ideal for retaining older images for compliance or audit purposes without paying full standard rates.  
  * You can use Lifecycle Policies to automatically move images to the Archive tier based on age or pull count.  
  * **Retrieval:** Images in the archive cannot be pulled immediately; they must be “restored” first (typically takes minutes to hours), which incurs a data retrieval fee per GB.  
* **Public Repositories:** You get 50 GB of free storage per month.

**Data Transfer Costs**

* **Data Transfer IN:** Transferring data *into* Amazon ECR is free.  
* **Data Transfer OUT:**  
  * **To Same Region:** Data transferred to AWS compute resources (like EC2, Lambda, Fargate, or App Runner) within the *same* Region is **free**.  
  * **To Different Region:** Charged at standard AWS inter-region data transfer rates (e.g., Cross-Region Replication).  
  * **To Internet:** Charged per GB (tiered pricing).  
    * *Public Repository Allowance:* 500 GB/month free (anonymous) or 5 TB/month free (authenticated with AWS account).

**Image Scanning Costs**

* **Basic Scanning:** Free. Uses the open-source Clair project to scan for CVEs on push.  
* **Enhanced Scanning:** Charged per image.  
  * **Initial Scan:** \~$0.09 per image scanned on push.  
  * **Continuous Rescan:** \~$0.01 per rescan (automated updates when new vulnerability definitions are added).

**Other Costs**

* **Pull Through Cache:** No additional fee for the feature itself, but you pay for the storage of the cached images and any applicable cross-region data transfer.  
* **Lifecycle Policies:** The policy engine itself is free. It saves costs by automatically expiring or archiving old images.

## **Amazon Elastic Container Registry Cheat Sheet References:**

[https://docs.aws.amazon.com/AmazonECR/latest/userguide/](https://docs.aws.amazon.com/AmazonECR/latest/userguide/)  
[https://aws.amazon.com/ecr/features/](https://aws.amazon.com/ecr/features/)  
[https://aws.amazon.com/ecr/pricing/](https://aws.amazon.com/ecr/pricing/)  
[https://aws.amazon.com/ecr/faqs/](https://aws.amazon.com/ecr/faqs/)

