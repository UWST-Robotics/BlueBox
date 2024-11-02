import NTGroupInfo from "../../../../../types/nt/NTGroupInfo.ts";
import {Circle, Group, Line} from "react-konva";
import useNTValue from "../../../../../hooks/networkTable/useNTValue.ts";
import React from "react";

export interface NetworkPoseRendererProps {
    lineGroup: NTGroupInfo;
}

export default function NetworkLineRenderer(props: NetworkPoseRendererProps) {
    const {lineGroup} = props;
    const color = useNTValue(lineGroup.path + "/color");

    // const points = React.useMemo(() => {
    //     const pointKeys = Object.keys(lineGroup?.children ?? {});
    //     return pointKeys.map((key) => {
    //         const point = lineGroup.childGroups[key];
    //         return [
    //             parseNetworkValueToNumber(point.records["x"]) ?? 0,
    //             parseNetworkValueToNumber(point.records["y"]) ?? 0
    //         ];
    //     });
    // }, [lineGroup]);

    // TODO: Fix this
    const points: number[][] = [];

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