import http from "http";
import {getWords} from "./routes/getWords.mjs";
import {syncWords} from "./routes/syncWords.mjs";
import {addWord} from "./routes/addWord.mjs";
http
    .createServer(requestListener())
    .listen(9111, () => console.log('server is listening on port 9111'))

function requestListener() {
    return (req, res) => {
        // to get around cros 
        res.setHeader('Access-Control-Allow-Origin', '*');
//        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
 //       res.setHeader('Access-Control-Max-Age', 2592000); // 30 days

        const urlObj = new URL(req.url, `http://${req.headers.host}`)
        switch (urlObj.pathname) {
            case '/getQuestions':
                getWords(req, res);
                break;
            case '/syncQuestions':
                syncWords(req, res);
                break;
            case '/add':
                addWord(req, res);
                break;
        }
    }
}

