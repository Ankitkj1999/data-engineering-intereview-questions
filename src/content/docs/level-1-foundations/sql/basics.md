---
title: SQL Basics
description: Essential SQL syntax and commands for beginners
---

# SQL Basics

This section covers the essential SQL commands and syntax you need to get started with querying databases.

## Basic SELECT Query

### Simple SELECT
```sql
SELECT column1, column2, column3
FROM table_name;
```

### SELECT All Columns
```sql
SELECT *
FROM table_name;
```

### SELECT with Alias
```sql
SELECT column1 AS alias_name, column2 AS col2
FROM table_name;
```

## Filtering Data

### WHERE Clause
```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

### Common Conditions
```sql
-- Equality
WHERE age = 25

-- Comparison
WHERE salary > 50000
WHERE salary >= 50000
WHERE salary < 100000
WHERE salary <= 100000

-- Not equal
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
