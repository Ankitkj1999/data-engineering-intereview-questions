## **AWS Savings Plan Cheat Sheet**

* Savings Plan is a flexible pricing model that helps you save up cost on Amazon EC2, AWS Fargate, and AWS Lambda usage.  
* You can purchase Savings Plans from any account, payer or linked.   
* By default, the benefit provided by Savings Plans is applicable to usage across all accounts within an AWS Organization/consolidated billing family. You can also choose to restrict the benefit of Savings Plans to only the account that purchased them.  
* Similar to Reserved Instances, you have All Upfront, Partial upfront, or No upfront payment options.

## **Plan Types**

* **Compute Savings Plans** – provide the most flexibility and prices that are up to 66 percent off of On-Demand rates. These plans automatically apply to your EC2 instance usage, regardless of instance family (example, M5, C5, etc.), instance sizes (example, c5.large, c5.xlarge, etc.), Region (for example, us-east-1, us-east-2, etc.), operating system (for example, Windows, Linux, etc.), or tenancy (Dedicated, default, dedicated host). They also apply to your Fargate and Lambda usage.   
  * You can move a workload between different instance families, shift your usage between different regions, or migrate your application from Amazon EC2 to Amazon ECS using Fargate at any time and continue to receive the discounted rate provided by your Savings Plan.  
* **EC2 Instance Savings Plans** – provide savings up to 72 percent off On-Demand, in exchange for a commitment to a specific instance family in a chosen AWS Region (for example, M5 in N. Virginia US-East-1). These plans automatically apply to usage regardless of instance size, OS, and tenancy within the specified family in a region.  
  * You can change your instance size within the instance family (example, from c5.xlarge to c5.2xlarge) or the operating system (example, from Windows to Linux), or move from Dedicated tenancy to Default and continue to receive the discounted rate provided by your Savings Plan.

## **Savings Plan vs RIs**

|   | Compute Savings Plans | EC2 Instance Savings Plans | Convertible RIs | Standard RIs |
| :---: | :---: | :---: | :---: | :---: |
| Savings over On-Demand | Up to 66 percent | Up to 72 percent | Up to 66 percent | Up to 72 percent |
| Automatically applies pricing to any instance family | ✓ | — | — | — |
| Automatically applies pricing to any instance size | ✓ | ✓ | Regional only | Regional only |
| Automatically applies pricing to any tenancy or OS | ✓ | ✓ | — | — |
| Automatically applies to Amazon ECS using Fargate and Lambda | ✓ | — | — | — |
| Automatically applies pricing across AWS Regions | ✓ | — | — | — |
| Term length options of 1 or 3 years | ✓ | ✓ | ✓ | ✓ |

## **Monitoring**

* The **Savings Plans Inventory** page shows a detailed overview of the Savings Plans you own.  
* If you’re a user in a linked account of AWS Organizations, you can view the Savings Plans owned by your specific linked account.   
* If you’re a user in the payer account in AWS Organizations, you can view Savings Plans owned only by the payer account, or you can view Savings Plans owned by all accounts in AWS Organizations.  
* You can use AWS Budgets to set budgets for your Savings Plan utilization, coverage, and costs.

## **AWS Savings Plan Cheat Sheet References:**

[https://aws.amazon.com/savingsplans/](https://aws.amazon.com/savingsplans/)  
[https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)  
[https://aws.amazon.com/savingsplans/faq/](https://aws.amazon.com/savingsplans/faq/)

