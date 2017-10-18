function traverse(matrix) {
    const DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const rows = matrix.length, cols = matrix[0].length;
    const visited = matrix.map(row => Array(row.length).fill(false));
    function dfs(i, j) {
        if (visited[i][j]) {
            return;
        }
        visited[i][j] = true;
        DIRECTIONS.forEach(dir => {
            const row = i + dir[0], col = j + dir[1];
            // Boundary check.
            if (row < 0 || row >= rows || col < 0 || col >= cols) {
                return;
            }
            // Valid neighbor check.
            if (matrix[row][col] !== 1) {
                return;
            }
            dfs(row, col);
        });
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dfs(i, j);
        }
    }
}
