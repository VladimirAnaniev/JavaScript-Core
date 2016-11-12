function Arithmephile(input) {
    let sums = []

    for(let line=0;line<input.length;line++){
        let num = Number(input[line])

        if(num>=0&& num<10){
            let result =1
            for(let i=line+1;i<line+num+1;i++){
                if(input[i]!=null)
                    result=result*Number(input[i])
            }
            sums.push(result)
        }
    }

    let biggest = sums.reduce((a, b) => Math.max(a, b));
    console.log(biggest)
}

function RosettaStone(input) {
    let n = Number(input.shift())


    let template = []
    for(let i=0;i<n;i++){
        let row = input.shift().split(' ').filter(x => x!='').map(Number)
        template.push(row)
    }
    let templateHeight = template.length

    let matrix=[]
    let matrixWidth = 0
    for(let line of input){
        let row = line.split(' ').filter(x => x!='').map(Number)
        matrixWidth = Math.max(row.length,matrixWidth)
        matrix.push(row)
    }
    let matrixHeight = matrix.length

    let currentTopRow = 0
    let currentLeftCol = 0

    while(true){
        let currentBottomRow = currentTopRow+templateHeight
        let currentRightCol
        let goToNewRow = true

        for(let row = currentTopRow, templateRow = 0;row< currentBottomRow;row++, templateRow++){
            let currentTemplateArr = template[templateRow]
            let currentTemplateLength = currentTemplateArr.length
            currentRightCol = currentLeftCol+currentTemplateLength

            if(matrix[row]!=null){
                for(let col = currentLeftCol, templateCol = 0; col<currentRightCol;col++, templateCol++){
                    if(matrix[row][col]!=null){
                        let matrixCell = matrix[row][col]
                        let templateCell = template[templateRow][templateCol]

                        matrix[row][col] = getSymbol(matrixCell+templateCell)
                        goToNewRow = false
                    }
                }
            }
        }

        currentLeftCol = currentRightCol

        if(goToNewRow){
            currentLeftCol=0
            currentTopRow = currentBottomRow

            if(currentTopRow>matrixHeight){
                break
            }
        }
    }

    function getSymbol(num) {
        let symbols = [' ','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V,','W','X','Y','Z']

        return symbols[num%27]
    }

    let returnStr = ''
    for(let row of matrix){
        returnStr+=row.join('')
    }

    console.log(returnStr.toUpperCase().trim())
} //TODO: 66%

RosettaStone([ '1',
    '1 3 13',
    '12 22 14 13 25 0 4 24 23',
    '18 24 2 25 22 0 0 11 18',
    '8 25 6 26 8 23 13 4 14',
    '14 3 14 10 6 1 6 16 14',
    '11 12 2 10 24 2 13 24 0',
    '24 24 10 14 15 25 18 24 12',
    '4 24 0 8 4 22 19 22 14',
    '0 11 18 26 1 19 18 13 15',
    '8 15 14 26 24 14 26 24 14' ])

RosettaStone([ '2',
    '59 36',
    '82 52',
    '4 18 25 19 8',
    '4 2 8 2 18',
    '23 14 22 0 22',
    '2 17 13 19 20',
    '0 9 0 22 22' ]
)

RosettaStone([ '2',
    '31 32',
    '74 37',
    '19 0 23 25',
    '22 3 12 17',
    '5 9 23 11',
    '12 18 10 22' ]
)

function spyMaster(input) {
    let specialKey = input[0].toLowerCase()
    input.shift()

    let regex =/^[A-Z$#!%]{8,}$/

    for(let line of input){
        let words = line.split(/\s/)
        for(let i=0;i<words.length;i++){
            if(words[i].toLowerCase()==specialKey){
                let n=1

                while(words[i+n]=='') n++

                let word = words[i+n]

                let hasComma = false
                let hasDot = false
                if(word.endsWith('.')){
                    hasDot = true
                    word = word.substring(0,word.length-1)
                }
                if(word.endsWith(',')){
                    hasComma = true
                    word = word.substring(0,word.length-1)
                }
                if(regex.test(word)){
                    word = modifyWord(word)
                }

                if(hasComma){
                    word+=','
                }
                if(hasDot){
                    word+='.'
                }

                words[i+n] = word
            }
        }
        console.log(words.join(' '))
    }

    function modifyWord(str) {
        str = str.split('!').join('1');
        str = str.split('%').join('2');
        str = str.split('#').join('3');
        str = str.split('$').join('4');
        str = str.toLowerCase()
        return str
    }
}

function RadicalMarketing(input) {
    let database = new Map()

    for(let line of input){
        line = line.trim()
        if(line.indexOf('-')==-1){
            if(!database.has(line)){
                database.set(line, new Map())
            }
        }
        else{
            let [subscriber,specialist] = line.split('-')
            if(database.has(subscriber) && database.has(specialist)){
                if(!database.get(subscriber).has('subscriptions')){
                    database.get(subscriber).set('subscriptions',[])
                }
                database.get(subscriber).get('subscriptions').push(specialist)

                if(!database.get(specialist).has('subscribers')){
                    database.get(specialist).set('subscribers',[])
                }
                database.get(specialist).get('subscribers').push(subscriber)
            }
        }
    }

    let mostFamous

    for(let [k,v]of database){
        let currentSubscribers
        if(database.get(k).has('subscribers')){
            currentSubscribers = database.get(k).get('subscribers')
        }
        else{
            currentSubscribers =[]
        }

        if(mostFamous!=null){
            let mostFamousSubscribers
            if(database.get(mostFamous).has('subscribers')){
                mostFamousSubscribers = database.get(mostFamous).get('subscribers')
            }
            else{
                mostFamousSubscribers =[]
            }

            if(mostFamousSubscribers.length<currentSubscribers.length){
                mostFamous=k
            }
            else if(mostFamousSubscribers.length==currentSubscribers.length){
                let currentSubscriptions
                if(database.get(k).has('subscriptions')){
                    currentSubscriptions = database.get(k).get('subscriptions')
                }
                else {
                    currentSubscriptions = []
                }

                let mostFamousSubscriptions
                if(database.get(mostFamous).has('subscriptions')){
                    mostFamousSubscriptions = database.get(mostFamous).get('subscriptions')
                }
                else{
                    mostFamousSubscriptions = []
                }

                if(mostFamousSubscriptions.length<currentSubscriptions.length){
                    mostFamous = k
                }
            }
        }
        else{
            mostFamous = k
        }
    }

    if(mostFamous){
        console.log(mostFamous)

        if(database.get(mostFamous).has('subscribers')){
            let counter = 1
            for(let subscriber of database.get(mostFamous).get('subscribers')){
                console.log(`${counter++}. ${subscriber}`)
            }
        }
    }
}