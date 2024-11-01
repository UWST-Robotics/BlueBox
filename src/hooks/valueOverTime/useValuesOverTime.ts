import {atom, useAtom} from "jotai";
import TimestampedValue from "../../types/TimestampedValue.ts";
import {atomFamily} from "jotai/utils";

// Atoms
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const valuesOverTimeAtom = atomFamily((_: string) => atom<TimestampedValue[]>([]));

// Hooks
export default function useValuesOverTime(path: string) {
    return useAtom(valuesOverTimeAtom(path));
}