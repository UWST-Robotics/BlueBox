import {Box, List} from "@mui/material";
import useNetworkTableGroups from "../../../hooks/networkTable/useNetworkTableGroups.ts";
import SceneGraphGroup from "./SceneGraphGroup.tsx";

export default function SceneGraph() {
    const [rootGroup] = useNetworkTableGroups();

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                overflow: 'auto'
            }}
        >
            <List
                sx={{
                    paddingLeft: 2,
                    paddingRight: 2
                }}
            >
                <SceneGraphGroup
                    networkGroup={rootGroup}
                    isRoot
                />
            </List>
        </Box>
    )
}