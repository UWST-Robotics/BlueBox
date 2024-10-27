import {createServer} from "http";
import {Server, Socket} from "socket.io";
import NetworkTable from "../NetworkTable";
import Logger from "../common/Logger";
import NetworkTableRecord from "../types/NetworkTableRecord";

export default class SocketCommunication {
    static httpsServer = createServer()
    static io = new Server(this.httpsServer, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    static onConnection(socket: Socket) {
        Logger.info("New user connected");

        socket.on("getAllRecords", () => {
            Logger.data("Sending all records to user");
            socket.emit("setAllRecords", NetworkTable.records);
        });

        socket.on("disconnect", () => {
            Logger.info("User disconnected");
        });

        socket.on("error", (error) => {
            Logger.error(error.message);
        });
    }

    static emitUpdateRecord(record: NetworkTableRecord) {
        this.io.emit("updateRecord", record);
    }

    static emitDeleteRecord(key: string) {
        this.io.emit("deleteRecord", key);
    }

    static emitResetTable() {
        this.io.emit("resetTable");
    }

    static emitLog(message: string) {
        this.io.emit("log", message);
    }

    static listen() {
        this.io.on("connection", this.onConnection);
        this.httpsServer.listen(3000);
    }
}