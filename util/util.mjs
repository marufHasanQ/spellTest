

import {fileURLToPath} from 'url';
import * as path from "path";
import {createReadStream} from "fs";

function wordsSortFunction(a, b) {

    const successRateDiff = b.successRate - a.successRate;
    return successRateDiff === 0 ? b.attempt - a.attempt : successRateDiff;

}

function getAbsolutePath(filePath = '../db/wordList.txt') {
    return (url = import.meta.url) => {
        const __filename = fileURLToPath(url);
        return path.join(path.dirname(__filename), filePath)
    }
}

function getWordList() {

    const readStream = createReadStream(getAbsolutePath()());
    let data = '';
    readStream.on('data', function (chunk) {
        data += chunk;
    })
    return new Promise((res, rej) => {

        readStream.on('end', function () {
            res(sanitizedWordList(data))
        })
    });


    function sanitizedWordList(wordListString) {
        return wordListString
            .split('\n')
            .filter((listEntry, i) => listEntry.length > 0)
            .map((listEntry) => listEntry.split(',')
                .map((v, i) => i !== 0 ? Number(v) : v))
            .map((v, i) => {return {word: v[0], attempt: v[1], successRate: v[2]}})
            .sort(wordsSortFunction)
    }
}

export {wordsSortFunction, getAbsolutePath, getWordList}
