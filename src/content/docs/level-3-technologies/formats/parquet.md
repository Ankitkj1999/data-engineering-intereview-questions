---
title: Parquet
description: Interview questions covering Parquet columnar storage format, compression, schema evolution, and data analytics optimization.
---

# Parquet: Columnar Storage Format

+ [What is Parquet](#what-is-parquet)
+ [What are the key benefits of Parquet](#what-are-the-key-benefits-of-parquet)
+ [What is columnar storage](#what-is-columnar-storage)
+ [How does Parquet compare to CSV](#how-does-parquet-compare-to-csv)
+ [What is the structure of a Parquet file](#what-is-the-structure-of-a-parquet-file)
+ [What compression algorithms does Parquet support](#what-compression-algorithms-does-parquet-support)
+ [What is Snappy compression](#what-is-snappy-compression)
+ [What is Gzip compression](#what-is-gzip-compression)
+ [What is LZO compression](#what-is-lzo-compression)
+ [How does Parquet handle schema evolution](#how-does-parquet-handle-schema-evolution)
+ [What is a Parquet footer](#what-is-a-parquet-footer)
+ [What is a row group in Parquet](#what-is-a-row-group-in-parquet)
+ [What is a column chunk](#what-is-a-column-chunk)
+ [How do you read Parquet files](#how-do-you-read-parquet-files)
+ [How do you write Parquet files](#how-do-you-write-parquet-files)
+ [What is Parquet predicate pushdown](#what-is-parquet-predicate-pushdown)
+ [How does Parquet optimize query performance](#how-does-parquet-optimize-query-performance)
+ [What is min-max statistics in Parquet](#what-is-min-max-statistics-in-parquet)
+ [How does Parquet handle missing values](#how-does-parquet-handle-missing-values)
+ [What are the supported data types in Parquet](#what-are-the-supported-data-types-in-parquet)
+ [Can Parquet store nested data structures](#can-parquet-store-nested-data-structures)
+ [What is the difference between Parquet and ORC](#what-is-the-difference-between-parquet-and-orc)
+ [How is Parquet used in Apache Spark](#how-is-parquet-used-in-apache-spark)
+ [What is Parquet used for in data lakes](#what-is-parquet-used-for-in-data-lakes)
+ [How do you partition Parquet files](#how-do-you-partition-parquet-files)
+ [What is the impact of partitioning on query performance](#what-is-the-impact-of-partitioning-on-query-performance)
+ [How do you optimize Parquet file size](#how-do-you-optimize-parquet-file-size)
+ [What is dictionary encoding in Parquet](#what-is-dictionary-encoding-in-parquet)
+ [How does Parquet handle data type conversion](#how-does-parquet-handle-data-type-conversion)
+ [What are common use cases for Parquet](#what-are-common-use-cases-for-parquet)

## What is Parquet?

Parquet is an open-source columnar storage format designed for efficient data analytics and storage. It's widely used in big data platforms for storing and processing large datasets.

[Table of Contents](#parquet)

## What are the key benefits of Parquet?

Key benefits include efficient compression, faster query performance, reduced storage costs, excellent schema evolution support, and compatibility with multiple data processing frameworks.

[Table of Contents](#parquet)

## What is columnar storage?

Columnar storage stores data by columns instead of rows, allowing efficient compression and faster query performance when accessing specific columns.

[Table of Contents](#parquet)

## How does Parquet compare to CSV?

Parquet is compressed (saves 90% storage), faster to read (only reads needed columns), supports nested data, and has better data type preservation. CSV is text-based, uncompressed, and less efficient.

[Table of Contents](#parquet)

## What is the structure of a Parquet file?

A Parquet file contains: magic bytes (header), one or more row groups, metadata, and a footer with schema and statistics information.

[Table of Contents](#parquet)

## What compression algorithms does Parquet support?

Parquet supports Snappy, Gzip, LZO, Brotli, LZ4, ZSTD, and uncompressed formats. Snappy is the default.

[Table of Contents](#parquet)

## What is Snappy compression?

Snappy is a fast compression algorithm that prioritizes speed over compression ratio, offering good balance between compression and performance.

[Table of Contents](#parquet)

## What is Gzip compression?

Gzip provides higher compression ratios than Snappy but is slower. It's suitable when storage cost is more important than query speed.

[Table of Contents](#parquet)

## What is LZO compression?

LZO provides fast compression/decompression with moderate compression ratios. It's useful for bandwidth-limited scenarios.

[Table of Contents](#parquet)

## How does Parquet handle schema evolution?

Parquet supports adding, removing, and reordering columns, allowing schema changes without rewriting entire files.

[Table of Contents](#parquet)

## What is a Parquet footer?

The footer contains metadata about the file: schema, row group information, column statistics, and encoding information.

[Table of Contents](#parquet)

## What is a row group in Parquet?

A row group is a collection of rows that are stored together. Each row group contains column chunks for each column.

[Table of Contents](#parquet)

## What is a column chunk?

A column chunk is the data for a single column within a row group, stored in columnar format.

[Table of Contents](#parquet)

## How do you read Parquet files?

Use libraries like PySpark, Pandas, PyArrow, or Spark SQL with `read.parquet()` or similar methods.

[Table of Contents](#parquet)

## How do you write Parquet files?

Use `write.parquet()` or `to_parquet()` methods in Spark, Pandas, or PyArrow with optional compression and partitioning.

[Table of Contents](#parquet)

## What is Parquet predicate pushdown?

Predicate pushdown pushes filtering conditions down to the storage layer, reading only relevant column chunks instead of scanning entire files.

[Table of Contents](#parquet)

## How does Parquet optimize query performance?

Through columnar storage (read only needed columns), compression (less data transfer), predicate pushdown (skip irrelevant data), and statistics (skip row groups).

[Table of Contents](#parquet)

## What is min-max statistics in Parquet?

Min-max statistics store the minimum and maximum values for each column chunk, enabling the query engine to skip row groups that don't match filter conditions.

[Table of Contents](#parquet)

## How does Parquet handle missing values?

Missing values are represented as NULL and tracked in the file metadata, maintaining data integrity.

[Table of Contents](#parquet)

## What are the supported data types in Parquet?

Parquet supports: INT32, INT64, INT96, FLOAT, DOUBLE, BYTE_ARRAY, FIXED_LEN_BYTE_ARRAY, BOOLEAN, and decimal types.

[Table of Contents](#parquet)

## Can Parquet store nested data structures?

Yes, Parquet supports nested/complex types like arrays, maps, and structs through its record shredding and assembly algorithm.

[Table of Contents](#parquet)

## What is the difference between Parquet and ORC?

Both are columnar formats, but Parquet is more universal (works everywhere), while ORC is optimized for Hive and provides better compression ratios.

[Table of Contents](#parquet)

## How is Parquet used in Apache Spark?

Spark uses Parquet as a default storage format, reading/writing DataFrames in Parquet with built-in optimizations and compression support.

[Table of Contents](#parquet)

## What is Parquet used for in data lakes?

Parquet is the standard format for data lakes because of efficient storage, query performance, schema evolution support, and compatibility with various tools.

[Table of Contents](#parquet)

## How do you partition Parquet files?

Partition by adding directory structure (e.g., `/year=2024/month=06/`) which enables partition pruning for faster queries.

[Table of Contents](#parquet)

## What is the impact of partitioning on query performance?

Partitioning dramatically improves performance by reducing data scanned. Queries only read relevant partitions.

[Table of Contents](#parquet)

## How do you optimize Parquet file size?

Use appropriate compression, set optimal row group sizes, choose suitable encoding, and remove unnecessary columns.

[Table of Contents](#parquet)

## What is dictionary encoding in Parquet?

Dictionary encoding replaces repeated values with dictionary indices, reducing file size for low-cardinality columns.

[Table of Contents](#parquet)

## How does Parquet handle data type conversion?

Parquet supports logical types that map to physical types, allowing automatic conversion while maintaining data semantics.

[Table of Contents](#parquet)

## What are common use cases for Parquet?

Common uses: data lake storage, Spark/Hadoop processing, analytics queries, ETL pipelines, and cloud data warehouse integration.

[Table of Contents](#parquet)