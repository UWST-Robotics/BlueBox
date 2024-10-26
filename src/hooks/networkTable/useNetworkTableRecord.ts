import {atomFamily} from "jotai/utils";
import {atom, useAtom} from "jotai";
import {networkTableAtom} from "./useNetworkTable.ts";

export const networkTableRecordAtomFamily = atomFamily((key: string) => atom((get) => {
    const networkTable = get(networkTableAtom);
    return networkTable.find((record) => record.key === key);
}));

export default function useNetworkTableRecord(key: string) {
    return useAtom(networkTableRecordAtomFamily(key));
}