import NTGroupInfo from "../../../../../types/nt/NTGroupInfo.ts";
import PoseRenderer from "./PoseRenderer.tsx";
import parseNetworkValueToNumber from "../../../../../utils/parseNetworkValueToNumber.ts";
import useNTValue from "../../../../../hooks/networkTable/useNTValue.ts";

export interface NetworkPoseRendererProps {
    poseGroup: NTGroupInfo;
}

export default function NetworkPoseRenderer(props: NetworkPoseRendererProps) {
    const {poseGroup} = props;
    const name = useNTValue(poseGroup.path + "/name");
    const color = useNTValue(poseGroup.path + "/color");
    const _x = useNTValue(poseGroup.path + "/x");
    const _y = useNTValue(poseGroup.path + "/y");
    const _angle = useNTValue(poseGroup.path + "/rotation");
    const _length = useNTValue(poseGroup.path + "/length");
    const _width = useNTValue(poseGroup.path + "/width");

    // Parse network values to numbers
    const x = parseNetworkValueToNumber(_x);
    const y = parseNetworkValueToNumber(_y);
    const angle = parseNetworkValueToNumber(_angle);
    const length = parseNetworkValueToNumber(_length);
    const width = parseNetworkValueToNumber(_width);

    return (
        <>
            <PoseRenderer
                label={name?.toString() ?? poseGroup.name}
                strokeColor={color?.toString()}
                x={x ?? 0}
                y={y ?? 0}
                angle={angle}
                length={length}
                width={width}
                opacity={0.1}
                disableLerp
            />
            <PoseRenderer
                label={name?.toString() ?? poseGroup.name}
                strokeColor={color?.toString()}
                x={x ?? 0}
                y={y ?? 0}
                angle={angle}
                length={length}
                width={width}
            />
        </>
    )
}