---
title: DynamoDB
description: Interview questions covering DynamoDB NoSQL database, tables, partitions, indexing, and data modeling.
---

# DynamoDB: Managed NoSQL Database

+ [What is DynamoDB](#what-is-dynamodb)
+ [What are the key characteristics of DynamoDB](#what-are-the-key-characteristics-of-dynamodb)
+ [What is the difference between DynamoDB and relational databases](#what-is-the-difference-between-dynamodb-and-relational-databases)
+ [What is a DynamoDB table](#what-is-a-dynamodb-table)
+ [What is a partition key in DynamoDB](#what-is-a-partition-key-in-dynamodb)
+ [What is a sort key in DynamoDB](#what-is-a-sort-key-in-dynamodb)
+ [What is the difference between partition key and sort key](#what-is-the-difference-between-partition-key-and-sort-key)
+ [What is a composite key in DynamoDB](#what-is-a-composite-key-in-dynamodb)
+ [What is throughput in DynamoDB](#what-is-throughput-in-dynamodb)
+ [What is read capacity unit in DynamoDB](#what-is-read-capacity-unit-in-dynamodb)
+ [What is write capacity unit in DynamoDB](#what-is-write-capacity-unit-in-dynamodb)
+ [What is on-demand billing in DynamoDB](#what-is-on-demand-billing-in-dynamodb)
+ [What is provisioned billing in DynamoDB](#what-is-provisioned-billing-in-dynamodb)
+ [How do you handle hot partitions in DynamoDB](#how-do-you-handle-hot-partitions-in-dynamodb)
+ [What is auto scaling in DynamoDB](#what-is-auto-scaling-in-dynamodb)
+ [What are secondary indexes in DynamoDB](#what-are-secondary-indexes-in-dynamodb)
+ [What is a Global Secondary Index](#what-is-a-global-secondary-index)
+ [What is a Local Secondary Index](#what-is-a-local-secondary-index)
+ [What is eventual consistency in DynamoDB](#what-is-eventual-consistency-in-dynamodb)
+ [What is strong consistency in DynamoDB](#what-is-strong-consistency-in-dynamodb)
+ [How do you query DynamoDB](#how-do-you-query-dynamodb)
+ [What is a scan operation in DynamoDB](#what-is-a-scan-operation-in-dynamodb)
+ [What is the difference between query and scan](#what-is-the-difference-between-query-and-scan)
+ [What is projection in DynamoDB](#what-is-projection-in-dynamodb)
+ [What is filtering in DynamoDB](#what-is-filtering-in-dynamodb)
+ [How do you handle transactions in DynamoDB](#how-do-you-handle-transactions-in-dynamodb)
+ [What is batch processing in DynamoDB](#what-is-batch-processing-in-dynamodb)
+ [What is TTL in DynamoDB](#what-is-ttl-in-dynamodb)
+ [What is DynamoDB Streams](#what-is-dynamodb-streams)
+ [How do you design DynamoDB tables](#how-do-you-design-dynamodb-tables)

## What is DynamoDB?

DynamoDB is a fully managed, serverless NoSQL database service provided by AWS that handles large-scale, high-performance distributed workloads.

[Table of Contents](#dynamodb)

## What are the key characteristics of DynamoDB?

Key characteristics: serverless, fully managed, highly scalable, low latency, built-in replication, automatic backup, and pay-per-request pricing.

[Table of Contents](#dynamodb)

## What is the difference between DynamoDB and relational databases?

DynamoDB is NoSQL (flexible schema, horizontal scaling) while relational databases use fixed schema and vertical scaling.

[Table of Contents](#dynamodb)

## What is a DynamoDB table?

A DynamoDB table is a collection of items (records) with attributes (columns), identified by a unique key.

[Table of Contents](#dynamodb)

## What is a partition key in DynamoDB?

The partition key (hash key) determines which partition stores the item, based on hash of the key value.

[Table of Contents](#dynamodb)

## What is a sort key in DynamoDB?

The sort key (range key) orders items within a partition, allowing range queries on items with same partition key.

[Table of Contents](#dynamodb)

## What is the difference between partition key and sort key?

Partition key distributes data across partitions; sort key orders data within partitions.

[Table of Contents](#dynamodb)

## What is a composite key in DynamoDB?

A composite key combines partition key and sort key, enabling efficient queries on both dimensions.

[Table of Contents](#dynamodb)

## What is throughput in DynamoDB?

Throughput measures read/write capacity: how many operations per second a table can handle.

[Table of Contents](#dynamodb)

## What is read capacity unit in DynamoDB?

One RCU = one strongly consistent read per second or two eventually consistent reads per second for items up to 4KB.

[Table of Contents](#dynamodb)

## What is write capacity unit in DynamoDB?

One WCU = one write per second for items up to 1KB.

[Table of Contents](#dynamodb)

## What is on-demand billing in DynamoDB?

Pay per request model: pay for actual reads/writes without provisioning capacity upfront.

[Table of Contents](#dynamodb)

## What is provisioned billing in DynamoDB?

Reserve capacity upfront and pay fixed rate. Better for predictable workloads.

[Table of Contents](#dynamodb)

## How do you handle hot partitions in DynamoDB?

Use better partition key design, implement DynamoDB Accelerator (DAX) caching, or use on-demand billing.

[Table of Contents](#dynamodb)

## What is auto scaling in DynamoDB?

Auto scaling automatically adjusts provisioned capacity based on actual usage patterns.

[Table of Contents](#dynamodb)

## What are secondary indexes in DynamoDB?

Secondary indexes allow querying on non-key attributes, providing flexible access patterns.

[Table of Contents](#dynamodb)

## What is a Global Secondary Index?

GSI allows querying any attribute across entire table with separate throughput capacity.

[Table of Contents](#dynamodb)

## What is a Local Secondary Index?

LSI allows querying on sort key alternatives within same partition, limited to 10GB per partition key.

[Table of Contents](#dynamodb)

## What is eventual consistency in DynamoDB?

Eventually consistent reads return most recent write in milliseconds, but might return stale data briefly.

[Table of Contents](#dynamodb)

## What is strong consistency in DynamoDB?

Strongly consistent reads always return most recent write, but consume twice the read capacity.

[Table of Contents](#dynamodb)

## How do you query DynamoDB?

Use Query API to retrieve items with specific partition key and optional sort key conditions.

[Table of Contents](#dynamodb)

## What is a scan operation in DynamoDB?

Scan reads every item in table (or index), useful for full table operations but inefficient.

[Table of Contents](#dynamodb)

## What is the difference between query and scan?

Query uses key conditions (efficient), Scan reads all items (inefficient but flexible).

[Table of Contents](#dynamodb)

## What is projection in DynamoDB?

Projection specifies which attributes to return in query/scan results, reducing data transfer.

[Table of Contents](#dynamodb)

## What is filtering in DynamoDB?

Filtering applies conditions after DynamoDB retrieves items, reducing result set size.

[Table of Contents](#dynamodb)

## How do you handle transactions in DynamoDB?

Use TransactWriteItems for multiple atomic writes or TransactGetItems for atomic reads.

[Table of Contents](#dynamodb)

## What is batch processing in DynamoDB?

BatchGetItem reads multiple items, BatchWriteItem writes multiple items in one request (more efficient).

[Table of Contents](#dynamodb)

## What is TTL in DynamoDB?

TTL (Time To Live) automatically deletes items after specified time period, useful for managing data expiration.

[Table of Contents](#dynamodb)

## What is DynamoDB Streams?

Streams capture item-level modifications, enabling real-time processing with Lambda or other consumers.

[Table of Contents](#dynamodb)

## How do you design DynamoDB tables?

Plan access patterns upfront, choose good partition keys, use indexes for alternate patterns, optimize data model.

[Table of Contents](#dynamodb)