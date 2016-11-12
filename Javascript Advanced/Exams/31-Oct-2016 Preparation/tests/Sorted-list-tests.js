class SortedList {
  constructor() {
    this.list = [];
  }

  add(element) {
    this.list.push(element);
    this.sort();
  }

  remove(index) {
    this.vrfyRange(index);
    this.list.splice(index, 1);
  }

  get(index) {
    this.vrfyRange(index);
    return this.list[index];
  }

  vrfyRange(index) {
    if (this.list.length == 0) throw new Error("Collection is empty.");
    if (index < 0 || index >= this.list.length) throw new Error("Index was outside the bounds of the collection.");
  }

  sort() {
    this.list.sort((a, b) => a - b);
  }

  get size() {
    return this.list.length;
  }
}

let expect = require('chai').expect

describe('Sorted List', function () {
  let list = {}
  beforeEach(function () {
    list = new SortedList()
  })

  it('should be a class', function () {
    expect(typeof SortedList).to.equal('function')
    expect(SortedList.prototype.hasOwnProperty('add')).to.equal(true)
    expect(SortedList.prototype.hasOwnProperty('remove')).to.equal(true)
    expect(SortedList.prototype.hasOwnProperty('size')).to.equal(true)
    expect(SortedList.prototype.hasOwnProperty('get')).to.equal(true)
  })

  it('should work with add', function () {
    list.add(1)
    list.add(3)
    list.add(2)
    expect(list.get(0)).to.equal(1)
    expect(list.get(1)).to.equal(2)
    expect(list.get(2)).to.equal(3)
    expect(list.size).to.equal(3)
  })

  it('should work with remove',function () {
    list.add(1)
    list.add(2)
    list.add(3)
    list.remove(1)
    expect(list.get(0)).to.equal(1)
    expect(list.get(1)).to.equal(3)
    expect(list.size).to.equal(2)
  })

  it('should have sorting',function () {
    list.add(5)
    list.add(1)
    list.add(10)
    list.add(88)
    expect(list.get(0)).to.equal(1)
    expect(list.get(1)).to.equal(5)
    expect(list.get(2)).to.equal(10)
    expect(list.get(2)).to.equal(88)
  })

  it('should throw errors',function () {
    expect(() => list.get(0)).to.throw(Error)
    expect(() => list.remove(0)).to.throw(Error)
    expect(list.size).to.equal(0)
  })

  it('should work with remove',function () {
    list.add(1)
    list.add(3)
    list.add(2)
    list.remove(1)
    expect(() => list.get(9)).to.throw(Error)
    expect(() => list.remove(5)).to.throw(Error)
    expect(() => list.get(-5)).to.throw(Error)
    expect(() => list.remove(-9)).to.throw(Error)
  })
})