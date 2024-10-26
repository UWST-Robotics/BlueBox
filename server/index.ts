import {SerialPort} from "serialport";
import Chalk from "chalk";
import { DelimiterParser } from "@serialport/parser-delimiter";
import networkTable from "./networkTable";

const COM_PORT = "COM9";

// Connect to the serial port
const port = new SerialPort({
    path: COM_PORT,
    baudRate: 9600
});

// Handle Errors
port.on("error", error => {
    logError(error.message);
});
port.on("open", () => {
    logInfo(`Connected to port ${COM_PORT}`);
});

// Parse and read data
port.on("data", data => port.write(data));
const parser = port.pipe(new DelimiterParser({ delimiter: "\x0d" }));
parser.on("data", _data => {
    const data = _data.toString().trim();

    // SET <key> <value>
    if (data.startsWith("SET")) {
        const [_, key] = data.split(" ");

        // Get the value separately to handle spaces
        const value = data.split(" ").slice(2).join(" ");
        logData(`Setting ${key} to ${value}`);
        networkTable[key] = value;
    }

    // GET <key>
    else if (data.startsWith("GET")) {
        const [_, key] = data.split(" ");
        logData(`Getting ${key}`);
        const value = networkTable[key];
        port.write(`${key}=${value}\n`);
    }

    // DELETE <key>
    else if (data.startsWith("DELETE")) {
        const [_, key] = data.split(" ");
        logData(`Deleting ${key}`);
        delete networkTable[key];
    }

    // LOG <message>
    else if (data.startsWith("LOG")) {
        const message = data.split(" ").slice(1).join(" ");
        logInfo(message);
    }

    // Unknown command
    else {
        logError(`Invalid command: ${data}`);
    }
});

// Log the data
const logError = (error: string) => log(Chalk.red("[ERROR]"), Chalk.red(error));
const logData = (data: string) => log(Chalk.green("[DATA]"), data);
const logInfo = (info: string) => log(Chalk.blue("[INFO]"), info);
const log = (prefix: string, data: string) => console.log(`${prefix} ${data}`);