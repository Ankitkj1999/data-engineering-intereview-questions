---
title: SQL Practice | Query Challenges
description: Practice SQL queries with real interview questions. Solve problems involving JOINs, aggregations, ranking, and data analysis. Essential coding practice.
---

## SQL Practice: Query Challenges for Interviews

**Hands-on SQL query problems with solutions to prepare for data engineering interviews.**

## Table of Contents
- [Write sql query to get the second highest salary among all employees?](#write-sql-query-to-get-the-second-highest-salary-among-all-employees)
- [How to Retrieve Alternate Records from a Table in SQL](#how-to-retrieve-alternate-records-from-a-table-in-sql)
- [Find Maximum Salary by Department](#find-maximum-salary-by-department)
- [Find Records in Table A That Are Not in Table B (Without `NOT IN`)](#find-records-in-table-a-that-are-not-in-table-b-without-not-in)
- [Find Employees with Duplicate Names and Emails](#find-employees-with-duplicate-names-and-emails)
- [Find Maximum Salary from Each Department](#find-maximum-salary-from-each-department)
- [Find the nth Highest Salary](#find-the-nth-highest-salary)
- [Find 10 Employees with Odd Employee IDs](#find-10-employees-with-odd-employee-ids)
- [Find Employees Born Between Two Dates](#find-employees-born-between-two-dates)
- [Get the Quarter From a Date](#get-the-quarter-from-a-date)
- [Find Employees with Duplicate Emails](#find-employees-with-duplicate-emails)
- [Find Employees with Name Containing "Rich" (Case-Insensitive)](#find-employees-with-name-containing-"rich"-case-insensitive)
- [How to Calculate the Number of Days Between Two Dates in SQL](#how-to-calculate-the-number-of-days-between-two-dates-in-sql)
- [How to Get the Current Date and Time in SQL](#how-to-get-the-current-date-and-time-in-sql)
- [How do you limit a query to display a specific number of rows?](#how-do-you-limit-a-query-to-display-a-specific-number-of-rows)

---

## Write sql query to get the second highest salary among all employees?
Given an `Employee` table with the following structure and data:

| ID | Salary |
| --- | --- |
| 10 | 2000 |
| 11 | 5000 |
| 12 | 3000 |

---


#### There are multiple ways to find the second highest salary among all employees.

##### Option 1: Use a Subquery with `NOT IN`

This approach finds the maximum salary first, excludes it from the dataset, and then finds the new maximum salary from the remaining records.

```sql
SELECT MAX(Salary) AS SecondHighestSalary 
FROM Employee 
WHERE Salary NOT IN (
    SELECT MAX(Salary) 
    FROM Employee
);

```

##### Option 2: Use the Not Equal Operator (`<>`)

This works identically to Option 1, but uses the `<>` (not equal to) operator instead of `NOT IN`. This is highly efficient when you only need to exclude a single top value.

```sql
SELECT MAX(Salary) AS SecondHighestSalary 
FROM Employee 
WHERE Salary <> (
    SELECT MAX(Salary) 
    FROM Employee
);

```

##### Option 3: Use `LIMIT` and `OFFSET` (Best for Row Ordering)

Another common approach is to sort the salaries in descending order and skip the first row. Using `DISTINCT` ensures that duplicate highest salaries don't break the logic.

```sql
SELECT DISTINCT Salary AS SecondHighestSalary 
FROM Employee 
ORDER BY Salary DESC 
LIMIT 1 OFFSET 1;

```

*(Note: In some SQL dialects like SQL Server, you would use `OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY` instead).*





---

## How to Retrieve Alternate Records from a Table in SQL

To get alternate records (even or odd rows), we can generate a row number for each record using the `ROW_NUMBER()` window function, and then use the `MOD` function (or the `%` modulo operator) to filter them.

##### To Get Even-Numbered Records

This query assigns a sequential number to each row, divides that number by 2, and returns rows where the remainder is 0.

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS row_num 
    FROM Employee
) AS Subquery
WHERE MOD(row_num, 2) = 0;

```

*(Note: If your specific SQL dialect doesn't support the `MOD()` function, you can use the percentage operator instead: `WHERE row_num % 2 = 0`).*

##### To Get Odd-Numbered Records

This query follows the same logic, but returns rows where the remainder is 1.

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS row_num 
    FROM Employee
) AS Subquery
WHERE MOD(row_num, 2) = 1;

```







---

## Find Maximum Salary by Department

Given the following database schema:

**Employee Table**

| ID | Salary | DeptID |
| --- | --- | --- |
| 10 | 1000 | 2 |
| 20 | 5000 | 3 |
| 30 | 3000 | 2 |

**Department Table**

| ID | DeptName |
| --- | --- |
| 1 | Marketing |
| 2 | IT |
| 3 | Finance |

---


> **This is a trick question.** Always ask the interviewer: *"Do you want to include departments that have no employees?"*
> * If **Yes**, you must use a `LEFT OUTER JOIN` so empty departments still appear (with a `NULL` salary).
> * If **No**, a standard `INNER JOIN` is sufficient.
> 
> 

##### The Solution (Handles Empty Departments)

```sql
SELECT 
    d.DeptName, 
    MAX(e.Salary) AS MaxSalary
FROM Department d
LEFT OUTER JOIN Employee e 
    ON d.ID = e.DeptID
GROUP BY d.DeptName;

```






---

## Find Records in Table A That Are Not in Table B (Without `NOT IN`)

Given two tables with a single column:

**Table_A** (10, 20, 30)

**Table_B** (15, 30, 45)

##### Option 1: Use Set Operators (`EXCEPT` / `MINUS`)

This returns all distinct rows from the first query that do not appear in the second query.

* **Standard SQL / SQL Server / PostgreSQL / MySQL:**
```sql
SELECT * FROM Table_A
EXCEPT
SELECT * FROM Table_B;

```


* **Oracle:**
```sql
SELECT * FROM Table_A
MINUS
SELECT * FROM Table_B;

```



##### Option 2: Use `LEFT JOIN` (Most Universal)

This joins both tables and filters for rows where no match was found in `Table_B`. This works across all SQL databases.

```sql
SELECT Table_A.* FROM Table_A 
LEFT JOIN Table_B ON Table_A.ID = Table_B.ID
WHERE Table_B.ID IS NULL;

```







---

## Find Employees with Duplicate Names and Emails

Given an `Employee` table with the columns `ID`, `NAME`, and `EMAIL`:

##### Solution: Group By Multiple Columns

To find duplicates across multiple fields, group the data by both `NAME` and `EMAIL`, and use the `HAVING` clause to filter for groups that appear more than once.

```sql
SELECT name, email, COUNT(*) AS duplicate_count
FROM Employee
GROUP BY name, email
HAVING COUNT(*) > 1;

```

##### Key Takeaway

> **The Trick:** By grouping on both columns simultaneously (`GROUP BY name, email`), SQL combines only the rows where *both* pieces of information match exactly. The `HAVING COUNT(*) > 1` then isolates the duplicates.






---

## Find Maximum Salary from Each Department

Given an `Employee` table with the following data:

| ID | Salary | DeptID |
| --- | --- | --- |
| 10 | 1000 | 2 |
| 20 | 5000 | 3 |
| 30 | 3000 | 2 |

---

##### Solution: Use `GROUP BY` and `MAX()`

To find the highest salary in each department, group the data by `DeptID` and use the `MAX()` aggregate function on the `Salary` column.

```sql
SELECT DeptID, MAX(Salary) AS MaxSalary 
FROM Employee 
GROUP BY DeptID;

```

##### Resulting Output

| DeptID | MaxSalary |
| --- | --- |
| 2 | 3000 |
| 3 | 5000 |






---

## Find the nth Highest Salary

Given an `Employee` table with columns `ID` and `Salary`:

##### Option 1: Correlated Subquery (Standard SQL)

This approach counts how many unique salaries are higher than the current row's salary. When that count equals $N-1$, you have found the $n^{\text{th}}$ highest salary.

```sql
SELECT * FROM Employee emp1 
WHERE (N - 1) = (
    SELECT COUNT(DISTINCT emp2.Salary) 
    FROM Employee emp2 
    WHERE emp2.Salary > emp1.Salary
);

```

##### Option 2: `ROW_NUMBER()` Window Function (Recommended)

This method ranks the salaries in descending order and assigns a row number, then filters for the specific rank ($N$). Works across most modern databases (Oracle, SQL Server, PostgreSQL, MySQL).

```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY Salary DESC) AS rnum 
    FROM Employee
) AS Subquery 
WHERE rnum = N;

```

*(Tip: Replace `ROW_NUMBER()` with `DENSE_RANK()` if you want to properly handle duplicate identical salaries).*

##### Option 3: `LIMIT` and `OFFSET` (MySQL / PostgreSQL / SQLite)

The shortest and most efficient syntax if your specific database supports it.

```sql
SELECT DISTINCT Salary 
FROM Employee 
ORDER BY Salary DESC 
LIMIT 1 OFFSET (N - 1);

```






---

## Find 10 Employees with Odd Employee IDs

To find 10 employees with an odd ID, filter the rows using a modulo operation (`ID % 2` or `MOD`) and limit the result set to 10 rows.

##### Standard SQL / Modern Oracle (Version 12c+)

Uses standard ANSI SQL syntax, which works across modern Oracle, PostgreSQL, and MySQL databases.

```sql
SELECT ID 
FROM Employee 
WHERE ID % 2 = 1 
FETCH FIRST 10 ROWS ONLY;

```

##### SQL Server Approach

Uses the `TOP` clause to restrict the result set.

```sql
SELECT TOP 10 ID 
FROM Employee 
WHERE ID % 2 = 1;

```






---

## Find Employees Born Between Two Dates

To retrieve records within a specific date range, use the `BETWEEN` operator. Note that `BETWEEN` is **inclusive**, meaning it includes both the start and end dates.

```sql
SELECT EmpName 
FROM Employees 
WHERE birth_date BETWEEN '1990-01-01' AND '2000-12-31';

```

##### Alternative: Using Comparison Operators

If you prefer not to use `BETWEEN`, you can achieve the exact same result using `>=` and `<=`:

```sql
SELECT EmpName 
FROM Employees 
WHERE birth_date >= '1990-01-01' 
  AND birth_date <= '2000-12-31';

```






---

## Get the Quarter From a Date

##### Option 1: Standard SQL (Recommended)

The most widely supported, database-agnostic way to extract a quarter from a date.

```sql
SELECT EXTRACT(QUARTER FROM DATE '2016-03-31') AS quarter;

```

##### Option 2: Oracle SQL (`TO_CHAR`)

If you are specifically using Oracle, you can pass the format model `"Q"` to the `TO_CHAR` function.

```sql
SELECT TO_CHAR(TO_DATE('03/31/2016', 'MM/DD/YYYY'), 'Q') AS quarter 
FROM DUAL;

```

> **Result:** Both queries will return `1` (representing the first quarter of the year).






---

## Find Employees with Duplicate Emails

Given the `Employee` table:

| ID | NAME | EMAIL |
| --- | --- | --- |
| 10 | John | jsmith |
| 20 | George | gadams |
| 30 | Jane | jsmith |

##### Solution

To find duplicate values, use the `GROUP BY` clause on the target column and filter the groups using `HAVING COUNT(*) > 1`.

```sql
SELECT EMAIL, COUNT(EMAIL) AS occurrence_count
FROM Employee
GROUP BY EMAIL
HAVING COUNT(EMAIL) > 1;

```

> **Note:** When using `GROUP BY`, you can only select columns that are either part of the group or used within an aggregate function (like `COUNT`). Replacing `NAME` with `EMAIL` in the `SELECT` clause ensures the query is valid standard SQL.






---

## Find Employees with Name Containing "Rich" (Case-Insensitive)

To search for a substring regardless of case, you can convert the column data to a single case (upper or lower) before comparing it.

##### Solution

```sql
SELECT * FROM Employees 
WHERE UPPER(emp_name) LIKE '%RICH%';

```

##### Alternative (Using LOWER)

```sql
SELECT * FROM Employees 
WHERE LOWER(emp_name) LIKE '%rich%';

```

> **Note:** Standard SQL uses single quotes (`'`) for string literals like `'%RICH%'`. Double quotes (`"`) can cause errors in many SQL dialects.





---

## How to Calculate the Number of Days Between Two Dates in SQL

Because date functions vary across different SQL databases, here is how to calculate the difference in days using standard SQL dialects:

##### 1. Standard / MySQL / SQL Server

Use the `DATEDIFF()` function.

**MySQL Syntax:** `DATEDIFF(end_date, start_date)`

```sql
SELECT DATEDIFF('2016-12-31', '2015-01-01') AS DaysDifference;

```

**SQL Server (T-SQL) Syntax:** `DATEDIFF(day, start_date, end_date)`

```sql
SELECT DATEDIFF(day, '2015-01-01', '2016-12-31') AS DaysDifference;

```

##### 2. PostgreSQL / Oracle

In these databases, you can directly subtract the start date from the end date.

```sql
SELECT '2016-12-31'::date - '2015-01-01'::date AS DaysDifference;

```

---

> ⚠️ **Note on Order:** In MySQL, the larger date goes *first* to get a positive number. In SQL Server and PostgreSQL, the larger date goes *second* to get a positive number.





---

## How to Get the Current Date and Time in SQL

##### 1. Current Date Only (No Time)

* **Standard SQL (ANSI):** `CURRENT_DATE`
* **MySQL:** `CURRENT_DATE()` or `CURDATE()`

```sql
SELECT CURRENT_DATE;

```

##### 2. Current Date and Time (Timestamp)

* **Standard SQL (ANSI):** `CURRENT_TIMESTAMP`
* **MySQL:** `NOW()` or `CURRENT_TIMESTAMP()`

```sql
SELECT CURRENT_TIMESTAMP;

```

---

> 💡 **Tip:** While MySQL accepts parentheses (e.g., `NOW()`), standard ANSI SQL functions like `CURRENT_DATE` and `CURRENT_TIMESTAMP` are treated as system variables and do not require parentheses. Using the ANSI versions ensures your code works across MySQL, PostgreSQL, SQL Server, and Oracle.





---

## How do you limit a query to display a specific number of rows?

To restrict the number of rows returned by a query, modern **ANSI SQL** uses the `FETCH FIRST` and `OFFSET` clauses.

##### 1. Display Only the Top 10 Rows

This query limits the result set to the first 10 rows.

**Standard SQL:**

```sql
SELECT * FROM table_name 
FETCH FIRST 10 ROWS ONLY;

```

**MySQL Equivalent:**

```sql
SELECT * FROM table_name 
LIMIT 10;

```

##### 2. Skip Rows and Return a Subset (Pagination)

To skip the first 3 rows and return the next 6 rows (starting from the 4th row):

**Standard SQL:**

```sql
SELECT * FROM table_name 
OFFSET 3 ROWS 
FETCH NEXT 6 ROWS ONLY;

```

**MySQL Equivalent:**

```sql
SELECT * FROM table_name 
LIMIT 3, 6; -- Syntax: LIMIT offset, row_count

```

---

> ⚠️ **Important:** Always use an `ORDER BY` clause when limiting rows. Without it, the database returns rows in a random order, making your results unpredictable.




---
