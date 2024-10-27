import NetworkTableValue from "./NetworkTableValue.ts";

export default interface NetworkTableGroup {
    path: string;
    name: string;
    children: Record<string, NetworkTableGroup>;
    records: Record<string, NetworkTableValue>;
}