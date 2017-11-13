// Does not handle negative binary numbers.
function binToInt(binary) {
    let res = 0;
    for (let i = 0; i < binary.length; i++) {
        res = res * 2 + (+binary[i]);
    }
    return res;
}

console.log(binToInt('0') === parseInt('0', 2) && parseInt('0', 2) === 0);
console.log(binToInt('1') === parseInt('1', 2) && parseInt('1', 2) === 1);
console.log(binToInt('10') === parseInt('10', 2) && parseInt('10', 2) === 2);
console.log(binToInt('11') === parseInt('11', 2) && parseInt('11', 2) === 3);
console.log(binToInt('101') === parseInt('101', 2) && parseInt('101', 2) === 5);
console.log(binToInt('1100011') === parseInt('1100011', 2) && parseInt('1100011', 2) === 99);
