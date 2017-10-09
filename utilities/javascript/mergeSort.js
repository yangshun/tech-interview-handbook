function mergeSort(arr) {
  if (arr.length < 2) {
    // Arrays of length 0 or 1 are sorted by definition
    return arr;
  }

  const left = arr.slice(0, Math.floor(arr.length / 2));
  const right = arr.slice(Math.floor(arr.length / 2), Math.floor(arr.length));

  return merge(mergeSort(left), mergeSort(right));
}

function merge(arr1, arr2) {
  const merged = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else if (arr2[j] < arr1[i]) {
      merged.push(arr2[j]);
      j++;
    } else {
      merged.push(arr1[i]);
      i++;
      j++;
    }
  }

  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}

const arr1 = [7, 2, 4, 3, 1, 2];
const arr2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const arr3 = [98322, 3242, 876, -234, 34, 12331];
const arr4 = [1, 2, 3, 4, 5, 0];

console.log(mergeSort(arr1));
console.log(mergeSort(arr2));
console.log(mergeSort(arr3));
console.log(mergeSort(arr4));
