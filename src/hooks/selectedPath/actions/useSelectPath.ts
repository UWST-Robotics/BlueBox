import {atom, useSetAtom} from "jotai";
import {valuesOverTimeAtom} from "../../valueOverTime/useValuesOverTime.ts";
import {selectedPathAtom} from "../useSelectedPath.ts";

// Atoms
export const selectPathAtom = atom(null, (_, set, path: string | undefined) => {
    set(selectedPathAtom, path);
    set(valuesOverTimeAtom, []);
});

// Functions
export default function useSelectPath() {
    return useSetAtom(selectPathAtom);
}