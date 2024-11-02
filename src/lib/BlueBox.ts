import NetworkTable from "./nt/NetworkTable";
import WebServer from "./io/WebServer";
import {DEFAULT_NETWORK_PORT, DEFAULT_SERIAL_PORT} from "./common/Constants";
import SerialServer from "./io/serial/SerialServer";
import SocketServer from "./io/SocketServer";
import SerialPortNT from "./nt/SerialPortNT";
import ServerNT from "./nt/ServerNT";

export default class BlueBox {
    static nt = new NetworkTable();
    static serialTable = new SerialPortNT();
    static serverTable = new ServerNT();

    static web = new WebServer(DEFAULT_NETWORK_PORT);
    static socket = new SocketServer(this.web.httpServer);
    static serial = new SerialServer(DEFAULT_SERIAL_PORT);

    static listen() {
        BlueBox.web.listen();
    }
}