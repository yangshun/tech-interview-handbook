---
id: graph
title: Graph
---

## Study links

- [From Theory To Practice: Representing Graphs](https://medium.com/basecs/from-theory-to-practice-representing-graphs-cfd782c5be38)
- [Deep Dive Through A Graph: DFS Traversal](https://medium.com/basecs/deep-dive-through-a-graph-dfs-traversal-8177df5d0f13)
- [Going Broad In A Graph: BFS Traversal](https://medium.com/basecs/going-broad-in-a-graph-bfs-traversal-959bd1a09255)

## Notes

Be familiar with the various graph representations, graph search algorithms and their time and space complexities.

You can be given a list of edges and tasked to build your own graph from the edges to perform a traversal on. The common graph representations are:

- Adjacency matrix.
- Adjacency list.
- Hashmap of hashmaps.

A tree-like diagram could very well be a graph that allows for cycles and a naive recursive solution would not work. In that case you will have to handle cycles and keep a set of visited nodes when traversing.

## Graph search algorithms:

- **Common** - Breadth-first Search, Depth-first Search
- **Uncommon** - Topological Sort, Dijkstra's algorithm
- **Rare** - Bellman-Ford algorithm, Floyd-Warshall algorithm, Prim's algorithm, Kruskal's algorithm

In coding interviews, graphs are commonly represented as 2-D matrices where cells are the nodes and each cell can traverse to its adjacent cells (up/down/left/right). Hence it is important that you be familiar with traversing a 2-D matrix. When recursively traversing the matrix, always ensure that your next position is within the boundary of the matrix. More tips for doing depth-first searches on a matrix can be found [here](https://discuss.leetcode.com/topic/66065/python-dfs-bests-85-tips-for-all-dfs-in-matrix-question/). A simple template for doing depth-first searches on a matrix goes like this:

```py
def traverse(matrix):
  rows, cols = len(matrix), len(matrix[0])
  visited = set()
  directions = ((0, 1), (0, -1), (1, 0), (-1, 0))
  def dfs(i, j):
    if (i, j) in visited:
      return
    visited.add((i, j))
    # Traverse neighbors
    for direction in directions:
      next_i, next_j = i + direction[0], j + direction[1]
      if 0 <= next_i < rows and 0 <= next_j < cols: # Check boundary
        # Add any other checking here ^
        dfs(next_i, next_j)

  for i in range(rows):
    for j in range(cols):
      dfs(i, j)
```

## Corner cases

- Empty graph
- Graph with one or two nodes
- Disjoint graphs
- Graph with cycles

## Recommended Leetcode questions

- [Clone Graph](https://leetcode.com/problems/clone-graph/)
- [Course Schedule](https://leetcode.com/problems/course-schedule/)
- [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)
- [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)
- [Alien Dictionary (Leetcode Premium)](https://leetcode.com/problems/alien-dictionary/)
- [Graph Valid Tree (Leetcode Premium)](https://leetcode.com/problems/graph-valid-tree/)
- [Number of Connected Components in an Undirected Graph (Leetcode Premium)](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

## More questions

- Given a list of sorted words from an alien dictionary, find the order of the alphabet.
  - Alien Dictionary Topological Sort question.
- Find if a given string matches any path in a labeled graph. A path may contain cycles.
- Given a bipartite graph, separate the vertices into two sets.
- You are a thief trying to sneak across a rectangular 100 x 100m field. There are alarms placed on the fields and they each have a circular sensing radius which will trigger if anyone steps into it. Each alarm has its own radius. Determine if you can get from one end of the field to the other end.
- Given a graph and two nodes, determine if there exists a path between them.
- Determine if a cycle exists in the graph.
