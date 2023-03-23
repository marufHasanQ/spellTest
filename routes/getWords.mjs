import {getWordList} from "../db/helpers.mjs";
let wordList;
function getWords(req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
//    console.log('urlobj',urlObj);
    getWordList()
        .then(wordList1 => {wordList = wordList1; return wordList1})

        .then(wordList => JSON.stringify(
            pickWords(wordList)( Number( urlObj.searchParams.get('Qnumber') ))
            .map(v => { v.ans =v.question; return v;})))

        .then(pickWords => logger(pickWords))

        .then(pickedWords => res.end(pickedWords));

    //    const pickedWords = JSON.stringify(pickWords(wordList)(5))

}
function logger(obj) {
    console.log(obj);
    return obj;
}

function pickWords(wordList) {
    return totalWordsNumber => {

        const splitRandomNumberRange = splitRange({start: 0, end: wordList.length})(.1)
        const splitTotalWordsNumber = Math.round(totalWordsNumber * (0.4))//splitRange( {start: 0, end: totalWordsNumber})(.4)
        console.log('splitRandomNumberRange', splitRandomNumberRange, ' splitTotalWordsNumber', splitTotalWordsNumber);

        const randomNumberArray = [...getRandomUniqueNumbers(splitRandomNumberRange[0])(splitTotalWordsNumber), ...getRandomUniqueNumbers(splitRandomNumberRange[1])(totalWordsNumber - splitTotalWordsNumber)]
        console.log('randomNumberArray', randomNumberArray);

        return randomNumberArray.map(v => wordList[v])
    }
}

function splitRange(range) {
    return splitPercantage => {
        const splitPoint = (range.end - range.start) * splitPercantage + range.start;
        return [{start: range.start, end: Math.floor(splitPoint)}, {start: Math.floor(splitPoint + 1), end: range.end}]
    }

}

function getRandomUniqueNumbers(range) {
    return totalNumber => {
        const arr = [];
        while (arr.length < totalNumber) {
            let randomNumber = Math.round(Math.random() * (range.end - range.start)) + range.start;
            if (arr.indexOf(randomNumber) === -1) arr.push(randomNumber);
        }
        return arr;

    }
}

function pickRandomWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

//console.log(pickWords([1,2,3,4,5,6,7,8])(7));

export {getWords, wordList, splitRange};
