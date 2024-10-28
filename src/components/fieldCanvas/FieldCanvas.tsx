import {Group, Layer, Rect, Stage} from "react-konva";
import useWindowSize from "../../hooks/common/useWindowSize.ts";
import GridRenderer from "./canvasRenderers/GridRenderer.tsx";
import React from "react";
import NetworkGroupRenderer from "./canvasRenderers/NetworkGroupRenderer.tsx";
import {LINES_GROUP, POSE_GROUP} from "../../types/GroupNames.ts";
import NetworkPoseRenderer from "./canvasRenderers/poseRenderer/NetworkPoseRenderer.tsx";
import NetworkLineRenderer from "./canvasRenderers/lineRenderer/NetworkLineRenderer.tsx";

export default function FieldCanvas() {
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
                    <NetworkGroupRenderer
                        groupName={LINES_GROUP}
                        renderChild={(group) => <NetworkLineRenderer lineGroup={group}/>}
                    />

                    {/* Poses */}
                    <NetworkGroupRenderer
                        groupName={POSE_GROUP}
                        renderChild={(group) => <NetworkPoseRenderer poseGroup={group}/>}
                    />
                </Group>
            </Layer>
        </Stage>
    )
}