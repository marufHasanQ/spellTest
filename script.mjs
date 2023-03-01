import http from "http";
import {route1} from "./routes/route1.mjs";
import {route2} from "./routes/route2.mjs";
import {route3} from "./routes/route3.mjs";
import {getWordList,getAbsolutePath} from "./util/util.mjs";
let wordList;
//console.log('from script.mjs',getAbsolutePath('./routes/route1.test.mjs')(import.meta.url));
getWordList()
    .then(wordList =>
        http
            .createServer(requestListener(wordList))
            .listen(9111, () => console.log('server is listening on port 9111'))
    );

function requestListener(wordList) {
    return (req, res) => {
        switch (req.url) {
            case '/url1':
                route1(req, res, wordList);
                break;
            case '/url2':

                route2(req, res);
                break;

            case '/url3':

                route3(req, res,wordList);
                break;
        }
    }

}

