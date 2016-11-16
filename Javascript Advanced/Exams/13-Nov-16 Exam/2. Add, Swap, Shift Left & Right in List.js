let expect = require('chai').expect

function createList() {
  let data = [];
  return {
    add: function (item) {
      data.push(item)
    },
    shiftLeft: function () {
      if (data.length > 1) {
        let first = data.shift();
        data.push(first);
      }
    },
    shiftRight: function () {
      if (data.length > 1) {
        let last = data.pop();
        data.unshift(last);
      }
    },
    swap: function (index1, index2) {
      if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length ||
        !Number.isInteger(index2) || index2 < 0 || index2 >= data.length ||
        index1 === index2) {
        return false;
      }
      let temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;
      return true;
    },
    toString: function () {
      return data.join(", ");
    }
  };
}

describe('List Tests', function () {
  let list;
  beforeEach(function () {
    list = createList()
  })

  it('should return same arr when shifting 1 element', function () {
    list.add(1)
    expect(list.toString()).to.equal('1')
    list.shiftLeft()
    expect(list.toString()).to.equal('1')
  })

  it('shouldnt swap when no parameters given', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.swap()).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('object should contain functions', function () {
    expect(typeof list.toString).to.equal('function')
    expect(typeof list.add).to.equal('function')
    expect(typeof list.shiftLeft).to.equal('function')
    expect(typeof list.shiftRight).to.equal('function')
    expect(typeof list.swap).to.equal('function')
  })

  it('should have private property data', function () {
    expect(list.data).to.equal(undefined)
  })

  it('toString should return string', function () {
    expect(typeof list.toString()).to.equal('string')
  })

  it('should add empty for no parameter', function () {
    list.add()
    expect(list.toString()).to.equal('')
    list.add('item')
    expect(list.toString()).to.equal(', item')
  })

  it('adding and shifting should return undefined', function () {
    expect(list.add()).to.equal(undefined)
    expect(list.shiftLeft()).to.equal(undefined)
    expect(list.shiftRight()).to.equal(undefined)
  })

  it('should add elements correctly', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should shift left correctly', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    list.shiftLeft()
    expect(list.toString()).to.equal('two, 3, 1')
    list.shiftLeft()
    expect(list.toString()).to.equal('3, 1, two')
  })
  
  it('should add correctly after shifting left', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    list.shiftLeft();
    list.add(["four"]);
    expect(list.toString()).to.equal('two, 3, 1, four')
  })

  it('should shift right correctly', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    list.shiftRight();
    expect(list.toString()).to.equal('3, 1, two')
    list.shiftRight()
    expect(list.toString()).to.equal('two, 3, 1')
  })

  it('should add correctly after shifting right', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    list.shiftRight();
    list.add(["four"]);
    expect(list.toString()).to.equal('3, 1, two, four')
  })

  it('should swap valid emelents correctly', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(1,2)).to.equal(true)
    expect(list.toString()).to.equal('1, 3, two')
  })

  it('should swap valid emelents correctly 1', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(2,1)).to.equal(true)
    expect(list.toString()).to.equal('1, 3, two')
  })

  it('should swap valid emelents correctly 2', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(0,2)).to.equal(true)
    expect(list.toString()).to.equal('3, two, 1')
  })

  it('should swap valid emelents correctly 3', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(2,0)).to.equal(true)
    expect(list.toString()).to.equal('3, two, 1')
  })

  it('should return false when swapping element with itself',function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(1,1)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should return false when swapping element with itself',function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(0,0)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should return false when swapping element with itself',function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(2,2)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('swapping twice should return same array',function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(0,2)).to.equal(true)
    expect(list.swap(0,2)).to.equal(true)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('swapping twice should return same array 2',function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(0,2)).to.equal(true)
    expect(list.swap(1,0)).to.equal(true)
    expect(list.toString()).to.equal('two, 3, 1')
  })

  it('should return false when swapping element with length+1',function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(0,3)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should return false when swapping invalid elements', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(-1,0)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should return false when swapping invalid elements2', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(0,-3)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should be an empty array by defafult', function () {
    expect(list.toString()).to.equal('')
  })

  it('should be an object', function () {
    expect(typeof list).to.equal('object')
  })

  it('should return false when swapping string indexes', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap('asd',0)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should return false when swapping string doubles', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    expect(list.swap(1.25,3.14)).to.equal(false)
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('should store all types of data', function () {
    list.add(1);
    list.add("two");
    list.add({name:'Stamat', age:266});
    list.add([1,2,3])
    expect(list.toString()).to.equal('1, two, [object Object], 1,2,3')
  })

  it('shifting two elements twice should return the same array', function () {
    list.add(1);
    list.add("two");
    list.add('neshto')
    expect(list.toString()).to.equal('1, two, neshto')
    list.shiftLeft()
    list.shiftLeft()
    expect(list.toString()).to.equal('neshto, 1, two')
    list.shiftLeft()
    expect(list.toString()).to.equal('1, two, neshto')
  })

  it('shifting right and then left should return the same array', function () {
    list.add(1);
    list.add("two");
    list.add(3);
    expect(list.toString()).to.equal('1, two, 3')
    list.shiftLeft()
    list.shiftRight()
    expect(list.toString()).to.equal('1, two, 3')
  })

  it('adding an element should enable swapping edgeg case', function () {
    it('should return false when swapping element with length+1',function () {
      list.add(1);
      list.add("two");
      list.add(3);
      expect(list.swap(0,3)).to.equal(false)
      expect(list.toString()).to.equal('1, two, 3')
      list.add('new')
      expect(list.swap(0,3)).to.equal(true)
      expect(list.toString()).to.equal('new, two, 3, 1')
    })
  })

  it('shifting should not work for length<2', function () {
    list.shiftLeft()
    expect(list.toString()).to.equal('')
    list.add(1);
    expect(list.toString()).to.equal('1')
    list.shiftLeft()
    expect(list.toString()).to.equal('1')
    list.add(11);
    expect(list.toString()).to.equal('1, 11')
    list.shiftLeft()
    expect(list.toString()).to.equal('11, 1')
  })

  it('shift left twice', function () {
    list.add(1)
    list.add(2)
    list.add(3)
    list.shiftLeft()
    list.shiftLeft()
    expect(list.toString()).to.equal('3, 1, 2')
  })

  it('shift right twice', function () {
    list.add(1)
    list.add(2)
    list.add(3)
    list.shiftRight()
    list.shiftRight()
    expect(list.toString()).to.equal('2, 3, 1')
  })

  it('should be equal to itself', function () {
    expect(list).to.equal(list)
  })
})
