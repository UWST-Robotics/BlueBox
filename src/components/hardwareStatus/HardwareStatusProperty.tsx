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

    const numericValue = Number(value);

    if (value === undefined ||
        value === null ||
        isNaN(numericValue))
        return null;

    return (
        <ListItem disablePadding>
            {icon}
            <ListItemText
                primary={name}
                secondary={`${props.prefix || ""}${numericValue.toFixed(1)}${props.suffix || ""}`}
                sx={{paddingLeft: 2}}
            />
        </ListItem>
    );
}