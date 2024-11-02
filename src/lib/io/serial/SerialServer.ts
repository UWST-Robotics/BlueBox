import {SerialPort} from "serialport";
import Logger from "../../common/Logger.js";
import Heartbeat from "../../common/Heartbeat.js";
import NTValue from "../../types/NTValue.js";
import {HEARTBEAT_INTERVAL} from "../../common/Constants.js";
import VEXSerialParser from "./VEXSerialParser.js";
import BlueBox from "../../BlueBox.js";

export default class SerialServer {

    hardware: SerialPort;
    parser: VEXSerialParser;
    heartbeat: Heartbeat;

    constructor(serialPath: string) {

        // Create Serial Port
        this.hardware = new SerialPort({
            path: serialPath,
            baudRate: 9600
        });

        // Create Heartbeat
        this.heartbeat = new Heartbeat(HEARTBEAT_INTERVAL, () => {
            BlueBox.serverTable.updateRecord("isRobotOnline", false);
        });

        // Create Parser
        this.parser = new VEXSerialParser(this.hardware, this.onData.bind(this));

        // Listen for Events
        this.hardware.on("open", this.onOpen.bind(this));
        this.hardware.on("error", this.onError.bind(this));
        this.hardware.on("close", this.onClose.bind(this));
    }

    /**
     * Close the serial port
     */
    close() {
        if (this.hardware.isOpen)
            this.hardware.close();
    }

    private onOpen() {
        Logger.info("Serial port opened on " + this.hardware.path);
        BlueBox.serverTable.updateRecord("isSerialConnected", true);
        BlueBox.serverTable.updateRecord("isRobotOnline", false);
    }

    private onError(error: Error) {
        Logger.error(`Serial port error: ${error.message}`);
    }

    private onClose() {
        Logger.info(`Serial port closed on ${this.hardware.path}`);
        BlueBox.serverTable.updateRecord("isSerialConnected", false);
        BlueBox.serverTable.updateRecord("isRobotOnline", false);
    }

    private onData(data: string) {
        try {

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
                BlueBox.nt.addOrUpdate(record);
                BlueBox.socket.emitUpdateRecord(record);
            }

            // Reset Table
            else if (data.startsWith("__NTRESET__")) {
                // Reset the network table
                BlueBox.nt.records = BlueBox.serverTable.getAllRecords();
                BlueBox.socket.emitSetAllRecords(BlueBox.nt.records);
            }

            // Heartbeat
            else if (data.startsWith("__NTHEARTBEAT__")) {
                // Reset the heartbeat
                this.heartbeat.beat();

                // Update the network table
                BlueBox.serverTable.updateRecord("isRobotOnline", true);
            }

            // Normal Log
            else {
                BlueBox.socket.emitLog(data);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            Logger.error(`Error parsing data: ${message}`);
        }
    }
}