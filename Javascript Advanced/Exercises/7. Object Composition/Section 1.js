(function solve() {
    Array.prototype.last = function () {
        return this[this.length-1]
    }

    Array.prototype.skip = function (n) {
        let result = []
        for(let i=n;i<this.length;i++){
            result.push(this[i])
        }
        return result
    }

    Array.prototype.take = function (n) {
        let result =[]
        for(let i=0;i<n;i++){
            result.push(this[i])
        }
        return result
    }

    Array.prototype.sum = function () {
        return this.reduce((a,b) => a+b)
    }

    Array.prototype.average = function () {
        return this.sum()/this.length
    }
})()

function constructionCrew(input) {
    if(input.handsShaking){
        let required = 0.1*input.weight*input.experience
        input.bloodAlcoholLevel+=required
        input.handsShaking = false
    }
    return input
}

function carFactory(input) {
    let typeOfEngine = {}
    if(input.power>=200){
        typeOfEngine.volume = 3500
        typeOfEngine.power = 200
    }
    else if(input.power>=120){
        typeOfEngine.volume = 2400
        typeOfEngine.power = 120
    }
    else {
        typeOfEngine.volume = 1800
        typeOfEngine.power = 90
    }

    let wheelsize = (input.wheelsize%2==1) ? input.wheelsize : input.wheelsize-1

    return  {
        model: input.model,
        engine: {
            power: typeOfEngine.power,
            volume: typeOfEngine.volume
        },
        carriage: {
            type: input.carriage,
            color: input.color
        },
        wheels: [wheelsize,wheelsize,wheelsize,wheelsize]
    }
}

function extensibleObject() {
    let myObj = {
        extend: function (template) {
            let prototypeObj = {}

            for(let key in template){
                if(typeof template[key]=='function'){
                    prototypeObj[key] = template[key]
                }
                else if(template.hasOwnProperty(key)){
                    myObj[key] = template[key]
                }
            }
            Object.setPrototypeOf(myObj, prototypeObj)
        }
    }

    return myObj
}

(function stringExtension() {
    String.prototype.ensureStart = function (str) {
        if(!this.startsWith(str)){
            return  str + this
        }
        else return this.toString()
    }
    String.prototype.ensureEnd = function (str) {
        if(!this.endsWith(str)){
            return this+str
        }
        else return this.toString()
    }
    String.prototype.isEmpty = function () {
        return this===''
    }
    String.prototype.truncate = function (n) {
        if(n<4){
            return '.'.repeat(n)
        }
        if(this.length<n){
            return this.toString()
        }
        if(this.length>n){
            let spceIndex = this.indexOf(' ',n)
            if(spceIndex<0){
                return this.substring(0,n-3)+'...'
            }
            let str = this.substring(0,spceIndex)
            return str+'...'
        }
    }
    String.format = function (string, ...params) {
        for(let i = 0;i<params.length;i++){
            string = string.replace(new RegExp('{['+i+']}','g'),params[i])
        }

        return string
    }

})()

function collection() {
    return {
        value: [],
        size: 0,
        add: function (num) {
            this.value.push(num)
            this.size++
            return this.sort()
        },
        remove: function (index) {
            if(this.size>index && index>=0) {
                this.value.splice(index, 1)
                this.size--
                return this.sort()
            }
        },
        get: function (index) {
            if(this.size>index && index>=0){
                return this.value[index]
            }
        },
        sort:function () {
            this.value = this.value.sort((a,b) => a-b)
            return this.value
        }
    }
}
