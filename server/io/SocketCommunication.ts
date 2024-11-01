import {createServer} from "http";
import {Server, Socket} from "socket.io";
import NetworkTable from "../nt/NetworkTable";
import Logger from "../common/Logger";
import NTRecord from "../types/NTRecord";
import SerialCommunication from "./SerialCommunication";
import SerialPortNT from "../nt/SerialPortNT";

export default class SocketCommunication {
    static serialComms = new SerialCommunication("COM6");
    static httpsServer = createServer()
    static io = new Server(this.httpsServer, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    /**
     * Called when a new user connects
     * @param socket - The socket of the user
     */
    static onConnection(socket: Socket) {
        Logger.client("New user connected");

        socket.on("getAllRecords", () => {
            Logger.client("Sending all records to user");
            socket.emit("setAllRecords", NetworkTable.records);
        });

        socket.on("setSerialPort", (port: string) => {
            Logger.client(`Setting serial port to ${port}`);
            SocketCommunication.serialComms.close();
            SocketCommunication.serialComms = new SerialCommunication(port);
            SerialPortNT.updateAllPorts().catch(console.error);
        });

        socket.on("disconnect", () => {
            Logger.client("User disconnected");
        });

        socket.on("error", (error) => {
            Logger.error(error.message);
        });
    }

    static emitSetAllRecords(records: NTRecord[]) {
        this.io.emit("setAllRecords", records);
    }

    static emitUpdateRecord(record: NTRecord) {
        this.io.emit("updateRecord", record);
    }

    static emitLog(message: string) {
        this.io.emit("log", message);
    }

    static listen() {
        this.io.on("connection", this.onConnection);
        this.httpsServer.listen(3000);
    }
}