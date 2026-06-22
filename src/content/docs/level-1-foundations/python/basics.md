---
title: Python Basics
description: Master Python fundamentals with practical examples. Learn variables, data types, control flow, functions, and data structures. Complete beginner's guide to Python syntax and programming.
---

# Python Basics: Essential Syntax & Fundamentals

**Start your Python journey with fundamental concepts and syntax. Perfect for beginners learning programming and preparing for data engineering interviews.**

## Table of Contents
- [Python Setup & Execution](#python-setup--execution)
- [Variables & Data Types](#variables--data-types)
- [Numbers & Arithmetic](#numbers--arithmetic)
- [Strings & Text Processing](#strings--text-processing)
- [Lists & Arrays](#lists--arrays)
- [Tuples](#tuples)
- [Dictionaries](#dictionaries)
- [Sets](#sets)
- [Conditional Statements](#conditional-statements)
- [Loops](#loops)
- [Functions](#functions)
- [Built-in Functions](#built-in-functions)
- [String Methods](#string-methods)
- [List Methods](#list-methods)
- [Comprehensions](#comprehensions)
- [File Operations](#file-operations)
- [Common Mistakes](#common-mistakes-to-avoid)

---

## Python Setup & Execution

**Python** is an interpreted, dynamically-typed language widely used in data engineering. Understanding how to execute Python is fundamental to getting started.

### Running Python Code
```bash
# Interactive Python shell
python

# Run a Python file
python script.py

# Execute a single command
python -c "print('Hello, World!')"
```

### Python Comments
```python
# Single-line comment
print("This is code")  # Comment at end of line

# Multi-line comments (using triple quotes, not official but common)
"""
This is a multi-line comment
Used for documentation
"""
```

---

## Variables & Data Types

### Variable Assignment
**Variables store data values** without explicit type declaration. Python infers types automatically.

```python
# Simple assignment
name = "Alice"
age = 30
salary = 75000.50
is_active = True

# Multiple assignment
x, y, z = 10, 20, 30

# Swap values
x, y = y, x
```

### Built-in Data Types
Python provides several fundamental data types for different purposes:

| Type | Description | Example |
|------|-------------|---------|
| `int` | Integer numbers | `42`, `-5`, `0` |
| `float` | Decimal numbers | `3.14`, `-2.5`, `0.0` |
| `str` | Text strings | `"Hello"`, `'Python'` |
| `bool` | True or False | `True`, `False` |
| `list` | Ordered, mutable collection | `[1, 2, 3]` |
| `tuple` | Ordered, immutable collection | `(1, 2, 3)` |
| `dict` | Key-value pairs | `{'name': 'Alice', 'age': 30}` |
| `set` | Unordered, unique items | `{1, 2, 3}` |
| `None` | Null/empty value | `None` |

### Type Checking & Conversion
```python
# Check variable type
type(42)                    # <class 'int'>
type("Hello")               # <class 'str'>
isinstance(age, int)        # True

# Convert between types
int("42")                   # 42
str(42)                     # "42"
float("3.14")               # 3.14
bool(1)                     # True
bool(0)                     # False
```

---

## Numbers & Arithmetic

### Arithmetic Operators
```python
# Basic operations
10 + 5                      # 15 (addition)
10 - 5                      # 5 (subtraction)
10 * 5                      # 50 (multiplication)
10 / 5                      # 2.0 (division - always returns float)
10 // 3                     # 3 (floor division - integer result)
10 % 3                      # 1 (modulo - remainder)
2 ** 3                      # 8 (exponentiation)

# Assignment operators
x = 10
x += 5                      # x = x + 5 (same for -=, *=, /=, etc.)
```

### Number Methods
```python
# Rounding
round(3.7)                  # 4
round(3.14159, 2)           # 3.14 (round to 2 decimal places)

# Absolute value
abs(-42)                    # 42

# Min and Max
min(1, 5, 3)                # 1
max(1, 5, 3)                # 5

# Power
pow(2, 3)                   # 8 (same as 2 ** 3)
```

---

## Strings & Text Processing

### String Basics
**Strings are sequences of characters** fundamental to data processing and display.

```python
# String creation (single and double quotes are equivalent)
message = "Hello, World!"
name = 'Python'

# Multiline strings
text = """This is a
multiline string
spanning multiple lines"""

# String concatenation
greeting = "Hello" + " " + "World"

# String repetition
pattern = "ab" * 3          # "ababab"

# String indexing (0-based)
message[0]                  # "H"
message[-1]                 # "!" (last character)

# String slicing
message[0:5]                # "Hello"
message[7:]                 # "World!"
message[::2]                # Every 2nd character
```

### String Formatting
```python
# f-strings (Python 3.6+, most modern approach)
name = "Alice"
age = 30
print(f"Name: {name}, Age: {age}")

# Format method
print("Name: {}, Age: {}".format(name, age))

# String interpolation with %
print("Name: %s, Age: %d" % (name, age))

# Decimal formatting
price = 19.99
print(f"Price: ${price:.2f}")  # Price: $19.99
```

### String Escape Characters
```python
# Common escape sequences
"Line 1\nLine 2"            # Newline
"Tab\there"                 # Tab
"Quote: \"Hello\""          # Escaped double quote
"Path: C:\\Users\\Data"     # Backslash
```

---

## Lists & Arrays

### List Creation & Access
**Lists are ordered, mutable collections** used extensively in data processing.

```python
# Create lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
empty = []

# Indexing (0-based)
numbers[0]                  # 1
numbers[-1]                 # 5 (last element)

# Slicing
numbers[1:3]                # [2, 3]
numbers[:3]                 # [1, 2, 3] (first 3 elements)
numbers[2:]                 # [3, 4, 5] (from index 2 to end)

# Length
len(numbers)                # 5
```

### Modifying Lists
```python
# Add elements
numbers.append(6)           # Add to end
numbers.insert(0, 0)        # Insert at specific position

# Remove elements
numbers.pop()               # Remove last element (returns it)
numbers.pop(0)              # Remove at specific index
numbers.remove(3)           # Remove first occurrence of value

# Modify element
numbers[0] = 99             # Change value at index

# Extend list
numbers.extend([6, 7, 8])   # Add multiple elements

# Clear list
numbers.clear()             # Remove all elements
```

### List Operations
```python
# Check membership
3 in numbers                # True
10 in numbers               # False

# Find index
numbers.index(3)            # Returns index of first occurrence

# Count occurrences
numbers.count(2)            # How many times 2 appears

# Reverse
numbers.reverse()           # Reverse list in place
reversed(numbers)           # Returns reversed iterator

# Sort
numbers.sort()              # Sort in ascending order
numbers.sort(reverse=True)  # Sort in descending order
```

---

## Tuples

### Tuple Basics
**Tuples are immutable sequences** used for fixed collections and data protection.

```python
# Create tuples
coordinates = (10, 20)
single_item = (42,)         # Note the comma for single item
empty = ()

# Access elements (like lists)
coordinates[0]              # 10
coordinates[-1]             # 20

# Unpacking
x, y = coordinates          # x=10, y=20

# Tuples are immutable (cannot modify)
# coordinates[0] = 5        # This would cause an error
```

### Tuple Operations
```python
# Concatenation
tuple1 = (1, 2)
tuple2 = (3, 4)
combined = tuple1 + tuple2  # (1, 2, 3, 4)

# Repetition
pattern = (1, 2) * 3        # (1, 2, 1, 2, 1, 2)

# Convert between list and tuple
list_data = list((1, 2, 3))
tuple_data = tuple([1, 2, 3])
```

---

## Dictionaries

### Dictionary Basics
**Dictionaries store key-value pairs** commonly used for structured data processing.

```python
# Create dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Access values
person["name"]              # "Alice"
person.get("age")           # 30
person.get("country", "USA") # Returns "USA" (default if key missing)

# Check if key exists
"name" in person            # True
"age" in person             # True
```

### Modifying Dictionaries
```python
# Add or update key-value pair
person["age"] = 31          # Update existing key
person["email"] = "alice@example.com"  # Add new key

# Remove keys
del person["email"]         # Delete specific key
person.pop("age")           # Remove and return value
person.clear()              # Remove all items

# Get all keys and values
person.keys()               # dict_keys(['name', 'age', 'city'])
person.values()             # dict_values(['Alice', 30, 'New York'])
person.items()              # Key-value pairs
```

### Dictionary Iteration
```python
# Iterate over keys
for key in person:
    print(key)

# Iterate over values
for value in person.values():
    print(value)

# Iterate over key-value pairs
for key, value in person.items():
    print(f"{key}: {value}")
```

---

## Sets

### Set Basics
**Sets store unique, unordered items** useful for membership testing and duplicate removal.

```python
# Create sets
colors = {"red", "green", "blue"}
numbers = {1, 2, 3, 1, 2}   # {1, 2, 3} - duplicates removed
empty_set = set()           # Cannot use {}; that creates a dict

# Check membership
"red" in colors             # True
"yellow" in colors          # False

# Get length
len(colors)                 # 3
```

### Set Operations
```python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Union (all items from both sets)
set1 | set2                 # {1, 2, 3, 4, 5}
set1.union(set2)            # Same result

# Intersection (common items)
set1 & set2                 # {3}
set1.intersection(set2)     # Same result

# Difference (items in set1 but not set2)
set1 - set2                 # {1, 2}

# Symmetric difference (items in either but not both)
set1 ^ set2                 # {1, 2, 4, 5}
```

### Modifying Sets
```python
colors = {"red", "green", "blue"}

# Add element
colors.add("yellow")

# Remove elements
colors.remove("red")        # Raises error if item doesn't exist
colors.discard("red")       # No error if item doesn't exist

# Clear set
colors.clear()
```

---

## Conditional Statements

### If-Elif-Else
**Control program flow based on conditions** essential for decision-making logic.

```python
age = 25

if age < 18:
    print("Minor")
elif age < 65:
    print("Working age")
else:
    print("Retired")
```

### Comparison Operators
```python
# Equal and not equal
x == 5                      # True if x equals 5
x != 5                      # True if x not equals 5

# Greater and less than
x > 5
x >= 5
x < 5
x <= 5

# Logical operators
x > 5 and y < 10            # Both must be true
x > 5 or y < 10             # Either can be true
not (x > 5)                 # Negate condition
```

### Conditional Expressions (Ternary)
```python
# Concise if-else
status = "Adult" if age >= 18 else "Minor"

# Nested ternary
level = "High" if score >= 90 else "Medium" if score >= 70 else "Low"
```

---

## Loops

### For Loops
**Iterate over sequences** used for processing collections of data.

```python
# Loop over list
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)

# Loop with range
for i in range(5):          # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):       # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):   # 0, 2, 4, 6, 8 (step of 2)
    print(i)

# Loop with enumerate (get index and value)
for index, value in enumerate(numbers):
    print(f"Index {index}: {value}")

# Loop over dictionary
person = {"name": "Alice", "age": 30}
for key, value in person.items():
    print(f"{key}: {value}")
```

### While Loops
```python
# Simple while loop
count = 0
while count < 5:
    print(count)
    count += 1

# With break
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == "quit":
        break
    print(f"You entered: {user_input}")

# With continue
for i in range(10):
    if i % 2 == 0:
        continue            # Skip even numbers
    print(i)
```

---

## Functions

### Function Definition & Calling
**Functions encapsulate reusable code** essential for organized programming.

```python
# Simple function
def greet():
    """Greet the user."""
    print("Hello!")

greet()                     # Function call

# Function with parameters
def add(a, b):
    """Add two numbers and return the result."""
    return a + b

result = add(10, 5)         # 15

# Default parameters
def greet_user(name="Guest"):
    print(f"Hello, {name}!")

greet_user()                # Hello, Guest!
greet_user("Alice")         # Hello, Alice!
```

### Return Values
```python
def calculate_average(numbers):
    """Calculate average of list of numbers."""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

avg = calculate_average([10, 20, 30])  # 20.0

# Multiple return values
def get_name_parts(full_name):
    """Split name into first and last."""
    parts = full_name.split()
    return parts[0], parts[1]

first, last = get_name_parts("Alice Smith")  # "Alice", "Smith"
```

### Function Arguments
```python
# Positional arguments
def describe(name, age, city):
    print(f"{name} is {age} years old from {city}")

describe("Alice", 30, "New York")

# Keyword arguments (order doesn't matter)
describe(city="New York", name="Alice", age=30)

# Variable-length arguments
def sum_all(*numbers):
    """Sum any number of arguments."""
    return sum(numbers)

sum_all(1, 2, 3, 4, 5)      # 15

# Keyword arguments collection
def print_info(**kwargs):
    """Print all keyword arguments."""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="New York")
```

### Variable Scope
```python
global_var = "I'm global"   # Accessible everywhere

def my_function():
    local_var = "I'm local" # Only accessible in function
    print(global_var)       # Can access global

my_function()
# print(local_var)          # This would cause an error
```

---

## Built-in Functions

### Common Built-in Functions
```python
# Type and value checking
type(42)                    # <class 'int'>
len([1, 2, 3])              # 3
sum([1, 2, 3])              # 6
max([1, 5, 3])              # 5
min([1, 5, 3])              # 1

# Integer conversion
int("42")                   # 42
float("3.14")               # 3.14
str(42)                     # "42"

# Iteration helpers
range(5)                    # 0, 1, 2, 3, 4
enumerate([10, 20, 30])     # Index and value pairs
zip([1, 2], ['a', 'b'])     # Pair elements: (1, 'a'), (2, 'b')

# Any and All
any([False, False, True])   # True (at least one True)
all([True, True, True])     # True (all True)

# Sorting
sorted([3, 1, 4, 1, 5])     # [1, 1, 3, 4, 5]
sorted("hello")             # ['e', 'h', 'l', 'l', 'o']
```

---

## String Methods

### Common String Operations
```python
text = "Hello, World!"

# Case conversion
text.upper()                # "HELLO, WORLD!"
text.lower()                # "hello, world!"
text.capitalize()           # "Hello, world!"
text.title()                # "Hello, World!"

# Checking content
text.startswith("Hello")    # True
text.endswith("!")          # True
text.isdigit()              # False (all digits?)
text.isalpha()              # False (all letters?)
text.isspace()              # False (all whitespace?)

# Finding and replacing
text.find("World")          # 7 (index of substring)
text.count("l")             # 3 (count occurrences)
text.replace("World", "Python")  # "Hello, Python!"

# Splitting and joining
"a,b,c".split(",")          # ["a", "b", "c"]
"-".join(["a", "b", "c"])   # "a-b-c"

# Stripping whitespace
"  hello  ".strip()         # "hello"
"  hello  ".lstrip()        # "hello  "
"  hello  ".rstrip()        # "  hello"
```

---

## List Methods

### Common List Operations
```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sorting and reversing
numbers.sort()              # Modify in place: [1, 1, 2, 3, 4, 5, 6, 9]
sorted(numbers)             # Return new sorted list
numbers.reverse()           # Reverse in place

# Finding elements
numbers.index(4)            # First index of value
numbers.count(1)            # Count occurrences

# Adding elements
numbers.append(10)          # Add to end
numbers.insert(0, 0)        # Insert at position
numbers.extend([11, 12])    # Add multiple elements

# Removing elements
numbers.remove(10)          # Remove first occurrence
numbers.pop()               # Remove and return last
numbers.pop(0)              # Remove and return at index
```

---

## Comprehensions

### List Comprehensions
**Concise syntax for creating new lists** from existing sequences.

```python
# Basic list comprehension
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]

# With condition
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Nested comprehension
matrix = [[i+j for j in range(3)] for i in range(3)]

# List comprehension with function
words = ["hello", "world", "python"]
lengths = [len(word) for word in words]  # [5, 5, 6]
```

### Dictionary Comprehensions
```python
# Create dictionary from list
squares_dict = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, ...}

# With condition
evens_dict = {x: x**2 for x in range(10) if x % 2 == 0}
```

### Set Comprehensions
```python
# Create set
unique_lengths = {len(word) for word in ["hello", "world", "hi"]}  # {2, 5}
```

---

## File Operations

### Reading Files
```python
# Read entire file
with open('data.txt', 'r') as file:
    content = file.read()   # Read all content

# Read line by line
with open('data.txt', 'r') as file:
    for line in file:
        print(line.strip())

# Read all lines into list
with open('data.txt', 'r') as file:
    lines = file.readlines()  # List of lines
```

### Writing Files
```python
# Write to file
with open('output.txt', 'w') as file:
    file.write("Hello, World!\n")

# Append to file
with open('output.txt', 'a') as file:
    file.write("Another line\n")

# Write multiple lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open('output.txt', 'w') as file:
    file.writelines(lines)
```

### File Modes
| Mode | Purpose |
|------|---------|
| `'r'` | Read (default) |
| `'w'` | Write (creates or overwrites) |
| `'a'` | Append (add to end) |
| `'x'` | Create (fails if exists) |
| `'b'` | Binary mode (combine with other modes) |

---

## Common Mistakes to Avoid

Learn from these frequent Python errors to write better code:

| Mistake | Problem | Solution |
|---------|---------|----------|
| `list[10:1]` | Returns empty list (backwards range) | Use correct slice order |
| `if x = 5` | SyntaxError (assignment in condition) | Use `==` for comparison |
| Modifying list while iterating | Unexpected behavior or skip elements | Iterate over copy or use comprehension |
| `dict["key"]` when missing | KeyError raised | Use `.get("key", default)` |
| `[1, 2] == [1, 2]` vs `is` | `==` compares values, `is` checks identity | Use appropriate operator |
| Mutable default arguments | All calls share same default object | Use `None` and create new object |
| Indentation errors | Code not executed or error raised | Maintain consistent indentation |
| `range()` is 0-indexed | Off-by-one errors common | Remember range(5) is 0-4 |

---

## Next Steps

- **Master Theory**: Review [Python Theory](/level-1-foundations/python/theory/) for deeper concepts
- **Practice Coding**: Try [Python Practice Questions](/level-1-foundations/python/practice/)
- **Learn SQL**: Explore [SQL Basics](/level-1-foundations/sql/basics/)
