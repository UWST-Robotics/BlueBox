import {Collapse, Divider, List, ListItemButton, ListItemText} from "@mui/material";
import NetworkTableGroup from "../../../types/NetworkTableGroup.ts";
import SceneGraphItem from "./SceneGraphItem.tsx";
import React from "react";
import AnimatedCaretIcon from "../../common/AnimatedCaretIcon.tsx";
import ColoredListItem from "../../common/ColoredListItem.tsx";

export interface SceneGraphGroupProps {
    networkGroup: NetworkTableGroup;
    depth?: number;
    hideRoot?: boolean;
}

export default function SceneGraphGroup(props: SceneGraphGroupProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const depth = props.depth || 0;

    return (
        <>
            {!props.hideRoot && (
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
                    {props.networkGroup.children.map((child) => (
                        <SceneGraphGroup
                            key={child.path}
                            networkGroup={child}
                            depth={depth + 1}
                        />
                    ))}
                    {props.networkGroup.records.map((record) => (
                        <SceneGraphItem
                            key={record.key}
                            networkRecord={record}
                            depth={depth + 1}
                        />
                    ))}
                </List>
                <Divider/>
            </Collapse>
        </>
    )
}