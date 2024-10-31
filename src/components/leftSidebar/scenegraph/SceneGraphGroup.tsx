import {Collapse, Divider, IconButton, List, ListItemButton, ListItemText} from "@mui/material";
import NTGroupInfo from "../../../types/nt/NTGroupInfo.ts";
import SceneGraphItem from "./SceneGraphItem.tsx";
import React from "react";
import AnimatedCaretIcon from "../../common/AnimatedCaretIcon.tsx";
import ColoredListItem from "../../common/ColoredListItem.tsx";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";

export interface SceneGraphGroupProps {
    groupInfo: NTGroupInfo;
    depth?: number;
    isRoot?: boolean;
}

export default function SceneGraphGroup(props: SceneGraphGroupProps) {
    const value = useNTValue(props.groupInfo.path);
    const [isCollapsed, setIsCollapsed] = React.useState(!props.isRoot);

    const depth = props.depth || 0;

    return (
        <>
            {!props.isRoot && (
                <ColoredListItem
                    disablePadding
                    intent="primary"
                    secondaryAction={(
                        <IconButton
                            size={"small"}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                            <AnimatedCaretIcon up={isCollapsed}/>
                        </IconButton>
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
                            primary={props.groupInfo.name}
                        />
                    </ListItemButton>
                </ColoredListItem>
            )}
            <Divider/>

            <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
                <List disablePadding>
                    {props.groupInfo.children.map((child) => (
                        <SceneGraphGroup
                            key={child.path}
                            groupInfo={child}
                            depth={depth + 1}
                        />
                    ))}

                    <SceneGraphItem
                        depth={depth + 1}
                        name={props.groupInfo.name}
                        path={props.groupInfo.path}
                        value={value}
                    />
                </List>
                <Divider/>
            </Collapse>
        </>
    )
}