let expect = require('chai').expect

function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}


describe('add and subtract', function () {
    let calc;
    beforeEach(function() {
        calc = createCalculator();
    });

    it('should return 0 for (createCalculator().get())',function () {
        expect(createCalculator().get()).to.equal(0)
    })

    it('should return 5 for createCalculator().add(2).add(3).get())',function () {
        calc.add(2)
        calc.add(3)
        let val = calc.get()
        expect(val).to.equal(5)
    })

    it('should return -5 for subtraction)',function () {
        calc.subtract(2)
        calc.subtract(3)
        let val = calc.get()
        expect(val).to.equal(-5)
    })

    it('should return NaN for a string',function () {
        calc.subtract("asd")
        let val = calc.get()
        expect(val).to.be.NaN
    })

    it('should work with parsable strings',function () {
        calc.add(2)
        calc.subtract('-1')
        calc.add('-3')
        let val = calc.get()
        expect(val).to.equal(0)
    })
})
