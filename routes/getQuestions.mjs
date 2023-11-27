import {getWordList} from "../db/helpers.mjs";
function getQuestions(req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
//    console.log('urlobj',urlObj);
    getWordList()
        //.then(questionList1 => {questionList = questionList1; return questionList1})
//        .then(pickedQuestions => logger(pickedQuestions))
        .then(questionList => JSON.stringify(
            pickQuestions(questionList)( Number( urlObj.searchParams.get('Qnumber') ))
            ))
        .then(pickedQuestions => logger(pickedQuestions))
        .then(pickedQuestions => res.end(pickedQuestions));
    //    const pickedQuestions = JSON.stringify(pickQuestions(questionList)(5))

}
function logger(obj) {
    console.log(obj);
    return obj;
}

function pickQuestions(questionList) {
    return totalQuestionsNumber => {

        const splitRandomNumberRange = splitRange({start: 0, end: questionList.length - 1})(.1)
        const splitTotalQuestionsNumber = Math.round(totalQuestionsNumber * (0.4))//splitRange( {start: 0, end: totalQuestionsNumber})(.4)
        console.log('splitRandomNumberRange', splitRandomNumberRange, ' splitTotalQuestionsNumber', splitTotalQuestionsNumber);

        const randomNumberArray = [...getRandomUniqueNumbers(splitRandomNumberRange[0])(splitTotalQuestionsNumber), ...getRandomUniqueNumbers(splitRandomNumberRange[1])(totalQuestionsNumber - splitTotalQuestionsNumber)]
        console.log('randomNumberArray', randomNumberArray);

        return randomNumberArray.map(v => questionList[v])
    }
}

function splitRange(range) {
    return splitPercantage => {
        const splitPoint = (range.end - range.start) * splitPercantage + range.start;
        return [{start: range.start, end: Math.floor(splitPoint)}, {start: Math.floor(splitPoint + 1), end: range.end}]
    }

}
//provide totalNumber of random number in the range `range`. Random number can be exactly start and end of the rane.
function getRandomUniqueNumbers(range) {
    return totalNumber => {
        const arr = [];
        while (arr.length < totalNumber) {
            let randomNumber = Math.round(Math.random() * (range.end - range.start)) + range.start;
            if (arr.indexOf(randomNumber) === -1) arr.push(randomNumber);
        }
        return arr;

    }
}

function pickRandomQuestion(questionList) {
    return questionList[Math.floor(Math.random() * questionList.length)];
}

//console.log(pickWords([1,2,3,4,5,6,7,8])(7));

export {getQuestions,  splitRange};
