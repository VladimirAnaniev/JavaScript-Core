/**
 * Created by Vladi on 06-Oct-16.
 */
function townsToJSON(input) {
    let towns = []
    for(let i=1;i<input.length;i++){
        let currentTown = {}
        let parts = input[i].split(/\s*\|\s*/).filter(x => x!='')
        currentTown.Town = parts[0]
        currentTown.Latitude = Number(parts[1])
        currentTown.Longitude = Number(parts[2])
        towns.push(currentTown)
    }
    console.log(JSON.stringify(towns))
}

function scoreToHtml(input) {
    let html = '<table>\n  <tr><th>name</th><th>score</th></tr>\n'

    for(let line of input){
        let name = htmlEscape(line.name)
        let score = line.score

        html+=`  <tr><td>${name}</td><td>${score}</td></tr>\n`
    }

    html+='</table>'
    console.log(html)

    function htmlEscape(text) {
        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }
}

function JSONToHTMLTable([json]) {
    let html = "<table>\n";
    let arr = JSON.parse(json);
    html += "  <tr>";
    for (let key of Object.keys(arr[0]))
        html += `<th>${htmlEscape(key)}</th>`;
    html += "</tr>\n";

    for(let obj of arr){
        html+=`  <tr>`

        for(let v in obj){
            if( typeof obj[v] == typeof 1) html+=`<td>${obj[v]}</td>`
            else html+=`<td>${htmlEscape(obj[v])}</td>`

        }

        html+=`</tr>\n`
    }

    html+='</table>'

    console.log(html)

    function htmlEscape(text) {
        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/["&'<>]/g, ch => map[ch]);
    }
}

function sumOfTowns(arr) {
    let sums = {};
    for (let i=0; i<arr.length; i+=2) {
        let [town, income] = [arr[i], Number(arr[i+1])];
        if (sums[town] == undefined)
            sums[town] = income;
        else
            sums[town] += income;
    }
    return JSON.stringify(sums);
}

function countWords(inputLines) {
    let text = inputLines.join('\n');
    let words = text.split(/[^A-Za-z0-9_]+/)
        .filter(w => w != '');
    let wordsCount = {};
    for (let w of words)
        wordsCount[w] ? wordsCount[w]++ :
            wordsCount[w] = 1;
    return JSON.stringify(wordsCount);
}

function countWordsWithMap(inputLines) {
    let words = inputLines.join('\n').toLowerCase()
        .split(/[^A-Za-z0-9_]+/).filter(w => w != '');
    let wordsCount = new Map();
    for (let w of words)
        wordsCount.has(w) ? wordsCount.set(w,
            wordsCount.get(w)+1) : wordsCount.set(w, 1);
    let allWords = Array.from(wordsCount.keys()).sort();
    allWords.forEach(w =>
        console.log(`'${w}' -> ${wordsCount.get(w)} times`));
}

function populationInTowns(dataRows) {
    let total = new Map();
    for (let dataRow of dataRows) {
        let [town, population] = dataRow.split(/\s*<->\s*/);
        population = Number(population);
        if (total.has(town))
            total.set(town, total.get(town) + population);
        else total.set(town, population);
    }
    for (let [town, sum] of total)
        console.log(town + " : " + sum);
}

function cityMarkets(sales) {
    let townsWithProducts = new Map();
    for (let sale of sales) {
        let [town, product, quantityPrice] = sale.split(/\s*->\s*/);
        let [quantity, price] = quantityPrice.split(/\s*:\s*/);
        if (!townsWithProducts.has(town))
            townsWithProducts.set(town, new Map());
        let income = quantity * price;
        let oldIncome = townsWithProducts.get(town).get(product);
        if (oldIncome) income += oldIncome;
        townsWithProducts.get(town).set(product, income);
    }
    // TODO: print the incomes by towns and products

    for(let [town,products] of townsWithProducts){
        console.log(`Town - ${town}`)
        for(let [name,price] of products){
            console.log(`$$$${name} : ${price}`)
        }
    }
}

function lowestPricesInCities(input) {
    let lowestPriceProducts = new Map();
    for (let line of input){
        let [town, product, price] = line.split(/\s*\|\s*/)
        if(!lowestPriceProducts.has(product)){
            lowestPriceProducts.set(product, new Map())
        }
        lowestPriceProducts.get(product).set(price,town)

        console.log(JSON.stringify(lowestPriceProducts))

    }
}

lowestPricesInCities(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'])


function extractWords(inputSentences) {
    let wordPattern = /\b[a-zA-Z0-9_]+\b/g;
    let words = new Set();
    for (let sentence of inputSentences) {
        let matches = sentence.match(wordPattern);
        matches.forEach(x=>words.add(x.toLowerCase()));
    }
    console.log([...words.values()].join(", "));
}


