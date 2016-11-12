let expect = require('chai').expect

function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}

describe('sum(arr)', function () {
    it('should return 3 for [1,2]',function () {
        expect(sum([1,2])).to.equal(3)
    })

    it('should return 0 for []',function () {
        expect(sum([])).to.equal(0)
    })

    it('should return -10 for [10,-20]',function () {
        expect(sum([10,-20])).to.equal(-10)
    })

    it('should return 5 for [5]',function () {
        expect(sum([5])).to.equal(5)
    })
})
