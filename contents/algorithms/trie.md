---
id: trie
title: Trie
---

## Study links

- [Trying to Understand Tries](https://medium.com/basecs/trying-to-understand-tries-3ec6bede0014)
- [Implement Trie (Prefix Tree)](https://leetcode.com/articles/implement-trie-prefix-tree/)

## Notes

Tries are special trees (prefix trees) that make searching and storing strings more efficient. Tries have many practical applications, such as conducting searches and providing autocomplete. It is helpful to know these common applications so that you can easily identify when a problem can be efficiently solved using a trie.

Sometimes preprocessing a dictionary of words (given in a list) into a trie, will improve the efficiency of searching for a word of length k, among n words. Searching becomes O(k) instead of O(n).

Be familiar with implementing, from scratch, a `Trie` class and its `add`, `remove` and `search` methods.

## Recommended LeetCode questions

- [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree)
- [Add and Search Word](https://leetcode.com/problems/add-and-search-word-data-structure-design)
- [Word Search II](https://leetcode.com/problems/word-search-ii/)
