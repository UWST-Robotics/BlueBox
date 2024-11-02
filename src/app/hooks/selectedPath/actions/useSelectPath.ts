import {atom, useSetAtom} from "jotai";
import {selectedPathAtom} from "../useSelectedPath.ts";

// Atoms
export const selectPathAtom = atom(null, (_, set, path: string | undefined) => {
    set(selectedPathAtom, path);
});

// Functions
export default function useSelectPath() {
    return useSetAtom(selectPathAtom);
}