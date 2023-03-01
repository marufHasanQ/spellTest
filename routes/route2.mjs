
import { getAbsolutePath } from '../util/util.mjs';

import {createWriteStream} from "fs";
console.log(getAbsolutePath('../db/wordList.txt')); 
function route2(req, res) {

    const filePath = getAbsolutePath()(); 
    let data = '';
    req.on('data', function (chunk) {
        data += chunk;
    })
    req.on('end', function () {
        addingWord(filePath)(data)
        .then(data => res.end('word added') );
    })

}


function addingWord(filePath) {
    return word => {
        return new Promise((res, rej) => {

            const writeStream = createWriteStream(filePath, {flags: 'a'});
            writeStream.write(word + ',' + '0' + ',' + '0');
            writeStream.end('\n');
            writeStream.on('close',() => res(word));
        });

    }
}
export {route2, addingWord};



