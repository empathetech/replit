const deepMatch = (a, b) => {
  /*
    A deep match comparison that is able to recursively handle matching for
    every element in an array, every key-value pair in an object, functions,
    symbols, and all other data types.

    Arguments:
      a (any):
        The first item to compare
      b (any):
        The second item to compare

    Returns:
      boolean:
        Whether a deep matches b.
  */

  // Are these both functions?
  if (typeof(a) === 'function' || typeof(b) === 'function') {
    return a.toString() === b.toString();
  }
  // Are these both arrays?
  if (a instanceof Array || b instanceof Array) {
    if (!(a instanceof Array && b instanceof Array)) return false;
    if (a.length !== b.length) return false;
    // A match is if all the indexed element values at the same position
    // match. We care above value.
    return a.every((_, i) => deepMatch(a[i], b[i]));
  }
  // Are these both objects?
  if (a instanceof Object || b instanceof Object) {
    if (!(a instanceof Object && b instanceof Object)) return false;
    const keySet = new Set(Object.keys(a).concat(Object.keys(b)));
    // A match is if all of the key value pairs exist and match.
    // We don't care about order though.
    return Array.from(keySet).every((k) => deepMatch(a[k], b[k]));
  }


  // Catch all.
  return a === b;
}

const deepCopy = (item) => {
  /*
    Function that recursively creates a copy of a simple or complex data
    object, with no pass by references.

    Arguments:
      item (any):
        An arbitrary data object.

    Returns:
      any:
        A copy of the values and paths of the arbitrary data object.
  */
  // Since an array is a type of object, we do an array check first.
  if (Array.isArray(item)) return item.map((e) => deepCopy(e));

  // For objects, we need to create a new object and recursively
  // copy each key-value pair, then return the copied object.
  if (item instanceof Object) {
    const copyObject = {};
    for (const key in item) copyObject[key] = deepCopy(item[key]);
    return copyObject;
  }

  // For everything else, we just return the item (we need special)
  // handling for things like class instances that would be very
  // case by case, so we are only touching the fundamental JS data types.
  return item;
}

const accumulateArray = (array, accumulatorFn) => {
  /*
  Function that combines a map and a reduce to return an array
  where each element is the cumulative result of an operation
  on every array element up to and including this element.

  For example, accumulate([1,2,3,4,5], (a,c) => a + c, 0)
  should return:
  [1,3,6,10,15]

    Arguments:
      array (array):
        An array of values

      accumulatorFn (fn):
        A function that serves as the "reducer" of the accumulate array.

    Returns:
      array:
        An array of the same size as the input array, with the accumulatorFn
        applied to it.
  */
  if (array.length === 1) return deepCopy(array);
  const accumulated = [deepCopy(array[0])];
  for (let i = 1; i < array.length; i += 1) {
    accumulated.push(accumulatorFn(deepCopy(accumulated.at(-1)), deepCopy(array[i])));
  }

  return accumulated;
}

const flattenArray = (array) => {
  /*
    Function that takes any arbitrary nesting of subarrays and flattens
    them into a single array of values. Only arrays will be flattened.

    For example, flattenArray([1,[2,[3,4,5]]]) => [1,2,3,4,5]
  */
  const flattened = [];
  array.forEach((e) => {
    if (Array.isArray(e)) {
      flattened.push(...flattenArray(deepCopy(e)));
    } else flattened.push(deepCopy(e));
  });

  return flattened;
}

const bucketArray = (array, n) => {
  /*
    Function that separates an array of values into n subarrays of as
    close to even size as possible. Returns an array of subarrays.

    For example, bucketArray([1,2,3,4,5], 2) => [[1,2],[3,4],[5]]
  */
  const baseSize = Math.floor(array.length / n);
  const buckets = [];
  let i = 0;
  let remainder = array.length % n;

  for (let b = 0; b < n; b += 1) {
    const bucket = [];
    for (let j = 0; j < baseSize; j += 1) {
      bucket.push(deepCopy(array[i]));
      i += 1;
    }

    if (remainder > 0) {
      bucket.push(deepCopy(array[i]));
      i += 1;
      remainder -= 1;
    }
    buckets.push(bucket);
  }

  return buckets;
}

const divideArray = (array, sizesArray) => {
  /*
    Function that divides an array of values into a number of set
    subarrays. The number of subarrays is the length of the sizesArray,
    and the size of each subarray at index i is the value of sizesArray
    at index i. Returns an array of subarrays.

    For example divideArray([1,2,3,4,5,6], [1,2,3]) => [[1],[2,3],[4,5,6]]
  */
  const subArrays = [];
  let i = 0;
  while (sizesArray.length > 0) {
    const subArray = [];
    let size = sizesArray.shift();
    while (size > 0 && i < array.length) {
      subArray.push(deepCopy(array[i]));
      i += 1;
      size -= 1;
    }
    subArrays.push(subArray)
  }
  return subArrays;
}

module.exports = {
  deepCopy,
  deepMatch,
  accumulateArray,
  flattenArray,
  bucketArray,
  divideArray,
}