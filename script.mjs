import http from "http";
import fs from "fs";
import {getQuestions} from "./routes/getQuestions.mjs";
import {syncQuestions} from "./routes/syncQuestions.mjs";
import {addQuestion} from "./routes/addQuestion.mjs";
import {allQuestions} from "./routes/allQuestions.mjs";
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
                getQuestions(req, res);
                break;
            case '/syncQuestions':
                syncQuestions(req, res);
                break;
            case '/addQuestions':
                console.log('addQuestions');
                addQuestion(req, res);
                break;
            case '/allQuestions':
                console.log('allQuestions');
                allQuestions(req, res);
                break;
            default:
                serveResources(req,res);
                break;


        }
    }
}

