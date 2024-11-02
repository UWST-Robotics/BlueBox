import express from 'express';
import Logger from "../common/Logger.js";
import * as http from "http";
import {DEFAULT_NETWORK_PORT} from "../common/Constants.js";
import path from "path";

export default class WebServer {
    port: number | string;
    app = express();
    httpServer = http.createServer(this.app);

    constructor(port?: number | string) {
        this.port = port || DEFAULT_NETWORK_PORT;

        // Public Folder
        this.app.use(express.static(path.join(__dirname, "public")));
    }

    listen() {
        this.httpServer.listen(this.port, this.onListen);
    }

    private onListen() {
        Logger.info(`Listening on port ${DEFAULT_NETWORK_PORT}`);
    }
}