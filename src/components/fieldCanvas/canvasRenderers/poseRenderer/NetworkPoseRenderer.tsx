import NetworkTableGroup from "../../../../types/NetworkTableGroup.ts";
import PoseRenderer from "./PoseRenderer.tsx";
import parseNetworkValueToNumber from "../../../../utils/parseNetworkValueToNumber.ts";

export interface NetworkPoseRendererProps {
    poseGroup: NetworkTableGroup;
}

export default function NetworkPoseRenderer(props: NetworkPoseRendererProps) {
    const {poseGroup} = props;

    const name = poseGroup.records["name"];
    const color = poseGroup.records["color"];
    const x = parseNetworkValueToNumber(poseGroup.records["x"]);
    const y = parseNetworkValueToNumber(poseGroup.records["y"]);
    const angle = parseNetworkValueToNumber(poseGroup.records["angle"]);
    const length = parseNetworkValueToNumber(poseGroup.records["length"]);
    const width = parseNetworkValueToNumber(poseGroup.records["width"]);

    return (
        <PoseRenderer
            label={name?.toString() ?? poseGroup.name}
            strokeColor={color?.toString()}
            x={x ?? 0}
            y={y ?? 0}
            angle={angle}
            length={length}
            width={width}
        />
    )
}