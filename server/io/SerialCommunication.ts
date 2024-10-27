import {SerialPort} from "serialport";
import Logger from "../common/Logger";
import {DelimiterParser} from "@serialport/parser-delimiter";
import NetworkTable from "../NetworkTable";
import SocketCommunication from "./SocketCommunication";
import Chalk from "chalk";

export default class SerialCommunication {
    static COM_PORT = "COM9";
    static port = new SerialPort({
        path: SerialCommunication.COM_PORT,
        baudRate: 9600,
        autoOpen: false
    });

    static parser = SerialCommunication.port.pipe(new DelimiterParser({delimiter: "\x0d"}));

    static connect() {
        SerialCommunication.port.open((error) => {
            if (error) {
                Logger.error(`Error opening serial port: ${error.message}`);
            } else {
                Logger.info(`Connected to port ${SerialCommunication.COM_PORT}`);
            }
        });

        SerialCommunication.parser.on("data", SerialCommunication.onData);
    }

    static onData(_data: unknown) {
        try {
            // Parse Data
            const data = _data.toString().trim();
            Logger.data(data);

            // Update Value
            if (data.startsWith("UPDATE")) {
                const [, key, value] = data.split(" ");
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

            // Unknown Command
            else {
                Logger.error(`Unknown command: ${data}`);
            }
        } catch (error) {
            Logger.error(`Error parsing data: ${error.message}`);
        }
    }
}