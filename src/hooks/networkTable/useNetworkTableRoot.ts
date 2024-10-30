import {atom, useAtomValue} from "jotai";
import NetworkTableGroup from "../../types/NetworkTableGroup.ts";

// Atoms
export const networkTableRootAtom = atom<NetworkTableGroup>({
    path: "",
    name: "",
    children: {},
    records: {}
});

// Hooks
export default function useNetworkTableRoot() {
    return useAtomValue(networkTableRootAtom);
}