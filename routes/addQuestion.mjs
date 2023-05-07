
import {questionList} from '../db/helpers.mjs';
//console.log(getAbsolutePath('../db/wordList.txt')());

function addQuestion(req, res) {

    //    const filePath = getAbsolutePath()();
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    })
//console.log(createQuestionObj('extemporaneous,1,0'));
    req.on('end', function () {
            console.log(JSON.parse(data));
            Promise.resolve(JSON.parse(data))
                .then(json => json.list)
                .then(questionString => createQuestionObj(questionString))
                .then(data => {console.log(data); return data;})
                .then(questionArray => arraySubstraction(questionArray)(questionList)((a, b) => (a.question !== b.question)))
                //.then(uniqueAddedQuestions => uniqueAddedQuestions.map(v => {return {question: v, attempt: 0, successRate: 0}}))
                .then(data => {console.log(data); return data;})
                .then(data => questionList.push(...data))
                .then(res.end('ok'));

        })

}

function arraySubstraction(firstArray) {
    return secondArray => testFunction => {
//check if any elements of firstArray exist in the secondArray if true substract tham from firstArray.
//sequence of firstArray and secondArray matters.
        const uniqueValueArray = firstArray.filter(firstArrayElements => secondArray.every( secondArrayElements =>testFunction(firstArrayElements,secondArrayElements) ));
        return uniqueValueArray;
    };
}






function createQuestionObj(questionString) {
      const arr = questionString.split("\n").filter(v => v !== '');
    console.log('arr',arr);
      const result = arr.map((v) => {

              const [question, ans = v[0], attempt = 0, successRate = 0] = v.split(",,").map(v => v.trim());
              const questionObj = {
                        question,
                        ans,
                        attempt,
                        successRate,
                      };
    console.log('questionObj',questionObj);
          //making sure value of each element is type string;
          //Object.keys(questionObj).forEach((v) => questionObj[v]  = String (questionObj[v]));
    console.log('questionObj',questionObj);
          questionObj.attempt = Number(questionObj.attempt)
          questionObj.successRate= Number(questionObj.successRate)
          return questionObj;

            });
    
    console.log('result',result);
    return result;
}





export {addQuestion};



