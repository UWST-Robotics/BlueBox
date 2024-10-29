import NetworkTableValue from "../types/NetworkTableValue.ts";

export default function parseNetworkValueToNumber(value?: NetworkTableValue) {
    if (value === undefined)
        return undefined;

    let numValue: number;
    if (typeof value === "number")
        numValue = value;
    else if (typeof value === "string")
        numValue = parseFloat(value);
    else if (typeof value === "boolean")
        numValue = value ? 1 : 0;
    else
        return undefined;

    if (isNaN(numValue))
        return undefined;

    return numValue;
}