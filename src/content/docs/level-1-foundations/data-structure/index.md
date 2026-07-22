---
title: Data Structures
description: Data structure interview questions for data engineering — arrays, linked lists, stacks, queues, and the concepts behind efficient pipeline code.
---

## Data Structures: Interview Questions

**Data structures are inherently coding-problem territory — understanding them well means writing efficient data processing code and choosing the right organization for a given problem.**

## Table of Contents
- [Key Concepts](#key-concepts)
- [Interview Questions](#interview-questions)
- [Further Reading](#further-reading)

---

## Key Concepts

Data structures matter to a data engineer for three reasons: writing efficient processing code, optimizing memory usage in pipelines, and choosing the right organization for a problem (arrays, linked lists, stacks/queues, hash tables, trees, and graphs each trade off differently on lookup, insert, and memory cost).

---

## Interview Questions

### What is a data structure?
A way of organizing data that considers not only the items stored, but also their relationship to each other. Knowing that relationship in advance allows designing efficient algorithms for manipulating the data.

### What are the goals of a data structure?
It must be rich enough in structure to reflect the actual relationships of data in the real world, while staying simple enough for efficient processing.

### What does abstract data type mean?
A data type is a collection of values plus a set of operations on those values. An abstract data type (ADT) is the mathematical concept defining a data type's logical properties, independent of implementation. An ADT has two parts: a **value definition** (e.g. the ADT `RATIONAL` consists of two integers, the second non-zero) and an **operation definition** (creation, addition, multiplication, equality test).

### What is the difference between a stack and an array?
**Stack:** an ordered collection whose size changes dynamically as items are pushed/popped, may hold mixed types conceptually, and is typically implemented as a structure containing an array plus an integer tracking the current top.
**Array:** an ordered, static collection — size is fixed at declaration, and it holds a single data type. An array can back a stack's implementation (declared large enough for the stack's maximum size).

### What do you mean by recursive definition?
A definition that defines an object in terms of simpler cases of itself.

### What is sequential search?
Comparing each item in the array (or linked list) against the target until a match is found.

### What actions are performed when a function is called?
Arguments are passed, local variables are allocated and initialized, and control transfers to the function.

### What actions are performed when a function returns?
The return address is retrieved, the function's data area is freed, and execution branches back to the return address.

### What is a linked list?
A linear collection of nodes where order is given by pointers rather than physical placement. Each node stores the element's data plus the address of the next node.

### What are the advantages of a linked list over an array?
Arrays are expensive to insert into or delete from, and can't be resized without reallocating a new memory block. In a linked list, each element carries a pointer to the next, so successive elements need not occupy adjacent memory — insertion and deletion just rewire pointers.

### Why can't you apply binary search to a sorted linked list?
Binary search needs random access to the middle element by index; a linked list has no way to index directly to the middle, so binary search isn't applicable — a key drawback of using linked lists.

### What do you mean by a free pool?
A list of unused memory cells, maintained with its own pointer, from which new nodes are allocated.

### What do you mean by garbage collection?
An operating system technique that periodically reclaims deleted space back onto the free storage list — triggered when free space runs low or the CPU is idle. The alternative, immediately reinserting freed space into the list, is more time-consuming.

### What do you mean by overflow and underflow?
**Overflow:** inserting into a data structure when no space is available (the free storage list is empty). **Underflow:** attempting to delete from a data structure that is already empty.

### What are the disadvantages of an array implementation of a linked list?
The number of nodes needed can't be predicted at compile time, and the declared nodes remain allocated for the program's entire execution.

### What is a queue?
An ordered collection where items are inserted at the rear and removed from the front — FIFO (first in, first out) — with no inherent limit on the number of elements.

### What is a priority queue?
A data structure where the intrinsic ordering of elements determines removal order rather than insertion order. **Ascending priority queue:** smallest item is removed first. **Descending priority queue:** largest item is removed first.

### What are the disadvantages of sequential storage?
A fixed amount of storage stays allocated even when the structure holds fewer elements, and once that fixed allocation is exhausted, overflow occurs.

### What are the disadvantages of representing a stack or queue with a linked list?
Each node's info + next-pointer fields occupy more storage than the equivalent array element, and extra time is spent managing the available-node list.

### What is a dangling pointer, and how do you avoid it?
After `free(p)`, a subsequent reference to `*p` is illegal — the storage is freed but `p`'s address value is unchanged, so it may still be dereferenced (with no way to detect the illegality). This is a dangling pointer. Avoid it by setting `p` to `NULL` immediately after `free(p)`.

### What are the disadvantages of a linear list?
You can't reach nodes preceding a given node `p`, and to traverse the list again, an external pointer to its head must be preserved.

### What is a circular list?
A linear list where the last node's next field, instead of holding a null pointer, points back to the first node. Advantage: from any point in the list, every other point is reachable.

### What are the disadvantages of a circular list?
You can't traverse it backward, and given only a pointer to a node, you can't delete that node (you'd need the predecessor).

### What is a doubly linked list?
A collection of nodes where each node has three parts: an info field holding the data, a left pointer to the previous node, and a right pointer to the next node.

---

## Further Reading

- [SQL Interview Questions](/level-1-foundations/sql/) — the query-writing counterpart to these coding-structure problems
- [Python Practice](/level-1-foundations/python/practice/) — coding exercises that build on these data structures
- [Data Engineering Roadmap](/roadmaps/data-engineering/) — where data structures fit into the broader curriculum
