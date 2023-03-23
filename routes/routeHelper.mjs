
import * as path from 'node:path';
const resourceDir ='./view/quizFrontEnd/src' ;
const MIME_TYPES = {
    default: 'application/octet-stream',
    html: 'text/html; charset=UTF-8',
    mjs: 'application/javascript',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    gif: 'image/gif',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
}
function getResourcesPath(pathname) {
    return resourceDir + pathname;
}
function getMimeType(pathname) {
                const ext = path.extname(pathname).substring(1).toLowerCase();
    return MIME_TYPES[ext] || MIME_TYPES.default;
}
export{getResourcesPath, getMimeType};
