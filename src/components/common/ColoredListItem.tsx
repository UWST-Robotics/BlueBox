import {ListItem} from "@mui/material";
import {ListItemProps} from "@mui/material/ListItem/ListItem";

export interface ColoredListItemProps extends ListItemProps {
    intent?: "success" | "primary";
}

const SUCCESS_BG = "#193d1d";
const SUCCESS_FG = "success.light";
const PRIMARY_BG = "#19333d";
const PRIMARY_FG = "primary.main";

export default function ColoredListItem(props: ColoredListItemProps) {

    const listItemProps = {...props};
    delete listItemProps.intent;

    const foreground = props.intent === "success" ? SUCCESS_FG : PRIMARY_FG;
    const background = props.intent === "success" ? SUCCESS_BG : PRIMARY_BG;

    return (
        <ListItem
            {...listItemProps}
            sx={{
                // Selected
                "&& .Mui-selected, && .Mui-selected:hover": {
                    bgcolor: background
                },
                // Hover
                "& .MuiListItemButton-root:hover": {
                    bgcolor: background
                },
                // Text
                color: foreground,
                // Left Icon
                "& .MuiListItemIcon-root": {
                    color: foreground
                },
                // Second Icon
                "& .MuiIconButton-root": {
                    color: foreground
                },
            }}
        >
            {props.children}
        </ListItem>
    );
}