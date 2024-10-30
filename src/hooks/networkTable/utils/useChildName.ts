import {atomFamily} from "jotai/utils";
import {atom} from "jotai";

// Atoms
export const childNameAtomFamily = atomFamily((path: string) => atom(() => {
    return path.split("/").pop() || "";
}));