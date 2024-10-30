import NetworkTableValue from "../types/NetworkTableValue.ts";

export default function networkValueToString(value: NetworkTableValue) {
    if (typeof value === "string")
        return value;
    else if (typeof value === "number")
        return value.toFixed(1);
    else if (typeof value === "boolean")
        return value ? "True" : "False";
    else if (value === null)
        return "NULL";
    else if (value === undefined)
        return "UNDEFINED";
    else
        return "UNKNOWN";
}