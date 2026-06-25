---
title: DBT
description: Interview questions covering DBT transformation framework, models, testing, and best practices for data engineers.
---

## DBT: Transform Data with SQL & DAGs

**Master dbt concepts including models, tests, snapshots, and CI/CD practices for modern data workflows.**

## Table of Contents
- [What is dbt?](#what-is-dbt)
- [How is dbt different from Airflow?](#how-is-dbt-different-from-airflow)
- [What is a dbt model?](#what-is-a-dbt-model)
- [What does ref() do?](#what-does-ref-do)
- [Typical dbt layers](#typical-layers-in-a-dbt-project)
- [Materializations](#what-is-a-materialization-in-dbt)
- [View vs Table materializations](#when-would-you-use-view-vs-table-materializations)
- [Incremental models](#what-is-an-incremental-model-and-what-problems-does-it-solve)
- [Unique keys for incremental models](#how-do-you-design-a-reliable-unique_key)
- [dbt tests](#what-are-dbt-tests-and-what-types-exist)
- [Sources and testing](#what-are-sources-in-dbt-and-how-do-you-test-them)
- [Snapshots](#what-are-snapshots-in-dbt-and-when-would-you-use-them)
- [Macros](#what-are-macros-in-dbt-and-when-should-you-use-them)
- [State selection](#what-is-dbt-state-selection)
- [CI/CD for dbt](#how-do-you-approach-cicd-for-dbt-projects)

---

### What is dbt?

dbt (data build tool) is a transformation framework where you write transformations as SQL (and Jinja-templated SQL), and dbt builds a DAG of models and runs them in the right order. It is commonly used to transform raw data into cleaned, documented, tested analytics tables in a warehouse/lakehouse.

---

### How is dbt different from Airflow?

Airflow is an orchestration system that schedules and coordinates tasks of any kind. dbt focuses specifically on SQL-based transformations and their dependency graph, plus testing and documentation. In practice, Airflow often runs dbt as one step of a larger pipeline (ingestion → transform → publish).

---

### What is a dbt model?

A dbt model is a select query stored as a `.sql` file in the `models/` directory. dbt materializes the model into a relation in your warehouse (view/table/incremental) and manages dependencies between models.

---

### What does ref() do?

`ref('model_name')` declares a dependency on another dbt model. dbt uses it to build the DAG, order execution, and resolve the correct schema/database per environment. It also enables features like automated lineage in dbt docs.

---

### Typical layers in a dbt project

A common pattern is:
- **staging**: light cleaning and renaming, close to sources
- **intermediate**: reusable transformations and joins
- **marts**: business-facing fact/dimension tables and metrics-ready datasets

This makes models easier to test, reuse, and maintain.

---

### What is a materialization in dbt?

A materialization defines how dbt builds a model in the warehouse (for example as a view, table, or incremental table). It controls the build strategy and how changes are applied over time.

---

### When would you use view vs table materializations?

Views are useful for fast iteration and when compute cost per query is acceptable. Tables are useful when queries are expensive or many downstream queries reuse the same result. The trade-off is storage cost and the need to keep tables updated.

---

### What is an incremental model and what problems does it solve?

An incremental model only processes new or changed data instead of rebuilding the entire table each run. It reduces runtime and cost for large datasets. It requires correct keys and logic to avoid duplicates and missed updates.

---

### How do you design a reliable unique_key?

The `unique_key` should uniquely identify a record in the target table, usually a stable business key or a surrogate key derived from stable columns. If the source can update records, you also need a deterministic "latest record" rule (for example using an `updated_at` column) so merges are correct.

---

### What are dbt tests and what types exist?

dbt supports:
- **generic tests** (built-in or custom): `unique`, `not_null`, `accepted_values`, `relationships`
- **singular tests**: custom SQL queries that should return zero failing rows

Tests run as queries in the warehouse and fail the run if assertions are violated.

---

### What are sources in dbt and how do you test them?

Sources declare upstream tables and their metadata in `sources.yml`. You can test sources with freshness checks and column-level tests (like `not_null`) to detect broken ingestion or schema drift early.

---

### What are snapshots in dbt and when would you use them?

Snapshots capture slowly changing dimension history by tracking changes in source records over time. They are useful when you need point-in-time analysis or to implement SCD2-style history from mutable source tables.

---

### What are macros in dbt and when should you use them?

Macros are Jinja functions that generate SQL. Use them to avoid repetition (standardized column selection, reusable filters, dynamic SQL) and to keep business logic consistent across models. Overusing macros for complex logic can hurt readability and debugging.

---

### What is dbt state selection?

State selection runs only models that changed (and their dependents) compared to a previous artifact state. In CI, this reduces runtime by avoiding full rebuilds, while still validating that changes compile, run, and pass tests for affected parts of the DAG.

---

### How do you approach CI/CD for dbt projects?

A common approach is:
- **in CI**: `dbt deps`, `dbt compile`, run selected models/tests (state-based or tags)
- **in CD**: deploy artifacts and run scheduled jobs in production

You usually also enforce code review, documentation, and data tests for critical marts.

---

## Next Steps

- **Learn more about data transformation**: Explore [Data Warehouses](/level-3-technologies/databases/)
- **Practice with SQL**: Check out [SQL Basics](/level-1-foundations/sql/basics/) to strengthen SQL skills
- **Orchestration**: Review [Airflow](/level-3-technologies/orchestration/airflow/) for workflow management
