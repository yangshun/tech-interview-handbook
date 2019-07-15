function matrixTranspose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

const deepEqual = require('./deepEqual');

console.log(deepEqual(matrixTranspose([[1]]), [[1]]));
console.log(deepEqual(matrixTranspose([[1, 2]]), [[1], [2]]));
console.log(deepEqual(matrixTranspose([[1, 2], [1, 4]]), [[1, 1], [2, 4]]));
console.log(
  deepEqual(matrixTranspose([[1, 2, 3], [4, 5, 6]]), [[1, 4], [2, 5], [3, 6]]),
);
