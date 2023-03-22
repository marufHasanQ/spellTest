
import { addingWords} from '../db/helpers.mjs';
import {  getAbsolutePath } from '../util/util.mjs';
console.log(getAbsolutePath('../db/wordList.txt')()); 

function addWord(req, res) {

    const filePath = getAbsolutePath()(); 
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    })
    req.on('end', function () {
        addingWords(filePath)(data)('a')
        .then(data => res.end('word added') );
    })

}

export {addWord};



