import {SerialPort} from "serialport";
import Logger from "../common/Logger";
import {DelimiterParser} from "@serialport/parser-delimiter";
import NetworkTable from "../NetworkTable";
import SocketCommunication from "./SocketCommunication";
import Chalk from "chalk";
import Heartbeat from "../common/Heartbeat";

export default class SerialCommunication {
    static COM_PORT = "COM9";
    static HEARTBEAT_PATH = "_robot/status";
    static HEARTBEAT_INTERVAL = 1000;

    static port = new SerialPort({
        path: this.COM_PORT,
        baudRate: 9600,
        autoOpen: false
    });
    static heartbeat = new Heartbeat(this.HEARTBEAT_INTERVAL, this.onMissedHeartbeat);
    static parser = SerialCommunication.port.pipe(new DelimiterParser({delimiter: "\x0d"}));

    static connect() {

        // Set NetworkTable values
        this.onMissedHeartbeat();

        // Handle Errors
        SerialCommunication.port.on("error", (error) => {
            Logger.error(`Serial port error: ${error.message}`);
        });

        // Loopback data
        SerialCommunication.port.on("data", (data) => {
            SerialCommunication.port.write(data);
        });

        // Handle incoming data
        SerialCommunication.parser.on("data", SerialCommunication.onData);

        // Open the serial port
        SerialCommunication.port.open((error) => {
            if (error) {
                Logger.error(`Error opening serial port: ${error.message}`);
            } else {
                Logger.info(`Connected to port ${SerialCommunication.COM_PORT}`);
            }
        });
    }

    static onData(_data: unknown) {
        try {
            // Parse Data
            const data = _data.toString().trim();
            Logger.data(data);

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
                Logger.log(Chalk.blueBright('[LOG]'), message);
                SocketCommunication.emitLog(message);
            }

            // Heartbeat
            else if (data.startsWith("HEARTBEAT")) {
                // Reset the heartbeat
                SerialCommunication.heartbeat.beat();

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

    static onMissedHeartbeat() {
        // Update the network table
        const record = {key: SerialCommunication.HEARTBEAT_PATH, value: "offline"};
        NetworkTable.addOrUpdate(record);
        SocketCommunication.emitUpdateRecord(record);
    }
}