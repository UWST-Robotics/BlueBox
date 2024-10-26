import NetworkTableRecord from "./NetworkTableRecord.ts";

export default interface NetworkTableGroup {
    path: string;
    name: string;
    children: NetworkTableGroup[];
    records: NetworkTableRecord[];
}