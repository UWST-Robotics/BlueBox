/**
 * NTGroupInfo is a type that represents the structure of a NetworkTable group.
 * Child groups are stored in the children array, and values are stored in the values array.
 */
export default interface NTGroupInfo {
    name: string;
    path: string;
    children: NTGroupInfo[];
}