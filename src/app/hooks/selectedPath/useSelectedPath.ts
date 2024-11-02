import {atom, useAtomValue} from "jotai";

// Atoms
export const selectedPathAtom = atom<string | undefined>(undefined);

// Hooks
export default function useSelectedPath() {
    return useAtomValue(selectedPathAtom);
}