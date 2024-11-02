import path from "path";
import {fileURLToPath} from "url";

export const DEFAULT_NETWORK_PORT = process.env.PORT || 8080;
export const DEFAULT_SERIAL_PORT = process.env.SERIAL_PORT || "COM6";
export const HEARTBEAT_INTERVAL = 500;
export const DIRECTORY_NAME = path.dirname(fileURLToPath(import.meta.url));