import {SerialPort} from "serialport";
import Logger from "../common/Logger";
import {DelimiterParser} from "@serialport/parser-delimiter";
import NetworkTable from "../nt/NetworkTable";
import SocketCommunication from "./SocketCommunication";
import Heartbeat from "../common/Heartbeat";
import NTValue from "../types/NTValue";
import ServerNT from "../nt/ServerNT";

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
            ServerNT.updateRecord("isRobotOnline", false);
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
            ServerNT.updateRecord("isSerialConnected", true);
            ServerNT.updateRecord("isRobotOnline", false);
        });

        // Handle Errors
        this.serialPort.on("error", (error) => {
            Logger.error(`Serial port error: ${error.message}`);
        });

        // Handle Close
        this.serialPort.on("close", () => {
            Logger.info(`Serial port closed on ${this.serialPort.path}`);
            ServerNT.updateRecord("isSerialConnected", false);
            ServerNT.updateRecord("isRobotOnline", false);
        });
    }

    /**
     * Close the serial port
     */
    close() {
        if (this.serialPort.isOpen)
            this.serialPort.close();
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
                let value: NTValue = stringValue;
                if (lowerCaseValue === "true" || lowerCaseValue === "false")
                    value = stringValue === "true";
                else if (!isNaN(parseFloat(stringValue)))
                    value = parseFloat(stringValue);


                // Update the network table
                const record = {key, value};
                NetworkTable.addOrUpdate(record);
                SocketCommunication.emitUpdateRecord(record);
            }

            // Reset Table
            else if (data.startsWith("__NTRESET__")) {
                // Reset the network table
                NetworkTable.records = ServerNT.getAllRecords();
                SocketCommunication.emitSetAllRecords(NetworkTable.records);
            }

            // Heartbeat
            else if (data.startsWith("__NTHEARTBEAT__")) {
                // Reset the heartbeat
                this.heartbeat.beat();

                // Update the network table
                ServerNT.updateRecord("isRobotOnline", true);
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