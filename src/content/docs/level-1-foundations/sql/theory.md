---
title: SQL Theory
description: Fundamental SQL theory and concepts
---

# SQL Theory

This section covers fundamental SQL concepts and theory essential for data engineering.

## SQL Fundamentals

### Data Definition Language (DDL)
- **CREATE**: Define tables, indexes, views, databases
- **ALTER**: Modify existing objects (tables, columns)
- **DROP**: Remove objects from the database
- **Schema**: Define structure and constraints for data

### Data Manipulation Language (DML)
- **SELECT**: Retrieve data from tables
- **INSERT**: Add new rows to tables
- **UPDATE**: Modify existing rows
- **DELETE**: Remove rows from tables

### Data Query Language (DQL)
- **Filtering**: WHERE clause to filter rows based on conditions
- **Aggregation**: GROUP BY, aggregate functions (COUNT, SUM, AVG, MIN, MAX)
- **Sorting**: ORDER BY clause to sort results
- **Limiting**: LIMIT/OFFSET for pagination

## Relational Model

### Keys
- **Primary Key**: Unique identifier for each row, enforces uniqueness and NOT NULL
- **Foreign Key**: Reference to primary key in another table, enforces referential integrity
- **Unique Key**: Ensures uniqueness of column values, allows multiple NULLs
- **Composite Key**: Multiple columns combined as primary key

### Relationships
- **One-to-One**: Each row in Table A relates to at most one row in Table B
- **One-to-Many**: Each row in Table A can relate to multiple rows in Table B
- **Many-to-Many**: Multiple rows in Table A relate to multiple rows in Table B (requires junction table)
- **Self-Referencing**: A table referencing itself (e.g., employee manager relationships)

## Normalization

### Normal Forms
- **1NF (First Normal Form)**: Atomic values, no repeating groups
- **2NF**: No partial dependencies on composite keys
- **3NF**: No transitive dependencies on non-key attributes
- **BCNF**: Stricter than 3NF; every determinant is a candidate key

### Benefits
- Reduces data redundancy
- Improves data integrity
- Simplifies queries and updates
- Reduces storage space

### Trade-offs
- Joins across normalized tables can impact performance
- Denormalization deliberately violates normalization for query optimization

## Joins

### Join Types
- **INNER JOIN**: Returns rows with matches in both tables
- **LEFT/LEFT OUTER JOIN**: Returns all rows from left table + matching rows from right
- **RIGHT/RIGHT OUTER JOIN**: Returns all rows from right table + matching rows from left
- **FULL/FULL OUTER JOIN**: Returns all rows from both tables
- **CROSS JOIN**: Cartesian product; all combinations of rows
- **SELF JOIN**: Join a table to itself

### Join Conditions
- **Equi-joins**: Join condition uses equality (most common)
- **Non-equi joins**: Join condition uses comparison operators other than =
- **Natural Joins**: Automatically matches columns with same names

## Aggregation and Grouping

### Aggregate Functions
- **COUNT()**: Number of rows or non-NULL values
- **SUM()**: Total of numeric values
- **AVG()**: Average of numeric values
- **MIN()/MAX()**: Minimum and maximum values
- **String Aggregation**: Concatenate values (e.g., STRING_AGG, GROUP_CONCAT)

### GROUP BY
- Groups rows by specified columns
- Aggregate functions applied to each group
- WHERE filters rows before grouping, HAVING filters groups after aggregation

### Window Functions
- Operate on a set of rows (window) related to current row
- ROW_NUMBER(), RANK(), DENSE_RANK() for ranking
- LAG(), LEAD() for accessing previous/next rows
- SUM() OVER() for running totals

## Indexes

### Index Types
- **Primary Key Index**: Automatically created, ensures uniqueness
- **Unique Index**: Enforces uniqueness on non-primary-key columns
- **Composite Index**: Index on multiple columns (order matters)
- **Full-Text Index**: Optimizes text search queries

### Benefits
- Speeds up data retrieval with WHERE clauses
- Improves JOIN performance
- Enforces uniqueness and referential integrity

### Trade-offs
- Slows down INSERT, UPDATE, DELETE operations
- Consumes additional storage
- Index maintenance overhead

## Query Optimization

### Execution Plan Analysis
- Understand how the database executes your query
- Identify bottlenecks (sequential scans vs. index usage)
- Look for expensive operations (sort, hash join)

### Best Practices
- Use indexes on frequently filtered/joined columns
- Avoid SELECT * when you only need specific columns
- Move filtering to WHERE clause instead of after JOIN
- Use INNER JOIN instead of LEFT JOIN when possible
- Denormalize strategically for known query patterns
- Consider materialized views for complex aggregations

## Transactions and ACID Properties

### ACID
- **Atomicity**: Transaction either fully completes or fully rolls back
- **Consistency**: Database moves from one valid state to another
- **Isolation**: Concurrent transactions don't interfere with each other
- **Durability**: Committed data persists even after failures

### Isolation Levels
- **Read Uncommitted**: Lowest isolation, allows dirty reads
- **Read Committed**: No dirty reads
- **Repeatable Read**: Prevents phantom reads
- **Serializable**: Highest isolation, transactions appear sequential

## Common Pitfalls

- **NULL Handling**: NULL in comparisons requires IS NULL, not = NULL
- **Type Coercion**: Implicit type conversion can lead to unexpected results
- **Integer Division**: Integer / Integer = Integer (truncates)
- **String Concatenation**: Different dialects use different concatenation operators
- **Subquery Correlation**: Correlated subqueries execute once per outer row (performance impact)
- **Cartesian Product**: Missing JOIN condition causes accidental cross joins
