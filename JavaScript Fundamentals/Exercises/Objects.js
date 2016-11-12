/**
 * Created by Vladi on 09-Oct-16.
 */

function heroicInventory(input) {
    let heroicData=[]

    for(let line of input){
        let args = line.split(/\s*\/\s*/)

        let name = args[0]
        let level = Number(args[1])

        let items=[]
        if(args.length>2){
            items=args[2].split(', ')
        }

        let hero = {name:name, level:level, items:items}
        heroicData.push(hero)
    }

    console.log(JSON.stringify(heroicData))
}

function JSONTable(input) {
    let html = '<table>\n'

    for(let line of input){
        let obj = JSON.parse(line)
        html+='    <tr>\n'

        for(let item in obj){
            html+=`        <td>${obj[item]}</td>\n`
        }

        html+='    <tr>\n'
    }

    html+='</table>'

    console.log(html)
}

function cappyJuice(input) {

    let juiceQuantity = new Map()
    let juiceBottlees = new Map()

    for(let line of input){
        let [juice, quantity] = line.split(' => ')

        if(juiceQuantity.has(juice)) juiceQuantity.set(juice, quantity+juiceQuantity.get(juice))
        else juiceQuantity.set(juice,quantity)

        if(juiceQuantity.get(juice)>=1000){
            juiceBottlees.delete(juice)
            juiceBottlees.set(juice,Math.floor(juiceQuantity.get(juice)/1000))
        }
    }

    for(let [k,v] of juiceBottlees) {
        console.log(`${k} => ${v}`)
    }
}

function storeCatalogue(input) {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    input = input.sort()
    for(let i=0;i<alphabet.length;i++){
        let char = alphabet[i]
        let currentArr =[]
        for(let line of input){
            if(line.startsWith(char)){
                currentArr.push(line)
            }
        }

        if(currentArr.length>0){
            console.log(char)
            for(let line of currentArr){
                console.log('  '+line.replace(' :',':'))
            }
        }
    }
}

function autoEngineeringCompany(input) {
    let cars = new Map()
    for(let line of input) {
        let currentCar = new Map()
        let [brand,model,amount] = line.split(' | ')
        amount = Number(amount)

        currentCar.set(model, amount)
        if (!cars.has(brand)) {
            cars.set(brand, [])
        }
        cars.get(brand).push(currentCar)
    }

    for(let [k,v] of cars){
        console.log(k)
        for(let arrItem of v){
            for(let key of arrItem.keys()){
                console.log(`###${key} -> ${arrItem.get(key)}`)
            }

        }
    }
}

function systemComponents(input) {
    //TODO

    let systems = new Map()

    for(let line of input){
        let [system, component, subcomponent] = line.split(' | ')

        if(systems.has(system)){
            if(systems.get(system).has(component)){
                systems.get(system).get(component).push(subcomponent)
            }
            else {
                systems.get(system).set(component,[subcomponent])
            }
        }
        else {
            systems.set(system,new Map())
            systems.get(system).set(component,[subcomponent])
        }
    }

    for(let system of Array.from(systems.keys()).sort(function (a,b) {
        if(Array.from(systems.get(a).keys()).length==Array.from(systems.get(b).keys()).length){
            return a>b
        }
        else return Array.from(systems.get(b).keys()).length-Array.from(systems.get(a).keys()).length
    })){
        console.log(system)

        for(let component of Array.from(systems.get(system).keys()).sort((a,b) => Array.from(systems.get(system).get(b).keys()).length-Array.from(systems.get(system).get(a).keys()).length)){
            console.log('|||'+component)

            for(let subcomponent of systems.get(system).get(component)){
                console.log('||||||'+subcomponent)
            }
        }
    }
}

function usernames(input) {
    let usernamesNoDuplicate = new Set()
    let allowed = /[\x00-\x7F]+/

    for(let line of input){
        if(allowed.test(line))
            usernamesNoDuplicate.add(line)
    }

    let usernameArr = [...usernamesNoDuplicate].sort(function (a,b) {
        if(a.length==b.length){
            return a>b
        }
        else return a.length-b.length
    })

    for(let name of usernameArr){
        console.log(name)
    }
}

function unqueArrays(input) {
    let unique = []
    for(let line of input){
        let current = JSON.parse(line)

        current = current.sort((a,b) => b-a)

        if(isUnique(current)) unique.push(current)
    }
    for(let arr of unique.sort((x,y) => x.length-y.length)){
        console.log('['+arr.join(', ')+']')
    }

    function isUnique(el) {
        el = el.toString()
        for(let i of unique){
            let element = i.toString()
            if(element==el) return false
        }
        return true
    }
}
    
