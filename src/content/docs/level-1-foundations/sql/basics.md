---
title: SQL Basics | Essential SQL Syntax & Commands for Beginners
description: Master SQL fundamentals with practical examples. Learn SELECT, WHERE, JOINs, aggregation, and data modification. Complete beginner's guide to SQL syntax and database querying.
---

# SQL Basics: Essential Syntax & Commands

**Start your SQL journey with fundamental commands and syntax. Perfect for beginners learning database querying and data manipulation.**

## Table of Contents
- [Basic SELECT Query](#basic-select-query)
- [Filtering Data](#filtering-data)
- [Sorting Results](#sorting-results)
- [Limiting Results](#limiting-results)
- [Aggregation Functions](#aggregation-functions)
- [Grouping Data](#grouping-data)
- [Joining Tables](#joining-tables)
- [Inserting Data](#inserting-data)
- [Updating Data](#updating-data)
- [Deleting Data](#deleting-data)
- [Creating Tables](#creating-tables)
- [Altering Tables](#altering-tables)
- [Distinct Values](#distinct-values)
- [String Functions](#string-functions)
- [Date Functions](#date-functions)
- [Subqueries](#subqueries)
- [CASE Statements](#case-statements)
- [Common Mistakes](#common-mistakes-to-avoid)

---

## Basic SELECT Query

The **SELECT statement** is the foundation of SQL. It retrieves data from one or more database tables. Understanding SELECT is essential for data analysis, reporting, and database querying.

### Simple SELECT
Retrieve specific columns from a table:
```sql
SELECT column1, column2, column3
FROM table_name;
```

### SELECT All Columns
Retrieve all columns (use cautiously on large tables):
```sql
SELECT *
FROM table_name;
```

### SELECT with Alias
Rename columns for clarity and readability:
```sql
SELECT column1 AS alias_name, column2 AS col2
FROM table_name;
```

---

## Filtering Data

### WHERE Clause
**Filter rows** based on specific conditions. The WHERE clause is fundamental for data analysis and reducing result sets.

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

### Common Conditions & Operators
Understanding comparison operators is crucial for effective querying:

```sql
-- Equality
WHERE age = 25

-- Comparison operators
WHERE salary > 50000       -- Greater than
WHERE salary >= 50000      -- Greater than or equal
WHERE salary < 100000      -- Less than
WHERE salary <= 100000     -- Less than or equal

-- Not equal (use either syntax)
WHERE status != 'inactive'
WHERE status <> 'inactive'

-- Text pattern matching (LIKE operator)
WHERE name LIKE 'A%'        -- Starts with letter A
WHERE name LIKE '%Smith'    -- Ends with "Smith"
WHERE name LIKE '%John%'    -- Contains "John"

-- NULL value checks
WHERE email IS NULL         -- Missing value
WHERE email IS NOT NULL     -- Value exists

-- Logical operators (combine conditions)
WHERE age > 25 AND salary > 50000           -- Both conditions true
WHERE department = 'Sales' OR department = 'Marketing'  -- Either condition true
WHERE NOT (status = 'inactive')             -- Negate condition
```

### IN Operator
**Match any value** in a list (more efficient than multiple OR conditions):
```sql
SELECT *
FROM employees
WHERE department IN ('Sales', 'Marketing', 'IT');
```

### BETWEEN Operator
**Select a range** of values (inclusive):
```sql
SELECT *
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
```

---

## Sorting Results

### ORDER BY
**Sort query results** for better data presentation and analysis:

```sql
-- Ascending order (default)
SELECT *
FROM employees
ORDER BY salary;

-- Descending order (highest to lowest)
SELECT *
FROM employees
ORDER BY salary DESC;

-- Multiple columns (sort by primary, then secondary)
SELECT *
FROM employees
ORDER BY department ASC, salary DESC;
```

---

## Limiting Results

### LIMIT & OFFSET
**Control result set size** for pagination and performance optimization:

```sql
-- Get first 10 rows
SELECT *
FROM employees
LIMIT 10;

-- Pagination: skip 10 rows, get next 10
SELECT *
FROM employees
LIMIT 10 OFFSET 10;
```

---

## Aggregation Functions

**Aggregate functions** compute values across multiple rows, essential for reporting and analytics.

### COUNT
Count rows or non-NULL values:
```sql
-- Count all rows
SELECT COUNT(*) FROM employees;

-- Count non-NULL values in column
SELECT COUNT(email) FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department) FROM employees;
```

### SUM, AVG, MIN, MAX
Calculate statistics on numeric columns:
```sql
SELECT 
    SUM(salary) as total_salary,
    AVG(salary) as average_salary,
    MIN(salary) as lowest_salary,
    MAX(salary) as highest_salary
FROM employees;
```

---

## Grouping Data

### GROUP BY
**Group rows** with identical values in specified columns, often used with aggregate functions:

```sql
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department;
```

### GROUP BY with HAVING
**Filter groups** after aggregation (note: use HAVING instead of WHERE for aggregates):

```sql
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
```

---

## Joining Tables

**JOINs combine data** from multiple tables based on relationships. Critical for relational database queries.

### INNER JOIN
Return only matching rows from both tables:
```sql
SELECT e.employee_name, d.department_name
FROM employees e
INNER JOIN departments d 
    ON e.department_id = d.id;
```

### LEFT JOIN
Return all left table rows + matching right rows (NULL if no match):
```sql
SELECT e.employee_name, d.department_name
FROM employees e
LEFT JOIN departments d 
    ON e.department_id = d.id;
```

### RIGHT JOIN
Return all right table rows + matching left rows:
```sql
SELECT e.employee_name, d.department_name
FROM employees e
RIGHT JOIN departments d 
    ON e.department_id = d.id;
```

### FULL OUTER JOIN
Return all rows from both tables:
```sql
SELECT e.employee_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d 
    ON e.department_id = d.id;
```

---

## Inserting Data

### INSERT Single Row
Add one record to a table:
```sql
INSERT INTO employees (name, email, salary, department_id)
VALUES ('John Doe', 'john@example.com', 75000, 1);
```

### INSERT Multiple Rows
Add multiple records efficiently:
```sql
INSERT INTO employees (name, email, salary, department_id)
VALUES 
    ('John Doe', 'john@example.com', 75000, 1),
    ('Jane Smith', 'jane@example.com', 80000, 2),
    ('Bob Johnson', 'bob@example.com', 70000, 1);
```

---

## Updating Data

### UPDATE Single Column
Modify one field for matching rows:
```sql
UPDATE employees
SET salary = 85000
WHERE employee_id = 5;
```

### UPDATE Multiple Columns
Modify multiple fields:
```sql
UPDATE employees
SET salary = 85000, department_id = 3
WHERE employee_id = 5;
```

### UPDATE with Condition
Update with calculations:
```sql
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 2;
```

---

## Deleting Data

### DELETE Rows
**Remove records** matching specific criteria (use WHERE to avoid deleting all records):

```sql
DELETE FROM employees
WHERE employee_id = 5;
```

### DELETE with Condition
Delete records by attribute value:
```sql
DELETE FROM employees
WHERE hire_date < '2020-01-01';
```

---

## Creating Tables

### Basic CREATE TABLE
Define table structure with columns and constraints:
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10, 2),
    hire_date DATE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

### Common Data Types
- `INT` - Integer numbers
- `VARCHAR(n)` - Text up to n characters (variable length)
- `DECIMAL(precision, scale)` - Numbers with decimals (e.g., money)
- `DATE` - Date values (YYYY-MM-DD)
- `DATETIME` - Date and time together
- `BOOLEAN` - True/False values
- `TEXT` - Large text fields

### Table Constraints
- `PRIMARY KEY` - Unique identifier for each row
- `NOT NULL` - Column must always have a value
- `UNIQUE` - All values must be different
- `FOREIGN KEY` - Reference to another table
- `DEFAULT` - Default value if none provided
- `CHECK` - Validate data meets condition

---

## Altering Tables

### Add Column
Extend existing table with new column:
```sql
ALTER TABLE employees
ADD COLUMN phone_number VARCHAR(15);
```

### Modify Column
Change column properties:
```sql
ALTER TABLE employees
MODIFY COLUMN salary DECIMAL(12, 2);
```

### Drop Column
Remove unwanted column:
```sql
ALTER TABLE employees
DROP COLUMN phone_number;
```

---

## Distinct Values

### Get Unique Records
```sql
-- Get unique departments
SELECT DISTINCT department
FROM employees;

-- Count unique departments
SELECT COUNT(DISTINCT department)
FROM employees;
```

---

## String Functions

### Common String Operations
```sql
-- Concatenation (combine strings)
SELECT CONCAT(first_name, ' ', last_name) as full_name
FROM employees;

-- String length
SELECT name, LENGTH(name) as name_length
FROM employees;

-- Case conversion
SELECT UPPER(name), LOWER(name)
FROM employees;

-- Extract part of string
SELECT SUBSTRING(email, 1, 5) as email_prefix
FROM employees;
```

---

## Date Functions

### Date Manipulation & Extraction
```sql
-- Current date and time
SELECT NOW(), CURDATE(), CURTIME();

-- Extract date components
SELECT YEAR(hire_date), MONTH(hire_date), DAY(hire_date)
FROM employees;

-- Date arithmetic (add intervals)
SELECT hire_date, DATE_ADD(hire_date, INTERVAL 1 YEAR) as anniversary
FROM employees;
```

---

## Subqueries

### Subquery in WHERE
Use another query's results as filter:
```sql
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);
```

### Subquery in FROM
Use query results as temporary table:
```sql
SELECT department, avg_sal
FROM (
    SELECT department, AVG(salary) as avg_sal
    FROM employees
    GROUP BY department
) subquery
WHERE avg_sal > 50000;
```

---

## CASE Statements

### Conditional Logic in Queries
Implement if-then-else logic in SQL:
```sql
SELECT 
    name,
    salary,
    CASE 
        WHEN salary < 50000 THEN 'Junior'
        WHEN salary >= 50000 AND salary < 80000 THEN 'Mid-level'
        WHEN salary >= 80000 THEN 'Senior'
    END as level
FROM employees;
```

---

## Common Mistakes to Avoid

Learn from these frequent SQL errors to write better queries:

| Mistake | Problem | Solution |
|---------|---------|----------|
| `WHERE col = NULL` | Returns no results | Use `WHERE col IS NULL` |
| Missing WHERE | Deletes all data | Always use WHERE in DELETE/UPDATE |
| `SELECT *` on large tables | Slow queries, excess data transfer | Select only needed columns |
| Type mismatch | Implicit conversion errors | Ensure data types match |
| Missing semicolon | Query won't execute | Always end with `;` |
| Column alias in WHERE | Can't filter on alias | Use alias only in ORDER BY/SELECT |
| Implicit type conversion | Different databases behave differently | Use CAST() for explicit conversion |

---

## Next Steps

- **Master Theory**: Review [SQL Theory](/level-1-foundations/sql/theory/) for deeper concepts
- **Practice Queries**: Try [SQL Practice Questions](/level-1-foundations/sql/practice/)
- **Learn Databases**: Explore [Data Structures](/level-1-foundations/data-structure/)


WHERE status != 'inactive'
WHERE status <> 'inactive'

-- Text patterns
WHERE name LIKE 'A%'        -- Starts with A
WHERE name LIKE '%Smith'    -- Ends with Smith
WHERE name LIKE '%John%'    -- Contains John

-- NULL checks
WHERE email IS NULL
WHERE email IS NOT NULL

-- Multiple conditions
WHERE age > 25 AND salary > 50000
WHERE department = 'Sales' OR department = 'Marketing'
WHERE NOT (status = 'inactive')
```

### IN Operator
```sql
SELECT *
FROM employees
WHERE department IN ('Sales', 'Marketing', 'IT');
```

### BETWEEN Operator
```sql
SELECT *
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
```

## Sorting Results

### ORDER BY
```sql
-- Ascending (default)
SELECT *
FROM employees
ORDER BY salary;

-- Descending
SELECT *
FROM employees
ORDER BY salary DESC;

-- Multiple columns
SELECT *
FROM employees
ORDER BY department ASC, salary DESC;
```

## Limiting Results

### LIMIT
```sql
-- Get first 10 rows
SELECT *
FROM employees
LIMIT 10;

-- Skip first 10, get next 10 (pagination)
SELECT *
FROM employees
LIMIT 10 OFFSET 10;
```

## Aggregation Functions

### COUNT
```sql
-- Count all rows
SELECT COUNT(*) FROM employees;

-- Count non-NULL values in column
SELECT COUNT(email) FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department) FROM employees;
```

### SUM, AVG, MIN, MAX
```sql
SELECT 
    SUM(salary) as total_salary,
    AVG(salary) as average_salary,
    MIN(salary) as lowest_salary,
    MAX(salary) as highest_salary
FROM employees;
```

## Grouping Data

### GROUP BY
```sql
SELECT department, COUNT(*) as employee_count
FROM employees
GROUP BY department;
```

### GROUP BY with HAVING
```sql
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;
```

## Joining Tables

### INNER JOIN
```sql
SELECT e.employee_name, d.department_name
FROM employees e
INNER JOIN departments d 
    ON e.department_id = d.id;
```

### LEFT JOIN
```sql
SELECT e.employee_name, d.department_name
FROM employees e
LEFT JOIN departments d 
    ON e.department_id = d.id;
```

### RIGHT JOIN
```sql
SELECT e.employee_name, d.department_name
FROM employees e
RIGHT JOIN departments d 
    ON e.department_id = d.id;
```

### FULL OUTER JOIN
```sql
SELECT e.employee_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d 
    ON e.department_id = d.id;
```

## Inserting Data

### INSERT Single Row
```sql
INSERT INTO employees (name, email, salary, department_id)
VALUES ('John Doe', 'john@example.com', 75000, 1);
```

### INSERT Multiple Rows
```sql
INSERT INTO employees (name, email, salary, department_id)
VALUES 
    ('John Doe', 'john@example.com', 75000, 1),
    ('Jane Smith', 'jane@example.com', 80000, 2),
    ('Bob Johnson', 'bob@example.com', 70000, 1);
```

## Updating Data

### UPDATE Single Column
```sql
UPDATE employees
SET salary = 85000
WHERE employee_id = 5;
```

### UPDATE Multiple Columns
```sql
UPDATE employees
SET salary = 85000, department_id = 3
WHERE employee_id = 5;
```

### UPDATE with Condition
```sql
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 2;
```

## Deleting Data

### DELETE Rows
```sql
DELETE FROM employees
WHERE employee_id = 5;
```

### DELETE with Condition
```sql
DELETE FROM employees
WHERE hire_date < '2020-01-01';
```

## Creating Tables

### Basic CREATE TABLE
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10, 2),
    hire_date DATE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

### Data Types
- `INT` - Integer numbers
- `VARCHAR(n)` - Text up to n characters
- `DECIMAL(precision, scale)` - Numbers with decimals
- `DATE` - Date values
- `DATETIME` - Date and time
- `BOOLEAN` - True/False

### Constraints
- `PRIMARY KEY` - Unique identifier for each row
- `NOT NULL` - Column must have a value
- `UNIQUE` - All values in column must be different
- `FOREIGN KEY` - Reference to another table
- `DEFAULT` - Default value if none provided
- `CHECK` - Validate column values

## Altering Tables

### Add Column
```sql
ALTER TABLE employees
ADD COLUMN phone_number VARCHAR(15);
```

### Modify Column
```sql
ALTER TABLE employees
MODIFY COLUMN salary DECIMAL(12, 2);
```

### Drop Column
```sql
ALTER TABLE employees
DROP COLUMN phone_number;
```

## Distinct Values

```sql
-- Get unique departments
SELECT DISTINCT department
FROM employees;

-- Count unique departments
SELECT COUNT(DISTINCT department)
FROM employees;
```

## String Functions

```sql
-- Concatenation
SELECT CONCAT(first_name, ' ', last_name) as full_name
FROM employees;

-- Length
SELECT name, LENGTH(name) as name_length
FROM employees;

-- Uppercase/Lowercase
SELECT UPPER(name), LOWER(name)
FROM employees;

-- Substring
SELECT SUBSTRING(email, 1, 5) as email_prefix
FROM employees;
```

## Date Functions

```sql
-- Current date/time
SELECT NOW(), CURDATE(), CURTIME();

-- Extract parts
SELECT YEAR(hire_date), MONTH(hire_date), DAY(hire_date)
FROM employees;

-- Date arithmetic
SELECT hire_date, DATE_ADD(hire_date, INTERVAL 1 YEAR) as anniversary
FROM employees;
```

## Subqueries

### Subquery in WHERE
```sql
SELECT *
FROM employees
WHERE salary > (
    SELECT AVG(salary) 
    FROM employees
);
```

### Subquery in FROM
```sql
SELECT department, avg_sal
FROM (
    SELECT department, AVG(salary) as avg_sal
    FROM employees
    GROUP BY department
) subquery
WHERE avg_sal > 50000;
```

## CASE Statements

```sql
SELECT 
    name,
    salary,
    CASE 
        WHEN salary < 50000 THEN 'Junior'
        WHEN salary >= 50000 AND salary < 80000 THEN 'Mid-level'
        WHEN salary >= 80000 THEN 'Senior'
    END as level
FROM employees;
```

## Common Mistakes to Avoid

- **NULL Comparisons**: Use `IS NULL`, not `= NULL`
- **Type Mismatches**: Ensure data types match in comparisons
- **Missing WHERE**: DELETE without WHERE removes all rows
- **Case Sensitivity**: Some databases are case-sensitive
- **Semicolon**: Always end statements with `;`
- **Column Aliases**: Can't use aliases in WHERE clause
- **Implicit Type Conversion**: Different databases handle this differently
