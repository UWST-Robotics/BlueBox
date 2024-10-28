import {Group} from "react-konva";
import useNetworkTableGroup from "../../../hooks/networkTable/useNetworkTableGroup.ts";
import NetworkTableGroup from "../../../types/NetworkTableGroup.ts";
import React from "react";

export interface AllPosesRendererProps {
    groupName: string;
    renderChild: (group: NetworkTableGroup) => JSX.Element;
}

export default function NetworkGroupRenderer(props: AllPosesRendererProps) {
    const networkGroup = useNetworkTableGroup(props.groupName);

    const childKeys = React.useMemo(() => {
        return Object.keys(networkGroup?.children ?? {});
    }, [networkGroup]);

    if (!networkGroup)
        return;
    return childKeys.map((key) => {
        return (
            <Group key={key}>
                {props.renderChild(networkGroup.children[key])}
            </Group>
        )
    });
}