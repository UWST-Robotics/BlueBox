import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SettingsEthernet} from "@mui/icons-material";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";
import useSocket from "../../../hooks/socket/useSocket.ts";
import React from "react";

export interface SerialOptionProps {
    portPath: string;
}

export default function SerialIndicatorOption(props: SerialOptionProps) {
    const {portPath} = props;

    const path = useNTValue(portPath + "/path");
    const isActive = useNTValue(portPath + "/isActive");
    const manufacturer = useNTValue(portPath + "/manufacturer");
    const locationID = useNTValue(portPath + "/locationID");

    const socket = useSocket();
    const selectPort = () => socket.emit("setSerialPort", path);

    return (
        <ListItem disablePadding>
            <ListItemButton
                dense
                selected={Boolean(isActive)}
                onClick={selectPort}
            >
                <ListItemIcon sx={{minWidth: 40}}>
                    <SettingsEthernet
                        color={isActive ? "inherit" : "disabled"}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={path}
                    secondary={`${manufacturer ?? "N/A"} · ${locationID ?? "N/A"}`}
                />
            </ListItemButton>
        </ListItem>
    )
}