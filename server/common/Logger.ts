import Chalk from "chalk";
import SocketCommunication from "../io/SocketCommunication";

export default class Logger {
    static log(prefix: string, data: string) {
        console.log(`${prefix} ${data}`);
    }

    static tryEmitLog(prefix: string, data: string) {
        try {
            SocketCommunication.emitLog(`${prefix} ${data}`);
        } catch {
            // Ignore
        }
    }

    static colorHTML(color: string, innerText: string, bgColor?: string) {
        return `<span style="color: ${color}; background-color: ${bgColor || "transparent"}">${innerText}</span>`;
    }

    static error(error: string) {
        Logger.log(Chalk.bgRed("[ERROR]"), Chalk.red(error));
        Logger.tryEmitLog(Logger.colorHTML("white", "[ERROR]", "#b53232"), Logger.colorHTML("#b53232", error));
    }


    static info(info: string) {
        Logger.log(Chalk.blue("[INFO]"), info);
        Logger.tryEmitLog(Logger.colorHTML("#419fe3", "[INFO]"), info);
    }

    static client(info: string) {
        Logger.log(Chalk.yellow("[CLIENT]"), info);
    }
}