import NTValue from "./nt/NTValue.ts";

export default interface NetworkTableRecord {
    key: string;
    value: NTValue;
}