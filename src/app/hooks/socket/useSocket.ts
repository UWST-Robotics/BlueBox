import {io} from 'socket.io-client';
import {atom, useAtomValue} from "jotai";

export const socketAtom = atom(
    io(undefined,
        {
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 3,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
            transports: ['websocket']
        })
);

export default function useSocket() {
    return useAtomValue(socketAtom);
}