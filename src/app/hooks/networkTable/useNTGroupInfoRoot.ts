import {atom, useAtomValue} from "jotai";
import NTGroupInfo from "../../types/nt/NTGroupInfo.ts";

// Atoms
export const ntGroupInfoRoot = atom<NTGroupInfo>({
    name: "",
    path: "",
    children: []
});

// Hooks
export default function useNTGroupInfoRoot() {
    return useAtomValue(ntGroupInfoRoot);
}