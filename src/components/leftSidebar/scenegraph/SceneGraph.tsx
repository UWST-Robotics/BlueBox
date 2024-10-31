import {Box, List} from "@mui/material";
import useNTGroupInfoRoot from "../../../hooks/networkTable/useNTGroupInfoRoot.ts";
import SceneGraphGroup from "./SceneGraphGroup.tsx";

export default function SceneGraph() {
    const rootInfo = useNTGroupInfoRoot();
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
                    groupInfo={rootInfo}
                    isRoot
                />
            </List>
        </Box>
    )
}