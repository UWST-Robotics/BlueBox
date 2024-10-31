import {createServer} from "http";
import {Server, Socket} from "socket.io";
import NetworkTable from "../NetworkTable";
import Logger from "../common/Logger";
import NetworkTableRecord from "../types/NetworkTableRecord";
import SerialCommunication from "./SerialCommunication";

export default class SocketCommunication {
    static serialComms = new SerialCommunication("COM6");
    static httpsServer = createServer()
    static io = new Server(this.httpsServer, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    static onConnection(socket: Socket) {
        Logger.client("New user connected");

        socket.on("getAllRecords", () => {
            Logger.client("Sending all records to user");
            socket.emit("setAllRecords", NetworkTable.records);
        });

        socket.on("getSerialPorts", () => {
            SocketCommunication.serialComms.getAllPorts().then((ports) => {
                Logger.client(`Sending ${ports.length} serial ports to user`);
                // TODO: Fix Serial Port Selection
                //SocketCommunication.emitSerialPorts(ports);
            }).catch(Logger.error);
        });

        socket.on("setSerialPort", (port: string) => {
            Logger.info(`Setting serial port to ${port}`);

            SocketCommunication.serialComms.close();
            SocketCommunication.serialComms = new SerialCommunication(port);
            SocketCommunication.serialComms.getAllPorts().then((ports) => {
                Logger.client(`Sending ${ports.length} serial ports to user`);
                // TODO: Fix Serial Port Selection
                //SocketCommunication.emitSerialPorts(ports);
            }).catch(Logger.error);
        });

        socket.on("disconnect", () => {
            Logger.client("User disconnected");
        });

        socket.on("error", (error) => {
            Logger.error(error.message);
        });
    }

    static emitSetAllRecords(records: NetworkTableRecord[]) {
        this.io.emit("setAllRecords", records);
    }

    static emitUpdateRecord(record: NetworkTableRecord) {
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