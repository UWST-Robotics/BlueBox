import {atom, useSetAtom} from "jotai";
import {networkTableRootAtom} from "../useNetworkTableRoot.ts";
import NetworkTableGroup from "../../../types/NetworkTableGroup.ts";

// Atoms
export const resetNetworkTableAtom = atom(null, (get, set) => {

    // Get the root of the network table
    const root = get(networkTableRootAtom);
    const childKeys = Object.keys(root.children);

    // Find all the keys that start with "_server"
    const serverKeys = childKeys.filter((key) => key.startsWith("_server"));

    // Create a new children object with only the server keys
    const children: Record<string, NetworkTableGroup> = {};
    for (const key of serverKeys)
        children[key] = root.children[key];

    // Reset the network table
    set(networkTableRootAtom, {...root, children});

});

// Hooks
export default function useResetNetworkTable() {
    return useSetAtom(resetNetworkTableAtom);
}