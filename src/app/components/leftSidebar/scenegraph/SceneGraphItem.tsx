import {Box, ListItemButton, Typography} from "@mui/material";
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
                <Box
                    sx={{}}
                >
                    <Typography>
                        {name}
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: 12,
                            marginRight: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 100
                        }}
                    >
                        {valueText}
                    </Typography>
                </Box>
            </ListItemButton>
        </ColoredListItem>
    )
}