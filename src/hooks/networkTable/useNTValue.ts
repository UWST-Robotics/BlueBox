import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import NTValue from "../../types/nt/NTValue.ts";

// Atoms
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ntValueAtomFamily = atomFamily((_: string) => atom<NTValue>(undefined));

// Hooks
export default function useNTValue(path: string) {
    return useAtomValue(ntValueAtomFamily(path));
}