// Interval: [start, end].
// Merges two overlapping intervals into one.
function intervalsMerge(a, b) {
    return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
}

const deepEqual = require('./deepEqual');

console.log(deepEqual(intervalsMerge([1, 2], [1, 4]), [1, 4]));
console.log(deepEqual(intervalsMerge([1, 2], [0, 4]), [0, 4]));
console.log(deepEqual(intervalsMerge([1, 2], [0, 2]), [0, 2]));
console.log(deepEqual(intervalsMerge([1, 2], [0, 1.5]), [0, 2]));
console.log(deepEqual(intervalsMerge([1, 4], [1, 2]), [1, 4]));
console.log(deepEqual(intervalsMerge([0, 4], [1, 2]), [0, 4]));
console.log(deepEqual(intervalsMerge([0, 2], [1, 2]), [0, 2]));
console.log(deepEqual(intervalsMerge([0, 1.5], [1, 2]), [0, 2]));
