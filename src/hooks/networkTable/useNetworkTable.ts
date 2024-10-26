import {atom, useAtom} from "jotai";
import NetworkTableRecord from "../../types/NetworkTableRecord.ts";

// Atoms
export const networkTableAtom = atom<NetworkTableRecord[]>([
    {key: "group1/group2/test", value: "Hello, World!"},
    {key: "group1/group3/number3", value: 45},
    {key: "group1/number1", value: 42},
    {key: "group1/number2", value: 43},
    {key: "bool", value: true}
]);

// Hooks
export default function useNetworkTable() {
    return useAtom(networkTableAtom);
}