function deepEqual(val1, val2) {
  if (typeof val1 !== typeof val2) {
    return false;
  }

  // Array comparison.
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) {
      return false;
    }
    for (let i = 0; i < val1.length; i++) {
      if (!deepEqual(val1[i], val2[i])) {
        return false;
      }
    }
    return true;
  }

  // Object comparison.
  if (
    typeof val1 === 'object' &&
    typeof val2 === 'object' &&
    val1 !== null &&
    val2 !== null
  ) {
    const keys1 = Object.keys(val1),
      keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let i = 0; i < keys1.length; i++) {
      if (!deepEqual(val1[keys1[i]], val2[keys2[i]])) {
        return false;
      }
    }
    return true;
  }

  // Primitive comparison.
  return val1 === val2;
}

module.exports = deepEqual;
