
import {questionList} from '../db/helpers.mjs';
//console.log(getAbsolutePath('../db/wordList.txt')());

function addQuestion(req, res) {

    //    const filePath = getAbsolutePath()();
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    })

    req.on('end', function () {
        console.log(JSON.parse(data));
        Promise.resolve(JSON.parse(data))
            .then(json => json.list)
            .then(questionString => createQuestionObj(questionString))
            .then(questionArray => arraySubstraction(questionArray)(questionList)((a,b) => (a.question !== b.question)))
            //.then(uniqueAddedQuestions => uniqueAddedQuestions.map(v => {return {question: v, attempt: 0, successRate: 0}}))
            .then(data => {console.log(data); return data})
            .then(data => questionList.push(...data))
            .then(res.end('ok'));
    })

}
function arraySubstraction(firstArray) {
    return secondArray => testFunction => {
        const uniqueValueArray = firstArray.filter(firstArrayElements => secondArray.every(secondArrayElements =>testFunction(firstArrayElements,secondArrayElements) ));
        return uniqueValueArray;
    };
}






function createQuestionObj(questionString) {
      const arr = questionString.split("\n");
      const result = arr.map((v) => {
              const [question, ans = v[0], attempt = '0', successRate = '0' ] = v.split(",").map(v => v.trim());
              const questionObj = {
                        question,
                        ans,
                        attempt,
                        successRate,
                      };
          //making sure value of each element is type string;
          return questionObj.keys().forEach((v) => questionObj[v] = String (questionObj[v]));
            });
    return result;
}





export {addQuestion};



