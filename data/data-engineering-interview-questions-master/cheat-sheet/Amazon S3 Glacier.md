## **Amazon S3 Glacier Cheat Sheet**

* **Long-term archival** solution optimized for infrequently used data, or “cold data.”  
* Glacier is a REST-based web service.  
* You can store an unlimited number of archives and an unlimited amount of data.  
* You can now specify Glacier (Flexible Retrieval) or Deep Archive as the storage class at the time you create an object (via S3 APIs).  
* It is designed to provide an average annual durability of 99.999999999% for an archive. Glacier synchronously stores your data across multiple AZs before confirming a successful upload.  
* To prevent corruption of data packets over the wire, Glacier uploads the checksum of the data during data upload. It compares the received checksum with the checksum of the received data and validates data authenticity with checksums during data retrieval.  
* Glacier works together with **Amazon S3 lifecycle rules** to help you automate archiving of S3 data and reduce your overall storage costs.  
* Requested archival data is restored as a temporary copy (usually in Standard tier) for the duration you specify.

 

## **Data Model**

* **Vault**  
  * A container for storing archives.  
  * Each vault resource has a unique address with form:  
    `https://region-specific endpoint/account-id/vaults/vaultname`  
  * You can store an unlimited number of archives in a vault.  
  * Vault operations are Region specific.  
* **Archive**  
  * Can be any data such as a photo, video, or document and is a base unit of storage in Glacier.  
  * Each archive has a unique address with form:  
    `https://region-specific-endpoint/account-id/vaults/vault-name/archives/archive-id`  
  * Maximum archive size is 40 TB.  
* **Job**  
  * You can perform a select query on an archive, retrieve an archive, or get an inventory of a vault. Glacier Select runs the query in place and writes the output results to Amazon S3.  
  * Select, archive retrieval, and vault inventory jobs are associated with a vault. A vault can have multiple jobs in progress at any point in time.  
* **Notification Configuration**  
  * Because jobs take time to complete, Glacier supports a notification mechanism to notify you when a job is complete.

 

## **Glacier Operations**

* Retrieving an archive (asynchronous operation)  
* Retrieving a vault inventory (list of archives) (asynchronous operation)  
* Create and delete vaults  
* Get the vault description for a specific vault or for all vaults in a region  
* Set, retrieve, and delete a notification configuration on the vault  
* Upload and delete archives. You cannot update an existing archive.  
* Glacier jobs — select, archive-retrieval, inventory-retrieval

 

## **Vaults**

* Vault operations are region specific.  
* Vault names must be unique within an account and the region in which the vault is being created.  
* You can delete a vault only if there are no archives in the vault as of the last inventory that Glacier computed and there have been no writes to the vault since the last inventory.  
* You can retrieve vault information such as the vault creation date, number of archives in the vault, and the total size of all the archives in the vault.  
* Glacier maintains an inventory of all archives in each of your vaults for disaster recovery or occasional reconciliation. A **vault inventory** refers to the list of archives in a vault. Glacier updates the vault inventory approximately once a day. Downloading a vault inventory is an asynchronous operation.  
* You can assign your own metadata to Glacier vaults in the form of **tags**. A tag is a key-value pair that you define for a vault.  
* **Glacier Vault Lock** allows you to easily deploy and enforce compliance controls for individual Glacier vaults with a vault lock policy. You can specify controls such as “**write once read many**” (WORM) in a vault lock policy and lock the policy from future edits. Once locked, the policy can no longer be changed.

 

## **Archives**

* Glacier supports the following basic archive operations: upload, download, and delete. Downloading an archive is an asynchronous operation.  
* You can upload an archive in a single operation or upload it in parts.  
* Using the multipart upload API, you can upload large archives, up to about 10,000 x 4 GB.  
* You cannot upload archives to Glacier by using the management console. Use the AWS CLI or write code to make requests, by using either the REST API directly or by using the AWS SDKs.  
* You cannot delete an archive using the Amazon S3 Glacier (Glacier) management console. Glacier provides an API call that you can use to delete one archive at a time.  
* After you upload an archive, you cannot update its content or its description. The only way you can update the archive content or its description is by deleting the archive and uploading another archive.  
* Glacier does not support any additional metadata for the archives.

 

## **Glacier Select**

* You can perform filtering operations using simple SQL statements directly on your data in Glacier.  
* You can run queries and custom analytics on your data that is stored in Glacier, without having to restore your data to a hotter tier like S3.  
* When you perform select queries, Glacier provides three data access tiers:  
  * **Expedited** – data accessed is typically made available within 1–5 minutes.  
  * **Standard** – data accessed is typically made available within  3–5 hours.  
  * **Bulk** – data accessed is typically made available within 5–12 hours.

 

## **Glacier Data Retrieval Policies**

* Set data retrieval limits and manage the data retrieval activities across your AWS account in each region.  
* Three types of policies:  
  * Free Tier Only – you can keep your retrievals within your daily free tier allowance and not incur any data retrieval cost.  
  * Max Retrieval Rate – ensures that the peak retrieval rate from all retrieval jobs across your account in a region does not exceed the bytes-per-hour limit you set.  
  * No Retrieval Limit

 

## **Amazon S3 Glacier Security**

* Glacier encrypts your data at rest by default and supports secure data transit with SSL.  
* Data stored in Amazon Glacier is immutable, meaning that after an archive is created it cannot be updated.  
* Access to Glacier requires credentials that AWS can use to authenticate your requests. Those credentials must have permissions to access Glacier vaults or S3 buckets.  
* Glacier requires all requests to be signed for authentication protection. To sign a request, you calculate a digital signature using a cryptographic hash function that returns a hash value that you include in the request as your signature.  
* Glacier supports policies only at the vault level.  
* You can attach identity-based policies to IAM identities.  
* A Glacier vault is the primary resource and resource-based policies are referred to as *vault policies*.  
* When activity occurs in Glacier, that activity is recorded in a CloudTrail event along with other AWS service events in *Event History*.

 

## **Amazon S3 Glacier Pricing**

* You are charged per GB per month of storage  
* You are charged for retrieval operations such as retrieve requests and amount of data retrieved depending on the data access tier – Expedited, Standard, or Bulk  
* Upload requests are charged.  
* You are charged for data transferred out of Glacier.  
* Pricing for Glacier Select is based upon the total amount of data scanned, the amount of data returned, and the number of requests initiated.  
* There is a charge if you delete data within 90 days (for Flexible Retrieval/Standard) or 180 days (for Deep Archive).

 

## **Amazon S3 Glacier Limits**

* Under a single AWS account, you can have up to 1000 vaults.

### **Free Amazon Glacier Tutorials on YouTube:**

[https://www.youtube.com/user/AmazonWebServices/search?query=Glacier](https://www.youtube.com/user/AmazonWebServices/search?query=Glacier)

 

## **Other Amazon Glacier-related Cheat Sheets:**

* [Amazon S3 vs Glacier](https://tutorialsdojo.com/amazon-s3-vs-glacier/)

 

### **Validate Your Knowledge**

#### **Question 1**

A Cloud Ops Engineer plans to set up a disaster and recovery plan in AWS. The requirement is to establish a durable, highly available backup and archiving strategy for the company-owned financial documents, which should be accessible immediately for 6 months. It is expected that there would be a compliance audit every 3 years. The Engineer needs to ensure that the files are still available during that period.

Which service should the Engineer use to fulfill these requirements in the most cost-effective manner?

1. Set up a storage gateway to upload data in an Amazon S3 bucket. Configure lifecycle policies to archive the data to a Cold HDD Amazon EBS volume.  
2. Set up a Direct Connect connection to upload data to an Amazon S3 bucket. For archiving purposes, use IAM policies to move the data into Amazon Glacier.  
3. TD for Business  
4. Use AWS DataSync to transfer the data to an Amazon S3 bucket for storage. Schedule periodic transfers to ensure backups are synchronized for compliance audits.  
5. Upload data to an Amazon S3 bucket. Use lifecycle policies to move the data to Amazon Glacier for archiving.

#### [**Show me the answer\!**](https://tutorialsdojo.com/amazon-glacier/#69d2907332e678b11)

#### **Question 2**

An organization is currently using a tape backup solution to store its application data on-premises. Plans are in place to use a cloud storage service to preserve the backup data for up to 10 years, which may be accessed about once or twice a year.

Which of the following is the most cost-effective option to implement this solution?

1. Use AWS Storage Gateway to backup the data directly to Amazon S3 Glacier Flexible Retrieval.  
2. Order an AWS Snowball Edge appliance to import the backup directly to Amazon S3 Glacier Flexible Retrieval.  
3. Use AWS Storage Gateway to backup the data and transition it to Amazon S3 Glacier Deep Archive.  
4. Use Amazon S3 to store the backup data and add a lifecycle rule to transition the current version to S3 Glacier Flexible Retrieval.

#### [**Show me the answer\!**](https://tutorialsdojo.com/amazon-glacier/#d9140860b1cd78347)

 

For more [AWS Practice Exams](https://portal.tutorialsdojo.com/product-category/aws/aws-practice-exams/) questions with detailed explanations, check out the [**Tutorials Dojo Portal.**](https://portal.tutorialsdojo.com/?_ga=2.55954539.1108095906.1690115921-149035131.1592656312&_gl=1*19uxzor*_ga*MTQ5MDM1MTMxLjE1OTI2NTYzMTI.*_ga_L96TFJ1R9K*MTY5MDE4MzQxOS4xNC4wLjE2OTAxODM0MTkuMC4wLjA.)

#### **X**

## **Amazon S3 Glacier Cheat Sheet Resources:** 

[https://docs.aws.amazon.com/amazonglacier/latest/dev/](https://docs.aws.amazon.com/amazonglacier/latest/dev/)  
[https://aws.amazon.com/glacier/features/?nc=sn\&loc=2](https://aws.amazon.com/glacier/features/?nc=sn&loc=2)  
[https://aws.amazon.com/glacier/pricing/?nc=sn\&loc=3](https://aws.amazon.com/glacier/pricing/?nc=sn&loc=3)  
[https://aws.amazon.com/glacier/faqs/?nc=sn\&loc=6](https://aws.amazon.com/glacier/faqs/?nc=sn&loc=6)

