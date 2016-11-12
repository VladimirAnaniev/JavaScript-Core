/**
 * Created by Vladi on 23-Oct-16.
 */

function reducers(input) {
    console.log(`Sum = ${input.reduce((a,b) => a+b)}`)
}

function commands(input) {
    let commandProcessor = (function() {
        let string =''
        return {
            append: function (str) {
                string+=str
            },
            removeStart: function (index) {
                string = string.substring(index, string.length)
            },
            removeEnd: function (index) {
                string = string.substring(0,string.length-index)
            },
            print: function () {
                console.log(string)
            }
        }
    })()

    for(let line of input){
        let [first, second] = line.split(' ')

        if(first=='append'){
            commandProcessor.append(second)
        }
        else if(first=='removeStart'){
            commandProcessor.removeStart(Number(second))
        }
        else if(first=='removeEnd'){
            commandProcessor.removeEnd(Number(second))
        }
        else if (first=='print'){
            commandProcessor.print()
        }
    }
}

function maxElement(arr) {
    return Math.max.apply(null, arr);
}
