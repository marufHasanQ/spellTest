import fs from "fs";
import {getResourcesPath, getMimeType} from "./routeHelper.mjs";
function serveResources(req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    if (urlObj.pathname.slice(0, 3) === '/fa') {
        return;
    }

    res.writeHead(200, {'Content-Type': getMimeType(urlObj.pathname)});
    fs.createReadStream(getResourcesPath(urlObj.pathname)).pipe(res)
}
export {serveResources};
