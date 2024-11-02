import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {ntGroupInfoRoot} from "./useNTGroupInfoRoot.ts";
import {parentPathAtomFamily} from "./utils/useParentPath.ts";
import {childNameAtomFamily} from "./utils/useChildName.ts";
import NTGroupInfo from "../../types/nt/NTGroupInfo.ts";

export const ntGroupInfoAtomFamily = atomFamily((path: string) => atom((get) => {

    // Get Root
    const root = get(ntGroupInfoRoot);

    // If path is empty, return root
    if (path === "")
        return root;

    // Split Path
    const pathParts = path.split("/");

    // Get group of each part
    let group: NTGroupInfo | undefined = root;
    for (let i = 0; i < pathParts.length; i++) {
        group = group.children.find((child) => child.name === pathParts[i]);
        if (group === undefined)
            return undefined;
    }

    return group;

}, (get, set, groupInfo: NTGroupInfo) => {

    console.log("Setting group info", path, groupInfo);

    // This function recursively updates the parent with the new group info

    // Update Root
    if (path === "") {
        set(ntGroupInfoRoot, groupInfo);
        return;
    }

    // Get Parent
    const parentPath = get(parentPathAtomFamily(path));
    const parentAtom = ntGroupInfoAtomFamily(parentPath);
    let parent = get(parentAtom);

    // If parent doesn't exist, make it
    if (parent === undefined)
        parent = {
            name: get(childNameAtomFamily(parentPath)),
            path: parentPath,
            children: []
        };

    // Update Parent
    set(parentAtom, {
        ...parent,
        children: [
            ...parent.children.filter((child) => child.name !== groupInfo.name),
            groupInfo
        ]
    });
}));

// Hooks
export default function useNTGroupInfo(path: string) {
    return useAtomValue(ntGroupInfoAtomFamily(path));
}
