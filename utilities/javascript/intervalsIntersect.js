// Interval: [start, end].
function intervalsIntersect(a, b) {
    return a[0] < b[1] && b[0] < a[1];
}

console.log(intervalsIntersect([1, 2], [3, 4]) === false);
console.log(intervalsIntersect([1, 2], [2, 4]) === false);
console.log(intervalsIntersect([1, 2], [1, 4]) === true);
console.log(intervalsIntersect([1, 2], [0, 4]) === true);
console.log(intervalsIntersect([1, 2], [0, 2]) === true);
console.log(intervalsIntersect([1, 2], [0, 1.5]) === true);
console.log(intervalsIntersect([3, 4], [1, 2]) === false);
console.log(intervalsIntersect([2, 4], [1, 2]) === false);
console.log(intervalsIntersect([1, 4], [1, 2]) === true);
console.log(intervalsIntersect([0, 4], [1, 2]) === true);
console.log(intervalsIntersect([0, 2], [1, 2]) === true);
console.log(intervalsIntersect([0, 1.5], [1, 2]) === true);
