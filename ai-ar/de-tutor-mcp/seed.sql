INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-01', 'SQL Fundamentals', 'What is SQL and what is it used for?', 'SQL (Structured Query Language) is the standard programming language for managing relational databases. It enables data professionals to create, read, update, and delete data (CRUD), manage schemas, and perform data analysis.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-02', 'SQL Fundamentals', 'Describe the difference between SQL and NoSQL databases.', '- **SQL** — relational, structured schema, ACID compliance, tables with rows/columns
- **NoSQL** — non-relational, flexible schema, eventual consistency, document/key-value/graph models', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-03', 'SQL Fundamentals', 'What are the different types of SQL commands?', '- **DDL** — Data Definition (`CREATE`, `ALTER`, `DROP`)
- **DML** — Data Manipulation (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
- **DCL** — Data Control (`GRANT`, `REVOKE`)
- **TCL** — Transaction Control (`COMMIT`, `ROLLBACK`, `SAVEPOINT`)', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-04', 'SQL Fundamentals', 'Explain the purpose of the SELECT statement.', 'Retrieves data from tables.

```sql
SELECT columns FROM table WHERE conditions ORDER BY columns;
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-05', 'SQL Fundamentals', 'What is the difference between WHERE and HAVING clauses?', '- **`WHERE`** — filters rows *before* `GROUP BY`
- **`HAVING`** — filters groups *after* aggregation', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-06', 'SQL Fundamentals', 'Define what a JOIN is in SQL and list its types.', 'JOINs combine rows based on related columns.

- **`INNER JOIN`** — matching rows only
- **`LEFT`/`RIGHT JOIN`** — all rows from one side + matching from the other
- **`FULL OUTER JOIN`** — all rows from both tables
- **`CROSS JOIN`** — Cartesian product', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-07', 'SQL Fundamentals', 'What is a primary key in a database?', 'The unique identifier for each row. Cannot be `NULL`, must be unique — enforces entity integrity.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-08', 'SQL Fundamentals', 'Explain what a foreign key is and how it is used.', 'A column referencing another table''s primary key. Enforces referential integrity and creates relationships between tables.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-09', 'SQL Fundamentals', 'How can you prevent SQL injections?', 'Parameterized queries (prepared statements), input validation, least-privilege database accounts, and stored procedures used cautiously — never build queries by concatenating raw user input.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-10', 'SQL Fundamentals', 'What is normalization? Explain with examples.', 'Organizing data to reduce redundancy:

- **1NF** — atomic values, no repeating groups
- **2NF** — every non-key column fully depends on the whole primary key
- **3NF** — no transitive dependencies (non-key columns depend only on the key)', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-11', 'SQL Fundamentals', 'Describe the concept of denormalization and when you would use it.', 'Deliberately adding redundant data to improve read performance, at the cost of write complexity and storage. Common in data warehouses and read-heavy applications where join cost outweighs storage cost.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-12', 'SQL Fundamentals', 'What are indexes and how can they improve query performance?', 'B-tree structures that enable fast lookups. They speed up `WHERE`/`JOIN`/`ORDER BY`, but slow down `INSERT`/`UPDATE`/`DELETE` since the index has to be maintained on every write.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-13', 'SQL Fundamentals', 'Explain the purpose of the GROUP BY clause.', 'Groups rows into summary rows so aggregate functions (`COUNT`, `SUM`, `AVG`, ...) can be applied per group instead of across the whole table.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-14', 'SQL Fundamentals', 'What is a subquery, and when would you use one?', 'A query nested inside `SELECT`, `WHERE`, or `FROM`. Used for complex filtering that depends on the result of another query — for example, filtering rows above an aggregate computed elsewhere.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-15', 'SQL Fundamentals', 'Describe the functions of the ORDER BY clause.', 'Sorts the result set in ascending (`ASC`, default) or descending (`DESC`) order, by one or more columns.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-16', 'SQL Fundamentals', 'What are aggregate functions in SQL?', 'Functions that compute a single value from multiple rows: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-17', 'SQL Fundamentals', 'Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.', '- **`INNER`** — only matching rows
- **`LEFT`** — all left rows + matching right rows (`NULL` if no match)
- **`RIGHT`** — all right rows + matching left rows (`NULL` if no match)
- **`FULL`** — all rows from both tables', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-18', 'SQL Fundamentals', 'How do you insert a new row into a database table?', '```sql
INSERT INTO table (col1, col2) VALUES (val1, val2);
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-19', 'SQL Fundamentals', 'Explain how to update records in a database table.', '```sql
UPDATE table SET col1 = val1 WHERE condition;
```
Always scope with `WHERE` — omitting it updates every row.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-fund-20', 'SQL Fundamentals', 'What is a SQL View and what are its advantages?', 'A virtual table based on a stored `SELECT` query. Advantages: simplifies repeated complex queries, provides a security layer (expose only certain columns/rows), and centralizes reusable logic.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-01', 'SQL Data Types and Operators', 'List the different data types available in SQL.', '- **Numeric** — `INT`, `DECIMAL`
- **String** — `CHAR`, `VARCHAR`, `TEXT`
- **Date/Time** — `DATE`, `TIMESTAMP`', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-02', 'SQL Data Types and Operators', 'What are the differences between CHAR, VARCHAR, and TEXT data types?', '- **`CHAR`** — fixed length, padded with spaces
- **`VARCHAR`** — variable length, up to a defined limit
- **`TEXT`** — large variable-length text, typically no practical limit', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-03', 'SQL Data Types and Operators', 'How do you use the BETWEEN operator in SQL?', '```sql
SELECT * FROM table WHERE column BETWEEN 10 AND 20;
```
Inclusive of both endpoints.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-04', 'SQL Data Types and Operators', 'Describe the use of the IN operator.', '```sql
SELECT * FROM table WHERE column IN (val1, val2, val3);
```
Shorthand for chaining several `OR` conditions on the same column.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-05', 'SQL Data Types and Operators', 'Explain the use of wildcard characters in SQL.', '`%` matches any sequence of characters, `_` matches exactly one character. Used with `LIKE`.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-06', 'SQL Data Types and Operators', 'What is the purpose of the LIKE operator?', 'Pattern matching on strings:

```sql
SELECT * FROM users WHERE name LIKE ''J%'';
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-07', 'SQL Data Types and Operators', 'How do you handle NULL values in SQL?', 'Use `IS NULL` / `IS NOT NULL` for comparisons — `= NULL` never matches. Functions like `COALESCE` and `ISNULL` substitute a default when a value is `NULL`.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-08', 'SQL Data Types and Operators', 'What does the COALESCE function do?', 'Returns the first non-`NULL` value in its argument list:

```sql
SELECT COALESCE(phone, email, ''N/A'');
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-09', 'SQL Data Types and Operators', 'What is the difference between UNION and UNION ALL?', '- **`UNION`** — combines result sets, removes duplicates (extra sort/dedup cost)
- **`UNION ALL`** — combines result sets, keeps duplicates (faster, no dedup pass)', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-types-10', 'SQL Data Types and Operators', 'Describe the use of arithmetic operators in SQL queries.', 'Standard operators (`+`, `-`, `*`, `/`) can be used directly in `SELECT` and `WHERE` clauses to compute or filter on derived numeric values.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-01', 'SQL Advanced Queries', 'Explain how to use the CASE statement in SQL.', '```sql
SELECT CASE WHEN age < 18 THEN ''Minor'' ELSE ''Adult'' END FROM users;
```
Works like an inline if/else — usable in `SELECT`, `WHERE`, and `ORDER BY`.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-02', 'SQL Advanced Queries', 'How would you perform a self JOIN?', '```sql
SELECT e1.name, e2.name
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;
```
Joins a table to itself via two aliases — common for hierarchical relationships like employee/manager.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-03', 'SQL Advanced Queries', 'What is a cross JOIN and when would you use it?', 'Produces the Cartesian product of two tables (every row of A paired with every row of B). Used for generating test data or combining independent dimensions (e.g. all product/color combinations).', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-04', 'SQL Advanced Queries', 'How to implement pagination in SQL queries?', '```sql
-- MySQL / PostgreSQL
SELECT * FROM table ORDER BY id LIMIT 10 OFFSET 20;

-- SQL Server
SELECT * FROM table ORDER BY id OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;
```
Always pair with `ORDER BY` — without it, page boundaries aren''t guaranteed to be stable.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-05', 'SQL Advanced Queries', 'Explain the concept of Common Table Expressions (CTEs) and recursive CTEs.', 'A CTE (`WITH` clause) creates a temporary named result set scoped to one query, improving readability over nested subqueries. A **recursive CTE** references itself to walk hierarchical data (org charts, category trees) level by level.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-06', 'SQL Advanced Queries', 'What are window functions and how are they used?', 'Functions that compute a value across a "window" of related rows without collapsing them into one row, unlike `GROUP BY`.

```sql
SELECT name, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;
```
Common ones: `ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-07', 'SQL Advanced Queries', 'How can you concatenate column values in SQL?', '- **Standard SQL / PostgreSQL** — `||`
- **MySQL** — `CONCAT(a, b)`
- **SQL Server** — `+`', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-08', 'SQL Advanced Queries', 'What is the PIVOT operation and how would you apply it?', 'Transforms distinct row values into columns. SQL Server has a native `PIVOT` keyword; most other databases emulate it with conditional aggregation:

```sql
SELECT
    department,
    SUM(CASE WHEN quarter = ''Q1'' THEN revenue END) AS q1,
    SUM(CASE WHEN quarter = ''Q2'' THEN revenue END) AS q2
FROM sales
GROUP BY department;
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-09', 'SQL Advanced Queries', 'Explain combining GROUP BY with ORDER BY.', '`ORDER BY` runs after `GROUP BY` (and after `HAVING`), so it sorts the already-aggregated result rows — you can order by an aggregate expression like `COUNT(*)`.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-adv-10', 'SQL Advanced Queries', 'How would you find duplicate records in a table?', '```sql
SELECT col, COUNT(*)
FROM table
GROUP BY col
HAVING COUNT(*) > 1;
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-01', 'Database Design & Architecture', 'What is the Entity-Relationship Model?', 'A conceptual model using entities (tables), attributes (columns), and relationships between entities to design a database before implementation.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-02', 'Database Design & Architecture', 'Explain the different types of database schema.', '- **Conceptual** — high-level business view, no implementation detail
- **Logical** — structure (entities, relationships, attributes) without DBMS-specific detail
- **Physical** — the actual implementation: tables, indexes, storage', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-03', 'Database Design & Architecture', 'What are Stored Procedures and how are they beneficial?', 'Precompiled, named blocks of SQL stored in the database. Benefits: reduced network round trips, centralized/reusable logic, tighter access control, and execution plan caching.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-04', 'Database Design & Architecture', 'What is a trigger in SQL and when should it be used?', 'Code that runs automatically in response to a DML event (`INSERT`/`UPDATE`/`DELETE`) on a table. Used for audit trails, enforcing complex validation, or keeping denormalized data in sync.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-05', 'Database Design & Architecture', 'Describe the concept of ACID in databases.', '**Atomicity, Consistency, Isolation, Durability** — the guarantees that make a transaction reliable: it fully completes or fully rolls back, leaves the database in a valid state, is isolated from concurrent transactions, and survives a crash once committed.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-06', 'Database Design & Architecture', 'What is database sharding?', 'Horizontal partitioning of data across multiple database instances (shards), typically by a key like customer ID or region, to scale writes and storage beyond a single machine.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-07', 'Database Design & Architecture', 'How do database indexes work and what types are there?', 'Most commonly a **B-tree** structure that keeps sorted keys for fast range/equality lookups. Other types: **Hash** (equality-only, O(1) lookup), **Bitmap** (low-cardinality columns), **GiST**/**GIN** (PostgreSQL — full-text search, geometric data).', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-08', 'Database Design & Architecture', 'Describe the process of data warehousing.', 'ETL processes move data from operational systems into a warehouse, modeled dimensionally (star/snowflake schema), and queried through OLAP cubes or SQL for reporting and analysis.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-09', 'Database Design & Architecture', 'Explain the difference between OLTP and OLAP systems.', '- **OLTP** — transactional, frequent small writes, operational (e.g. order processing)
- **OLAP** — analytical, read-heavy, large scans over historical data (e.g. reporting)', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-design-10', 'Database Design & Architecture', 'What are materialized views and how do they differ from standard views?', 'A materialized view stores the query result physically and must be refreshed to stay current, trading staleness for read speed. A standard (virtual) view re-runs its underlying query on every access.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-opt-01', 'SQL Optimization and Performance', 'How do you identify and optimize slow-running queries?', 'Use `EXPLAIN`/`EXPLAIN ANALYZE` to find the bottleneck, add targeted indexes, avoid `SELECT *`, and restructure `JOIN`s so the database can use indexes and smaller intermediate result sets.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-opt-02', 'SQL Optimization and Performance', 'What is query execution plan in SQL?', 'The database''s chosen strategy for running a query — which scans, joins, and indexes it will use, and their estimated (or actual) cost.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-opt-03', 'SQL Optimization and Performance', 'Explain how to use EXPLAIN or EXPLAIN ANALYZE.', '- **`EXPLAIN`** — shows the planned execution strategy without running the query
- **`EXPLAIN ANALYZE`** — actually executes the query and shows real timings and row counts alongside the plan', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-opt-04', 'SQL Optimization and Performance', 'How can indexing affect performance both positively and negatively?', '- **Positive** — much faster `SELECT`/`JOIN`/`ORDER BY` on indexed columns
- **Negative** — slower `INSERT`/`UPDATE`/`DELETE`, since every index has to be updated too, plus extra storage', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-opt-05', 'SQL Optimization and Performance', 'Describe how to measure the performance of SQL queries.', 'Execution time, rows examined vs. rows returned, whether indexes are actually used (from `EXPLAIN` output), and I/O cost.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-opt-06', 'SQL Optimization and Performance', 'How would you rewrite a query to improve its performance?', 'Prefer `JOIN`s over correlated subqueries where possible, select only needed columns instead of `SELECT *`, filter early, and add indexes that match the query''s `WHERE`/`JOIN` columns.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-opt-07', 'SQL Optimization and Performance', 'What are partitioned tables and how can they optimize performance?', 'Tables physically split by a key (date, range, or hash). Queries that filter on the partition key only scan relevant partitions ("partition pruning"), dramatically reducing I/O on large tables.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-sec-01', 'SQL Security', 'How do you implement database encryption in SQL?', '**TDE** (Transparent Data Encryption) for data at rest, column-level encryption for specific sensitive fields, and **SSL/TLS** for data in transit.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-sec-02', 'SQL Security', 'What are roles and how do they manage database access?', 'Named collections of privileges. Users are assigned roles and inherit the underlying permissions — simplifies access control at scale versus granting permissions per-user.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-sec-03', 'SQL Security', 'Explain the concept of row-level security.', 'Restricts which rows a user can see or modify based on their identity or context (e.g. a sales rep only sees their own region''s rows), enforced by the database rather than application code.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-func-01', 'SQL Functions and Expressions', 'Describe scalar-valued and table-valued functions.', '- **Scalar** — returns a single value, usable inline in `SELECT`/`WHERE`
- **Table-valued** — returns a table, usable in a `FROM` clause like a regular table', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-func-02', 'SQL Functions and Expressions', 'How would you define a stored procedure with input and output parameters?', '```sql
CREATE PROCEDURE proc(@input INT, @output INT OUTPUT) AS
BEGIN
    SET @output = @input * 2;
END;
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-func-03', 'SQL Functions and Expressions', 'What is the difference between a function and a stored procedure?', '- **Function** — returns a value, callable inline within a query, generally can''t perform DML on the tables it reads
- **Procedure** — supports `OUTPUT` parameters, can perform full DML, but can''t be called inline inside a `SELECT`', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-func-04', 'SQL Functions and Expressions', 'How do you use the CAST and CONVERT functions?', '```sql
SELECT CAST(col AS INT);       -- ANSI standard
SELECT CONVERT(INT, col);      -- SQL Server style
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-txn-01', 'Transaction Control and Locking', 'What is a database transaction?', 'An atomic unit of work that either commits fully or rolls back fully, preserving the database''s ACID guarantees.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-txn-02', 'Transaction Control and Locking', 'Explain the concept of locking and its types in SQL databases.', 'Locks prevent conflicting concurrent access to the same data. Granularity ranges from **row-level** (fine-grained, more concurrency) to **page-level** to **table-level** (coarse, less concurrency but cheaper to manage).', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-txn-03', 'Transaction Control and Locking', 'What are the properties of transactions?', '**ACID**: Atomicity, Consistency, Isolation, Durability.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-txn-04', 'Transaction Control and Locking', 'How do you manage transaction isolation levels?', '```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```
Levels range from `READ UNCOMMITTED` (weakest, allows dirty reads) through `READ COMMITTED`, `REPEATABLE READ`, to `SERIALIZABLE` (strongest, fully isolated but least concurrent).', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-txn-05', 'Transaction Control and Locking', 'What does it mean to commit or roll back a transaction?', '- **`COMMIT`** — permanently saves all changes made in the transaction
- **`ROLLBACK`** — undoes all changes made in the transaction, as if it never happened', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-eco-01', 'SQL and Modern Data Ecosystems', 'How can SQL be integrated with big data technologies?', 'SQL-on-Hadoop engines (Hive, Spark SQL), external/federated tables, and JDBC/ODBC connectors all let SQL query data sitting in big-data storage.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-eco-02', 'SQL and Modern Data Ecosystems', 'Discuss the interoperability of SQL with cloud-based data stores.', 'Cloud databases and warehouses (RDS, BigQuery, Snowflake, Redshift) all expose standard-ish SQL interfaces, so most SQL knowledge transfers directly.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-eco-03', 'SQL and Modern Data Ecosystems', 'What is Data Lake and how can SQL interact with it?', 'A centralized repository of raw data in its native format. Query engines like Presto/Trino and Athena let you run SQL directly against files in the lake without a separate load step.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-eco-04', 'SQL and Modern Data Ecosystems', 'Explain the interaction between SQL and NoSQL within the same application.', 'Polyglot persistence — using SQL databases for transactional/relational data and NoSQL stores for scale or flexible schema, within the same system.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-eco-05', 'SQL and Modern Data Ecosystems', 'How does SQL work within a microservices architecture?', 'Each service typically owns its own database (often SQL), and shares data with other services through APIs or events rather than direct cross-service queries — avoiding a shared-schema coupling problem.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-best-01', 'SQL Best Practices and Standards', 'What are some common SQL coding practices you follow?', 'Consistent naming conventions, indexing based on actual query patterns, avoiding `SELECT *`, and always using parameterized queries.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-best-02', 'SQL Best Practices and Standards', 'How can you ensure the portability of SQL scripts across systems?', 'Stick to ANSI SQL where possible, avoid vendor-specific functions, and abstract vendor differences behind views where you can''t avoid them.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-best-03', 'SQL Best Practices and Standards', 'What methods do you use for version controlling SQL scripts?', 'Git for the SQL files themselves, plus migration tools (Flyway, Liquibase, or a dbt-style migrations folder) to apply schema changes as ordered, repeatable steps — "database as code."', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-best-04', 'SQL Best Practices and Standards', 'What are the benefits of using stored procedures instead of embedded SQL?', 'Fewer network round trips, cached execution plans, centralized logic that''s easier to secure and audit than SQL scattered across application code.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-best-05', 'SQL Best Practices and Standards', 'How do you document SQL code effectively?', 'Inline comments explaining *why* (not what), ER diagrams for schema relationships, and a data dictionary describing tables/columns for anyone querying the data later.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-analytic-01', 'Analytical SQL Questions', 'How would you find the Nth highest salary from a table?', '```sql
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET N-1;
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-analytic-02', 'Analytical SQL Questions', 'How do you count occurrences of a specific value in a column?', '```sql
SELECT COUNT(*) FROM table WHERE column = ''value'';
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-analytic-03', 'Analytical SQL Questions', 'How can you calculate running totals in SQL?', '```sql
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;
```', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-analytic-04', 'Analytical SQL Questions', 'Explain how to reverse the contents of a column without a reverse function.', 'When the database has no built-in `REVERSE()`, fall back to application-level processing, or a stored procedure/recursive query that rebuilds the string character by character in reverse order.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-analytic-05', 'Analytical SQL Questions', 'What approach do you use for creating a calendar table?', 'Generate a contiguous date range (via a recursive CTE or a numbers table joined to a base date) and add derived flag columns — weekday, is_weekend, fiscal_quarter — for fast time-based joins and analysis.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-analytic-06', 'Analytical SQL Questions', 'Explain how to use SQL for predictive analysis and machine learning.', 'Window functions and statistical aggregates can compute trend features directly in SQL. Warehouse-native ML (BigQuery ML, Redshift ML) and extensions like MADlib go further, letting you train and score models without leaving SQL.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-etl-01', 'Data Manipulation and ETL', 'What is the process of Extract, Transform, Load (ETL)?', 'Extract data from source systems, transform it (clean, join, aggregate), and load it into a target system — the foundation of most data warehousing pipelines.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-etl-02', 'Data Manipulation and ETL', 'How do you import/export data from/to a flat file using SQL?', '- **PostgreSQL** — `COPY`
- **MySQL** — `LOAD DATA INFILE`
- **SQL Server** — `BULK INSERT`', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-etl-03', 'Data Manipulation and ETL', 'Explain the steps for a basic ETL process.', 'Extract → clean → validate → load to a staging table → load to the warehouse → (re)build indexes.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-etl-04', 'Data Manipulation and ETL', 'How do you cleanse and format data using SQL queries?', '`TRIM` to remove stray whitespace, `UPPER`/`LOWER` to normalize case, `REPLACE` for known bad patterns, and regex functions (`REGEXP_REPLACE`, etc.) for more complex cleanup.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-etl-05', 'Data Manipulation and ETL', 'What tools do you use for automating data import/export?', 'Apache Airflow or dbt for orchestration/transformation, Talend or Informatica for GUI-driven ETL, or plain cron-scheduled scripts for simpler pipelines.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-domain-01', 'Domain-Specific SQL Scenarios', 'How would you model a many-to-many relationship in SQL?', 'A junction (bridge) table holding foreign keys to both related tables — e.g. `student_id` and `course_id` in an `enrollments` table.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-domain-02', 'Domain-Specific SQL Scenarios', 'Describe how to manage hierarchical data in SQL.', '- **Adjacency list** — each row stores its `parent_id`; simple, but multi-level queries need recursion
- **Nested sets** — stores left/right bounds; fast subtree reads, expensive writes
- **Recursive CTEs** — walk an adjacency list to arbitrary depth in a single query', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-domain-03', 'Domain-Specific SQL Scenarios', 'How would you approach writing SQL queries for reporting?', 'Query against a dimensional model (star/snowflake) rather than raw OLTP tables, aggregate with `GROUP BY`, and optimize for read patterns since reporting queries are run far more often than the underlying data changes.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-domain-04', 'Domain-Specific SQL Scenarios', 'Explain how to handle temporal data and time zones in SQL.', 'Store timestamps in UTC using a timezone-aware type (`TIMESTAMP WITH TIME ZONE`), and convert to a local zone only at display time with `AT TIME ZONE`. Storing local time directly makes cross-region comparisons and DST transitions error-prone.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-domain-05', 'Domain-Specific SQL Scenarios', 'How do you use SQL in financial applications for risk analysis?', 'Time-series queries over historical prices/positions, window functions for rolling metrics (moving average, volatility), and aggregate risk measures computed directly in the warehouse close to the data.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-debug-01', 'Troubleshooting and Debugging', 'What steps do you take to troubleshoot a failed SQL query?', 'Check syntax first, verify table/column names exist, validate data types match, then isolate the problem by simplifying the query (remove joins/conditions one at a time) until it runs.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-debug-02', 'Troubleshooting and Debugging', 'How can you recover data from a corrupt SQL database?', 'Restore from the most recent clean backup, replay transaction logs to minimize data loss, and for engine-level corruption run integrity checks like `DBCC CHECKDB` (SQL Server) to identify and, where possible, repair the damage.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-debug-03', 'Troubleshooting and Debugging', 'What methods do you employ to ensure data integrity?', 'Primary/foreign key constraints, `CHECK` constraints for value rules, unique indexes to prevent duplicates, and triggers for cross-row validation that constraints alone can''t express.', 'voice');
INSERT OR REPLACE INTO questions (id, concept, prompt, reference_answer, kind) VALUES ('sql-debug-04', 'Troubleshooting and Debugging', 'How do you decipher and resolve deadlocks in SQL?', 'Analyze the deadlock graph the database produces to see which transactions were holding/waiting on which locks, identify the resource contention pattern, then fix it by keeping transactions short, accessing tables in a consistent order, and reducing lock scope.', 'voice');
