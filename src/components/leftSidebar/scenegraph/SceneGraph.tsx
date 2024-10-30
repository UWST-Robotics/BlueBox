import {Box, List} from "@mui/material";
import SceneGraphGroup from "./SceneGraphGroup.tsx";
import useNetworkTableRoot from "../../../hooks/networkTable/useNetworkTableRoot.ts";

export default function SceneGraph() {
    const rootGroup = useNetworkTableRoot();

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