import {atomFamily} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {networkTableRootAtom} from "./useNetworkTableRoot.ts";
import NetworkTableGroup from "../../types/NetworkTableGroup.ts";
import {childNameAtomFamily} from "./utils/useChildName.ts";
import {parentPathAtomFamily} from "./utils/useParentPath.ts";

// Atoms
export const networkTableGroupAtomFamily = atomFamily((path: string) => atom((get) => {

    // Get Root
    const root = get(networkTableRootAtom);

    // If path is empty, return root
    if (path === "")
        return root;

    // Split Path
    const parts = path.split("/");

    // Get group of each part
    let group = root;
    for (let i = 0; i < parts.length; i++) {
        group = group.children[parts[i]];
        if (group === undefined)
            return undefined;
    }

    return group;

}, (get, set, group: NetworkTableGroup) => {

    // Get Path Values
    const parentPath = get(parentPathAtomFamily(path));
    const groupName = get(childNameAtomFamily(path));

    // Update Root
    if (path === "") {
        set(networkTableRootAtom, group);
        return;
    }

    // Get Parent
    const parentAtom = networkTableGroupAtomFamily(parentPath);
    let parent = get(parentAtom);

    // If parent doesn't exist, make it
    if (parent === undefined)
        parent = {
            name: get(childNameAtomFamily(parentPath)),
            path: parentPath,
            children: {},
            records: {}
        };

    // Update Parent
    set(parentAtom, {
        ...parent,
        children: {
            ...parent.children,
            [groupName]: {...group}
        }
    });

}));

// Hooks
export default function useNetworkTableGroup(path: string) {
    return useAtomValue(networkTableGroupAtomFamily(path));
}