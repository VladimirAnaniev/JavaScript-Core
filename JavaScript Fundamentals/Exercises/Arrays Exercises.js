function joinByDelimiter(input) {
    let delimeter = input[input.length-1]
    input.pop()
    return input.join(delimeter)
}

function nLoop(input) {
    let n = Number(input[input.length-1])
    input.pop()

    for(let i=0;i<input.length;i+=n){
        console.log(input[i])
    }
}

function addorRemove(input) {
    let arr=[]
    let count=0
    for(let i of input){
        count++
        if(i=='add') arr.push(count)
        if(i=='remove') arr.pop()
    }

    if(arr.length>0) console.log(arr.join('\n'))
    else console.log('Empty')

}

function rotateArray(input) {
    let n = Number(input[input.length-1])
    input.pop()

    for(let i=0;i<n%input.length;i++){
        input.unshift(input.pop())
    }

    console.log(input.join(' '))
}

function increasing(input) {
    input = input.map(Number)

    let currentBiggest=0
    for(let i of input){
        if(i>=currentBiggest){
            currentBiggest=i
            console.log(i)
        }
    }
}

function sortBy2Params(input) {
    console.log(input.join('\n'))
    input.sort(function(a,b) {
        if(a.length>b.length) return 1
        else if(a.length<b.length) return -1
        else return a>b
    })
}

function magicMatrices(input) {
    let matrix=[]
    for(let i in input){
        matrix.push(input[i].split(' ').map(Number))
    }

    console.log(isMatrixMagical())

    function isMatrixMagical() {
        let sum=0
        let currentSum=0

        for(let row=0;row<matrix.length;row++){
            for(let col=0;col<matrix[row].length;col++){
                if(row==0){
                    sum+=matrix[row][col]
                }
                currentSum+=matrix[row][col]
            }
            if(sum!=currentSum) return false
            currentSum=0
        }

        for(let col=0;col<matrix[0].length;col++){
            for(let row=0;col<matrix.length;col++){
                currentSum+=matrix[row][col]
            }

            if(sum!=currentSum) return false
            currentSum=0
        }
        return true
    }
} //80%

function diagonalAttack(input) {
    let mainD=0, secondD=0, matrix=[]

    for(let i =0;i<input.length;i++){
        matrix.push(input[i].split(' ').map(Number))
    }

    for(let i=0;i<matrix.length;i++){
        mainD+=matrix[i][i]
        secondD+=matrix[matrix.length-1-i][i]
    }

    if(mainD==secondD){
        for(let row=0;row<matrix.length;row++){
            for(let col=0;col<matrix.length;col++){
                if(!(row==col||row==matrix.length-1-col)){
                    matrix[row][col]=mainD
                }
            }
        }

    }

    matrix.forEach(x => console.log(x.join(' ')))

}

function orbit(input) {
    let [rows,cols] = input[0].split(' ').map(Number)
    let [r,c] = input[1].split(' ').map(Number)

    let matrix=[]
    for(let i=0;i<rows;i++){
        let currentRow=[]

        for(let u=0;u<cols;u++){
            currentRow.push(0)
        }

        matrix.push(currentRow)
    }

    let counter=1
    matrix[r][c]=counter
    counter++
    let offset=1

    while(true){
        let topRow=r-offset
        let bottomRow=r+offset
        let leftCol=c-offset
        let rightCol=c+offset

        //fill the top row
        if(topRow>=0){
            let start = leftCol<0? 0 : leftCol
            let end = rightCol>cols-1? cols-1 : rightCol

            for(let i=start;i<=end;i++){
                if(matrix[topRow][i]==0)
                    matrix[topRow][i] = counter
            }
        }

        //fill the bottom row
        if(bottomRow<rows){
            let start = leftCol<0? 0 : leftCol
            let end = rightCol>cols-1? cols-1 : rightCol

            for(let i=start;i<=end;i++){
                if(matrix[bottomRow][i]==0)
                    matrix[bottomRow][i] = counter
            }
        }

        //fill left col
        if(leftCol>=0){
            let start = topRow+1<0? 0 : topRow+1
            let end = bottomRow-1>rows-1? cols-1 : bottomRow

            for(let i=start;i<end;i++){
                if(matrix[i][leftCol]==0)
                    matrix[i][leftCol] = counter
            }
        }

        //fill right col
        if(rightCol<cols){
            let start = topRow+1<0? 0 : topRow+1
            let end = bottomRow-1>rows-1? cols-1 : bottomRow

            for(let i=start;i<end;i++){
                if(matrix[i][rightCol]==0)
                 matrix[i][rightCol] = counter
            }
        }


        offset++
        counter++

        if(offset>Math.max(rows,cols)) break
    }

    matrix.forEach(x => console.log(x.join(' ')))
}

spiralMatrix(['5','5'])