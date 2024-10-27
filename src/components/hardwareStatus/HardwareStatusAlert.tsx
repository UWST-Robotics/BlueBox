import {Alert} from "@mui/material";
import NetworkTableValue from "../../types/NetworkTableValue.ts";

export interface HardwareStatusAlertProps {
    isActive: NetworkTableValue;
    text: string;
}

export default function HardwareStatusAlert(props: HardwareStatusAlertProps) {
    const {isActive, text} = props;

    if (!isActive)
        return null;
    return (
        <Alert severity="warning">
            {text}
        </Alert>
    );
}