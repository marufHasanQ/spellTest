import {questionList} from '../db/helpers.mjs';
function allQuestions(req, res) {

    res.end(JSON.stringify(questionList));

}
export {allQuestions}
