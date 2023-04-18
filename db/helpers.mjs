import {createReadStream, createWriteStream} from "fs";
import {questionSortFunction, getAbsolutePath} from "../util/util.mjs";

let questionList;
function getWordList() {

    const readStream = createReadStream( getAbsolutePath()());
    let data = '';
    readStream.on('data', function (chunk) {
        data += chunk;
    })
    return new Promise((res, rej) => {

        readStream.on('end', function () {
 questionList = sanitizeWordList(data);
            res(questionList)
        })
    });
    
function sanitizeWordList(wordListString) {
    return JSON.parse(wordListString);
}

//    function sanitizeWordList(wordListString) {
//        return wordListString
//            .split('\n')
//            .filter((listEntry) => listEntry.length > 0)
//            .map((listEntry) => listEntry.split(',')
//                .map((v, i) => i !== 0 ? Number(v) : v))
//            .map((v) => {return {question: v[0],ans: v[0], attempt: v[1], successRate: v[2]}})
//            .sort(questionSortFunction)
//    }
}


function addingQuestions(filePath) {
    return questions => flag => {
        return new Promise((res, rej) => {

            const writeStream = createWriteStream(filePath, {flags: flag});
            const questionString = JSON.stringify(questions);
                writeStream.write(questionString);
/*
            questions.forEach(word => {

                writeStream.write(word.question+ ',' + word.attempt + ',' + word.successRate + '\n');
            })
            */
            writeStream.end('\n');
            writeStream.on('close', () => res(questions));
        });

    }
}
export {getWordList,questionList, addingQuestions }
