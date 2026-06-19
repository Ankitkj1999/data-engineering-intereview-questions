---
title: Data Structures
description: Interview questions covering fundamental data structures
---

# Data Structures
+ [What is data structure?](#what-is-data-structure)
+ [What are the goals of data structure?](#what-are-the-goals-of-data-structure)
+ [What does abstract data type mean?](#what-does-abstract-data-type-mean)
+ [What is the difference between a stack and an array?](#what-is-the-difference-between-a-stack-and-an-array)
+ [What do you mean by recursive definition?](#what-do-you-mean-by-recursive-definition)
+ [What is sequential search?](#what-is-sequential-search)
+ [What actions are performed when a function is called?](#what-actions-are-performed-when-a-function-is-called)
+ [What actions are performed when a function returns?](#what-actions-are-performed-when-a-function-returns)
+ [What is a linked list?](#what-is-a-linked-list)
+ [What are the advantages of linked list over array (static data structure)?](#what-are-the-advantages-of-linked-list-over-array-static-data-structure)
+ [We apply binary search algorithm to a sorted linked list why?](#we-apply-binary-search-algorithm-to-a-sorted-linked-list-why)
+ [What do you mean by free pool?](#what-do-you-mean-by-free-pool)
+ [What do you mean by garbage collection?](#what-do-you-mean-by-garbage-collection)
+ [What do you mean by overflow and underflow?](#what-do-you-mean-by-overflow-and-underflow)
+ [What are the disadvantages array implementations of linked list?](#what-are-the-disadvantages-array-implementations-of-linked-list)
+ [What is a queue?](#what-is-a-queue)
+ [What is a priority queue?](#what-is-a-priority-queue)
+ [What are the disadvantages of sequential storage?](#what-are-the-disadvantages-of-sequential-storage)
+ [What are the disadvantages of representing a stack or queue by a linked list?](#what-are-the-disadvantages-of-representing-a-stack-or-queue-by-a-linked-list)
+ [What is dangling pointer and how to avoid it?](#what-is-dangling-pointer-and-how-to-avoid-it)
+ [What are the disadvantages of linear list?](#what-are-the-disadvantages-of-linear-list)
+ [Define circular list?](#define-circular-list)
+ [What are the disadvantages of circular list?](#what-are-the-disadvantages-of-circular-list)
+ [Define double linked list?](#define-double-linked-list)

## What is data structure?
A data structure is a way of organizing data that considers not only the items stored, but also their relationship to each other. Advance knowledge about the relationship between data items allows designing of efficient algorithms for the manipulation of data.

[Table of Contents](#data-structures)

## What are the goals of data structure?
It must rich enough in structure to reflect the actual relationship of data in real world. The structure should be simple enough for efficient processing of data.

[Table of Contents](#data-structures)

## What does abstract data type mean?
Data type is a collection of values and a set of operations on these values. Abstract data type refer to the mathematical concept that define the data type.
It is a useful tool for specifying the logical properties of a data type.
ADT consists of two parts
1) Values definition
2) Operation definition
   Example:-The value definition for the ADT RATIONAL states that RATIONAL value consists of two integers, second doesnt equal to zero.
   The operator definition for ADT RATIONAL includes the operation of creation (make rational) addition, multiplication and test for equality.

[Table of Contents](#data-structures)

## What is the difference between a stack and an array?
STACK:
i) Stack is a ordered collection of items.
ii) Stack is a dynamic object whose size is constantly changing as items are pushed and popped.
iii) Stack may contain different data types.
iv) Stack is declared as a structure containing an array to hold the element of the stack, and an integer to indicate the current stack top within the array.
ARRAY:
i) Array is an ordered collection of items.
ii) Array is a static object i.e. no of item is fixed and is assigned by the declaration of the array.
iii) It contains same data types.
iv) Array can be home of a stack i.e. array can be declared large enough for maximum size of the stack.

[Table of Contents](#data-structures)

## What do you mean by recursive definition?
The definition which defines an object in terms of simpler cases of itself is called recursive definition.

[Table of Contents](#data-structures)

## What is sequential search?
In sequential search each item in the array is compared with the item being searched until a match occurs. It is applicable to a table organized either as an array or as a linked list.

[Table of Contents](#data-structures)

## What actions are performed when a function is called?
When a function is called
i) arguments are passed.
ii) local variables are allocated and initialized.
ii) transferring control to the function.

[Table of Contents](#data-structures)

## What actions are performed when a function returns?
i) Return address is retrieved.
ii) Functions data area is freed.
iii) Branch is taken to the return address.

[Table of Contents](#data-structures)

## What is a linked list?
A linked list is a linear collection of data elements, called nodes, where the linear order is given by pointers. Each node has two parts first part contain the information of the element second part contains the address of the next node in the list.

[Table of Contents](#data-structures)

## What are the advantages of linked list over array (static data structure)?
The disadvantages of array are:
i) unlike linked list it is expensive to insert and delete elements in the array.
ii) One cant double or triple the size of array as it occupies block of memory space.
In linked list
i) each element in list contains a field, called a link or pointer which contains the address of the next element.
ii) Successive elements need not occupy adjacent space in memory.

[Table of Contents](#data-structures)

## We apply binary search algorithm to a sorted linked list why?
No we cannot apply binary search algorithm to a sorted linked list, since there is no way of indexing the middle element in the list. This is the drawback in using linked list as a data structure.

[Table of Contents](#data-structures)

## What do you mean by free pool?
Pool is a list consisting of unused memory cells which has its own pointer.

[Table of Contents](#data-structures)

## What do you mean by garbage collection?
It is a technique in which the operating system periodically collects all the deleted space onto the free storage list.
It takes place when there is minimum amount of space left in storage list or when CPU is ideal.
The alternate method to this is to immediately reinsert the space into free storage list which is time consuming.

[Table of Contents](#data-structures)

## What do you mean by overflow and underflow?
When new data is to be inserted into the data structure but there is no available space i.e. free storage list is empty this situation is called overflow.
When we want to delete data from a data structure that is empty this situation is called underflow.

[Table of Contents](#data-structures)

## What are the disadvantages array implementations of linked list?
i) The no of nodes needed cant be predicted when the program is written.
ii) The no of nodes declared must remain allocated throughout its execution.

[Table of Contents](#data-structures)

## What is a queue?
A queue is an ordered collection of items from which items may be deleted at one end (front end) and items inserted at the other end (rear end).
It obeys FIFO rule there is no limit to the number of elements a queue contains.

[Table of Contents](#data-structures)

## What is a priority queue?
The priority queue is a data structure in which the intrinsic ordering of the elements (numeric or alphabetic)
Determines the result of its basic operation. It is of two types:
i) Ascending priority queue- Here smallest item can be removed (insertion is arbitrary).
ii) Descending priority queue- Here largest item can be removed (insertion is arbitrary).

[Table of Contents](#data-structures)

## What are the disadvantages of sequential storage?
i) Fixed amount of storage remains allocated to the data structure even if it contains less element.
ii) No more than fixed amount of storage is allocated causing overflow.

[Table of Contents](#data-structures)

## What are the disadvantages of representing a stack or queue by a linked list?
i) A node in a linked list (info and next field) occupies more storage than a corresponding element in an array.
ii) Additional time spent in managing the available list.

[Table of Contents](#data-structures)

## What is dangling pointer and how to avoid it?
After a call to free(p) makes a subsequent reference to *p illegal, i.e. though the storage to p is freed but the value of p(address) remain unchanged .so the object at that address may be used as the value of *p (i.e. there is no way to detect the illegality).Here p is called dangling pointer.
To avoid this it is better to set p to NULL after executing free(p).The null pointer value doesnt reference a storage location it is a pointer that doesnt point to anything.

[Table of Contents](#data-structures)

## What are the disadvantages of linear list?
i) We cannot reach any of the nodes that precede node (p).
ii) If a list is traversed, the external pointer to the list must be persevered in order to reference the list again.

[Table of Contents](#data-structures)

## Define circular list?
In linear list the next field of the last node contain a null pointer, when a next field in the last node contain a pointer back to the first node it is called circular list.
Advantages – From any point in the list it is possible to reach at any other point.

[Table of Contents](#data-structures)

## What are the disadvantages of circular list?
i) We cant traverse the list backward.
ii) If a pointer to a node is given we cannot delete the node.

[Table of Contents](#data-structures)

## Define double linked list?
It is a collection of data elements called nodes,
where each node is divided into three parts:
An info field that contains the information stored in the node.
Left field that contain pointer to node on left side.
Right field that contain pointer to node on right side.

[Table of Contents](#data-structures)
