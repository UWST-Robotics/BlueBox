/**
 * NTGroupInfo is a type that represents the structure of a Network Table group.
 * Children are stored in the `children` field. Network Table values are in their own data structure (See `useNTValue()`).
 */
export default interface NTGroupInfo {
    name: string;
    path: string;
    children: NTGroupInfo[];
}