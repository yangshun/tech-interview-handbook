---
id: tree
title: Tree
---

## Study links

- [Leaf It Up To Binary Trees](https://medium.com/basecs/leaf-it-up-to-binary-trees-11001aaf746d)

## Notes

A tree is an undirected and connected acyclic graph.

Recursion is a common approach for trees. When you notice that the subtree problem can be used to solve the entire problem, try using recursion.

When using recursion, always remember to check for the base case, usually where the node is `null`.

When you are asked to traverse a tree by level, use breadth-first search.

Sometimes it is possible that your recursive function needs to return two values.

If the question involves summation of nodes along the way, be sure to check whether nodes can be negative.

You should be very familiar with writing pre-order, in-order, and post-order traversal recursively. As an extension, challenge yourself by writing them iteratively. Sometimes interviewers ask candidates for the iterative approach, especially if the candidate finishes writing the recursive approach too quickly.

Do check out the section on [Trie](trie.md), which is an advanced tree.

## Corner cases

- Empty tree
- Single node
- Two nodes
- Very skewed tree (like a linked list)

## Special Trees

### Binary Tree

In-order traversal of a binary tree is insufficient to uniquely serialize a tree. Pre-order or post-order traversal is also required.

### Binary Search Tree (BST)

In-order traversal of a BST will give you all elements in order.

Be very familiar with the properties of a BST and validating that a binary tree is a BST. This comes up more often than expected.

When a question involves a BST, the interviewer is usually looking for a solution which runs faster than O(n).

#### Recommended Leetcode questions

- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [Same Tree](https://leetcode.com/problems/same-tree/)
- [Invert/Flip Binary Tree](https://leetcode.com/problems/invert-binary-tree/)
- [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
- [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)
- [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)
- [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- [Lowest Common Ancestor of BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

## More questions

- Find the height of a tree.
- Find the longest path from the root to leaf in a tree.
- Find the deepest left leaf of a tree.
- Print all paths of a binary tree.
  - [Source](http://blog.gainlo.co/index.php/2016/04/15/print-all-paths-of-a-binary-tree/)
- Second largest element of a BST.
  - [Source](http://blog.gainlo.co/index.php/2016/06/03/second-largest-element-of-a-binary-search-tree/)
- Given a binary tree and two nodes, how to find the common ancestor of the two nodes?
  - [Source](http://blog.gainlo.co/index.php/2016/07/06/lowest-common-ancestor/)
- Find the lowest common ancestor of two nodes in a binary search tree.
- Print the nodes in an n-ary tree level by level, one printed line per level.
- Given a directory of files and folders (and relevant functions), how would you parse through it to find equivalent files?
- Write a basic file system and implement the commands ls, pwd, mkdir, create, rm, cd, cat, mv.
- Compute the intersection of two binary search trees.
- Given a binary tree, output all the node to leaf paths of it.
- Given a string of characters without spaces, is there a way to break the string into valid words without leftover characters?
- Print a binary tree level by level.
- Determine if a binary tree is "complete" (i.e, if all leaf nodes were either at the maximum depth or max depth-1, and were 'pressed' along the left side of the tree).
- Find the longest path in a binary tree. The path may start and end at any node.
- Determine if a binary tree is a BST.
- Given a binary tree, serialize it into a string. Then deserialize it.
- Print a binary tree by column.
- Given a node, find the next element in a BST.
- Find the shortest subtree that consist of all the deepest nodes. The tree is not binary.
- Print out the sum of each row in a binary tree.
- Pretty print a JSON object.
- Convert a binary tree to a doubly circular linked list.
- Find the second largest number in a binary tree.
- Given a tree, find the longest branch.
- Convert a tree to a linked list.
- Given two trees, write code to find out if tree A is a subtree of tree B.
- Deepest node in a tree.
  - [Source](http://blog.gainlo.co/index.php/2016/04/26/deepest-node-in-a-tree/)
