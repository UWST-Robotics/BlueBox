import NetworkTableRecord from "./types/NetworkTableRecord";

export default class NetworkTable {
    static records: NetworkTableRecord[] = [];

    static addOrUpdate(record: NetworkTableRecord) {
        const existingRecord = this.records.find((r) => r.key === record.key);
        if (existingRecord) {
            existingRecord.value = record.value;
        } else {
            this.records.push(record);
        }
        return record;
    }

    static getRecord(key: string) {
        return this.records.find((record) => record.key === key);
    }

    static reset() {
        this.records = [];
    }
}