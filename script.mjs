import http from "http";
import fs from "fs";
import {getWords} from "./routes/getWords.mjs";
import {syncWords} from "./routes/syncWords.mjs";
import {addWord} from "./routes/addWord.mjs";
import {serveResources} from "./routes/serveResources.mjs";

http
    .createServer(requestListener())
    .listen(9111, () => console.log('server is listening on port 9111'))

function requestListener() {
    return (req, res) => {
        // to get around cros 
        res.setHeader('Access-Control-Allow-Origin', '*');
        const urlObj = new URL(req.url, `http://${req.headers.host}`)

        switch (urlObj.pathname) {
            case '/':
                res.writeHead(200, {'content-type': 'text/html'})
                fs.createReadStream('./view/quizFrontEnd/src/index.html').pipe(res)
                break;
            case '/getQuestions':
                getWords(req, res);
                break;
            case '/syncQuestions':
                syncWords(req, res);
                break;
            case '/addQuestions':
                console.log('addQ');
                addWord(req, res);
                break;
            default:
                serveResources(req,res);
                break;


        }
    }
}

