/**
 * Created by Vladi on 01-Oct-16.
 */
function printLetters([str]) {
    for(let i in str){
        console.log(`str[${i}] -> ${str[i]}`)
    }
}

function concatAndReverse(input) {
    let result=''
    for(let str of input){
        result+=str
    }
    return result.split('').reverse().join('')
}

function searchOccurences([str,text]) {
    let last = -1
    let count=0
    while(true){
        if(text.indexOf(str,last)!=-1){
            count++
            last = text.indexOf(str,last)+1
        }
        else break;

    }
    return count
}

function extractText([str]){
    let result = []
    let last=0

    while(true){
        let start=str.indexOf('(',last)
        let end=str.indexOf(')',start)

        if(start==-1||end==-1) break;

        result.push(str.substring(start+1,end))

        last=end+1
    }

    return result.join(', ')
}

function aggregateTable(lines) {
    let sum = 0, list = [];
    for (let line of lines) {
        let townData = line.split('|'),
            townName = townData[1].trim(),
            income = Number(townData[2].trim());
        list.push(townName);
        sum += income;
    }
    console.log(list.join(', ') + '\n' + sum);
}

function makeUsernames(input) {
    let list=[]
    for(let str of input){
        let parts = str.split('@'), username= parts[0]+'.', domain = parts[1]
        let abbr = domain.split('.').forEach(x => username+=x[0])
        list.push(username)
    }
    return list.join(', ')
}

function htmlList(items) {
    return "<ul>\n" +
        items.map(htmlEscape).map(
            item => `  <li>${item}</li>`).join("\n") +
        "\n</ul>\n";
    function htmlEscape(text) {
        let map = { '"': '&quot;', '&': '&amp;',
            "'": '&#39;', '<': '&lt;', '>': '&gt;' };
        return text.replace(/[\"&'<>]/g, ch => map[ch]);
    }
}

function splitWords([str]) {
    return str.split(/\W+/).filter(x => x!='').join('|')

}

