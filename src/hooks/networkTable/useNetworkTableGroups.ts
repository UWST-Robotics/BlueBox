import {atom, useAtom} from "jotai";
import {networkTableAtom} from "./useNetworkTable.ts";
import NetworkTableGroup from "../../types/NetworkTableGroup.ts";

export const networkTableGroupsAtom = atom((get) => {
    const networkTable = get(networkTableAtom);
    const rootGroup: NetworkTableGroup = {
        path: "",
        name: "",
        records: [],
        children: [],
    };

    // Iterate through records
    for (const record of networkTable) {

        // Split key into keys
        const keys = record.key.split("/");
        keys.pop(); // <-- Remove last key

        // Track traversed groups
        let parentGroup = rootGroup;
        let currentPath = "";

        // Iterate through keys
        for (const key of keys) {

            // Update current path
            currentPath += `/${key}`;

            // Find existing group in parent's children
            let group = parentGroup.children.find((group) => group.name === key);

            // Create group if it doesn't exist
            if (!group) {
                group = {
                    path: currentPath,
                    name: key,
                    children: [],
                    records: []
                };
                parentGroup.children.push(group);
            }

            // Update last group
            parentGroup = group;
        }

        // Add record to last group
        parentGroup?.records.push(record);
    }

    return rootGroup;
});

export default function useNetworkTableGroups() {
    return useAtom(networkTableGroupsAtom);
}