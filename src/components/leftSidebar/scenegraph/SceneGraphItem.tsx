import {ListItemButton, ListItemText} from "@mui/material";
import NetworkTableRecord from "../../../types/NetworkTableRecord.ts";
import ColoredListItem from "../../common/ColoredListItem.tsx";

export interface SceneGraphItemProps {
    networkRecord: NetworkTableRecord;
    depth?: number;
}

export default function SceneGraphItem(props: SceneGraphItemProps) {
    const {networkRecord} = props;

    const recordName = networkRecord.key.split("/").pop();
    const recordValue = String(networkRecord.value);
    const depth = props.depth || 0;

    return (
        <ColoredListItem
            intent="success"
            disablePadding

            secondaryAction={(
                <ListItemText
                    secondary={recordValue}
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
                    primary={recordName}
                />
            </ListItemButton>
        </ColoredListItem>
    )
}