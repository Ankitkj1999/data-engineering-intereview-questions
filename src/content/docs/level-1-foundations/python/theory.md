---
title: Python Theory | Core Concepts
description: Master Python fundamentals for data engineering. Learn data types, OOP, generators, concurrency, decorators, and best practices. Essential Python interview guide.
---

# Python Theory: Core Concepts for Data Engineering

**Essential Python concepts for data engineering interviews, covering fundamentals to advanced topics with practical examples.**

## Table of Contents
- [Python Fundamentals](#python-fundamentals)
- [Python Functions and Modules](#python-functions-and-modules)
- [Python Advanced Concepts](#python-advanced-concepts)
- [Python Object-oriented Programming](#python-object-oriented-programming)
- [Python Debugging and Testing](#python-debugging-and-testing)
- [File Handling and Data Processing](#file-handling-and-data-processing)
- [Python Libraries and Frameworks](#python-libraries-and-frameworks)
- [Networking and Databases in Python](#networking-and-databases-in-python)

---

## Python Fundamentals

**1. What are the key features of Python?**
- **Simple syntax**: Readable, English-like code
- **Interpreted**: Runs without compilation
- **High-level**: Abstracts memory management
- **Dynamic typing**: No explicit type declarations
- **Cross-platform**: Runs on Windows, Linux, macOS
- **Extensive libraries**: Rich ecosystem (pandas, NumPy, requests)

**2. How is Python executed?**
Source code → Python interpreter → Bytecode → Python Virtual Machine (PVM). Can use CPython, PyPy, or Jython implementations.

**3. What is PEP 8 and why is it important?**
Python Enhancement Proposal 8 defines coding style conventions. Ensures consistent, readable code across projects. Use `flake8` or `black` for auto-formatting.

**4. How is memory allocation and garbage collection handled in Python?**
Memory manager handles allocation. **Garbage collection** uses reference counting + cyclic GC to reclaim unused objects automatically.

**5. What are the built-in data types in Python?**
- **Numeric**: int, float, complex
- **Sequence**: list, tuple, range
- **Text**: str
- **Mapping**: dict
- **Set**: set, frozenset
- **Boolean**: bool
- **None**: NoneType

**6. Explain the difference between a mutable and immutable object.**
- **Mutable**: Can change (list, dict, set)
- **Immutable**: Cannot change (int, str, tuple, frozenset)

**7. How do you handle exceptions in Python?**
```python
try:
    # Risky code
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
finally:
    cleanup_code()
```

**8. What is the difference between list and tuple?**
- **list**: Mutable, `[]` syntax
- **tuple**: Immutable, `()` syntax

**9. How do you create a dictionary in Python?**
```python
# Literal syntax
d = {"key": "value"}
# dict() constructor
d = dict(key="value")
# dict comprehension
d = {k: v for k, v in [("a", 1), ("b", 2)]}
```

**10. What is the difference between == and is operator in Python?**
- **==**: Compares values (equality)
- **is**: Compares identity (same object in memory)

---

## Python Functions and Modules

**11. How does a Python function work?**
Functions encapsulate reusable logic. Defined with `def`, can accept arguments, return values, and have docstrings.

```python
def greet(name: str) -> str:
    """Return greeting message."""
    return f"Hello, {name}!"
```

**12. What is a lambda function, and where would you use it?**
Anonymous single-expression function. Used for short operations in `map()`, `filter()`, `sorted()`:

```python
squared = list(map(lambda x: x**2, [1, 2, 3]))
```

**13. Explain *args and **kwargs in Python.**
- **`*args`**: Variable positional arguments as tuple
- **`**kwargs`**: Variable keyword arguments as dict

**14. What are decorators in Python?**
Functions that modify other functions. Use `@decorator` syntax:

```python
@timer
def slow_function():
    pass
```

**15. How can you create a module in Python?**
Create `.py` file with functions/classes. Import with `import module_name` or `from module_name import item`.

**16. How do you share global variables across modules?**
Create config module with variables, import in other modules: `from config import GLOBAL_VAR`.

**17. What is the use of if __name__ == '__main__':?**
Ensures code runs only when script is executed directly, not imported.

**18. What are Python namespaces?**
Scope for variable names. Types: local, global, built-in. Prevents naming conflicts.

**19. How does a Python module search path work?**
Python searches `sys.path`: current directory, PYTHONPATH, standard library, site-packages.

**20. What is a Python package?**
Directory with `__init__.py` file. Organizes related modules. Import with `import package.module`.

---

## Python Advanced Concepts

**21. What is list comprehension? Give an example.**
Concise list creation:
```python
squares = [x**2 for x in range(10) if x % 2 == 0]
```

**22. Explain dictionary comprehension.**
```python
square_dict = {x: x**2 for x in range(5)}
```

**23. What are generators in Python, and how do you use them?**
Functions using `yield` for lazy evaluation. Memory efficient for large datasets.

**24. How do you implement concurrency in Python?**
Use `threading` (I/O-bound), `multiprocessing` (CPU-bound), or `asyncio` (async I/O).

**25. What are coroutines and how do they differ from threads?**
Coroutines are async functions using `async def`/`await`. Single-threaded, cooperative multitasking vs. OS-managed threads.

**26. What is the Global Interpreter Lock (GIL)?**
Mutex allowing only one thread to execute Python bytecode. Prevents true parallelism in threading.

**27. How would you optimize the performance of a Python application?**
Profile with `cProfile`, use NumPy for numerical ops, Cython for speed, caching, async I/O.

**28. What is a context manager and the with statement in Python?**
Manages resources automatically. Used with `with` statement:

```python
with open("file.txt") as f:
    data = f.read()
```

**29. What strategies can be employed to optimize memory usage in Python applications?**
Use generators, `__slots__`, weak references, delete large variables with `del`, process data in chunks.

**30. What is monkey patching in Python?**
Modifying code at runtime. Changing module/class attributes dynamically (use sparingly).

---

## Python Object-oriented Programming

**31. What are classes in Python?**
Blueprints for objects. Defined with `class` keyword.

**32. How does Python support object-oriented programming?**
Classes, inheritance, polymorphism, encapsulation via methods.

**33. What is inheritance and give an example in Python?**
Child class inherits from parent:

```python
class Employee(Person):
    pass
```

**34. How do you achieve encapsulation in Python?**
Private attributes (`_name`), name mangling (`__name`), properties (`@property`).

**35. What are class methods, static methods, and instance methods?**
- **Instance**: `def method(self)` - access instance attributes
- **Class**: `@classmethod def method(cls)` - access class attributes
- **Static**: `@staticmethod def method()` - no access to class/instance

**36. What is polymorphism in Python?**
Different classes using same method name:

```python
for obj in [list, dict]:
    obj().get(key)  # Different implementations
```

**37. Explain the use of the super() function.**
Accesses parent class methods. `super().__init__()` calls parent constructor.

**38. What is method resolution order (MRO) in Python?**
Order Python searches for methods in inheritance. Use `ClassName.__mro__`.

**39. What are magic methods in Python?**
Dunder methods (`__init__`, `__str__`, `__add__`) for operator overloading and special behavior.

**40. How do you prevent a class from being inherited?**
Override `__init_subclass__` to raise error, or use final decorator (Python 3.8+).

---

## Python Debugging and Testing

**41. How do you debug a Python program?**
Use `pdb` (debugger), print statements, logging, IDE debuggers.

**42. What are some popular debugging tools for Python?**
`pdb`, `ipdb`, `py-spy`, IDE debuggers (VS Code, PyCharm).

**43. What is unit testing in Python?**
Testing individual units/functions. Use `unittest` or `pytest`.

**44. How do you write a basic test case in Python using unittest?**
```python
import unittest

class TestMath(unittest.TestCase):
    def test_add(self):
        self.assertEqual(1 + 1, 2)
```

**45. What is pytest and how is it used?**
Simpler testing framework. Functions named `test_` with assertions.

**46. How do you test a Python function with side effects?**
Use mocking (`unittest.mock.patch`) to isolate dependencies.

**47. What is a breakpoint and how do you use it?**
`breakpoint()` (Python 3.7+) or `import pdb; pdb.set_trace()`.

**48. How do you log messages in Python?**
```python
import logging
logging.basicConfig(level=logging.INFO)
logging.info("Processing data...")
```

**49. How do you use assertions in Python?**
`assert condition, "message"` for debugging checks.

**50. What is a traceback, and how do you analyze it?**
Error stack trace showing call sequence. Analyze line numbers and function calls to locate issue.

---

## File Handling and Data Processing

**51. How do you open and close a file in Python?**
```python
with open("file.txt", "r") as f:
    # Auto-closes
    pass
```

**52. What are the different modes for opening a file?**
- **r**: Read
- **w**: Write
- **a**: Append
- **x**: Create/exclusive
- **b**: Binary (`rb`, `wb`)

**53. How do you read and write data to a file in Python?**
```python
with open("file.txt", "w") as f:
    f.write("data")
with open("file.txt", "r") as f:
    content = f.read()
```

**54. What is a CSV file and how do you read it in Python?**
Comma-separated values. Use `csv` module or `pandas.read_csv()`.

**55. What are JSON files and how does Python process them?**
JavaScript Object Notation. Use `json` module: `json.load()`, `json.dump()`.

**56. How do you handle binary files in Python?**
Open with `"rb"` or `"wb"` mode. Use `pickle` for serialization.

**57. What is the pandas library, and how is it used?**
Data manipulation library. DataFrames for tabular data, read/write various formats.

**58. How do you process data in chunks with pandas?**
Use `pd.read_csv(chunksize=1000)` to iterate data in batches.

**59. What are the advantages of using NumPy arrays over nested Python lists?**
Faster operations, memory efficient, vectorized operations, broadcasting.

**60. How do you use the os and sys modules for interacting with the operating system?**
- **os**: File operations, environment variables (`os.getenv()`)
- **sys**: Command line args (`sys.argv`), exit (`sys.exit()`)

---

## Python Libraries and Frameworks

**61. What are the key features of the Flask framework?**
Lightweight web framework. Routes, templates (Jinja2), extensible with extensions.

**62. How do you build a REST API in Flask?**
```python
@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify(users)
```

**63. What is Django and what is it used for?**
Full-featured web framework. ORM, admin panel, authentication, MVC architecture.

**64. How do you create a new Django project?**
`django-admin startproject project_name`, `python manage.py runserver`.

**65. What is an ORM, and how does Django use it?**
Object-Relational Mapping. Convert Python objects to database records.

**66. What is the purpose of the requests module?**
HTTP library for API calls: `requests.get(url).json()`.

**67. How do you visualize data in Python?**
`matplotlib`, `seaborn`, `plotly` for charts and graphs.

**68. What are some libraries you can use for machine learning in Python?**
`scikit-learn`, `tensorflow`, `pytorch`, `xgboost`, `lightgbm`.

**69. How do you schedule tasks in Python?**
`schedule`, `apscheduler`, cron jobs, Celery for distributed tasks.

**70. What is asyncio and how do you use it?**
Async I/O framework. Use `async def`, `await`, event loop for concurrent operations.

---

## Networking and Databases in Python

**71. How do you implement socket programming in Python?**
Use `socket` module: `socket.socket()`, `bind()`, `listen()`, `accept()`.

**72. What are the steps to make a simple HTTP request in Python?**
```python
import requests
response = requests.get('https://api.example.com')
data = response.json()
```

**73. How do you connect to a SQL database in Python?**
Use DB-API connectors: `sqlite3`, `psycopg2`, `mysql-connector`.

**74. How do you execute a query in a database using Python?**
```python
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

**75. What is a NoSQL database and how would you interact with it in Python?**
Document/key-value stores. Use `pymongo` (MongoDB), `redis-py` (Redis), `boto3` (DynamoDB).

---

## Python Scripting and Automation

**76. How would you automate a repetitive task in Python?**
Write script with loops, schedule with cron/Celery, use `watchdog` for file events.

**77. How can Python scripts be used for system administration?**
File operations (`os`, `shutil`), process management (`subprocess`), config automation.

**78. What techniques can you use for parsing text files?**
Regex (`re`), string methods, `csv` module, `BeautifulSoup` for HTML/XML.

**79. How do you manipulate CSV files using Python?**
Use `csv` module or `pandas.read_csv()`/`to_csv()`.

**80. How do you automate web browsing using Python?**
Use `selenium`, `playwright`, or `requests-html` for scraping.

---

## Python Regular Expressions

**81. What are regular expressions and how are they used?**
Pattern matching for text. Import `re`, use `re.search()`, `re.findall()`.

**82. How do you compile a regular expression in Python?**
`pattern = re.compile(r'\d+')` for repeated use (better performance).

**83. Give examples of commonly used regex patterns in Python.**
- `\d+`: digits
- `\w+`: word characters
- `[a-z]+`: letters
- `^...$`: anchors

**84. How do you replace text in a string using regular expressions?**
`re.sub(r'pattern', 'replacement', text)`.

**85. When should you use regular expressions and when should you avoid them?**
Use for pattern matching. Avoid for simple fixed strings (use `str.replace()`).

---

## Python Environment and Configuration

**86. How do you manage Python environments using venv?**
`python -m venv env`, `source env/bin/activate`.

**87. What is a virtual environment and when should you use one?**
Isolated Python environment. Use for dependency isolation per project.

**88. How do you install Python packages?**
`pip install package_name`, `pip install -r requirements.txt`.

**89. How do you manage dependencies in Python projects?**
Use `requirements.txt`, `pipenv`, or `poetry` with lock files.

**90. What is Docker and how do you use it with Python?**
Container platform. Use `Dockerfile` with Python image, `docker build/run`.

---

## Python and Data Science

**91. What is data science and how is Python used in it?**
Extract insights from data. Python with pandas, NumPy, scikit-learn dominates the field.

**92. How do you clean and preprocess data in Python?**
pandas `dropna()`, `fillna()`, `astype()`, regex cleaning.

**93. What is a DataFrame in pandas?**
2D labeled data structure. Rows/columns like spreadsheet, powerful for analysis.

**94. How do you handle missing data with pandas?**
`dropna()` to remove, `fillna()` to impute, `interpolate()` for estimation.

**95. How can you perform data aggregation in pandas?**
`groupby()`, `agg()`, `pivot_table()` for summary statistics.

---

## Python and Machine Learning

**96. What is scikit-learn and how do you use it?**
ML library for classification, regression, clustering. Pipeline API, model selection.

**97. How do you handle feature selection in Python?**
Use `SelectKBest`, `RFE`, or manual selection with pandas.

**98. What is cross-validation and how do you perform it in Python?**
Validate model performance. Use `sklearn.model_selection.cross_val_score()`.

**99. How do you save a trained machine learning model with Python?**
Use `joblib.dump(model, 'model.pkl')` or `pickle.dump()`.

**100. What are the steps involved in training a machine learning model with Python?**
Load data → preprocess → split train/test → train model → evaluate → deploy.
