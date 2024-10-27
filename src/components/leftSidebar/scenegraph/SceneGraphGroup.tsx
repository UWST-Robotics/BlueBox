import {Collapse, Divider, List, ListItemButton, ListItemText} from "@mui/material";
import NetworkTableGroup from "../../../types/NetworkTableGroup.ts";
import SceneGraphItem from "./SceneGraphItem.tsx";
import React from "react";
import AnimatedCaretIcon from "../../common/AnimatedCaretIcon.tsx";
import ColoredListItem from "../../common/ColoredListItem.tsx";

export interface SceneGraphGroupProps {
    networkGroup: NetworkTableGroup;
    depth?: number;
    isRoot?: boolean;
}

export default function SceneGraphGroup(props: SceneGraphGroupProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(!props.isRoot);

    const recordKeys = Object.keys(props.networkGroup.records);
    const childrenKeys = Object.keys(props.networkGroup.children);
    const depth = props.depth || 0;

    return (
        <>
            {!props.isRoot && (
                <ColoredListItem
                    disablePadding
                    intent="primary"
                    secondaryAction={(
                        <AnimatedCaretIcon up={isCollapsed}/>
                    )}
                >
                    <ListItemButton
                        disableGutters
                        dense
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        sx={{
                            borderRadius: 2,
                            paddingLeft: depth * 2
                        }}
                    >
                        <ListItemText
                            primary={props.networkGroup.name}
                        />
                    </ListItemButton>
                </ColoredListItem>
            )}
            <Divider/>

            <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
                <List disablePadding>
                    {childrenKeys.map((childKey) => (
                        <SceneGraphGroup
                            key={childKey}
                            networkGroup={props.networkGroup.children[childKey]}
                            depth={depth + 1}
                        />
                    ))}
                    {recordKeys.map((recordKey) => (
                        <SceneGraphItem
                            key={recordKey}
                            depth={depth + 1}
                            name={recordKey}
                            value={props.networkGroup.records[recordKey]}
                        />
                    ))}
                </List>
                <Divider/>
            </Collapse>
        </>
    )
}