import {SerialPort} from "serialport";
import Logger from "../common/Logger.js";
import {PortInfo} from "../serial.js";
import BlueBox from "../BlueBox.js";

const POLL_INTERVAL = 1000;

export default class SerialPortNT {
    pollInterval?: NodeJS.Timeout;
    lastPorts: PortInfo[] = [];

    /**
     * Update the list of available ports over Network Tables
     */
    async updateAllPorts() {

        // Get all the ports
        const allPorts = await SerialPort.list();

        // Get Added Ports
        const addedPorts: PortInfo[] = allPorts.filter((port) => !this.lastPorts.some((lastPort) => lastPort.path === port.path));

        // Get Removed Ports
        const removedPorts: PortInfo[] = this.lastPorts.filter((lastPort) => !allPorts.some((port) => port.path === lastPort.path));

        // Update All Ports
        addedPorts.forEach(this.updatePort);
        removedPorts.forEach(this.onRemovePort);

        // Update Last Ports
        this.lastPorts = allPorts;
    }

    updatePort(port: PortInfo) {
        Logger.info(`Added port: ${port.path}`);
        const currentPort = BlueBox.serial.hardware.path;

        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/isActive`, port.path === currentPort);
        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/path`, port.path);
        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/manufacturer`, port.manufacturer);
        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/serialNumber`, port.serialNumber);
        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/pnpID`, port.pnpId);
        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/locationID`, port.locationId);
        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/productID`, port.productId);
        BlueBox.serverTable.updateRecord(`serialPorts/${port.path}/vendorID`, port.vendorId);
    }

    onRemovePort(port: PortInfo) {
        Logger.info(`Removed port: ${port.path}`);
        BlueBox.serverTable.removeRecordsInGroup(`serialPorts/${port.path}`);
    }

    pollForChanges() {
        // Clear the interval if it exists
        if (this.pollInterval)
            clearInterval(this.pollInterval);

        // Update all ports every second
        this.pollInterval = setInterval(this.updateAllPorts.bind(this), POLL_INTERVAL);
    }
}