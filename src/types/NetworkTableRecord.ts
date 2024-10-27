import NetworkTableValue from "./NetworkTableValue.ts";

export default interface NetworkTableRecord {
    key: string;
    value: NetworkTableValue;

    lastUpdated?: Date;
}