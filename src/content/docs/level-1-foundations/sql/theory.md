---
title: SQL Theory Questions
description: Fundamental SQL theory and concepts with concise answers
---

<!-- # SQL Theory Questions -->

## SQL Fundamentals

**1. What is SQL and what is it used for?**

SQL (Structured Query Language) is a standard language for managing relational databases. Used to create, read, update, delete data (CRUD), and manage database schemas.

**2. Describe the difference between SQL and NoSQL databases.**
- **SQL:** Relational, structured schema, ACID compliance, uses tables with rows/columns
- **NoSQL:** Non-relational, flexible schema, eventual consistency, includes document, key-value, column-family, and graph models

**3. What are the different types of SQL commands?**
- **DDL:** Data Definition (CREATE, ALTER, DROP)
- **DML:** Data Manipulation (SELECT, INSERT, UPDATE, DELETE)
- **DCL:** Data Control (GRANT, REVOKE)
- **TCL:** Transaction Control (COMMIT, ROLLBACK, SAVEPOINT)

**4. Explain the purpose of the SELECT statement.**

Retrieves data from one or more tables. Core syntax: `SELECT columns FROM table WHERE conditions ORDER BY columns;`

**5. What is the difference between WHERE and HAVING clauses?**
- **WHERE:** Filters rows before aggregation (works on individual rows)
- **HAVING:** Filters groups after aggregation (works on GROUP BY results)

**6. Define what a JOIN is in SQL and list its types.**
JOINs combine rows from two or more tables based on related columns.
- **INNER JOIN:** Matching rows only
- **LEFT/RIGHT JOIN:** All rows from one table + matching from other
- **FULL OUTER JOIN:** All rows from both tables
- **CROSS JOIN:** Cartesian product (all combinations)

**7. What is a primary key in a database?**

A unique identifier for each table row. Cannot be NULL and must be unique. Enforces entity integrity.

**8. Explain what a foreign key is and how it is used.**

A column referencing a primary key in another table. Enforces referential integrity and creates table relationships.

**9. How can you prevent SQL injections?**
- Use parameterized/prepared statements
- Input validation and sanitization
- Least privilege principle for DB users
- Stored procedures (with caution)

**10. What is normalization? Explain with examples.**

Organizing data to reduce redundancy:
- **1NF:** Atomic values (no repeating groups)
- **2NF:** Full functional dependency on primary key
- **3NF:** No transitive dependencies

**11. Describe the concept of denormalization and when you would use it.**

Adding redundant data to improve read performance. Used in data warehouses and read-heavy applications where query speed outweighs storage overhead.

**12. What are indexes and how can they improve query performance?**

Database structures (typically B-trees) that speed up data retrieval. They create pointers to data locations, enabling faster lookups at the cost of slower writes.

**13. Explain the purpose of the GROUP BY clause.**

Groups rows sharing the same values into summary rows, often used with aggregate functions (COUNT, SUM, AVG) to produce summary reports.

**14. What is a subquery, and when would you use one?**

A query nested inside another query (in SELECT, WHERE, or FROM clause). Used when complex logic requires filtering based on results from another query.

**15. Describe the functions of the ORDER BY clause.**

Sorts result set in ascending (ASC, default) or descending (DESC) order by one or more columns.

**16. What are aggregate functions in SQL?**

Functions computing values from multiple rows:
- **COUNT(), SUM(), AVG()**
- **MIN(), MAX(), GROUP_CONCAT()**

**17. Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.**

- **INNER:** Only matching rows from both tables
- **LEFT:** All left table rows + matching right rows (NULL if no match)
- **RIGHT:** All right table rows + matching left rows (NULL if no match)
- **FULL:** All rows from both tables (NULL where no match)

**18. How do you insert a new row into a database table?**

```sql
INSERT INTO table (col1, col2) VALUES (val1, val2);
```

**19. Explain how to update records in a database table.**

```sql
UPDATE table SET col1 = val1 WHERE condition;
```

**20. What is a SQL View and what are its advantages?**

A virtual table based on a SELECT query. Advantages: simplified complex queries, security (restrict column access), reusable logic, acts as abstraction layer.


## SQL Data Types and Operators

**21. List the different data types available in SQL.**

- **Numeric:** INT, BIGINT, DECIMAL, FLOAT
- **String:** CHAR, VARCHAR, TEXT
- **Date/Time:** DATE, TIMESTAMP, DATETIME
- **Boolean:** BOOLEAN
- **Binary:** BLOB, BYTEA

**22. What are the differences between CHAR, VARCHAR, and TEXT data types?**

- **CHAR(n):** Fixed length, padded with spaces
- **VARCHAR(n):** Variable length, max n characters
- **TEXT:** Variable length, typically larger max size than VARCHAR

**23. How do you use the BETWEEN operator in SQL?**

Filters values within a range (inclusive):
```sql
SELECT * FROM table WHERE column BETWEEN 10 AND 20;
```

**24. Describe the use of the IN operator.**

Matches any value in a list:
```sql
SELECT * FROM table WHERE column IN (val1, val2, val3);
```

**25. Explain the use of wildcard characters in SQL.**

`%` matches any sequence of characters (LIKE), `_` matches any single character. Used with LIKE for pattern matching.

**26. What is the purpose of the LIKE operator?**
Pattern matching with wildcards:
```sql
SELECT * FROM users WHERE name LIKE 'J%'; -- Names starting with J
```

**27. How do you handle NULL values in SQL?**

Use `IS NULL` / `IS NOT NULL` (not `= NULL`). Functions: `COALESCE()`, `ISNULL()`, `NVL()`. NULL represents unknown/missing data.

**28. What does the COALESCE function do?**

Returns first non-NULL value from arguments:
```sql
SELECT COALESCE(phone, email, 'N/A') FROM users;
```

**29. What is the difference between UNION and UNION ALL?**

- **UNION:** Combines results, removes duplicates
- **UNION ALL:** Combines all results, keeps duplicates (faster)

**30. Describe the use of arithmetic operators in SQL queries.**

Standard operators: `+`, `-`, `*`, `/`, `%`. Used in SELECT and WHERE clauses:
```sql
SELECT price * quantity AS total FROM orders;
```

## SQL Advanced Queries

**31. Explain how to use the CASE statement in SQL.**

Conditional logic in queries:
```sql
SELECT name, CASE WHEN age < 18 THEN 'Minor' ELSE 'Adult' END FROM users;
```

**32. How would you perform a self JOIN?**

Joining a table to itself, typically with alias:
```sql
SELECT e1.name, e2.name FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id;
```

**33. What is a cross JOIN and when would you use it?**

Produces Cartesian product (all combinations). Used for generating test data or combining independent dimensions.

**34. How to implement pagination in SQL queries?**

- **MySQL/PostgreSQL:** `LIMIT 10 OFFSET 20` or `LIMIT 20, 10`
- **SQL Server:** `OFFSET 10 ROWS FETCH NEXT 20 ROWS ONLY`
- **Oracle:** `FETCH FIRST 10 ROWS ONLY`

**35. Explain the concept of Common Table Expressions (CTEs) and recursive CTEs.**

CTE (`WITH` clause) creates temporary named result set. Recursive CTEs reference themselves, useful for hierarchies:
```sql
WITH RECURSIVE cte AS (SELECT ... UNION SELECT ... FROM cte)
```

**36. What are window functions and how are they used?**

Functions computing values over sliding windows without grouping rows:
- **ROW_NUMBER(), RANK(), LAG(), LEAD()**
- **SUM() OVER (PARTITION BY ... ORDER BY ...)**

**37. How can you concatenate column values in SQL?**

- **Standard SQL:** `||` or `CONCAT(col1, col2)`
- **SQL Server:** `+` or `CONCAT()`
- **MySQL:** `CONCAT()` or `CONCAT_WS()`

**38. What is the PIVOT operation and how would you apply it?**

Transforms rows to columns. Syntax varies by DB:
- **SQL Server:** `PIVOT` keyword
- **MySQL/PostgreSQL:** Conditional aggregation with `CASE`

**39. Explain the process of combining a query that uses a GROUP BY with one that uses ORDER BY.**

Both can be used in same query; ORDER BY comes after GROUP BY:
```sql
SELECT dept, COUNT(*) FROM employees GROUP BY dept ORDER BY COUNT(*) DESC;
```

**40. How would you find duplicate records in a table?**

```sql
SELECT col, COUNT(*) FROM table GROUP BY col HAVING COUNT(*) > 1;
```

## Database Design & Architecture

**41. What is the Entity-Relationship Model?**

Conceptual modeling approach using entities (tables), attributes (columns), and relationships (foreign keys) to represent data requirements.

**42. Explain the different types of database schema.**

- **Logical:** Structure without DBMS specifics
- **Physical:** Implementation-specific with storage details
- **Conceptual:** High-level business view

**43. What are Stored Procedures and how are they beneficial?**

Precompiled database code blocks. Benefits: reduced network traffic, security (hide table structure), execution plan caching.

**44. What is a trigger in SQL and when should it be used?**

Automatic code execution on DML events (INSERT, UPDATE, DELETE). Used for audit trails, data validation, denormalization updates.

**45. Describe the concept of ACID in databases.**

- **Atomicity:** All or nothing transactions
- **Consistency:** Valid state transitions
- **Isolation:** Concurrent transaction separation
- **Durability:** Committed changes persist

**46. What is database sharding?**

Horizontal partitioning across multiple database instances. Each shard holds subset of data, improving scalability and performance.

**47. How do database indexes work and what types are there?**

B-tree structures for fast lookups. Types: B-tree, Hash, Bitmap, GiST, GIN (PostgreSQL); clustered/non-clustered (SQL Server).

**48. Describe the process of data warehousing.**

Centralized repository for analytical queries. Involves: ETL processes, dimensional modeling (star/snowflake schemas), OLAP cubes.

**49. Explain the difference between OLTP and OLAP systems.**

- **OLTP:** Transactional, frequent writes, normalized, operational
- **OLAP:** Analytical, read-heavy, denormalized, historical analysis

**50. What are materialized views and how do they differ from standard views?**

Precomputed query results stored as physical tables. Unlike views (virtual), they improve read performance but require refresh maintenance.

## SQL Optimization and Performance

**51. How do you identify and optimize slow-running queries?**

Use `EXPLAIN`/`EXPLAIN ANALYZE`, check execution plans, add indexes on filtered/sorted columns, avoid SELECT *, optimize JOINs.

**52. What is query execution plan in SQL?**

Database's step-by-step strategy for executing a query. Shows table scans, index usage, join algorithms, and estimated costs.

**53. Explain how to use EXPLAIN or EXPLAIN ANALYZE.**

- **EXPLAIN:** Shows execution plan without running query
- **EXPLAIN ANALYZE:** Executes query and shows actual vs. estimated costs

**54. How can indexing affect performance both positively and negatively?**

- **Positive:** Faster SELECT queries with WHERE/JOIN/ORDER BY
- **Negative:** Slower INSERT/UPDATE/DELETE due to index maintenance

**55. Describe how to measure the performance of SQL queries.**

Query execution time, rows examined vs. returned, index usage, buffer hit ratio, using profiling tools and EXPLAIN output.

**56. How would you rewrite a query to improve its performance?**

Avoid subqueries (use JOINs), minimize wildcard selects, add appropriate indexes, use EXISTS instead of IN for large datasets.

**57. What are partitioned tables and how can they optimize performance?**

Tables split into smaller pieces (by date, range, hash). Queries scan only relevant partitions, improving performance and maintenance.

## SQL Security

**58. How do you implement database encryption in SQL?**

- **TDE:** Transparent Data Encryption (at rest)
- **Column encryption:** Application-level or DB functions
- **SSL/TLS:** For data in transit

**59. What are roles and how do they manage database access?**

Named collections of privileges. Users inherit role permissions, simplifying access control and compliance management.

**60. Explain the concept of row-level security.**

Restricts row access based on user context. Policies filter data dynamically without separate views per user.

**61. Describe how to create and use user-defined functions (UDFs).**

Custom functions in SQL or procedural language. Used to encapsulate reusable logic and extend database capabilities.

## SQL Functions and Expressions

**62. Describe scalar-valued and table-valued functions.**

- **Scalar:** Returns single value (can be used in expressions)
- **Table-valued:** Returns table (used in FROM clause)

**63. How would you define a stored procedure with input and output parameters?**

```sql
CREATE PROCEDURE proc(@input INT, @output INT OUTPUT) AS ...
```

**64. What is the difference between a function and a stored procedure?**

- **Functions:** Return value, can be used in queries, no DML on same table
- **Procedures:** No return value, can have OUT params, full DML support

**65. How do you use the CAST and CONVERT functions?**

Convert data types: `CAST(col AS INT)` or `CONVERT(INT, col)`. CONVERT includes formatting options for dates/strings.

## Transaction Control and Locking

**66. What is a database transaction?**

Atomic unit of work ensuring ACID properties. Either fully commits or fully rolls back.

**67. Explain the concept of locking and its types in SQL databases.**

Prevents concurrent conflicting access. Types: row-level, page-level, table-level locks.

**68. What are the properties of transactions?**

ACID: Atomicity, Consistency, Isolation, Durability - ensuring reliable processing.

**69. How do you manage transaction isolation levels?**

Set with `SET TRANSACTION ISOLATION LEVEL`. Levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE.

**70. What does it mean to commit or roll back a transaction?**

- **COMMIT:** Permanently saves all changes
- **ROLLBACK:** Undoes all changes since transaction start

## SQL and Modern Data Ecosystems

**71. How can SQL be integrated with big data technologies?**

SQL-on-Hadoop (Hive, Spark SQL, Presto), external table integrations (Hive Metastore), JDBC/ODBC connectors.

**72. Discuss the interoperability of SQL with cloud-based data stores.**

Cloud databases offer SQL interfaces (Amazon RDS, Google BigQuery, Snowflake). APIs and connectors enable hybrid architectures.

**73. What is Data Lake and how can SQL interact with it?**

Centralized data repository storing raw data in various formats. SQL engines (Presto, Athena, BigQuery) query data lakes directly.

**74. Explain the interaction between SQL and NoSQL within the same application.**

Polyglot persistence: SQL for transactions/relational data, NoSQL for scale/hierarchy. Applications connect to both as needed.

**75. How does SQL work within a microservices architecture?**

Each service owns its database. Shared data via APIs/events. Sagas pattern for distributed transactions.

## SQL Best Practices and Standards

**76. What are some common SQL coding practices you follow?**

Consistent naming conventions, proper indexing, avoid SELECT *, use parameterized queries, comment complex logic.

**77. How can you ensure the portability of SQL scripts across different database systems?**

Use ANSI SQL standards, avoid vendor-specific functions, abstract with views where needed.

**78. What methods do you use for version controlling SQL scripts?**

Git repositories, migration tools (Flyway, Liquibase), stored procedures/scripts as code.

**79. What are the benefits of using stored procedures instead of embedding SQL queries in code?**

Reduced network round trips, execution plan caching, centralized business logic, enhanced security.

**80. How do you document SQL code effectively?**

Inline comments for complex logic, ER diagrams, data dictionaries, schema documentation tools.

## Analytical SQL Questions

**81. How would you find the Nth highest salary from a table?**

```sql
SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET N-1;
```

**82. How do you count the number of occurrences of a specific value in a column?**

```sql
SELECT COUNT(*) FROM table WHERE column = 'value';
```

**83. How can you calculate running totals in SQL?**

Window function: `SUM(col) OVER (ORDER BY col)`. For groups: `SUM(col) OVER (PARTITION BY group_col ORDER BY col)`.

**84. Explain how to reverse the contents of a column without using a reverse function.**

Recursion or loops in stored procedure. Application-level processing often simpler.

**85. What approach do you use for creating a calendar table, and what are its uses?**

Generate date range table with day/month/quarter/year flags. Used for time-based analysis without date functions.

## Data Manipulation and ETL

**86. What is the process of Extract, Transform, Load (ETL)?**

Extract from sources → Transform/clean/validate → Load to target. Foundation of data warehousing.

**87. How do you import/export data from/to a flat file using SQL?**

- **PostgreSQL:** `COPY` command
- **MySQL:** `LOAD DATA INFILE`, `mysqldump`
- **SQL Server:** `BULK INSERT`, `bcp`

**88. Explain the steps for a basic ETL process in a data warehousing environment.**

Extract source data → Clean/transform → Validate → Load to staging → Load to warehouse → Index/analyze.

**89. How do you cleanse and format data using SQL queries?**

TRIM for whitespace, UPPER/LOWER for case, REPLACE for patterns, REGEXP for complex validation.

**90. What tools do you use for automating data import/export routines?**

Apache Airflow, dbt, Talend, Informatica, custom scripts with cron scheduling.

## Domain-Specific SQL Scenarios

**91. How would you model a many-to-many relationship in SQL?**

Junction/bridge table with foreign keys to both entities. Example: `user_roles` table linking `users` and `roles`.

**92. Describe how to manage hierarchical data in SQL.**

Adjacency list (parent_id), nested sets, or recursive CTEs for path enumeration.

**93. How would you approach writing SQL queries for a reporting application?**

Use dimensional models, pre-aggregate with GROUP BY, optimize for read performance, consider materialized views.

**94. Explain how to handle temporal data and time zones in SQL.**

Store in UTC, use TIMESTAMP WITH TIME ZONE, convert with AT TIME ZONE, track history with temporal tables.

**95. How do you use SQL in financial applications for risk and portfolio analysis?**

Time-series queries, window functions for rolling calculations, risk metrics via aggregates, cohort analysis.

## Troubleshooting and Debugging

**96. What steps do you take to troubleshoot a failed SQL query?**

Check syntax/errors, verify table/column names, validate data types, test with simpler queries, review constraints.

**97. How can you recover data from a corrupt SQL database?**

Restore from backups, use transaction log backups, DBCC CHECKDB (SQL Server), pg_checksums (PostgreSQL).

**98. What methods do you employ to ensure data integrity?**

Primary/foreign keys, CHECK constraints, unique indexes, triggers for complex validation, transactions.

**99. How do you decipher and resolve deadlocks in SQL?**

Analyze deadlock graphs, identify resource contention, optimize transaction ordering, reduce transaction scope.

## Advanced Data Analysis in SQL

**100. Explain how to use SQL for predictive analysis and machine learning purposes.**

Window functions for trends, statistical aggregates, feature generation, integration with ML tools (BigQuery ML, MADlib).
