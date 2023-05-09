
import {getAbsolutePath, questionSortFunction, addQuestionIndex} from '../util/util.mjs';
import {addingQuestions, questionList} from '../db/helpers.mjs';
//import {wordList} from "./getWords.mjs";

function syncQuestions(req, res) {

    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
  //      console.log('data chunk',chunk);
    })

    req.on('end', function () {

        //console.log('inside post',data);
console.log('syncQuestions   ',JSON.parse(data));

        Promise.resolve( JSON.parse(data) )

            .then(changedQuestions => replaceOldQuestions(questionList)(changedQuestions.list))
            .then(unsortedQuestionList => unsortedQuestionList.sort(questionSortFunction))
            .then(sortedQuestionList => addQuestionIndex ( sortedQuestionList))
            .then(newQuestionList => addingQuestions(getAbsolutePath()())(newQuestionList)('w'))

            .then(res.end('questions added'));
    })
}

function replaceOldQuestions(oldQuestionList) {
    return changedQuestions =>
        oldQuestionList.map((v) => {
            const matchedIndex = changedQuestions.findIndex(changedQuestion => changedQuestion.question=== v.question);
            return matchedIndex === -1 ? v : changedQuestions[matchedIndex];
        })

}

export {syncQuestions}
       //return;
