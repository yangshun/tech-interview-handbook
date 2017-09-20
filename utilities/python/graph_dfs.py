def graph_dfs(matrix):
    rows, cols = len(matrix), len(matrix[0])
    visited = set()
    directions = ((0, 1), (0, -1), (1, 0), (-1, 0))
    def dfs(i, j):
        if (i, j) in visited:
            return
        visited.add((i, j))
        # Traverse neighbors.
        for direction in directions:
            next_i, next_j = i + direction[0], j + direction[1]
            if 0 <= next_i < rows and 0 <= next_j < cols: # Check boundary.
                # Add any other checking here ^
                dfs(next_i, next_j)

    for i in range(rows):
        for j in range(cols):
            dfs(i, j)

graph_dfs([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
])
