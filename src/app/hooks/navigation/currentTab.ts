import {atom, useAtom} from "jotai";

// Atoms
export const currentTabAtom = atom("log");

// Hooks
export default function useCurrentTab() {
    return useAtom(currentTabAtom);
}