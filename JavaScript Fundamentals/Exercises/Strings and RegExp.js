/**
 * Created by Vladi on 02-Oct-16.
 */
function splitByDelimiter([text,delim]) {
    console.log(text.split(delim).join('\n'))
}

function repeatStringNTimes([str,num]) {
    num=Number(num)

    console.log(str.repeat(num))
}

function checkStringStart([text,str]) {
    console.log(text.startsWith(str))
}

function checkStringEnd([text,str]) {
    console.log(text.endsWith(str))
}

function capitalizeWords([str]) {
    let parts = str.split(' ')
    let lowercase = []
    for(let p of parts){
        lowercase.push(capitalize(p))
    }
    console.log(lowercase.join(' '))

    function capitalize(str) {
        let first = str[0].toUpperCase()
        let rest = str.substring(1,str.length).toLowerCase()
        return first+rest
    }
}

function catchNumbers(input) {
    let nums=[]
    for(let str of input){
        let found = str.split(/\D+/).filter(x => x!='')
        found.forEach(x => nums.push(x))
    }

    console.log(nums.join(' '))
}

function fundVariableNames([str]) {
    let regex = /\b(_)[A-Za-z]+\b/g
    let variables = str.match(regex)
    let vars=[]
    for(let v of variables) vars.push(v.substring(1,v.length))
    console.log(vars.join(','))
}

function findOccurences([text,str]) {
    //console.log(text.toLowerCase().split(str.toLowerCase()).length-1)

    let regex= new RegExp(str,'ig') //WHAT SHOULD I PUT HERE???

    console.log(text.match(regex).length)

} //TODO: FIND OUT HOW TO PUT VARIABLE IN REGEX

findOccurences(["how do you feel howard? how?",'how'])

function findDomains(input) {
    let regex= /\bwww\.[a-zA-z0-9\-]+\.[\.a-z]+\b/g
    let websites =[]
    for(let line of input){
        websites.push(line.match(regex))
    }
    console.log(websites.filter(x => x!=null).join('\n'))
}

function censorData(sentences) {
    let namePattern = /(\*[A-Z][a-zA-Z]*)(?= |\t|$)/g;
    let phonePattern = /(\+[0-9-]{10})(?= |\t|$)/g;
    let idPattern = /(![0-9a-zA-Z]+)(?= |\t|$)/g;
    let basePattern = /(_[0-9a-zA-Z]+)(?= |\t|$)/g;

    for(let s of sentences){
        s = s.replace(namePattern, m => '|'.repeat((m.length)));
        s = s.replace(phonePattern, m => '|'.repeat((m.length)));
        s = s.replace(idPattern, m => '|'.repeat((m.length)));
        s = s.replace(basePattern, m => '|'.repeat((m.length)));

        console.log(s);
    }
}
