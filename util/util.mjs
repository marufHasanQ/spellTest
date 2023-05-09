import {fileURLToPath} from 'url';
import * as path from "path";

function questionSortFunction(a, b) {
const aSortvalue = ((a.attempt * 100) - (a.attempt * a.successRate)) + a.attempt
const bSortvalue = ((b.attempt * 100) - (b.attempt * b.successRate)) + b.attempt
    return bSortvalue - aSortvalue;
//    const successRateDiff = a.successRate - b.successRate;
 //   return successRateDiff === 0 ? b.attempt - a.attempt : successRateDiff;

}

function getAbsolutePath(filePath = '../db/questionList.json') {
    return (url = import.meta.url) => {
        const __filename = fileURLToPath(url);
        return path.join(path.dirname(__filename), filePath)
    }
}
function addQuestionIndex(questionList ) {
   return questionList.map((v,i) =>  {v.index = i; return v;} ) 
}

export {questionSortFunction , getAbsolutePath, addQuestionIndex  }
