import {Group} from "react-konva";
import useNetworkTableGroup from "../../../hooks/networkTable/useNetworkTableGroup.ts";
import {POSE_GROUP} from "../../../types/GroupNames.ts";
import NetworkPoseRenderer from "./NetworkPoseRenderer.tsx";

export interface AllPosesRendererProps {
    canvasSize: number;
}

export default function AllPosesRenderer(props: AllPosesRendererProps) {
    const poseGroup = useNetworkTableGroup(POSE_GROUP);

    const childKeys = Object.keys(poseGroup?.children ?? {});
    const {canvasSize} = props;

    if (!poseGroup)
        return;
    return (
        <Group
            x={canvasSize / 2}
            y={canvasSize / 2}
            scaleX={canvasSize / 144}
            scaleY={canvasSize / 144}
        >
            {childKeys.map((key) => (
                <NetworkPoseRenderer
                    key={key}
                    poseGroup={poseGroup.children[key]}
                />
            ))}
        </Group>
    )
}