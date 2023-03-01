import {getAbsolutePath, wordsSortFunction} from '../util/util.mjs';
import {createWriteStream} from "fs";

function route3(req, res, wordList) {

    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    })

    req.on('end', function () {
        console.log(JSON.parse(data));
        Promise.resolve(JSON.parse(data))

            .then(changedWords => updateWordList(wordList)(changedWords.list))
            .then(unsortedWordList => unsortedWordList.sort(wordsSortFunction))
            .then(newWordList => addingWords(getAbsolutePath()())(newWordList))

            .then(data => res.end('words added'));
    })
}

function updateWordList(oldWordList) {
    return changedWords =>
        oldWordList.map((v, i) => {
            const matchedIndex = changedWords.findIndex(changedWord => changedWord.word === v.word);
            return matchedIndex === -1 ? v : changedWords[matchedIndex];
        })

}
/*
function getAbsolutePath(filePath) {
    const __filename = fileURLToPath(import.meta.url);
    return path.join(path.dirname(__filename), filePath);
}
*/

function addingWords(filePath) {
    return words => {
        return new Promise((res, rej) => {

            const writeStream = createWriteStream(filePath, {flags: 'w'});
            //console.log(JSON.parse(words.list));
            words.forEach(word => {

                writeStream.write(word.word + ',' + word.attempt + ',' + word.successRate + '\n');
            })
            writeStream.end('\n');
            writeStream.on('close', () => res(words));
        });

    }
}

export {route3}
