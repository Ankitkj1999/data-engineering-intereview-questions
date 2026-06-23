---
title: Delta Lake
description: Interview questions covering Delta Lake, ACID transactions, schema evolution, time travel, and data reliability.
---

# Delta Lake: Reliable Data Storage

+ [What is Delta Lake](#what-is-delta-lake)
+ [What are the key features of Delta Lake](#what-are-the-key-features-of-delta-lake)
+ [What is the Delta Lake transaction log](#what-is-the-delta-lake-transaction-log)
+ [How does Delta Lake provide ACID transactions](#how-does-delta-lake-provide-acid-transactions)
+ [What is schema enforcement in Delta Lake](#what-is-schema-enforcement-in-delta-lake)
+ [What is schema evolution in Delta Lake](#what-is-schema-evolution-in-delta-lake)
+ [What is time travel in Delta Lake](#what-is-time-travel-in-delta-lake)
+ [How do you query historical data in Delta Lake](#how-do-you-query-historical-data-in-delta-lake)
+ [What is the VACUUM command in Delta Lake](#what-is-the-vacuum-command-in-delta-lake)
+ [What is the OPTIMIZE command in Delta Lake](#what-is-the-optimize-command-in-delta-lake)
+ [What is Z-order clustering in Delta Lake](#what-is-z-order-clustering-in-delta-lake)
+ [How does Delta Lake handle data lineage](#how-does-delta-lake-handle-data-lineage)
+ [What is Change Data Capture in Delta Lake](#what-is-change-data-capture-in-delta-lake)
+ [How do you enable CDC in Delta Lake](#how-do-you-enable-cdc-in-delta-lake)
+ [What is Delta Lake's compatibility with Parquet](#what-is-delta-lakes-compatibility-with-parquet)
+ [Can you use Delta Lake with Spark](#can-you-use-delta-lake-with-spark)
+ [Can you use Delta Lake with other tools](#can-you-use-delta-lake-with-other-tools)
+ [How do you create a Delta Lake table](#how-do-you-create-a-delta-lake-table)
+ [What is the difference between managed and external Delta tables](#what-is-the-difference-between-managed-and-external-delta-tables)
+ [How do you handle concurrent writes in Delta Lake](#how-do-you-handle-concurrent-writes-in-delta-lake)
+ [What is the MERGE command in Delta Lake](#what-is-the-merge-command-in-delta-lake)
+ [How do you delete records in Delta Lake](#how-do-you-delete-records-in-delta-lake)
+ [What is data skipping in Delta Lake](#what-is-data-skipping-in-delta-lake)
+ [How does Delta Lake improve query performance](#how-does-delta-lake-improve-query-performance)
+ [What is the Delta Lake protocol](#what-is-the-delta-lake-protocol)
+ [How do you upgrade to Delta Lake](#how-do-you-upgrade-to-delta-lake)
+ [Can you downgrade from Delta Lake](#can-you-downgrade-from-delta-lake)
+ [What are the storage requirements for Delta Lake](#what-are-the-storage-requirements-for-delta-lake)
+ [How do you handle Delta Lake compaction](#how-do-you-handle-delta-lake-compaction)
+ [What is the impact of frequent writes on Delta Lake](#what-is-the-impact-of-frequent-writes-on-delta-lake)

## What is Delta Lake?

Delta Lake is an open-source storage layer that brings ACID transactions, data versioning, and unified batch/streaming processing to data lakes built on Apache Spark.

[Table of Contents](#delta-lake)

## What are the key features of Delta Lake?

Key features include ACID transactions, schema enforcement and evolution, time travel, unified batch/streaming, data lineage, and high performance.

[Table of Contents](#delta-lake)

## What is the Delta Lake transaction log?

The transaction log (_delta_log/) records all transactions on a Delta table, enabling ACID guarantees, time travel, and data recovery.

[Table of Contents](#delta-lake)

## How does Delta Lake provide ACID transactions?

Delta Lake uses the transaction log and optimistic concurrency control to ensure Atomicity, Consistency, Isolation, and Durability.

[Table of Contents](#delta-lake)

## What is schema enforcement in Delta Lake?

Schema enforcement prevents accidental data corruption by rejecting writes that don't match the table schema.

[Table of Contents](#delta-lake)

## What is schema evolution in Delta Lake?

Schema evolution allows adding new columns to a Delta table without rewriting the entire dataset.

[Table of Contents](#delta-lake)

## What is time travel in Delta Lake?

Time travel allows querying previous versions of a table by specifying a version number or timestamp.

[Table of Contents](#delta-lake)

## How do you query historical data in Delta Lake?

Use `SELECT * FROM table VERSION AS OF version_number` or `SELECT * FROM table TIMESTAMP AS OF timestamp_string`.

[Table of Contents](#delta-lake)

## What is the VACUUM command in Delta Lake?

VACUUM removes old versions of files from Delta tables, reducing storage costs while preserving recent history.

[Table of Contents](#delta-lake)

## What is the OPTIMIZE command in Delta Lake?

OPTIMIZE consolidates small files into larger ones and applies Z-order clustering, improving query performance.

[Table of Contents](#delta-lake)

## What is Z-order clustering in Delta Lake?

Z-order clustering reorganizes data to maximize data skipping efficiency, dramatically improving query performance.

[Table of Contents](#delta-lake)

## How does Delta Lake handle data lineage?

Delta Lake tracks lineage through the transaction log, providing complete audit trails of data changes.

[Table of Contents](#delta-lake)

## What is Change Data Capture in Delta Lake?

CDC captures INSERT, UPDATE, and DELETE operations, allowing downstream systems to react to data changes.

[Table of Contents](#delta-lake)

## How do you enable CDC in Delta Lake?

Enable CDC when creating a table with `TBLPROPERTIES ("delta.enableChangeDataFeed" = true)`.

[Table of Contents](#delta-lake)

## What is Delta Lake's compatibility with Parquet?

Delta Lake uses Parquet as underlying format while adding transaction log layer for reliability and performance.

[Table of Contents](#delta-lake)

## Can you use Delta Lake with Spark?

Yes, Spark is the primary engine for Delta Lake. Use `spark.read.format("delta")` and `df.write.format("delta")`.

[Table of Contents](#delta-lake)

## Can you use Delta Lake with other tools?

Yes, Delta Lake works with Databricks, Apache Spark, Presto, Trino, and many other query engines.

[Table of Contents](#delta-lake)

## How do you create a Delta Lake table?

Use `df.write.format("delta").mode("overwrite").save(path)` or SQL `CREATE TABLE USING DELTA`.

[Table of Contents](#delta-lake)

## What is the difference between managed and external Delta tables?

Managed tables store data in warehouse directory; external tables reference external storage locations.

[Table of Contents](#delta-lake)

## How do you handle concurrent writes in Delta Lake?

Delta Lake uses optimistic concurrency control, allowing multiple writers with automatic conflict resolution.

[Table of Contents](#delta-lake)

## What is the MERGE command in Delta Lake?

MERGE performs INSERT, UPDATE, DELETE operations based on join conditions, similar to SQL MERGE statement.

[Table of Contents](#delta-lake)

## How do you delete records in Delta Lake?

Use `DELETE FROM table WHERE condition` or `DELETE FROM (SELECT * FROM table WHERE condition)`.

[Table of Contents](#delta-lake)

## What is data skipping in Delta Lake?

Data skipping uses statistics to skip row groups/files that don't match query predicates, improving performance.

[Table of Contents](#delta-lake)

## How does Delta Lake improve query performance?

Through data skipping, Z-order clustering, predicate pushdown, and optimized file layout.

[Table of Contents](#delta-lake)

## What is the Delta Lake protocol?

The protocol specifies transaction log format, ensuring compatibility across implementations.

[Table of Contents](#delta-lake)

## How do you upgrade to Delta Lake?

Convert existing tables using `CONVERT TO DELTA table_name` or recreate tables in Delta format.

[Table of Contents](#delta-lake)

## Can you downgrade from Delta Lake?

Downgrading is complex. Better approach is to keep separate tables or maintain export process.

[Table of Contents](#delta-lake)

## What are the storage requirements for Delta Lake?

Delta Lake requires cloud storage (S3, ADLS, GCS) and transaction log directory (_delta_log).

[Table of Contents](#delta-lake)

## How do you handle Delta Lake compaction?

Use OPTIMIZE command periodically to compact small files and improve query performance.

[Table of Contents](#delta-lake)

## What is the impact of frequent writes on Delta Lake?

Frequent writes create many small files and transaction log entries, requiring periodic OPTIMIZE and VACUUM.

[Table of Contents](#delta-lake)