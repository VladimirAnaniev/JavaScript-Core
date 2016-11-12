let expect = require('chai').expect

let list = (function(){
  let data = [];
  return {
    add: function(item) {
      data.push(item);
    },
    delete: function(index) {
      if (Number.isInteger(index) && index >= 0 && index < data.length) {
        return data.splice(index, 1)[0];
      } else {
        return undefined;
      }
    },
    toString: function() {
      return data.join(", ");
    }
  };
})();

describe('list', function () {
  it('should have a type of object', function () {
    expect(typeof list).to.equal('object')
  })

  it('should be empty by default',function () {
    expect(list.toString()).to.equal('')
  })

  it('should add all types of variables',function () {
    list.add(1)
    list.add("string")
    list.add(11)
    expect(list.toString()).to.equal('1, string, 11')
  })

  it('shouldnt delete unexisting elements 2', function () {
    expect(list.delete(10000)).to.equal(undefined)
    expect(list.delete(-10)).to.equal(undefined)
    expect(list.delete('test')).to.equal(undefined)
    expect(list.toString()).to.equal('1, string, 11')
  })

  it("should delete correctly", function () {
    expect(list.delete(0)).to.equal(1)
    expect(list.toString()).to.equal('string, 11')
  })

  it('should add new elemets to the end',function () {
    expect(list.add("kkkkkk")).to.equal(undefined)
    expect(list.toString()).to.equal('string, 11, kkkkkk')
  })

  it('should delete correctly 2', function () {
    expect(list.delete(1)).to.equal(11)
    expect(list.toString()).to.equal('string, kkkkkk')
  })

  it('should add undefined for empty parameter',function () {
    list.add()
    expect(list.toString()).to.equal('string, kkkkkk, ')
  })
})