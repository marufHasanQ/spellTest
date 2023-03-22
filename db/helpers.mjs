import {createReadStream,createWriteStream} from "fs";
import {wordsSortFunction, getAbsolutePath} from "../util/util.mjs";

let wordList;

function getWordList() {

    const readStream = createReadStream( getAbsolutePath()());
    let data = '';
    readStream.on('data', function (chunk) {
        data += chunk;
    })
    return new Promise((res, rej) => {

        readStream.on('end', function () {
wordList = sanitizedWordList(data);
            res(wordList)
        })
    });


    function sanitizedWordList(wordListString) {
        return wordListString
            .split('\n')
            .filter((listEntry, i) => listEntry.length > 0)
            .map((listEntry) => listEntry.split(',')
                .map((v, i) => i !== 0 ? Number(v) : v))
            .map((v, i) => {return {question: v[0], attempt: v[1], successRate: v[2]}})
            .sort(wordsSortFunction)
    }
}


function addingWords(filePath) {
    return words => flag => {
        return new Promise((res, rej) => {

            const writeStream = createWriteStream(filePath, {flags: flag});
            words.forEach(word => {

                writeStream.write(word.question+ ',' + word.attempt + ',' + word.successRate + '\n');
            })
            writeStream.end('\n');
            writeStream.on('close', () => res(words));
        });

    }
}
export {getWordList, wordList , addingWords}
