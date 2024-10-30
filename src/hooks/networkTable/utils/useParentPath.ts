import {atomFamily} from "jotai/utils";
import {atom} from "jotai";

// Atoms
export const parentPathAtomFamily = atomFamily((path: string) => atom(() => {
    const index = path.lastIndexOf("/");
    if (index === -1)
        return "";
    return path.slice(0, index);
}));