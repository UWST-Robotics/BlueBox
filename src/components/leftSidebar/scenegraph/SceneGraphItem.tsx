import {ListItemButton, ListItemText} from "@mui/material";
import ColoredListItem from "../../common/ColoredListItem.tsx";
import NTValue from "../../../types/nt/NTValue.ts";
import networkValueToString from "../../../utils/networkValueToString.ts";
import useSelectPath from "../../../hooks/selectedPath/actions/useSelectPath.ts";

export interface SceneGraphItemProps {
    name: string;
    path: string;
    value: NTValue;
    depth?: number;
}

export default function SceneGraphItem(props: SceneGraphItemProps) {
    const enableValueOverTime = useSelectPath();

    const {name, path, value} = props;

    const valueText = networkValueToString(value);
    const depth = props.depth || 0;

    if (value === undefined || value === null)
        return null;
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
                onClick={() => enableValueOverTime(path)}
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