function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

let expect = require('chai').expect

describe('lookupChar', function () {
    it('should return undefined for incorrect data types',function () {
        expect(lookupChar(25, 0)).to.equal(undefined)
    })

    it('should return undefined for deciam index',function () {
        expect(lookupChar("string", 2.5)).to.equal(undefined)
    })

    it('should return undefined for incorrect data types',function () {
        expect(lookupChar("string", "string")).to.equal(undefined)
    })

    it('should return "Incorrect index" for an index < 0',function () {
        expect(lookupChar("string", -1)).to.equal("Incorrect index")
    })

    it('should return "Incorrect index" for an index = string.length',function () {
        expect(lookupChar("string", 6)).to.equal("Incorrect index")
    })

    it('should return "Incorrect index" for an index > string.length',function () {
        expect(lookupChar("string", 10)).to.equal("Incorrect index")
    })

    it('should return the right char for correct input',function () {
        expect(lookupChar("string", 2)).to.equal('r')
    })

    it('should return the right char for correct input',function () {
        expect(lookupChar("string", 0)).to.equal('s')
    })
})