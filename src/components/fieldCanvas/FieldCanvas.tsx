import {Layer, Rect, Stage} from "react-konva";
import useWindowSize from "../../hooks/common/useWindowSize.ts";
import GridRenderer from "./canvasRenderers/GridRenderer.tsx";
import React from "react";
import AllPosesRenderer from "./canvasRenderers/AllPosesRenderer.tsx";

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

                {/* Poses */}
                <AllPosesRenderer canvasSize={canvasSize}/>
            </Layer>
        </Stage>
    )
}