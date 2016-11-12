function* fibonacci() {
  let a = 1
  let b = 0

  while (true) {
    yield a

    let current = a
    a = a+b;
    b = current
  }
}

let fib = fibonacci();

for (let number of fib) {
  console.log(number);
}


