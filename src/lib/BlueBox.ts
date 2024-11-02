import NetworkTable from "./nt/NetworkTable.js";
import WebServer from "./io/WebServer.js";
import {DEFAULT_NETWORK_PORT, DEFAULT_SERIAL_PORT} from "./common/Constants.js";
import SerialServer from "./io/serial/SerialServer.js";
import SocketServer from "./io/SocketServer.js";
import SerialPortNT from "./nt/SerialPortNT.js";
import ServerNT from "./nt/ServerNT.js";

export default class BlueBox {
    static nt = new NetworkTable();
    static serialTable = new SerialPortNT();
    static serverTable = new ServerNT();

    static web = new WebServer(DEFAULT_NETWORK_PORT);
    static socket = new SocketServer(this.web.httpServer);
    static serial = new SerialServer(DEFAULT_SERIAL_PORT);

    static listen() {
        BlueBox.web.listen();
        this.serialTable.pollForChanges();
    }
}