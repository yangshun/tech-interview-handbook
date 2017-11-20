function mergeSort(arr) {
  if (arr.length < 2) {
    // Arrays of length 0 or 1 are sorted by definition.
    return arr;
  }

  const left = arr.slice(0, Math.floor(arr.length / 2));
  const right = arr.slice(Math.floor(arr.length / 2), Math.floor(arr.length));

  return merge(mergeSort(left), mergeSort(right));
}

function merge(arr1, arr2) {
  const merged = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else if (arr2[j] < arr1[i]) {
      merged.push(arr2[j]);
      j++;
    }
  }

  merged.push(...arr1.slice(i), ...arr2.slice(j));
  return merged;
}

const deepEqual = require('./deepEqual');

console.log(deepEqual(mergeSort([]), []));
console.log(deepEqual(mergeSort([1]), [1]));
console.log(deepEqual(mergeSort([2, 1]), [1, 2]));
console.log(deepEqual(mergeSort([7, 2, 4, 3, 1, 2]), [1, 2, 2, 3, 4, 7]));
console.log(deepEqual(mergeSort([1, 2, 3, 4, 5, 0]), [0, 1, 2, 3, 4, 5]));
console.log(
  deepEqual(mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]), [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]),
);
console.log(
  deepEqual(mergeSort([98322, 3242, 876, -234, 34, 12331]), [
    -234,
    34,
    876,
    3242,
    12331,
    98322,
  ]),
);
