import NTRecord from "../types/NTRecord.js";
import NTValue from "../types/NTValue.js";
import BlueBox from "../BlueBox.js";

const SERVER_PREFIX = "_server/";

export default class ServerNT {

    /**
     * Remove all records in a group
     * @param keyPrefix - The prefix of the keys to remove
     */
    removeRecordsInGroup(keyPrefix: string) {
        const allRecords = this.getAllRecords(keyPrefix);
        allRecords.forEach((record) => {
            this.updateAndEmitRecord({
                key: record.key,
                value: null
            });
        });
    }

    /**
     * Update and emit a record
     * @param record
     */
    private updateAndEmitRecord(record: NTRecord) {
        // Update the record in the NetworkTable
        BlueBox.nt.addOrUpdate(record);
        BlueBox.socket.emitUpdateRecord(record);
    }

    /**
     * Update a record in the NetworkTable.
     * Automatically prepends the key with "_server/" and emits the update.
     * @param key - The key of the record
     * @param value - The value of the record
     */
    updateRecord(key: string, value: NTValue) {
        const record = {
            key: SERVER_PREFIX + key,
            value
        };
        this.updateAndEmitRecord(record);
    }

    /**
     * Gets all records that start with a certain key
     * @param key - The key to search for
     */
    getAllRecords(key?: string) {
        return BlueBox.nt.records.filter((record) => record.key.startsWith(SERVER_PREFIX + key));
    }
}