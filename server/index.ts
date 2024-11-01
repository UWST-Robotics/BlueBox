import SocketCommunication from "./io/SocketCommunication";
import SerialPortNT from "./nt/SerialPortNT";

SocketCommunication.listen();
SerialPortNT.pollForChanges();