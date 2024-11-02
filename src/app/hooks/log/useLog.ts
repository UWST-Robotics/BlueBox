import {atom, useAtomValue} from "jotai";
import LogEntry from "../../types/LogEntry.ts";

// Atoms
export const logAtom = atom<LogEntry[]>([
    {
        timestamp: new Date(),
        message: "<span style='color:grey;'>--- start of log output ---</span>"
    },
]);

// Hooks
export default function useLog() {
    return useAtomValue(logAtom);
}