import {atom, useSetAtom} from "jotai";
import {atomFamily} from "jotai/utils";
import NTValue from "../../../types/nt/NTValue.ts";
import {updateValueOverTimeAtom} from "../../valueOverTime/actions/useUpdateValueOverTime.ts";
import {ntGroupInfoAtomFamily} from "../useNTGroupInfo.ts";
import {childNameAtomFamily} from "../utils/useChildName.ts";
import {ntValueAtomFamily} from "../useNTValue.ts";

// Atoms
export const updateNTValueAtomFamily = atomFamily((path: string) => atom(null, (get, set, value: NTValue) => {

    // Update the Value
    set(ntValueAtomFamily(path), value);

    // Update Value over Time
    set(updateValueOverTimeAtom, {
        path,
        value
    });

    // Check if the group info exists
    const groupInfoAtom = ntGroupInfoAtomFamily(path);
    const groupInfo = get(groupInfoAtom);
    if (groupInfo === undefined)
        set(groupInfoAtom, {
            name: get(childNameAtomFamily(path)),
            path,
            children: []
        });
}));

// Hooks
export default function useUpdateNTValue(path: string) {
    return useSetAtom(updateNTValueAtomFamily(path));
}