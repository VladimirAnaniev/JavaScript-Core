/**
 * Created by Vladi on 14-Oct-16.
 */

function daggersAndSwords(input) {
    let html = `<table border="1">
<thead>
<tr><th colspan="3">Blades</th></tr>
<tr><th>Length [cm]</th><th>Type</th><th>Application</th></tr>
</thead>
<tbody>
`

    let applications = [ '*rap-poker', 'blade', 'quite a blade', 'pants-scraper', 'frog-butcher']

    for(let line of input){
        let length = Math.floor(Number(line))
        let type, application;


        if(length>40) type = 'sword'
        else if(length>10) type = 'dagger'
        else continue

        let i = length%5
        application = applications[i]

        html+=`<tr><td>${length}</td><td>${type}</td><td>${application}</td></tr>
`
    }

    html+=`</tbody>
</table>
`

    console.log(html)
}

function xRemoval(input){
    let matrix =[]
    let coordinatesToDelete = []
    let returnStrings = []

    for(let line of input){
        let row = line.split('')
        matrix.push(row)
    }

    for(let row=1;row<matrix.length-1;row++){
        for(let col=1;col<matrix[row].length;col++){
            let isAnX = true
            let coordinates = [[row-1,col-1],[row-1,col+1],[row,col],[row+1,col-1],[row+1,col+1]]
            let currentSymbol = matrix[row][col].toLowerCase()

            for(let [r,c] of coordinates){
                if(matrix[r][c]!=null){
                    if(matrix[r][c].toLowerCase()!=currentSymbol){
                        isAnX = false
                        break
                    }
                }
                else{
                    isAnX = false
                    break
                }
            }
            if(isAnX){
                for(let arr of coordinates){
                    coordinatesToDelete.push(arr)
                }
            }
        }
    }

    for(let row=0;row<matrix.length;row++){
        let rowStr = ''

        for(let col=0;col<matrix[row].length;col++){
            let toInclude = true

            for(let [r,c] of coordinatesToDelete){
                if(row==r && col==c) {
                    toInclude = false
                    break
                }
            }

            if(toInclude) rowStr+= matrix[row][col]
        }

        returnStrings.push(rowStr)
    }

    console.log(returnStrings.join('\n'))
}

function querryMess(input) {

    for(let line of input){
        let index = line.indexOf('?')
        if(index>0){
            line = line.substring(index+1,line.length)
        }

        line = line.split('+').join(' ')
        line = line.split('%20').join(' ')

        let pairs = line.split('&')

        let currentMap = new Map()
        let returnStr =''

        for(let pair of pairs){
            let [key, value] = pair.split('=')
            key = key.trim()

            value = value.split(' ').filter(x => x!='').join(' ')

            if(!currentMap.has(key)){
                currentMap.set(key,[])
            }

            currentMap.get(key).push(value.trim())
        }

        for(let [k,v] of currentMap){
            returnStr+=`${k}=[${v.join(', ')}]`
        }

        console.log(returnStr)
    }
}

function vladkosNotebook(input) {

    let players = new Map()


    for(let line of input){
        let[color,second,third] = line.split('|')

        if(!players.has(color)){
            players.set(color,{
                age:0,
                name:'',
                opponents:[],
                wins:0,
                loses:0
            })
        }

        if(second=='age'){
            players.get(color).age = third
        }
        else if(second =='name'){
            players.get(color).name = third
        }
        else if(second=='win'){
            let arr = players.get(color).opponents
            arr.push(third)
            players.get(color).opponents = arr

            let wins = players.get(color).wins
            players.get(color).wins = ++wins
        }
        else if(second=='loss'){
            let arr = players.get(color).opponents
            arr.push(third)
            players.get(color).opponents = arr

            let loses = players.get(color).loses
            players.get(color).loses = ++loses
        }
    }

    let returnStr = `{`

    for(let [k,v] of players){
        if(v.age!=0 || v.name!=''){
            returnStr+=`"${k}":{"age":"${v.age}","name":"${v.name}","opponents":[`
            for(let opponent of v.opponents.sort((a,b) => a>b)){
                returnStr+=`"${opponent}",`
            }
            if(v.opponents.length>0) returnStr = returnStr.substring(0, returnStr.length - 1);

            returnStr+=`],"rank":"${((v.wins+1)/(v.loses+1)).toFixed(2)}"},`
        }
    }

    if(players.keys().length>0)
        returnStr = returnStr.substring(0, returnStr.length - 1);
    returnStr+='}'

    console.log(returnStr)
}

vladkosNotebook(['purple|age|99','purple|age|99','purple|loss|Yana', 'purple|name|VladoKaramfilov','purple|loss|Manov'])