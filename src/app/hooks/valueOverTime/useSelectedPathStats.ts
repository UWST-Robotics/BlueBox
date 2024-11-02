import {atom, useAtomValue} from "jotai";
import {valuesOverTimeAtom} from "./useValuesOverTime.ts";
import {selectedPathAtom} from "../selectedPath/useSelectedPath.ts";

// Atoms
export const selectedPathStatsAtom = atom((get) => {
    // Get the selected path
    const selectedPath = get(selectedPathAtom);

    // Get the values over time
    const valuesOverTime = get(valuesOverTimeAtom(selectedPath || ""));

    // Calculate the min, max, and average
    const values = valuesOverTime.map((value) => value.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const average = values.reduce((a, b) => a + b, 0) / values.length;

    return [min, max, average] as const;
})

// Hooks
export default function useSelectedPathStats() {
    return useAtomValue(selectedPathStatsAtom);
}