function* random(range) {
  let mod = (4871 * 7919)
  let x = range;
  let innerRange = range;

  while(true) {
    let newX = (x*x) % mod
    x = newX

    let rand = newX % innerRange
    yield rand
  }
}

let rnd = random(100);

for (let i = 0; i < 10; i++) {
  console.log(rnd.next().value);
}
