function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

let expect = require('chai').expect

describe('isOddOrEven', function () {
    it('should return undefined for a number parameter', function () {
        expect(isOddOrEven(25)).to.equal(undefined, 'Function did not return the expected result')
    })

    it('should return undefined for an object parameter', function () {
        expect(isOddOrEven({gosho: 'Pesho'})).to.equal(undefined, 'Function did not return the expected result')
    })

    it('should return even for a string with even chars', function () {
        expect(isOddOrEven("patkan")).to.equal('even', 'Function did not return the expected result')
    })

    it('should return odd for a string with odd chars', function () {
        expect(isOddOrEven('patka')).to.equal('odd', 'Function did not return the expected result')
    })
})