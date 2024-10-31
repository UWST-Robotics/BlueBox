import React from "react";
import {ListItem, ListItemText} from "@mui/material";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";

export interface HardwareStatusPropertyProps {
    icon: React.ReactNode;
    name: string;
    path: string;
    prefix?: string;
    suffix?: string;
}

export default function HardwareStatusProperty(props: HardwareStatusPropertyProps) {
    const value = useNTValue(props.path);
    const {icon, name} = props;

    if (typeof value !== "number")
        return null;
    return (
        <ListItem disablePadding>
            {icon}
            <ListItemText
                primary={name}
                secondary={`${props.prefix || ""}${value.toFixed(1)}${props.suffix || ""}`}
                sx={{paddingLeft: 2}}
            />
        </ListItem>
    );
}