import {SerialPort} from "serialport";
import Logger from "../common/Logger";
import {DelimiterParser} from "@serialport/parser-delimiter";
import NetworkTable from "../NetworkTable";
import SocketCommunication from "./SocketCommunication";
import Chalk from "chalk";
import Heartbeat from "../common/Heartbeat";
import SerialPortType from "../types/SerialPortInfo";

export default class SerialCommunication {
    static HEARTBEAT_PATH = "_robot/status";
    static HEARTBEAT_INTERVAL = 1000;

    serialPort: SerialPort;
    heartbeat: Heartbeat;
    parser: DelimiterParser;

    constructor(serialPath: string) {

        // Create Serial Port
        this.serialPort = new SerialPort({
            path: serialPath,
            baudRate: 9600
        });

        // Create Child Processes
        this.heartbeat = new Heartbeat(SerialCommunication.HEARTBEAT_INTERVAL, this.onMissedHeartbeat);
        this.parser = this.serialPort.pipe(new DelimiterParser({delimiter: "\x0d"}));

        // Handle Open
        this.serialPort.on("open", () => {
            Logger.info("Serial port opened on " + this.serialPort.path);
        });

        // Handle Errors
        this.serialPort.on("error", (error) => {
            Logger.error(`Serial port error: ${error.message}`);
        });

        // Loopback data
        // this.serialPort.on("data", (data) => {
        //     serialPort.write(data);
        // });

        // Handle incoming data
        this.parser.on("data", this.onData.bind(this));
    }

    /**
     * Close the serial port
     */
    close() {
        if (this.serialPort.isOpen)
            this.serialPort.close();
    }

    /**
     * Get all available serial ports
     * @returns {Promise<SerialPortType[]>}
     */
    async getAllPorts() {
        return new Promise<SerialPortType[]>((resolve) => {
            SerialPort.list().then((ports) => {
                resolve(ports.map((port) => ({
                    isActive: port.path === this.serialPort.path,
                    path: port.path,
                    manufacturer: port.manufacturer,
                    serialNumber: port.serialNumber,
                    pnpID: port.pnpId,
                    locationID: port.locationId,
                    productID: port.productId,
                    vendorID: port.vendorId
                })));
            });
        });
    }

    /**
     * Handle incoming data
     * @param _data
     */
    private onData(_data: unknown) {
        try {
            // Parse Data
            const data = _data.toString().trim();
            Logger.client(`Received data: ${data}`);

            // Update Value
            if (data.startsWith("UPDATE")) {
                const [, key] = data.split(" ");
                const value = data.split(" ").slice(2).join(" ");

                // Update the network table
                const record = {key, value};
                NetworkTable.addOrUpdate(record);
                SocketCommunication.emitUpdateRecord(record);
            }

            // Delete Value
            else if (data.startsWith("DELETE")) {
                const key = data.split(" ")[1];
                // Delete the record from the network table
                NetworkTable.records = NetworkTable.records.filter((record) => record.key !== key);
                SocketCommunication.emitDeleteRecord(key);
            }

            // Reset Table
            else if (data.startsWith("RESET")) {
                NetworkTable.reset();
                SocketCommunication.emitResetTable();
            }

            // Log Message
            else if (data.startsWith("LOG")) {
                const message = data.split(" ").slice(1).join(" ");
                Logger.client(`Received log: ${Chalk.yellow(message)}`);
                SocketCommunication.emitLog(message);
            }

            // Heartbeat
            else if (data.startsWith("HEARTBEAT")) {
                // Reset the heartbeat
                this.heartbeat.beat();

                // Update the network table
                const record = {key: SerialCommunication.HEARTBEAT_PATH, value: "online"};
                NetworkTable.addOrUpdate(record);
                SocketCommunication.emitUpdateRecord(record);
            }

            // Unknown Command
            else {
                Logger.error(`Unknown command: ${data}`);
            }
        } catch (error) {
            Logger.error(`Error parsing data: ${error.message}`);
        }
    }

    private onMissedHeartbeat() {
        // Update the network table
        const record = {key: SerialCommunication.HEARTBEAT_PATH, value: "offline"};
        NetworkTable.addOrUpdate(record);
        SocketCommunication.emitUpdateRecord(record);
    }
}