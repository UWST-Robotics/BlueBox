import {SerialPort} from "serialport";
import Logger from "../common/Logger";
import {DelimiterParser} from "@serialport/parser-delimiter";
import NetworkTable from "../NetworkTable";
import SocketCommunication from "./SocketCommunication";
import Heartbeat from "../common/Heartbeat";
import SerialPortType from "../types/SerialPortInfo";
import NetworkTableValue from "../types/NetworkTableValue";

export default class SerialCommunication {
    static HEARTBEAT_INTERVAL = 500;

    serialPort: SerialPort;
    heartbeat: Heartbeat;
    parserA: DelimiterParser;

    constructor(serialPath: string) {

        // Create Serial Port
        this.serialPort = new SerialPort({
            path: serialPath,
            baudRate: 9600
        });

        // Create Child Processes
        this.heartbeat = new Heartbeat(SerialCommunication.HEARTBEAT_INTERVAL, () => {
            SerialCommunication.updateNetworkTable("heartbeat", "offline");
        });


        // Wait for "sout" delimiter
        this.parserA = this.serialPort.pipe(new DelimiterParser({delimiter: "sout"}));

        // Remove Null Byte
        this.parserA.on("data", (data) => {
            // Find index of null byte
            const nullByteIndex = data.indexOf(0);

            // Slice data to remove null byte
            if (nullByteIndex !== -1)
                data = data.slice(0, nullByteIndex);

            // Convert to a string using TextDecoder
            const decoder = new TextDecoder();
            this.onData(decoder.decode(data));
        });

        // Handle Open
        this.serialPort.on("open", () => {
            Logger.info("Serial port opened on " + this.serialPort.path);
            SerialCommunication.updateNetworkTable("serialStatus", "open");
            SerialCommunication.updateNetworkTable("heartbeat", "offline");
        });

        // Handle Errors
        this.serialPort.on("error", (error) => {
            Logger.error(`Serial port error: ${error.message}`);
        });

        // Handle Close
        this.serialPort.on("close", () => {
            Logger.info("Serial port closed");
            SerialCommunication.updateNetworkTable("serialStatus", "closed");
            SerialCommunication.updateNetworkTable("heartbeat", "offline");
        });
    }

    /**
     * Update the status of a value in the network table
     * @param key - The key of the value to update
     * @param value - The new value
     */
    static updateNetworkTable(key: string, value: string) {
        const record = {
            key: `_server/${key}`,
            value
        };
        NetworkTable.addOrUpdate(record);
        SocketCommunication.emitUpdateRecord(record);
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

            // Update Value
            if (data.startsWith("__NTUPDATE__")) {
                const [, key] = data.split(" ");
                const stringValue = data.split(" ").slice(2).join(" ");


                // Parse the value
                const lowerCaseValue = stringValue.toLowerCase();
                let value: NetworkTableValue = stringValue;
                if (lowerCaseValue === "true" || lowerCaseValue === "false")
                    value = stringValue === "true";
                else if (!isNaN(parseFloat(stringValue)))
                    value = parseFloat(stringValue);


                // Update the network table
                const record = {key, value};
                NetworkTable.addOrUpdate(record);
                SocketCommunication.emitUpdateRecord(record);
            }

            // Delete Value
            else if (data.startsWith("__NTDELETE__")) {
                const key = data.split(" ")[1];
                // Delete the record from the network table
                NetworkTable.records = NetworkTable.records.filter((record) => record.key !== key);
                SocketCommunication.emitDeleteRecord(key);
            }

            // Reset Table
            else if (data.startsWith("__NTRESET__")) {
                NetworkTable.reset();
                SocketCommunication.emitResetTable();
            }

            // Heartbeat
            else if (data.startsWith("__NTHEARTBEAT__")) {
                // Reset the heartbeat
                this.heartbeat.beat();

                // Update the network table
                SerialCommunication.updateNetworkTable("heartbeat", "online");
            }

            // Normal Log
            else {
                SocketCommunication.emitLog(_data.toString());
            }
        } catch (error) {
            Logger.error(`Error parsing data: ${error.message}`);
        }
    }
}