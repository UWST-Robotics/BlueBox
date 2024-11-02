import {Server, Socket} from "socket.io";
import Logger from "../common/Logger.js";
import NTRecord from "../types/NTRecord.js";
import * as http from "http";
import BlueBox from "../BlueBox.js";
import SerialServer from "./serial/SerialServer.js";

export default class SocketServer {
    io: Server;

    constructor(httpServer: http.Server) {
        this.io = new Server(httpServer, {
            cors: {
                origin: "*"
            }
        });
        this.io.on("connection", this.onConnection);
    }

    /**
     * Called when a new user connects
     * @param socket - The socket of the user
     */
    onConnection(socket: Socket) {
        Logger.client("New user connected");

        socket.on("getAllRecords", () => {
            Logger.client("Sending all records to user");
            socket.emit("setAllRecords", BlueBox.nt.records);
        });

        socket.on("setSerialPort", (port: string) => {
            Logger.client(`Setting serial port to ${port}`);
            BlueBox.serial.close();
            BlueBox.serial = new SerialServer(port);
            BlueBox.serialTable.updateAllPorts().catch(console.error);
        });

        socket.on("disconnect", () => {
            Logger.client("User disconnected");
        });

        socket.on("error", (error) => {
            Logger.error(error.message);
        });
    }

    emitSetAllRecords(records: NTRecord[]) {
        this.io.emit("setAllRecords", records);
    }

    emitUpdateRecord(record: NTRecord) {
        this.io.emit("updateRecord", record);
    }

    emitLog(message: string) {
        this.io.emit("log", message);
    }
}