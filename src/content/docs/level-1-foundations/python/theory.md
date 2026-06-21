---
title: Python Theory
description: Fundamental Python theory and concepts for data engineering
---

# Python Theory

This section covers fundamental Python concepts and theory essential for data engineering.

## Core Concepts

### Data Types and Collections
- **Immutability**: Strings, tuples, frozensets are immutable; changes create new objects
- **Mutability**: Lists, sets, dictionaries are mutable; modifications change the object in-place
- **Hashing**: Only immutable types can be dictionary keys or set members
- **Type Annotations**: Help with code clarity and IDE support (though Python is dynamically typed)

### Functions and Scope
- **First-Class Functions**: Functions are objects and can be passed as arguments
- **Closures**: Inner functions can access variables from outer scopes
- **Decorators**: Functions that modify or enhance other functions
- **Lambda Functions**: Anonymous functions useful for simple operations
- **Scope Hierarchy**: Local → Enclosing → Global → Built-in (LEGB rule)

### Object-Oriented Programming
- **Classes**: Blueprints for creating objects with attributes and methods
- **Inheritance**: Classes can inherit behavior and attributes from parent classes
- **Polymorphism**: Different classes can implement the same interface differently
- **Encapsulation**: Bundling data and methods within classes
- **Dunder Methods**: Special methods like `__init__`, `__str__`, `__repr__`

### Iterators and Generators
- **Iterators**: Objects that implement `__iter__()` and `__next__()` methods
- **Generators**: Functions that yield values one at a time, implementing lazy evaluation
- **Generator Expressions**: Memory-efficient alternative to list comprehensions
- **Iterator Protocol**: How Python's `for` loops work under the hood

### Exception Handling
- **Try-Except Blocks**: Handle specific exception types
- **Finally**: Code that always executes, useful for cleanup
- **Custom Exceptions**: Create domain-specific exception classes
- **Context Managers**: `with` statements for resource management

### Module System
- **Imports**: Bring modules into namespace
- **Packages**: Directories with `__init__.py` containing modules
- **Namespaces**: Prevent naming conflicts through module organization
- **`__name__ == "__main__"`**: Determine if script is run directly

## Data Engineering Specific Concepts

### Memory Management
- **Reference Counting**: How Python tracks object lifecycles
- **Garbage Collection**: Automatic cleanup of unreferenced objects
- **Memory Profiling**: Tools to identify memory leaks and bottlenecks

### Concurrency
- **GIL (Global Interpreter Lock)**: Limits thread parallelism for CPU-bound tasks
- **Threads**: Suitable for IO-bound operations
- **Multiprocessing**: Needed for CPU-bound parallelism
- **Async/Await**: Event-driven concurrency for high-concurrency IO

### Standard Library Essentials
- **Collections**: `defaultdict`, `Counter`, `namedtuple` for data manipulation
- **Itertools**: Efficient looping and combinations
- **Functools**: Higher-order functions like `reduce` and `partial`
- **Context Managers**: `contextlib` for custom resource management

## Best Practices

- Write Pythonic code that follows PEP 8 conventions
- Use list/dict comprehensions for readable data transformations
- Leverage built-in functions and libraries before writing custom code
- Document code with docstrings for clarity
- Use type hints for better IDE support and code documentation
- Handle exceptions specifically rather than catching all exceptions
