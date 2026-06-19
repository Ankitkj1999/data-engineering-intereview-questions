# Data Engineering Interview Questions - Content Organization Plan

## Overview
Organize interview questions into a progressive learning path, starting from fundamentals and building to advanced topics. Each section builds upon previous knowledge, enabling learners to gain skills incrementally.

## Learning Path Strategy

Users progress through difficulty levels at their own pace. Each level builds on previous knowledge, but learners can skip ahead if they have experience.

### Level 1: Foundations
Essential knowledge every data engineer needs.

- **Fundamentals**
  - What is data engineering?
  - Core responsibilities
  - Tech stack overview

- **Data Structures** `data-structure.md`
  - Arrays, linked lists, stacks, queues
  - Hash tables, trees, graphs
  - Why data structures matter in data engineering

- **SQL Basics** `sql.md`
  - SELECT, INSERT, UPDATE, DELETE
  - Joins, GROUP BY, aggregations
  - Window functions
  - Query optimization basics

- **Python Essentials** `python.md`
  - Variables, data types, control flow
  - Functions, modules, packages
  - File handling
  - Common data eng libraries (pandas, numpy)

### Level 2: Core Concepts
Master the core patterns that underpin data engineering.

- **Data Modeling** `data-modeling.md`
  - Dimensional modeling
  - Fact and dimension tables
  - Slowly Changing Dimensions (SCD)
  - Star schema vs snowflake schema

- **Data Warehousing & Analytics** `dwha.md`
  - Data warehouse architecture
  - OLTP vs OLAP
  - Data marts
  - Aggregation strategies

- **ETL & Data Pipelines**
  - Batch processing concepts
  - Streaming vs batch
  - Extract, Transform, Load patterns
  - Error handling and retries

- **Data Quality** `data-quality.md`
  - Quality metrics
  - Validation patterns
  - Anomaly detection
  - Data lineage

- **Data Governance** `data-governance.md`
  - Data cataloging
  - Metadata management
  - Access control
  - Compliance (GDPR, CCPA)

### Level 3: Technologies & Implementation
Deep dive into specific tools and platforms.

#### Batch Processing
- **Apache Hadoop** `hadoop.md`
  - MapReduce fundamentals
  - HDFS
  - When to use Hadoop

- **Apache Spark** `spark.md`
  - RDDs, DataFrames
  - Lazy evaluation
  - Partitioning and shuffling
  - Optimization

- **Hive** `hive.md`
  - HiveQL
  - Partitioning strategies
  - File formats

#### Streaming & Real-time
- **Apache Kafka** `kafka.md`
  - Topics, partitions, brokers
  - Consumer groups
  - Exactly-once semantics
  - Performance tuning

- **Apache Flink** `flink.md`
  - Stateful streams
  - Windows and triggers
  - Fault tolerance

#### Cloud Platforms
- **AWS** `aws.md`
  - S3, EMR, Glue
  - Redshift architecture
  - Cost optimization

- **GCP** `gcp.md`
  - BigQuery (covered separately)
  - Dataflow
  - Cloud Storage

- **Azure** `azure.md`
  - Synapse
  - Data Factory
  - Lake Storage

#### Data Warehouses
- **BigQuery** `bigquery.md`
  - Architecture
  - Partitioning & clustering
  - Cost model

- **Redshift** `redshift.md`
  - Distribution keys
  - Sort keys
  - Performance tuning

#### Databases
- **MongoDB** `mongo.md`
  - Document model
  - Indexing
  - Replication

- **Cassandra** `cassandra.md`
  - Distributed architecture
  - Consistency models
  - Partitioning

- **HBase** `hbase.md`
  - Column families
  - Read/write patterns

- **DynamoDB** `dynamodb.md`
  - Key design
  - Scaling strategies

#### Data Formats & Serialization
- **Parquet** `parquet.md`
  - Columnar storage
  - Compression
  - Schema evolution

- **Avro** `avro.md`
  - Binary serialization
  - Schema versioning

- **Delta** `delta.md`
  - ACID transactions
  - Time travel
  - Schema enforcement

- **Hudi** `hudi.md`
  - Incremental updates
  - Upserts and deletes

- **Iceberg** `iceberg.md`
  - Hidden partitioning
  - Schema evolution
  - Snapshots

#### Orchestration & Workflow
- **Apache Airflow** `airflow.md`
  - DAGs
  - Operators and sensors
  - Scheduling
  - Error handling

- **Kubernetes** `kubernetes.md`
  - Container orchestration
  - StatefulSets
  - ConfigMaps and Secrets

#### Data Ingestion
- **Apache NiFi** `nifi.md`
  - Data routing
  - Processors
  - Flow design

- **Apache Flume** `flume.md`
  - Log aggregation
  - Sources, channels, sinks

- **Change Data Capture** `cdc.md`
  - Log-based CDC
  - Query-based CDC
  - Tools and patterns

#### Transformation & Analytics
- **DBT (Data Build Tool)** `dbt.md`
  - Modular transformation
  - Testing and documentation
  - Best practices

- **SQL Engines**
  - Hive, Impala (covered separately)

- **Impala** `impala.md`
  - In-memory query engine
  - Use cases vs Hive

#### Visualization & BI
- **Tableau** `tableau.md`
  - Data connections
  - Dashboards and visualizations

- **Looker** `looker.md`
  - LookML
  - Explores and dashboards

- **Apache Superset** `superset.md`
  - Open-source BI
  - Dashboards and charts

### Level 4: Advanced Topics
Complex patterns, architecture, and optimization.

- **System Design** `system-design.md`
  - End-to-end pipeline design
  - Real-time ingestion
  - Idempotency patterns
  - Multi-tenant systems
  - Observability architecture

- **Cost Optimization** `cost-optimization.md`
  - Cloud cost management
  - Resource allocation
  - Storage optimization

- **Observability** `observability.md`
  - Monitoring
  - Logging
  - Alerting
  - Tracing

## Content Format & Structure

Each topic should follow this structure:

```markdown
---
title: Topic Name
description: Brief description
difficulty: Beginner|Intermediate|Advanced
timeEstimate: 10-15 min
---

# Topic Name

## Quick Summary
[1-2 sentence overview]

## Key Concepts
- Concept 1: Brief explanation
- Concept 2: Brief explanation

## Questions & Answers

### Question 1
[Question]

**Answer:**
[Detailed answer with examples]

**Key Takeaways:**
- Point 1
- Point 2

### Question 2
[Similar structure]

## Common Interview Scenarios
[Real-world scenarios related to the topic]

## Further Reading
[Links to documentation/resources]
```

## Directory Structure in Starlight

```
src/content/docs/
├── index.md
├── getting-started/
│   ├── index.md
│   └── how-to-use.md
├── level-1-foundations/
│   ├── index.md
│   ├── fundamentals.md
│   ├── data-structures.md
│   ├── sql-basics.md
│   └── python-essentials.md
├── level-2-core-concepts/
│   ├── index.md
│   ├── data-modeling.md
│   ├── data-warehousing.md
│   ├── etl-pipelines.md
│   ├── data-quality.md
│   └── data-governance.md
├── level-3-technologies/
│   ├── index.md
│   ├── batch-processing/
│   │   ├── index.md
│   │   ├── hadoop.md
│   │   ├── spark.md
│   │   └── hive.md
│   ├── streaming/
│   │   ├── index.md
│   │   ├── kafka.md
│   │   └── flink.md
│   ├── cloud/
│   │   ├── index.md
│   │   ├── aws.md
│   │   ├── gcp.md
│   │   └── azure.md
│   ├── databases/
│   │   ├── index.md
│   │   ├── bigquery.md
│   │   ├── redshift.md
│   │   ├── mongodb.md
│   │   ├── cassandra.md
│   │   ├── hbase.md
│   │   └── dynamodb.md
│   ├── formats/
│   │   ├── index.md
│   │   ├── parquet.md
│   │   ├── avro.md
│   │   ├── delta.md
│   │   ├── hudi.md
│   │   └── iceberg.md
│   ├── orchestration/
│   │   ├── index.md
│   │   ├── airflow.md
│   │   └── kubernetes.md
│   ├── ingestion/
│   │   ├── index.md
│   │   ├── nifi.md
│   │   ├── flume.md
│   │   └── cdc.md
│   ├── transformation/
│   │   ├── index.md
│   │   ├── dbt.md
│   │   └── impala.md
│   └── bi/
│       ├── index.md
│       ├── tableau.md
│       ├── looker.md
│       └── superset.md
└── level-4-advanced/
    ├── index.md
    ├── system-design.md
    ├── cost-optimization.md
    └── observability.md
```

## Starlight Configuration

Update `astro.config.mjs` with this sidebar structure:

```javascript
sidebar: [
  {
    label: "Getting Started",
    autogenerate: { directory: "getting-started" },
  },
  {
    label: "Level 1: Foundations",
    collapsed: false,
    autogenerate: { directory: "level-1-foundations" },
  },
  {
    label: "Level 2: Core Concepts",
    collapsed: true,
    autogenerate: { directory: "level-2-core-concepts" },
  },
  {
    label: "Level 3: Technologies",
    collapsed: true,
    autogenerate: { directory: "level-3-technologies" },
  },
  {
    label: "Level 4: Advanced",
    collapsed: true,
    autogenerate: { directory: "level-4-advanced" },
  },
];
```

## Implementation Tasks

### Task 1: Import & Convert Content
- [ ] Copy all `.md` files from data directory
- [ ] Add frontmatter with difficulty, time estimates
- [ ] Convert internal links from `[link](file.md)` to Starlight format
- [ ] Add metadata tags for search/filtering

### Task 2: Organize by Phase
- [ ] Create directory structure
- [ ] Sort and rename files with numeric prefixes
- [ ] Create index files for each section

### Task 3: Enhance Content
- [ ] Add "difficulty" metadata to each topic
- [ ] Add "timeEstimate" metadata
- [ ] Add "prerequisites" metadata
- [ ] Add "tags" for cross-referencing

### Task 4: Create Navigation
- [ ] Update Starlight config with full sidebar
- [ ] Create section index pages
- [ ] Add breadcrumbs and next/prev navigation
- [ ] Add search keywords

### Task 5: Add Learning Path
- [ ] Create "Learning Path" page showing recommended order
- [ ] Add progress tracking UI (optional)
- [ ] Create prerequisite maps

## Key Benefits of This Approach

1. **Self-Paced Learning**: No time constraints—users learn at their own speed
2. **Clear Progression**: 4 difficulty levels guide learners naturally (but not mandatorily)
3. **Flexible Navigation**: Jump to any topic when needed for your role or interests
4. **Modular**: Each topic is independent and can be studied standalone
5. **Searchable**: Clear structure makes content easy to find
6. **Difficulty Levels**: Users can self-assess and choose appropriate starting point
7. **Technology-Focused**: Level 3 organizes tools by purpose (batch, streaming, cloud, etc.)
8. **Practical**: Foundation → Concepts → Tools → Advanced patterns progression mirrors real-world learning

## Next Steps

1. Begin with Task 1: Import content files
2. Reorganize into phases
3. Add metadata and frontmatter
4. Update Starlight configuration
5. Test navigation and search
