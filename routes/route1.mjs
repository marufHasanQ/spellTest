
//console.log(createReadStream);

function route1(req, res, wordList) {
    console.log(wordList);
    const pickedWords = JSON.stringify(pickWords(wordList)(5))
res.end(pickedWords);

}

function pickWords(wordList) {
    return totalWordsNumber => Array(totalWordsNumber).fill().map( v => pickRandomWord( wordList));
}
function pickRandomWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}
export {route1};
