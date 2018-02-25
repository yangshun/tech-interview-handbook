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

# Follow up:
# 1) Diagonal cells are considered neighbors
# 2) View the matrix like Earth, right boundary is adjacent to the left boundary, top adjacent to left, etc.
def graph_dfs_diagonals_and_boundary_wrap(matrix):
    rows, cols = len(matrix), len(matrix[0])
    visited = set()
    # Change 1: Add 4 more diagonal directions.
    directions = ((0, 1), (0, -1), (1, 0), (-1, 0), (-1, -1), (1, 1), (1, -1), (-1, 1))
    def dfs(i, j):
        if (i, j) in visited:
            return
        visited.add((i, j))
        for direction in directions:
            # Change 2: No more boundary, use modulo to allow traversal that exceed boundaries to wrap around.
            next_i, next_j = (i + direction[0] + rows) % rows, (j + direction[1] + cols) % cols
            dfs(next_i, next_j)

    for i in range(rows):
        for j in range(cols):
            dfs(i, j)

graph_dfs([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
])
