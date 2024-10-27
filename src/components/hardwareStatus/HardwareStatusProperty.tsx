import React from "react";
import {ListItem, ListItemText} from "@mui/material";
import NetworkTableValue from "../../types/NetworkTableValue.ts";

export interface HardwareStatusPropertyProps {
    icon: React.ReactNode;
    name: string;
    value: NetworkTableValue;
    prefix?: string;
    suffix?: string;
}

export default function HardwareStatusProperty(props: HardwareStatusPropertyProps) {
    const {icon, name, value} = props;

    if (value === undefined || value === null)
        return null;

    return (
        <ListItem disablePadding>
            {icon}
            <ListItemText
                primary={name}
                secondary={`${props.prefix || ""}${String(value)}${props.suffix || ""}`}
                sx={{paddingLeft: 2}}
            />
        </ListItem>
    );
}