export type NetworkTableValue = string | number | boolean;

export default interface NetworkTableRecord {
    key: string;
    value: NetworkTableValue;

    lastUpdated?: Date;
}