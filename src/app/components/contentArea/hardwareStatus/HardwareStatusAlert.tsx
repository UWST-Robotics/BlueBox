import {Alert, AlertColor} from "@mui/material";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";
import React from "react";

export interface HardwareStatusAlertProps {
    path: string;
    text: string;
    severity?: AlertColor;
    isInverted?: boolean;
}

export default function HardwareStatusAlert(props: HardwareStatusAlertProps) {
    const value = useNTValue(props.path);
    const {isInverted, text} = props;

    const isActive = isInverted ? Boolean(!value) : Boolean(value);
    if (!isActive)
        return null;
    return (
        <Alert severity={props.severity ?? "warning"}>
            {text}
        </Alert>
    );
}