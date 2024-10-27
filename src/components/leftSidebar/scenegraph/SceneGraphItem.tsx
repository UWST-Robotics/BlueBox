import {ListItemButton, ListItemText} from "@mui/material";
import ColoredListItem from "../../common/ColoredListItem.tsx";
import NetworkTableValue from "../../../types/NetworkTableValue.ts";

export interface SceneGraphItemProps {
    name: string;
    value: NetworkTableValue;
    depth?: number;
}

export default function SceneGraphItem(props: SceneGraphItemProps) {
    const {name, value} = props;


    const valueText = String(value);
    const depth = props.depth || 0;

    return (
        <ColoredListItem
            intent="success"
            disablePadding

            secondaryAction={(
                <ListItemText
                    secondary={valueText}
                />
            )}
        >
            <ListItemButton
                disableGutters
                dense
                sx={{
                    borderRadius: 2,
                    paddingLeft: depth * 2
                }}
            >
                <ListItemText
                    primary={name}
                />
            </ListItemButton>
        </ColoredListItem>
    )
}