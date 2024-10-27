import Chalk from "chalk";

export default class Logger {
    static log(prefix: string, data: string) {
        console.log(`${prefix} ${data}`);
    }

    static error(error: string) {
        this.log(Chalk.red("[ERROR]"), Chalk.red(error));
    }

    static data(data: string) {
        this.log(Chalk.green("[DATA]"), data);
    }

    static info(info: string) {
        this.log(Chalk.blue("[INFO]"), info);
    }
}