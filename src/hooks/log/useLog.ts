import {atom, useAtomValue} from "jotai";
import LogEntry from "../../types/LogEntry.ts";

// Atoms
export const logAtom = atom<LogEntry[]>([]);

// Hooks
export default function useLog() {
    return useAtomValue(logAtom);
}