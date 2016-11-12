let expect = require('chai').expect

function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

describe('isSymetric(arr)', function () {
    it('should return true for [1,2,1]',function () {
        expect(isSymmetric([1,2,1])).to.equal(true)
    })

    it('should return true for []',function () {
        expect(isSymmetric([])).to.equal(true)
    })

    it('should return false for [10,-20]',function () {
        expect(isSymmetric([10,-20])).to.equal(false)
    })

    it('should return true for [5]',function () {
        expect(isSymmetric([5])).to.equal(true)
    })

    it('should return true for [5,7,7,5]',function () {
        expect(isSymmetric([5,7,7,5])).to.equal(true)
    })

    it('should return false for [10,-20,30]',function () {
        expect(isSymmetric([10,-20,30])).to.equal(false)
    })

    it('should return false for 1,2',function () {
        expect(isSymmetric(1,2)).to.equal(false)
    })

    it('should return false for [Not an array]',function () {
        expect(isSymmetric(1,2,3)).to.equal(false)
    })

    it("should return false for [5,'hi',{a:5},new Date(),{X:5},'hi',5]",function () {
        expect(isSymmetric([5,'hi',{a:5},new Date(),{X:5},'hi',5])).to.equal(false)
    })


    it("should return true for [5,'hi',{a:5},new Date(),{a:5},'hi',5]",function () {
        expect(isSymmetric([5,'hi',{a:5},new Date(),{a:5},'hi',5])).to.equal(true)
    })

})
