import {Group, Layer, Rect, Stage} from "react-konva";
import useWindowSize from "../../../hooks/common/useWindowSize.ts";
import GridRenderer from "./canvasRenderers/GridRenderer.tsx";
import React from "react";
import {LINES_GROUP, POSE_GROUP} from "../../../types/GroupNames.ts";
import NetworkPoseRenderer from "./canvasRenderers/poseRenderer/NetworkPoseRenderer.tsx";
import NetworkLineRenderer from "./canvasRenderers/lineRenderer/NetworkLineRenderer.tsx";
import useNTGroupInfo from "../../../hooks/networkTable/useNTGroupInfo.ts";

export default function FieldCanvas() {
    const linesGroupInfo = useNTGroupInfo(LINES_GROUP);
    const posesGroupInfo = useNTGroupInfo(POSE_GROUP);
    const [windowWidth, windowHeight] = useWindowSize();

    const canvasSize = React.useMemo(() => {
        return Math.min(windowWidth, windowHeight) - 200;
    }, [windowWidth, windowHeight]);

    return (
        <Stage
            width={canvasSize}
            height={canvasSize}
        >
            <Layer>
                {/* Background */}
                <Rect
                    width={canvasSize}
                    height={canvasSize}
                    fill="#121212"
                />

                {/* Grids */}
                <GridRenderer
                    gridSize={6}
                    canvasSize={canvasSize}
                />
                <GridRenderer
                    gridSize={12}
                    canvasSize={canvasSize}
                    strokeWidth={1}
                    strokeColor="#333"
                />

                {/* Border */}
                <Rect
                    x={0}
                    y={0}
                    width={canvasSize}
                    height={canvasSize}
                    stroke="#676767"
                    strokeWidth={3}
                    listening={false}
                />

                <Group
                    x={canvasSize / 2}
                    y={canvasSize / 2}
                    scaleX={canvasSize / 144}
                    scaleY={canvasSize / 144}
                >
                    {/* Lines */}
                    {linesGroupInfo?.children.map((group) => (
                        <NetworkLineRenderer key={group.path} lineGroup={group}/>
                    ))}

                    {/* Poses */}
                    {posesGroupInfo?.children.map((group) => (
                        <NetworkPoseRenderer key={group.path} poseGroup={group}/>
                    ))}
                </Group>
            </Layer>
        </Stage>
    )
}