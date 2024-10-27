import NetworkTableValue from "../types/NetworkTableValue.ts";

export default function parseNetworkValueToNumber(value?: NetworkTableValue) {
    if (value === undefined)
        return undefined;
    if (typeof value === "number")
        return value;
    if (typeof value === "string")
        return parseFloat(value);
    if (typeof value === "boolean")
        return value ? 1 : 0;
    return undefined;
}