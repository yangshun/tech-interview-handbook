function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 10], 1) === 0);
console.log(binarySearch([1, 2, 3, 10], 2) === 1);
console.log(binarySearch([1, 2, 3, 10], 3) === 2);
console.log(binarySearch([1, 2, 3, 10], 10) === 3);
console.log(binarySearch([1, 2, 3, 10], 9) === -1);
console.log(binarySearch([1, 2, 3, 10], 4) === -1);
console.log(binarySearch([1, 2, 3, 10], 0) === -1);
console.log(binarySearch([1, 2, 3, 10], 11) === -1);
console.log(binarySearch([5, 7, 8, 10], 3) === -1);
