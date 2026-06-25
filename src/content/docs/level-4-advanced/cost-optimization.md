---
title: Cost Optimization
description: Interview questions covering cost optimization
---

## Cost Optimization: Sustainable Data Platforms

**Master cost optimization techniques for building efficient, scalable data platforms that remain sustainable at scale.**

## Table of Contents
- [Core skill importance](#cost-optimization-core-skill)
- [Main cost drivers](#main-cost-drivers)
- [Partitioning impact](#partitioning-strategy)
- [Small files problem](#small-files-problem)
- [File size targets](#file-size-targets)
- [Data skew detection](#data-skew-detection-and-fixes)
- [Shuffle optimization](#shuffle-reduction)
- [Materialization strategy](#materialization-strategy)
- [Query protection](#query-protection-and-limits)
- [Join optimization](#join-optimization)
- [Backfill planning](#backfill-cost-planning)
- [FinOps metrics](#finops-metrics-tracking)

---

### Cost optimization core skill

Data platforms can scale costs linearly or worse with data volume and usage. Cost optimization ensures the platform remains sustainable while meeting SLAs. It requires understanding storage layout, compute behavior, query patterns, and operational practices like backfills and compaction.

---

### Main cost drivers

Typical drivers include:
- **compute time** (clusters, warehouses, serverless slots)
- **bytes scanned and shuffles**
- **storage growth** (raw + derived + duplicates)
- **data movement** (egress, cross-region transfers)
- **operational overhead** (frequent backfills, retries)

---

### Partitioning strategy

Good partitioning reduces scanned data by enabling partition pruning. Bad partitioning creates too many small partitions, increasing metadata overhead and small files. Partitioning should match common query filters and data distribution, and be reevaluated as workloads evolve.

---

### Small files problem

Small files increase scheduling and metadata overhead and reduce scan efficiency. Engines spend more time opening and planning files than processing data. Small files often appear from streaming writes or overly granular partitions and typically require compaction or clustering to fix.

---

### File size targets

You choose a size that balances parallelism and overhead. Too small increases file count and planning cost; too large reduces parallelism and can slow selective queries. Many teams target hundreds of MB per file, but the correct value depends on the engine, storage, and query patterns.

---

### Data skew detection and fixes

Skew happens when some partitions have much more data than others, causing straggler tasks. Detect it via task duration distributions and partition size metrics. Fixes include salting keys, using skew-aware joins, repartitioning, or changing the join strategy (broadcast when possible).

---

### Shuffle reduction

Shuffle is data redistribution across executors (for joins, group by, distinct). It is expensive due to network IO and disk spills. You reduce shuffle by using proper partitioning, avoiding wide transformations, filtering early, broadcasting small tables, and tuning shuffle partitions.

---

### Materialization strategy

Materialize when many downstream queries reuse expensive computations or when interactive BI requires low latency. Avoid over-materialization because it increases storage and refresh complexity. A good approach is to materialize stable, high-value marts and keep exploratory logic as views.

---

### Query protection and limits

Use workload management: query timeouts, concurrency limits, resource quotas, and separate compute for heavy workloads. Enforce best practices with guardrails (linting, cost alerts) and educate users with profiling tools. Multi-tenant platforms typically need isolation to prevent one team from impacting others.

---

### Join optimization

You optimize joins by ensuring join keys are clean and well-distributed, filtering before joins, and choosing appropriate join strategies (broadcast vs shuffle). You also reduce the size of join inputs (select only needed columns) and consider pre-joining into curated marts when joins are repeated.

---

### Backfill cost planning

Estimate based on data volume, compute requirements, and expected scan/shuffle behavior. Run on a small sample window to measure throughput and extrapolate. Backfills should be staged, monitored, and preferably run in off-peak windows, with a clear rollback plan.

---

### FinOps metrics tracking

Common metrics include cost by team/project, cost per pipeline, bytes scanned per query, cluster utilization, storage growth by layer, and top expensive datasets/queries. You also track trend changes (week-over-week) and tie cost to value (usage, criticality).

---

## Next Steps

- **Data warehouses**: Review [Data Warehouses](/level-3-technologies/databases/)
- **Batch processing**: Explore [Spark](/level-3-technologies/batch-processing/spark/)
- **System design**: Check [System Design](/level-4-advanced/system-design/)
