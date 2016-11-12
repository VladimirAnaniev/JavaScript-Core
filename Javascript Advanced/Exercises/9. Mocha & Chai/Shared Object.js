this.jsdom = require('jsdom-global')();

let expect = require('chai').expect;

let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};



describe('sharedObject', function () {
    describe('initial values should be null',function () {
        it('name',function () {
            expect(sharedObject.name).to.equal(null)
        })
        it('income',function () {
            expect(sharedObject.income).to.equal(null)
        })
    })

    describe('test changing values',function () {

        describe('valid values', function () {

        })
        it('name',function () {
            sharedObject.changeName('Pesho')

            expect(sharedObject.name).to.equal('Pesho')
        })
        it('income',function () {
            sharedObject.changeIncome(300)

            expect(sharedObject.income).to.equal(300)
        })
    })
})
