---
title: Observability | Data Engineering
description: Master data observability concepts and interview questions. Learn monitoring signals, SLA measurement, lineage, and incident patterns for data pipelines.
---

## Data Observability: Monitoring and Incident Response

This guide covers essential observability concepts and common interview questions for data engineering roles, focusing on pipeline health, monitoring strategies, and incident response.

## Table of Contents
- [What is data observability?](#what-is-data-observability)
- [How is data observability different from application observability?](#how-is-data-observability-different-from-application-observability)
- [What are the key signals you monitor for data pipelines?](#what-are-the-key-signals-you-monitor-for-data-pipelines)
- [How do you define and measure an end-to-end SLA for data?](#how-do-you-define-and-measure-an-end-to-end-sla-for-data)
- [What should you log for each pipeline run?](#what-should-you-log-for-each-pipeline-run)
- [How do you detect silent failures?](#how-do-you-detect-silent-failures)
- [What is lineage and how does it help during incidents?](#what-is-lineage-and-how-does-it-help-during-incidents)
- [How do you monitor and debug a broken metric in BI?](#how-do-you-monitor-and-debug-a-broken-metric-in-bi)
- [How do you design alerts to avoid alert fatigue?](#how-do-you-design-alerts-to-avoid-alert-fatigue)
- [How do you approach backfills safely?](#how-do-you-approach-backfills-safely)
- [What is a runbook and what should it contain?](#what-is-a-runbook-and-what-should-it-contain)
- [What are common incident patterns in data platforms?](#what-are-common-incident-patterns-in-data-platforms)

## What is data observability?
Data observability is the practice of monitoring, alerting, and diagnosing the health of data and data pipelines. It focuses on whether datasets are arriving on time, with correct volume and values, and whether downstream consumers can rely on them. The goal is to reduce "data downtime" and speed up root-cause analysis.

## How is data observability different from application observability?
Application observability focuses on service health (latency, error rates, traces) for request/response systems. Data observability focuses on dataset health and pipeline behavior over time (freshness, completeness, distribution shifts). Data issues can be silent, delayed, and cumulative, so you need different signals and baselines.



## What are the key signals you monitor for data pipelines?
Common signals include:
- **Freshness**: Track max event/ingestion time to ensure data is arriving on schedule
- **Volume**: Monitor row counts, bytes, and partitions for anomalies
- **Schema changes**: Detect added, removed, or typed columns that may break downstream
- **Quality checks**: Validate null rates, uniqueness, and referential integrity
- **Pipeline run status**: Track job success/failure and execution duration
- **Cost signals**: Monitor query time, bytes scanned, and cluster utilization

## How do you define and measure an end-to-end SLA for data?



## How do you define and measure an end-to-end SLA for data?
You define the SLA from source event time to availability in the final dataset or BI metric. Measure it with timestamps at each stage (ingest, transform, publish) and compute percentiles (p50/p95) as well as breach counts. SLAs should reflect consumer needs and include ownership and escalation paths.



## What should you log for each pipeline run?
At minimum:
- **Inputs**: Source tables/partitions, offsets, watermarks
- **Outputs**: Target tables/partitions, row counts written
- **Runtime and resource usage**: CPU, memory, execution time
- **Warnings/errors**: Retry attempts, failure details
- **Data quality results**: Summary of validation checks

This makes runs reproducible and speeds up debugging.



## How do you detect silent failures?
Silent failures happen when the job succeeds but data is wrong (missing subset, wrong join, truncation). Detect them with dataset-level checks: freshness, volume bounds, distribution checks, and reconciliations against sources. Monitoring key business KPIs for unexpected changes is also effective.



## What is lineage and how does it help during incidents?
Lineage describes upstream/downstream dependencies between datasets, jobs, and dashboards. During incidents, lineage helps you assess blast radius (which reports are impacted) and prioritize fixes. It also helps prevent regressions by making dependencies explicit.



## How do you monitor and debug a broken metric in BI?
You start from the metric definition and trace dependencies to the underlying tables. Then check data freshness and recent changes (deploys, schema changes, upstream outages). Use reconciliation queries and sampling to locate where the metric diverged, then confirm whether it is a data issue or a definition change.



## How do you design alerts to avoid alert fatigue?
Alerts should be actionable, scoped, and owned. Use severity levels, suppression windows, and baselines that account for seasonality. Prefer multi-signal alerts (freshness + volume) over single noisy checks, and include runbooks with clear next steps.



## How do you approach backfills safely?
Backfills can be expensive and risky because they rewrite history and can change metrics. A safe approach includes running in smaller batches, validating each batch, and separating “raw” from “published” layers so you can rebuild derived tables without re-ingesting sources. You also communicate expected metric changes and schedule around peak usage.



## What is a runbook and what should it contain?
A runbook is a step-by-step guide for responding to an alert or incident. It should include impact assessment, common root causes, validation queries, mitigation steps, rollback/backfill steps, and escalation contacts. Good runbooks reduce time-to-recovery for on-call engineers.



## What are common incident patterns in data platforms?
Common patterns include:
- **Upstream outages**: Late or missing data from source systems
- **Schema changes**: Breaking transforms when columns are added/removed/changed
- **Duplicates**: Data duplication from retries or reprocessing
- **Incorrect joins**: Metric inflation due to join logic errors
- **Partition/timezone bugs**: Incorrect data filtering due to boundary issues
- **Cost spikes**: Expensive queries consuming excessive resources



