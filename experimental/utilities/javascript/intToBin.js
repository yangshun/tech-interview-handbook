// Does not handle negative numbers.
function intToBin(number) {
  if (number === 0) {
    return '0';
  }
  let res = '';
  while (number > 0) {
    res = String(number % 2) + res;
    number = parseInt(number / 2, 10);
  }
  return res;
}

console.log(intToBin(0) === (0).toString(2) && (0).toString(2) === '0');
console.log(intToBin(1) === (1).toString(2) && (1).toString(2) === '1');
console.log(intToBin(2) === (2).toString(2) && (2).toString(2) === '10');
console.log(intToBin(3) === (3).toString(2) && (3).toString(2) === '11');
console.log(intToBin(5) === (5).toString(2) && (5).toString(2) === '101');
console.log(
  intToBin(99) === (99).toString(2) && (99).toString(2) === '1100011',
);
