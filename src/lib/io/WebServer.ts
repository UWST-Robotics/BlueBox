import express from 'express';
import Logger from "../common/Logger";
import * as http from "node:http";
import {DEFAULT_NETWORK_PORT} from "../common/Constants";

export default class WebServer {
    port: number | string;
    app = express();
    httpServer = http.createServer(this.app);

    constructor(port?: number | string) {
        this.port = port || DEFAULT_NETWORK_PORT;

        this.app.get("/", (_, res) => {
            res.send("Hello World!");
        });
    }

    listen() {
        this.httpServer.listen(this.port, this.onListen);
    }

    private onListen() {
        Logger.info(`Listening on port ${DEFAULT_NETWORK_PORT}`);
    }
}