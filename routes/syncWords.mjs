
import {getAbsolutePath, wordsSortFunction} from '../util/util.mjs';
import {addingWords,wordList} from '../db/helpers.mjs';
//import {wordList} from "./getWords.mjs";

function syncWords(req, res) {

    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
  //      console.log('data chunk',chunk);
    })

    req.on('end', function () {

        //console.log('inside post',data);
console.log('syncWords   ',JSON.parse(data));
       //return;
//Promise.resolve(JSON.parse(JSON.stringify(data)))

        Promise.resolve( JSON.parse(data) )

            .then(changedWords => replaceOldWords(wordList)(changedWords.list))
            .then(unsortedWordList => unsortedWordList.sort(wordsSortFunction))
            .then(newWordList => addingWords(getAbsolutePath()())(newWordList)('w'))

            .then(data => res.end('words added'));
    })
}

function replaceOldWords(oldWordList) {
    return changedWords =>
        oldWordList.map((v, i) => {
            const matchedIndex = changedWords.findIndex(changedWord => changedWord.question=== v.question);
            return matchedIndex === -1 ? v : changedWords[matchedIndex];
        })

}

export {syncWords}
