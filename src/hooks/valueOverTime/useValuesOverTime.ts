import {Atom, atom, useAtom} from "jotai";
import TimestampedValue from "../../types/TimestampedValue.ts";
import {atomFamily} from "jotai/utils";

// Atoms
export const valuesOverTimeAtom = atomFamily<string, Atom<TimestampedValue[]>>(() => atom<TimestampedValue[]>([]));

// Hooks
export default function useValuesOverTime(path: string) {
    return useAtom(valuesOverTimeAtom(path));
}