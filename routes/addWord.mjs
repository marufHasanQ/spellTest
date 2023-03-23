
import {addingWords, wordList} from '../db/helpers.mjs';
import {getAbsolutePath} from '../util/util.mjs';
console.log(getAbsolutePath('../db/wordList.txt')());

function addWord(req, res) {

    const filePath = getAbsolutePath()();
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    })

    req.on('end', function () {
        console.log(JSON.parse(data));
        Promise.resolve( JSON.parse(data) )
            .then(json => json.list)
            .then(wordString => wordString.split('\n'))
            .then(wordArray => arraySubstraction(wordArray)(wordList.map(v => v.question)))

            .then(uniqueAddedWords => uniqueAddedWords.map(v => {return {question: v, attempt: 0, successRate: 0}}))
            .then(data => {console.log(data); return data })
        .then(data => wordList.push(...data) )
            //.then(data => addingWords(filePath)(data)('a'))
//            .then(data => console.log(data));
        res.end('ok');
        //.then(data => res.end('word added') );
    })

}
function arraySubstraction(firstArray) {
    return secondArray => {
        const uniqueValueArray = firstArray.filter(v => !secondArray.includes(v));
        return uniqueValueArray;
    };
}
export {addWord};



