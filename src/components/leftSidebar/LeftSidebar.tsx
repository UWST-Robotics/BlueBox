import SceneGraph from "./scenegraph/SceneGraph.tsx";
import StatusHeader from "./status/StatusHeader.tsx";
import {Paper} from "@mui/material";

export default function LeftSidebar() {
    return (
        <Paper
            elevation={1}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: 300
            }}
        >
            <StatusHeader/>
            <SceneGraph/>
        </Paper>
    )
}