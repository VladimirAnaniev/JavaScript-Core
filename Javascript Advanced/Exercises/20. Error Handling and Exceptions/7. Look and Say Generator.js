function* lookAndSay(num) {
  let str = num.toString()

  while(true) {
    str = generate(str)
    yield str
  }

  function generate(str) {
    let returnStr = ''
    let counter = 0
    let lastNum = str[0]
    let currentNum
    for(let i=0;i<str.length;i++) {
      currentNum = str[i]

      if(currentNum==lastNum) {
        counter++
      }
      else {
        returnStr+=counter+''+lastNum
        lastNum=currentNum
        counter=1
      }

      if(i==str.length-1) {
        returnStr+=counter+''+currentNum
      }
    }

    return returnStr
  }
}

let lookSequence = lookAndSay(1);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
