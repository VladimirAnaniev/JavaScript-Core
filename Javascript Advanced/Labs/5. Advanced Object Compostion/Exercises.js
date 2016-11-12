/**
 * Created by Vladi on 23-Oct-16.
 */


function orderRects(rectsData) {
    let rects = [];
    for (let [width, height] of rectsData) {
        let rect = createRect(width, height);
        rects.push(rect);
    }
    rects.sort((a,b) => a.compareTo(b));
    return rects;

    function createRect(width, height) {
        let rect = {
            width: width,
            height: height,
            area: () => rect.width * rect.height,
            compareTo: function(other) {
                let result = other.area() - rect.area();
                return result || (other.width - rect.width);
            }
        };
        return rect;
    }
}

function fibonacci(num) {
    let fib = (() => {
        let f0 = 0, f1 = 1;
        return () => {
            let oldf0 = f0, oldf1 = f1;
            f0 = oldf1;
            f1 = oldf0 + oldf1;
            return oldf1;
        }
    })();
    let fibNumbers = [];
    for (let i = 1; i <= num; i++)
        fibNumbers.push(fib());
    return fibNumbers;

}

function processCommands(commands) {
    let commandProcessor = (function() {
        let list = [];
        return {
            add: (newItem) => list.push(newItem),
            remove: (item) =>
                list = list.filter(x => x != item),
            print: () => console.log(list)
        }
    })();

    for (let cmd of commands) {
        let [cmdName, arg] = cmd.split(' ');
        commandProcessor[cmdName](arg);
    }
}

function createCar(commands){
    let map = new Map();
    let carManager = {
        create: function ([name, ,parent]) {
            parent = parent ? map.get(parent) : null;
            let newObj = Object.create(parent);
            map.set(name, newObj);
            return newObj;
        },
        set: function ([name, key, value]) {
            let obj = map.get(name);
            obj[key] = value;
        },
        print: function (name) {
            let obj = map.get(name);
            console.log(Object.keys(obj).map((key)=>`${key}:${obj[key]}`).join(', '));
        }
    }

    for(let command of commands){
        let commandParameters = command.split(' ');
        let action = commandParameters.shift();
        carManager[action](commandParameters);
    }
}

