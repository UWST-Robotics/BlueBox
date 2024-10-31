import {atomFamily} from "jotai/utils";
import {Atom, atom, useAtomValue} from "jotai";
import NTValue from "../../types/nt/NTValue.ts";

// Atoms
export const ntValueAtomFamily = atomFamily<string, Atom<NTValue>>(() => atom<NTValue>(undefined));

// Hooks
export default function useNTValue(path: string) {
    return useAtomValue(ntValueAtomFamily(path));
}