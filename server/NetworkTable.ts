import NetworkTableRecord from "./types/NetworkTableRecord";

export default class NetworkTable {
    static records: NetworkTableRecord[] = [];

    /**
     * Add or update a record in the NetworkTable
     * @param record - The record to add or update
     * @returns The record that was added or updated
     */
    static addOrUpdate(record: NetworkTableRecord) {
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
    static getRecord(key: string) {
        return this.records.find((record) => record.key === key);
    }

    /**
     * Resets the NetworkTable to remove all records.
     * Keeps all records with the key starting with "_server/"
     */
    static reset() {
        // Keep all records with _server as the root
        this.records = this.records.filter((record) => record.key.startsWith("_server/"));
    }
}