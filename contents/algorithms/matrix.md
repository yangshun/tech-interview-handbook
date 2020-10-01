---
id: matrix
title: Matrix
---

## Notes

A matrix is a 2-dimensional array. Questions involving matrices are usually related to dynamic programming or graph traversal.

For questions involving traversal or dynamic programming, you almost always want to make a copy of the matrix with the same dimensions that is initialized to empty values to store the visited state or dynamic programming table. Be familiar with such a routine:

```py
rows, cols = len(matrix), len(matrix[0])
copy = [[0 for _ in range(cols)] for _ in range(rows)]
```

Many grid-based games can be modeled as a matrix, such as Tic-Tac-Toe, Sudoku, Crossword, Connect 4, Battleship, etc. It is not uncommon to be asked to verify the winning condition of the game. For games like Tic-Tac-Toe, Connect 4 and Crosswords, where verification has to be done vertically and horizontally, one trick is to write code to verify the matrix for the horizontal cells, transpose the matrix and reuse the logic for horizontal verification to verify originally vertical cells (which are now horizontal).

Transposing a matrix in Python is simply:

```py
transposed_matrix = zip(*matrix)
```

## Corner cases

- Empty matrix. Check that none of the arrays are 0 length
- 1 x 1 matrix
- Matrix with only one row or column

## Recommended LeetCode questions

- [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/)
- [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/)
- [Rotate Image](https://leetcode.com/problems/rotate-image/)
- [Word Search](https://leetcode.com/problems/word-search/)
