class Request {
    constructor(method, uri, version, message){
        this.method = method
        this.uri = uri
        this.version = version
        this.message = message
        this.response = undefined
        this.fulfilled = false
    }
}

//-----------------

function ticketManager(arr,str) {
    class Ticket {
        constructor(destination,price,status){
            this.destination = destination
            this.price = price
            this.status = status
        }
    }


    arr = arr.map((x) => {
        let [dest,price,status] = x.split('|')
        return new Ticket(dest,Number(price),status)
    })

    return arr.sort((x,y) => x[str]>y[str] )
}

//-----------------

class Rat {
    constructor(name){
        this.name = name
        this.connections = []
    }

    unite(otherRat){
        if(typeof otherRat == 'Rat') {
            this.connections.push(otherRat)
        }
    }

    getRats() {
        return this.connections
    }

    toString() {
        console.log(this.name)
        for(let rat of this.connections){
            console.log(`##${rat}`)
        }
    }
}

//-------------------

class Stringer {
    constructor(str, len){
        this.innerString = str
        this.innerLength = len
    }

    increase(n){
        this.innerLength += n
    }

    decrese(n){
        let result = this.innerLength - n

        if(result<=3) this.innerLength = 0
        else this.innerLength = result
    }

    toString() {
        if(this.innerString.length>this.innerLength){
            return this.innerString.substring(0,this.innerLength)+'...'
        }
        else if(this.innerLength===0) return '...'
        else return this.innerString
    }
} //60%

//----------------

(function () {
    let counter = 0

    return class Extensible {
        constructor(){
            this.id = counter++
        }

        extend(parent){
            for(let key in parent){
                if(parent.hasOwnProperty(key)) {
                    if(typeof parent[key] == 'function'){
                        Object.getPrototypeOf(this)[key] = parent[key]
                    }
                    else{
                        this[key] = parent[key]
                    }
                }
            }
        }
    }
})()

//-----------------

class SortedList {
    constructor(){
        this.elements = []
        this.size = 0
    }

    add(element){
        this.elements.push(element)
        this.size += 1
        return this.sortArr()
    }

    remove(index){
        if(this.size>index && index>=0){
            this.elements.splice(index,1)
            this.size -= 1
            return this.sortArr()
        }
    }

    get(index) {
        return this.elements[index]
    }

    sortArr(){
        return this.elements.sort((a,b) => a-b)
    }
}

//----------------


class Textbox {
    constructor(selector, regex) {
        this.selector = selector;
        this._elements = $(selector);
        this._invalidSymbols = regex;

        let that = this;
        $(selector).on('input change', function () {
            that.value = $(this).val();
        });
    }

    get value() {
        return $(this.selector).val();
    }

    set value(value) {
        $(this.selector).val(value);
    }

    get elements() {
        return this._elements;
    }

    isValid() {
        return !this._invalidSymbols.test($(this.selector).val());
    }
}
