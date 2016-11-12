function makeIterator(arr) {
  let currentIndex = arr.length-1

  arr[Symbol.iterator] = function() {
    return {
      next: function() {
        return currentIndex >= 0 ? {value: arr[currentIndex--], done: false} : {done: true};
      }
    }
  }

  return arr
}