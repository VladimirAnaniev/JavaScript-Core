//Manual
function makeIterable(object) {

  let arr = [...Object.keys(object)]
  arr = arr.sort((a,b) => a<b)
  let currentIndex = 0;

  return {
    next: function () {
      if(currentIndex>arr.length-1) {
        return {
          done: true
        }
      }
      else {
        return {
          value: arr[currentIndex++],
          done: false
        }
      }

    }
  }
}

//Automatic
function* objectIterator(object) {
  let arr = [...Object.keys(object)]
  arr = arr.sort((a,b) => a<b)
  let currentIndex = 0;

  while(currentIndex<arr.length) {
    yield arr[currentIndex++]
  }
}
