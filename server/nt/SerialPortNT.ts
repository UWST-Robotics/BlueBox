import {SerialPort} from "serialport";
import SocketCommunication from "../io/SocketCommunication";
import ServerNT from "./ServerNT";

const POLL_INTERVAL = 1000;

export default class SerialPortNT {
    static pollInterval: NodeJS.Timeout;

    /**
     * Update the list of available ports over Network Tables
     */
    static async updateAllPorts() {

        // Get all the ports
        const currentPort = SocketCommunication.serialComms.serialPort.path;
        const allPorts = await SerialPort.list();

        // Delete the old keys
        ServerNT.removeRecordsInGroup("serialPorts", allPorts.map(port => `serialPorts/${port.path}`));

        // Update all the new records
        allPorts.forEach(port => {
            ServerNT.updateRecord(`serialPorts/${port.path}/isActive`, port.path === currentPort);
            ServerNT.updateRecord(`serialPorts/${port.path}/path`, port.path);
            ServerNT.updateRecord(`serialPorts/${port.path}/manufacturer`, port.manufacturer);
            ServerNT.updateRecord(`serialPorts/${port.path}/serialNumber`, port.serialNumber);
            ServerNT.updateRecord(`serialPorts/${port.path}/pnpID`, port.pnpId);
            ServerNT.updateRecord(`serialPorts/${port.path}/locationID`, port.locationId);
            ServerNT.updateRecord(`serialPorts/${port.path}/productID`, port.productId);
            ServerNT.updateRecord(`serialPorts/${port.path}/vendorID`, port.vendorId);
        });
    }

    static pollForChanges() {
        // Clear the interval if it exists
        if (SerialPortNT.pollInterval)
            clearInterval(SerialPortNT.pollInterval);

        // Update all ports every second
        SerialPortNT.pollInterval = setInterval(SerialPortNT.updateAllPorts, POLL_INTERVAL);
    }
}