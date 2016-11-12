/**
 * Created by Vladi on 09-Oct-16.
 */

function medenkaWars(input) {
    let whiteDmg = 0
    let darkDmg = 0
    let dmgPerHit = 60
    let whiteAttacks = 0
    let darkAttacks = 0
    let lastDark =0
    let lastWhite=0

    for(let line of input){
        let [num, color] = line.split(' ')
        num = Number(num)

        let dmg = num*dmgPerHit

        if(color==='white'){
            if(lastWhite==dmg) whiteAttacks++
            else whiteAttacks = 1


            if(whiteAttacks==2){
                dmg=dmg*2.75
                whiteAttacks = 0
            }

            lastWhite=dmg
            whiteDmg+=dmg

        } else if(color === 'dark'){
            if(lastDark==dmg) darkAttacks++
            else whiteAttacks = 1

            if(darkAttacks==5){
                dmg=dmg*4.5
                darkAttacks=1
            }

            lastDark=dmg
            darkDmg+=dmg
        }
    }

    let winner, score
    if(whiteDmg>darkDmg){
        winner = 'Vitkor'
        score = whiteDmg
    } else {
        winner = 'Naskor'
        score = darkDmg
    }

    console.log(`Winner - ${winner}`)
    console.log(`Damage - ${score}`)
}

function bunnyKill(input) {
    let matrix = []
    let kills=0
    let damageDealt = 0;

    for(let i=0;i<input.length-1;i++){
        let row = input[i].split(' ').map(Number)
        matrix.push(row)
    }

    let bombs = input[input.length-1].split(' ')

    for(let bomb of bombs){
        let [row,col] = bomb.split(',').map(Number)
        if(matrix[row][col]!=0){
            let dmg = matrix[row][col]
            matrix[row][col] = 0
            damageDealt+=dmg
            kills++

            if(row>0&&col>0){
                matrix[row-1][col-1]-=dmg
                if(matrix[row-1][col-1]<0) matrix[row-1][col-1]=0
            }
            if(row>0){
                matrix[row-1][col]-=dmg
                if(matrix[row-1][col]<0) matrix[row-1][col]=0
            }
            if(row>0&&col<matrix[row-1].length-1){
                matrix[row-1][col+1]-=dmg
                if(matrix[row-1][col+1]<0) matrix[row-1][col+1]=0
            }
            if(col>0){
                matrix[row][col-1]-=dmg
                if(matrix[row][col-1]<0) matrix[row][col-1]=0
            }
            if(col<matrix.length-1){
                matrix[row][col+1]-=dmg
                if(matrix[row][col+1]<0) matrix[row][col+1]=0
            }
            if(row<matrix.length-1&&col>0){
                matrix[row+1][col-1]-=dmg
                if(matrix[row+1][col-1]<0) matrix[row+1][col-1]=0
            }
            if(row<matrix.length-1){
                matrix[row+1][col]-=dmg
                if(matrix[row+1][col]<0) matrix[row+1][col]=0
            }
            if(row<matrix.length-1&&col<matrix[row+1].length-1){
                matrix[row+1][col+1]-=dmg
                if(matrix[row+1][col+1]<0) matrix[row+1][col+1]=0
            }
        }
    }

    for(let r=0;r<matrix.length;r++){
        for(let c=0;c<matrix[r].length;c++){
            if(matrix[r][c]!=0){
                kills++
                damageDealt+=matrix[r][c]
            }
        }
    }

    console.log(damageDealt)
    console.log(kills)
}

function ajaxRequestValidator(input) {
    let authString = input.pop()
    let validMethods = ['GET', 'POST', 'PUT', 'DELETE']
    let validAuth = /(Basic|Bearer)+ [A-Za-z0-9]+/
    let validContent = /[A-za-z0-9.]+/

    for(let i=0;i<input.length;i+=3){
        let method = input[i].substr(8)
        let credentials = input[i+1].substr(13)
        let content = input[i+2].substr(9)

        if(validMethods.indexOf(method)!=-1){
            if(validAuth.test(credentials)&&validContent.test(content)){
                if(decodeAuth(credentials,authString)){
                    console.log(`Response-Method:${method}&Code:200&Header:${credentials}`)
                }
                else{
                    console.log(`Response-Method:${method}&Code:403`)
                }
            }
            else{
                console.log('Response-Code:400')
            }
        }
        else{
            console.log(`Response-Method:${method}&Code:401`)
        }
    }

    function decodeAuth(auth,tokens) {
        for(let i=0;i<tokens.length;i+=2){
            let num = Number(tokens[i])
            let char = tokens[i+1]

            let ocurrences = auth.match(new RegExp(char,'g'))
            if(ocurrences) ocurrences=ocurrences.length

            if(ocurrences==num) return true
        }
        return false
    }
}

ajaxRequestValidator(['Method: GET',
    'Credentials: Bearer asd918721jsdbhjslkfqwkqiuwjoxXJIdahefJAB',
'Content: users.asd.1782452.278asd',
'Method: POST',
'Credentials: Basic 028591u3jtndkgwndsdkfjwelfqkjwporjqebhas',
'Content: Johnathan',
'2q'])
