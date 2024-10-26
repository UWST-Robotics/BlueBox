import StatusBanner from "./status/StatusBanner.tsx";
import SceneGraph from "./scenegraph/SceneGraph.tsx";

export default function LeftSidebar() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: 300,
                backgroundColor: '#282c34',
                color: 'white',
            }}
        >
            <StatusBanner/>
            <SceneGraph/>
        </div>
    )
}