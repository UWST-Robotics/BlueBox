import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {networkTableGroupAtomFamily} from "./useNetworkTableGroup.ts";
import {parentPathAtomFamily} from "./utils/useParentPath.ts";
import {childNameAtomFamily} from "./utils/useChildName.ts";
import NetworkTableValue from "../../types/NetworkTableValue.ts";
import {updateValueOverTimeAtom} from "../valueOverTime/actions/useUpdateValueOverTime.ts";

// Atoms
export const networkTableValueAtomFamily = atomFamily((path: string) => atom((get) => {

    // Get Parent Group
    const groupPath = get(parentPathAtomFamily(path));
    const group = get(networkTableGroupAtomFamily(groupPath));
    if (!group)
        return undefined;

    // Get Value
    const valueName = get(childNameAtomFamily(path));
    if (!(valueName in group.records))
        return undefined;

    return group.records[valueName];

}, (get, set, value: NetworkTableValue) => {

    // Get Parent Group
    const groupPath = get(parentPathAtomFamily(path));
    const groupAtom = networkTableGroupAtomFamily(groupPath);
    let group = get(groupAtom);

    // If group doesn't exist, make it
    if (group === undefined)
        group = {
            name: get(childNameAtomFamily(groupPath)),
            path: groupPath,
            children: {},
            records: {}
        };

    // Update Parent Group
    const valueName = get(childNameAtomFamily(path));
    set(groupAtom, {
        ...group,
        records: {
            ...group.records,
            [valueName]: value
        }
    });

    // Update "Value over Time"
    set(updateValueOverTimeAtom, {path, value})
}));

// Hooks
export default function useNetworkTableValue(path: string) {
    return useAtomValue(networkTableValueAtomFamily(path));
}