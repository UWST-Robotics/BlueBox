import {atom, useAtomValue} from "jotai";

export const socketStatusAtom = atom<"connected" | "disconnected">("disconnected");

export default function useSocketStatus() {
    return useAtomValue(socketStatusAtom);
}