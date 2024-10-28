import NetworkTableGroup from "../../../../types/NetworkTableGroup.ts";
import parseNetworkValueToNumber from "../../../../utils/parseNetworkValueToNumber.ts";
import React from "react";
import {Circle, Group, Line} from "react-konva";

export interface NetworkPoseRendererProps {
    lineGroup: NetworkTableGroup;
}

export default function NetworkLineRenderer(props: NetworkPoseRendererProps) {
    const {lineGroup} = props;

    const color = lineGroup.records["color"];
    const points = React.useMemo(() => {
        const pointKeys = Object.keys(lineGroup?.children ?? {});
        return pointKeys.map((key) => {
            const point = lineGroup.children[key];
            return [
                parseNetworkValueToNumber(point.records["x"]) ?? 0,
                parseNetworkValueToNumber(point.records["y"]) ?? 0
            ];
        });
    }, [lineGroup]);

    console.log(points);

    return (
        <Group>
            <Line
                points={points.flat()}
                stroke={color?.toString() ?? "#fff"}
                strokeWidth={1}
                lineCap={"round"}
                lineJoin={"round"}
            />

            {points.map((point, i) => (
                <Circle
                    key={i}
                    x={point[0]}
                    y={point[1]}
                    radius={1}
                    fill={color?.toString() ?? "#fff"}
                />
            ))}
        </Group>
    )
}