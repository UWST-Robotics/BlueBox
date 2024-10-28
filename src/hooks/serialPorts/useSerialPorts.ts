import {atom, useAtomValue} from "jotai";
import SerialPortInfo from "../../types/SerialPortInfo.ts";

export const serialPortsAtom = atom<SerialPortInfo[]>([]);

export default function useSerialPorts() {
    return useAtomValue(serialPortsAtom);
}