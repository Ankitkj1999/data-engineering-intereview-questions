---
title: System Design
description: Interview questions covering system design
---

## Data System Design: Architecture & Patterns

**Master system design concepts for building scalable data platforms and pipelines.**

## Table of Contents
- [Batch analytics pipeline design](#batch-analytics-pipeline-design)
- [Near-real-time ingestion pipeline](#near-real-time-ingestion-pipeline)
- [Ensuring idempotency](#ensuring-idempotency-in-data-pipelines)
- [Late arriving events and backfills](#late-arriving-events-and-backfills)
- [Batch vs Streaming](#batch-vs-streaming-choice)
- [Raw/Silver/Gold layers](#rawsilvergold-layers)
- [Multi-tenancy design](#multi-tenancy-platform-design)
- [Schema evolution](#schema-evolution)
- [Pipeline reliability patterns](#pipeline-reliability-patterns)
- [Platform observability](#platform-observability)
- [Cost optimization](#cost-vs-sla-management)

---

### Batch analytics pipeline design

A typical design is ingestion into a raw layer (immutable), transformation into curated datasets (cleaned and modeled), and publishing into marts/BI-serving datasets. You define SLAs, data quality checks, and ownership for each dataset. Batch pipelines are often scheduled daily/hourly and optimized for correctness and cost.

---

### Near-real-time ingestion pipeline

You typically use an event log or CDC stream (Kafka/PubSub/Kinesis) and write to a raw append-only store with durable offsets. Downstream, you materialize current-state tables and metrics with windowing and deduplication. You must design for replays, ordering, and late events.

---

### Ensuring idempotency in data pipelines

Idempotency means retries do not change the final result. Common strategies include writing with deterministic keys (upserts/merges), using exactly-once features where available, and keeping raw data immutable while rebuilding derived layers. You also store checkpoints/watermarks consistently with writes.

---

### Late arriving events and backfills

You define allowed lateness and design tables by event time, not just ingestion time. For late events, you reprocess affected windows/partitions and update derived outputs deterministically. Backfills should be incremental, validated, and isolated so they do not corrupt current reporting.

---

### Batch vs Streaming choice

Streaming is chosen for low latency and continuous updates, but it adds complexity (state, ordering, exactly-once). Batch is simpler and often cheaper for many analytics use cases. Many real systems are hybrid: streaming ingestion into raw, batch modeling into marts.

---

### Raw/Silver/Gold layers

Bronze/raw is immutable ingestion with minimal transformation. Silver is cleaned, standardized, and deduplicated data with consistent schemas. Gold is business-ready marts and aggregates designed for BI and applications. This layering helps with reprocessing, governance, and clear contracts.

---

### Multi-tenancy platform design

You need isolation (separate compute or quotas), clear ownership, and strong governance. Provide shared standards for naming, testing, and documentation, and a catalog for discovery. Multi-tenancy also requires controlling cost and preventing one team's workloads from impacting others.

---

### Schema evolution

You define compatibility rules, version schemas/contracts, and enforce them in CI and ingestion. Downstream transforms should tolerate additive fields but fail fast on breaking changes. You also maintain backward-compatible outputs where multiple consumers depend on stable schemas.

---

### Pipeline reliability patterns

Common patterns include idempotent writes, retries with backoff, dead-letter queues, exactly-once or effectively-once processing, and separation of raw from derived layers. You also use checkpointing and consistent watermark management to avoid gaps and duplicates.

---

### Platform observability

You monitor freshness, volume, quality, and lineage, plus pipeline runtime and failure rates. Alerts should be actionable with runbooks. Observability should be end-to-end: from source to final BI datasets and critical metrics.

---

### Cost vs SLA management

You optimize storage layout (partitioning, file sizes), avoid unnecessary recomputation, and use selective materialization. You also schedule heavy jobs off-peak, enforce resource quotas, and track cost per dataset/pipeline. Cost is part of design, not just an afterthought.

---

## Next Steps

- **Learn more about data pipelines**: Review [Batch Processing](/level-3-technologies/batch-processing/)
- **Real-time systems**: Explore [Streaming](/level-3-technologies/streaming/)
- **Orchestration**: Check out [Airflow](/level-3-technologies/orchestration/airflow/)
