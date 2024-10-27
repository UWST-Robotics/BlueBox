import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {networkTableGroupsAtom} from "./useNetworkTableGroups.ts";

// Atoms
export const networkTableGroupAtomFamily = atomFamily((path: string) => atom((get) => {

    // Split path into keys
    const pathKeys = path.split("/");

    // Get root group
    let currentGroup = get(networkTableGroupsAtom);

    // Traverse path
    while (pathKeys.length > 0) {

        // Get next key
        const key = pathKeys.shift();
        if (!key)
            break;

        // Find group
        const group = currentGroup.children[key];
        if (!group)
            return undefined;

        // Update current group
        currentGroup = group;
    }

    return currentGroup;
}));

// Hooks
export default function useNetworkTableGroup(path: string) {
    return useAtomValue(networkTableGroupAtomFamily(path));
}