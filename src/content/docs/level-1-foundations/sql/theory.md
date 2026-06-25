---
title: SQL Theory | Core Concepts
description: Master SQL fundamentals for data engineering. Learn SELECT, WHERE, JOINs, indexing, normalization, and performance optimization. Essential interview guide.
---

## SQL Theory: Core Concepts for Data Engineering

**Learn core SQL concepts essential for database management and data engineering interviews.**

## Table of Contents
- [SQL Fundamentals](#sql-fundamentals)
- [SQL Data Types and Operators](#sql-data-types-and-operators)
- [SQL Advanced Queries](#sql-advanced-queries)
- [Database Design & Architecture](#database-design--architecture)
- [SQL Optimization and Performance](#sql-optimization-and-performance)
- [SQL Security](#sql-security)
- [Transaction Control and Locking](#transaction-control-and-locking)
- [SQL and Modern Data Ecosystems](#sql-and-modern-data-ecosystems)

---

## SQL Fundamentals

**1. What is SQL and what is it used for?**
SQL (Structured Query Language) is the standard programming language for managing relational databases. It enables data professionals to create, read, update, and delete data (CRUD), manage schemas, and perform data analysis.

**2. Describe the difference between SQL and NoSQL databases.**
- **SQL:** Relational, structured schema, ACID compliance, tables with rows/columns
- **NoSQL:** Non-relational, flexible schema, eventual consistency, document/key-value/graph models

**3. What are the different types of SQL commands?**
- **DDL:** Data Definition (CREATE, ALTER, DROP)
- **DML:** Data Manipulation (SELECT, INSERT, UPDATE, DELETE)
- **DCL:** Data Control (GRANT, REVOKE)
- **TCL:** Transaction Control (COMMIT, ROLLBACK, SAVEPOINT)

**4. Explain the purpose of the SELECT statement.**
Retrieves data from tables. Syntax: `SELECT columns FROM table WHERE conditions ORDER BY columns;`

**5. What is the difference between WHERE and HAVING clauses?**
- **WHERE:** Filters rows before GROUP BY
- **HAVING:** Filters groups after aggregation

**6. Define what a JOIN is in SQL and list its types.**
JOINs combine rows based on related columns.
- **INNER JOIN:** Matching rows only
- **LEFT/RIGHT JOIN:** All rows from one + matching from other
- **FULL OUTER JOIN:** All rows from both tables
- **CROSS JOIN:** Cartesian product

**7. What is a primary key in a database?**
Unique identifier for each row. Cannot be NULL, must be unique. Enforces entity integrity.

**8. Explain what a foreign key is and how it is used.**
Column referencing a primary key. Enforces referential integrity and creates relationships.

**9. How can you prevent SQL injections?**
Parameterized queries, input validation, least privilege, stored procedures (cautiously).

**10. What is normalization? Explain with examples.**
Organizing data to reduce redundancy: 1NF (atomic), 2NF (full dependency), 3NF (no transitive).

**11. Describe the concept of denormalization and when you would use it.**
Adding redundant data to improve read performance. Used in data warehouses and read-heavy apps.

**12. What are indexes and how can they improve query performance?**
B-tree structures for fast lookups. Faster WHERE/JOIN/ORDER BY, slower INSERT/UPDATE/DELETE.

**13. Explain the purpose of the GROUP BY clause.**
Groups rows into summary rows, used with aggregate functions.

**14. What is a subquery, and when would you use one?**
Nested query in SELECT/WHERE/FROM. Used for complex filtering based on another query.

**15. Describe the functions of the ORDER BY clause.**
Sorts result set in ascending (ASC) or descending (DESC) order.

**16. What are aggregate functions in SQL?**
Functions computing values from multiple rows: COUNT, SUM, AVG, MIN, MAX.

**17. Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.**
- **INNER:** Only matching rows
- **LEFT:** All left rows + matching right (NULL if no match)
- **RIGHT:** All right rows + matching left (NULL if no match)
- **FULL:** All rows from both tables

**18. How do you insert a new row into a database table?**
`INSERT INTO table (col1, col2) VALUES (val1, val2);`

**19. Explain how to update records in a database table.**
`UPDATE table SET col1 = val1 WHERE condition;`

**20. What is a SQL View and what are its advantages?**
Virtual table based on SELECT query. Simplifies queries, security, reusable logic.

---

## SQL Data Types and Operators

**21. List the different data types available in SQL.**
Numeric (INT, DECIMAL), String (CHAR, VARCHAR, TEXT), Date/Time (DATE, TIMESTAMP).

**22. What are the differences between CHAR, VARCHAR, and TEXT data types?**
- **CHAR:** Fixed length
- **VARCHAR:** Variable length
- **TEXT:** Large variable length

**23. How do you use the BETWEEN operator in SQL?**
`SELECT * FROM table WHERE column BETWEEN 10 AND 20;`

**24. Describe the use of the IN operator.**
`SELECT * FROM table WHERE column IN (val1, val2, val3);`

**25. Explain the use of wildcard characters in SQL.**
`%` matches any sequence, `_` matches single character. Used with LIKE.

**26. What is the purpose of the LIKE operator?**
Pattern matching: `SELECT * FROM users WHERE name LIKE 'J%';`

**27. How do you handle NULL values in SQL?**
Use `IS NULL` / `IS NOT NULL`. Functions: COALESCE, ISNULL.

**28. What does the COALESCE function do?**
Returns first non-NULL value: `SELECT COALESCE(phone, email, 'N/A');`

**29. What is the difference between UNION and UNION ALL?**
- **UNION:** Combines, removes duplicates
- **UNION ALL:** Combines all, keeps duplicates (faster)

**30. Describe the use of arithmetic operators in SQL queries.**
Standard operators (+, -, *, /) in SELECT and WHERE clauses.

---

## SQL Advanced Queries

**31. Explain how to use the CASE statement in SQL.**
`SELECT CASE WHEN age < 18 THEN 'Minor' ELSE 'Adult' END FROM users;`

**32. How would you perform a self JOIN?**
`SELECT e1.name, e2.name FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.id;`

**33. What is a cross JOIN and when would you use it?**
Cartesian product. Used for generating test data or combining dimensions.

**34. How to implement pagination in SQL queries?**
MySQL/PostgreSQL: `LIMIT 10 OFFSET 20`. SQL Server: `OFFSET 10 ROWS FETCH NEXT 20 ROWS ONLY`.

**35. Explain the concept of Common Table Expressions (CTEs) and recursive CTEs.**
CTEs (`WITH` clause) create temporary named result sets. Recursive CTEs handle hierarchies.

**36. What are window functions and how are they used?**
Compute values over windows: ROW_NUMBER(), RANK(), LAG(), LEAD().

**37. How can you concatenate column values in SQL?**
Standard SQL: `||` or CONCAT(). SQL Server: `+`. MySQL: CONCAT().

**38. What is the PIVOT operation and how would you apply it?**
Transforms rows to columns. SQL Server: PIVOT keyword. Others: CASE aggregation.

**39. Explain combining GROUP BY with ORDER BY.**
ORDER BY comes after GROUP BY to sort aggregated results.

**40. How would you find duplicate records in a table?**
`SELECT col, COUNT(*) FROM table GROUP BY col HAVING COUNT(*) > 1;`

---

## Database Design & Architecture

**41. What is the Entity-Relationship Model?**
Conceptual model using entities (tables), attributes (columns), relationships.

**42. Explain the different types of database schema.**
- **Logical:** Structure without DBMS specifics
- **Physical:** Implementation details
- **Conceptual:** High-level business view

**43. What are Stored Procedures and how are they beneficial?**
Precompiled code blocks. Benefits: reduced traffic, security, plan caching.

**44. What is a trigger in SQL and when should it be used?**
Automatic code on DML events. Used for audit trails, validation.

**45. Describe the concept of ACID in databases.**
Atomicity, Consistency, Isolation, Durability - ensuring reliable transactions.

**46. What is database sharding?**
Horizontal partitioning across database instances for scalability.

**47. How do database indexes work and what types are there?**
B-tree structures. Types: B-tree, Hash, Bitmap, GiST, GIN.

**48. Describe the process of data warehousing.**
ETL processes, dimensional modeling (star/snowflake), OLAP cubes.

**49. Explain the difference between OLTP and OLAP systems.**
- **OLTP:** Transactional, frequent writes, operational
- **OLAP:** Analytical, read-heavy, historical analysis

**50. What are materialized views and how do they differ from standard views?**
Precomputed stored results. Unlike virtual views, improve read performance.

---

## SQL Optimization and Performance

**51. How do you identify and optimize slow-running queries?**
Use EXPLAIN, add indexes, avoid SELECT *, optimize JOINs.

**52. What is query execution plan in SQL?**
Database strategy showing scans, joins, indexes, costs.

**53. Explain how to use EXPLAIN or EXPLAIN ANALYZE.**
EXPLAIN: plan only. EXPLAIN ANALYZE: executes and shows actual costs.

**54. How can indexing affect performance both positively and negatively?**
- **Positive:** Faster SELECT
- **Negative:** Slower INSERT/UPDATE/DELETE

**55. Describe how to measure the performance of SQL queries.**
Execution time, rows examined, index usage, EXPLAIN output.

**56. How would you rewrite a query to improve its performance?**
Use JOINs over subqueries, minimize SELECT *, add indexes.

**57. What are partitioned tables and how can they optimize performance?**
Tables split by date/range/hash. Queries scan only relevant partitions.

---

## SQL Security

**58. How do you implement database encryption in SQL?**
TDE (at rest), column encryption, SSL/TLS (in transit).

**59. What are roles and how do they manage database access?**
Named privilege collections. Users inherit permissions for access control.

**60. Explain the concept of row-level security.**
Restricts row access based on user context. Dynamic filtering.

---

## SQL Functions and Expressions

**61. Describe scalar-valued and table-valued functions.**
- **Scalar:** Returns single value
- **Table-valued:** Returns table (FROM clause)

**62. How would you define a stored procedure with input and output parameters?**
`CREATE PROCEDURE proc(@input INT, @output INT OUTPUT) AS ...`

**63. What is the difference between a function and a stored procedure?**
Functions return values, can be in queries, no DML on same table. Procedures have OUT params, full DML.

**64. How do you use the CAST and CONVERT functions?**
Convert types: `CAST(col AS INT)` or `CONVERT(INT, col)`.

---

## Transaction Control and Locking

**65. What is a database transaction?**
Atomic unit ensuring ACID properties. Commits fully or rolls back.

**66. Explain the concept of locking and its types in SQL databases.**
Prevents conflicting access. Types: row-level, page-level, table-level.

**67. What are the properties of transactions?**
ACID: Atomicity, Consistency, Isolation, Durability.

**68. How do you manage transaction isolation levels?**
`SET TRANSACTION ISOLATION LEVEL`. Levels: READ UNCOMMITTED to SERIALIZABLE.

**69. What does it mean to commit or roll back a transaction?**
- **COMMIT:** Permanently saves changes
- **ROLLBACK:** Undoes all changes

---

## SQL and Modern Data Ecosystems

**70. How can SQL be integrated with big data technologies?**
SQL-on-Hadoop (Hive, Spark SQL), external tables, JDBC/ODBC connectors.

**71. Discuss the interoperability of SQL with cloud-based data stores.**
Cloud databases (RDS, BigQuery, Snowflake) offer SQL interfaces.

**72. What is Data Lake and how can SQL interact with it?**
Centralized raw data repository. SQL engines (Presto, Athena) query directly.

**73. Explain the interaction between SQL and NoSQL within the same application.**
Polyglot persistence: SQL for transactions, NoSQL for scale.

**74. How does SQL work within a microservices architecture?**
Each service owns its database. Shared data via APIs/events.

---

## SQL Best Practices and Standards

**75. What are some common SQL coding practices you follow?**
Consistent naming, proper indexing, avoid SELECT *, parameterized queries.

**76. How can you ensure the portability of SQL scripts across systems?**
Use ANSI SQL, avoid vendor functions, abstract with views.

**77. What methods do you use for version controlling SQL scripts?**
Git, migration tools (Flyway, Liquibase), database-as-code.

**78. What are the benefits of using stored procedures instead of embedded SQL?**
Reduced round trips, plan caching, centralized logic, security.

**79. How do you document SQL code effectively?**
Inline comments, ER diagrams, data dictionaries.

---

## Analytical SQL Questions

**80. How would you find the Nth highest salary from a table?**
`SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET N-1;`

**81. How do you count occurrences of a specific value in a column?**
`SELECT COUNT(*) FROM table WHERE column = 'value';`

**82. How can you calculate running totals in SQL?**
Window function: `SUM(col) OVER (ORDER BY col)`.

**83. Explain how to reverse the contents of a column without reverse function.**
Application-level processing, stored procedures with loops.

**84. What approach do you use for creating a calendar table?**
Generate date range with flags for time-based analysis.

---

## Data Manipulation and ETL

**85. What is the process of Extract, Transform, Load (ETL)?**
Extract → Transform → Load to target. Foundation of data warehousing.

**86. How do you import/export data from/to a flat file using SQL?**
PostgreSQL: COPY. MySQL: LOAD DATA INFILE. SQL Server: BULK INSERT.

**87. Explain the steps for a basic ETL process.**
Extract → Clean → Validate → Load to staging → Load to warehouse → Index.

**88. How do you cleanse and format data using SQL queries?**
TRIM whitespace, UPPER/LOWER, REPLACE patterns, REGEX.

**89. What tools do you use for automating data import/export?**
Apache Airflow, dbt, Talend, Informatica, cron scripts.

---

## Domain-Specific SQL Scenarios

**90. How would you model a many-to-many relationship in SQL?**
Junction table with foreign keys linking entities.

**91. Describe how to manage hierarchical data in SQL.**
Adjacency list (parent_id), nested sets, recursive CTEs.

**92. How would you approach writing SQL queries for reporting?**
Dimensional models, GROUP BY aggregates, optimize reads.

**93. Explain how to handle temporal data and time zones in SQL.**
Store in UTC, TIMESTAMP WITH TIME ZONE, AT TIME ZONE conversion.

**94. How do you use SQL in financial applications for risk analysis?**
Time-series queries, window functions, risk metrics.

---

## Troubleshooting and Debugging

**95. What steps do you take to troubleshoot a failed SQL query?**
Check syntax, verify names, validate types, test simpler queries.

**96. How can you recover data from a corrupt SQL database?**
Restore from backups, transaction logs, DBCC CHECKDB.

**97. What methods do you employ to ensure data integrity?**
Primary/foreign keys, CHECK constraints, unique indexes, triggers.

**98. How do you decipher and resolve deadlocks in SQL?**
Analyze deadlock graphs, identify contention, optimize transaction ordering.

---

## Troubleshooting and Debugging

**99. How do you decipher and resolve deadlocks in SQL?

Analyze deadlock graphs, identify resource contention, optimize transaction ordering, reduce transaction scope.

---

## Advanced Data Analysis in SQL

**100. Explain how to use SQL for predictive analysis and machine learning.**
Window functions for trends, statistical aggregates, BigQuery ML, MADlib.
