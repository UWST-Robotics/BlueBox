import {atom, useAtom} from "jotai";
import {networkTableAtom} from "./useNetworkTable.ts";
import NetworkTableGroup from "../../types/NetworkTableGroup.ts";

// Atoms
export const networkTableGroupsAtom = atom((get) => {
    const networkTable = get(networkTableAtom);
    const rootGroup: NetworkTableGroup = {
        path: "",
        name: "",
        children: {},
        records: {},
    };

    // Iterate through records
    for (const record of networkTable) {

        // Split key into keys
        const keys = record.key.split("/");
        const recordName = keys.pop(); // <-- Remove last key

        // Skip if missing record key
        if (recordName === undefined)
            continue;

        // Track traversed groups
        let parentGroup = rootGroup;
        let currentPath = "";

        // Iterate through keys
        for (const key of keys) {

            // Update current path
            currentPath += `/${key}`;

            // Find existing group in parent's children
            let group = parentGroup.children[key];

            // Create group if it doesn't exist
            if (!group) {
                group = {
                    path: currentPath,
                    name: key,
                    children: {},
                    records: {}
                };
                parentGroup.children[key] = group;
            }

            // Update last group
            parentGroup = group;
        }

        // Add record to last group
        parentGroup.records[recordName] = record.value;
    }

    return rootGroup;
});

// Hooks
export default function useNetworkTableGroups() {
    return useAtom(networkTableGroupsAtom);
}