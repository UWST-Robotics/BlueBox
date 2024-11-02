import NTRecord from "../types/NTRecord.js";

export default class NetworkTable {
    records: NTRecord[] = [];

    /**
     * Add or update a record in the NetworkTable
     * @param record - The record to add or update
     * @returns The record that was added or updated
     */
    addOrUpdate(record: NTRecord) {
        const existingRecord = this.records.find((r) => r.key === record.key);
        if (existingRecord) {
            existingRecord.value = record.value;
        } else {
            this.records.push(record);
        }
        return record;
    }

    /**
     * Get a record by key
     * @param key The key of the record
     */
    getRecord(key: string) {
        return this.records.find((record) => record.key === key);
    }
}