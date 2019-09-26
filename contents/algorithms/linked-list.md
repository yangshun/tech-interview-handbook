---
id: linked-list
title: Linked List
---

## Notes

Like arrays, linked lists are used to represent sequential data. The benefit of linked lists is that insertion and deletion from anywhere in the list is O(1) whereas in arrays the following elements will have to be shifted.

Adding a dummy node at the head and/or tail might help to handle many edge cases where operations have to be performed at the head or the tail. The presence of dummy nodes essentially ensures that operations will never have be done on the head or the tail, thereby removing a lot of headache in writing conditional checks to dealing with null pointers. Be sure to remember to remove them at the end of the operation.

Sometimes linked lists problem can be solved without additional storage. Try to borrow ideas from reverse a linked list problem.

For deletion in linked lists, you can either modify the node values or change the node pointers. You might need to keep a reference to the previous element.

For partitioning linked lists, create two separate linked lists and join them back together.

Linked lists problems share similarity with array problems, think about how you would do it for an array and try to apply it to a linked list.

Two pointer approaches are also common for linked lists. For example:

- Getting the k<sup>th</sup> from last node - Have two pointers, where one is k nodes ahead of the other. When the node ahead reaches the end, the other node is k nodes behind
- Detecting cycles - Have two pointers, where one pointer increments twice as much as the other, if the two pointers meet, means that there is a cycle
- Getting the middle node - Have two pointers, where one pointer increments twice as much as the other. When the faster node reaches the end of the list, the slower node will be at the middle

## Common Routines

Be familiar with the following routines because many linked list questions make use of one or more of these routines in the solution:

- Counting the number of nodes in the linked list
- Reversing a linked list in-place
- Finding the middle node of the linked list using fast/slow pointers
- Merging two lists together

## Corner cases

- Single node
- Two nodes
- Linked list has cycle. **Tip:** Clarify with the interviewer whether there can be a cycle in the list. Usually the answer is no

## Recommended LeetCode questions

- [Reverse a Linked List](https://leetcode.com/problems/reverse-linked-list/)
- [Detect Cycle in a Linked List](https://leetcode.com/problems/linked-list-cycle/)
- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)
- [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Remove Nth Node From End Of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [Reorder List](https://leetcode.com/problems/reorder-list/)
