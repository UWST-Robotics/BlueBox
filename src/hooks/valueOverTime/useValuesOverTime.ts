import {atom, useAtom} from "jotai";
import TimestampedValue from "../../types/TimestampedValue.ts";

// Atoms
export const valuesOverTimeAtom = atom<TimestampedValue[]>([]);

// Hooks
export default function useValuesOverTime() {
    return useAtom(valuesOverTimeAtom);
}