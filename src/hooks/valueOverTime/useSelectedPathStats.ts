import {atom, useAtomValue} from "jotai";
import {valuesOverTimeAtom} from "./useValuesOverTime.ts";

// Atoms
export const selectedPathStatsAtom = atom((get) => {
    const valuesOverTime = get(valuesOverTimeAtom);

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