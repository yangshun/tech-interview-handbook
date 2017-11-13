function matrixClone(matrix, defaultValue) {
    return matrix.map(row => {
        return defaultValue === undefined ? row.slice(0) : Array(row.length).fill(defaultValue);
    });
}

const deepEqual = require('./deepEqual');

// Test clone.
const a = [[1, 2], [1, 4]];
console.log(deepEqual(matrixClone(a), [[1, 2], [1, 4]]));
a[0][0] = 4;
console.log(deepEqual(matrixClone(a), [[1, 2], [1, 4]]) === false);
console.log(deepEqual(matrixClone([[1]]), [[1]]));

// Test clone with default value.
console.log(deepEqual(matrixClone([[1, 2], [1, 4]], 1), [[1, 1], [1, 1]]));
console.log(deepEqual(matrixClone([[1, 2], [1, 4]], null), [[null, null], [null, null]]));
