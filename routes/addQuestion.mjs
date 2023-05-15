
import {getAbsolutePath} from '../util/util.mjs';
import {writingToFile ,questionList} from '../db/helpers.mjs';
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
                .then(addedQuestionObj => removeDuplicates(addedQuestionObj) )
                .then(data => {console.log('given questions',data); return data;})
                .then(addedQuestionArray => arraySubstraction(addedQuestionArray)(questionList)((a, b) => (a.question !== b.question)))
                .then(addedQuestionArray => arraySubstraction(addedQuestionArray)(questionList)((a, b) => (a.question !== b.question)))
                .then(data => {console.log('addedQuestionArray', data); return data;})
                .then(data =>{ questionList.push(...data); return questionList})
            .then(newQuestionList => writingToFile(getAbsolutePath()())(newQuestionList)('w'))
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


function removeDuplicates(arr) {
  let newArray = [];
  let uniqueObject = {};
  
  for (let i in arr) {
    const objQuestion = arr[i]['question'];
    uniqueObject[objQuestion] = arr[i];
  }
  
  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }
  
  return newArray;
}




function createQuestionObj(questionString) {
      const arr = questionString.split("\n").filter(v => v !== '');
    console.log('arr',arr);
      const addedQuestionArray = arr.map((v) => {
          const questionArray = v.split(",,").map(v => v.trim());


              const [question, ans = questionArray[0], attempt = 0, successRate = 0] = questionArray;
              const questionObj = {
                        question,
                        ans,
                        attempt,
                        successRate,
                      };
          //making sure value of each element is type string;
          //Object.keys(questionObj).forEach((v) => questionObj[v]  = String (questionObj[v]));
    console.log('questionObj',questionObj);
          questionObj.attempt = Number(questionObj.attempt)
          questionObj.successRate= Number(questionObj.successRate)
          return questionObj;

            });
    
    return addedQuestionArray;
}





export {addQuestion};



