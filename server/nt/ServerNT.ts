import NTRecord from "../types/NTRecord";
import NetworkTable from "./NetworkTable";
import SocketCommunication from "../io/SocketCommunication";
import NTValue from "../types/NTValue";

const SERVER_PREFIX = "_server/";

export default class ServerNT {

    /**
     * Remove all records in a group
     * @param keyPrefix - The prefix of the keys to remove
     * @param excludeKeys - Keys to exclude from removal
     */
    static removeRecordsInGroup(keyPrefix: string, excludeKeys?: string[]) {
        const allRecords = this.getAllRecords(keyPrefix);
        allRecords.forEach((record) => {
            const shouldExclude = excludeKeys && excludeKeys.some((key) => record.key.startsWith(SERVER_PREFIX + key));
            if (!shouldExclude) {
                record.value = null;
                NetworkTable.addOrUpdate(record);
                SocketCommunication.emitUpdateRecord(record);
            }
        });
    }

    /**
     * Update and emit a record
     * @param record
     */
    private static updateAndEmitRecord(record: NTRecord) {
        // Update the record in the NetworkTable
        NetworkTable.addOrUpdate(record);
        SocketCommunication.emitUpdateRecord(record);
    }

    /**
     * Update a record in the NetworkTable.
     * Automatically prepends the key with "_server/" and emits the update.
     * @param key - The key of the record
     * @param value - The value of the record
     */
    static updateRecord(key: string, value: NTValue) {
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
    static getAllRecords(key?: string) {
        return NetworkTable.records.filter((record) => record.key.startsWith(SERVER_PREFIX + key));
    }
}