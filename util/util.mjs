import {fileURLToPath} from 'url';
import * as path from "path";

function wordsSortFunction(a, b) {

    const successRateDiff = a.successRate - b.successRate;
    return successRateDiff === 0 ? b.attempt - a.attempt : successRateDiff;

}

function getAbsolutePath(filePath = '../db/wordList.txt') {
    return (url = import.meta.url) => {
        const __filename = fileURLToPath(url);
        return path.join(path.dirname(__filename), filePath)
    }
}


export {wordsSortFunction, getAbsolutePath}
