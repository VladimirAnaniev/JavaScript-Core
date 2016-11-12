let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

let expect = require('chai').expect


describe('mathEnforcer',function () {
    describe('addFive',function () {
        it('should return correct value for number input', function () {
            expect(mathEnforcer.addFive(5)).to.equal(10)
        })

        it('should return undefined for number not a number', function () {
            expect(mathEnforcer.addFive("string")).to.equal(undefined)
        })

        it('should return correct value for negative numbers', function () {
            expect(mathEnforcer.addFive(-5)).to.equal(0)
        })

        it('should work for floating point nubers', function () {
            expect(mathEnforcer.addFive(2.695)).to.be.closeTo(7.695,0.01)
        })
    })

    describe('subtractTen',function () {
        it('should return correct value for number input', function () {
            expect(mathEnforcer.subtractTen(5)).to.equal(-5)
        })

        it('should return undefined for number not a number', function () {
            expect(mathEnforcer.subtractTen("string")).to.equal(undefined)
        })

        it('should return correct value for negative numbers', function () {
            expect(mathEnforcer.subtractTen(-5)).to.equal(-15)
        })

        it('should work for floating point nubers', function () {
            expect(mathEnforcer.subtractTen(2.695)).to.be.closeTo(-7.305,0.01)
        })
    })

    describe('sum',function () {
        it('should return correct value for number input', function () {
            expect(mathEnforcer.sum(5,25)).to.equal(30)
        })

        it('should return undefined for number not a number', function () {
            expect(mathEnforcer.sum("string", 3)).to.equal(undefined)
        })

        it('should return correct value for negative numbers', function () {
            expect(mathEnforcer.sum(-5, 0)).to.equal(-5)
        })

        it('should work for floating point nubers', function () {
            expect(mathEnforcer.sum(2.695,4.005)).to.be.closeTo(6.7,0.01)
        })

        it('should work for floating point nubers', function () {
            expect(mathEnforcer.sum(2.695,3)).to.be.closeTo(5.695,0.01)
        })
    })
})