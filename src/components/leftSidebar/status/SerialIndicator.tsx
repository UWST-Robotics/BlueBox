import {
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography
} from "@mui/material";
import React from "react";
import useSerialPorts from "../../../hooks/serialPorts/useSerialPorts.ts";
import useSocket from "../../../hooks/socket/useSocket.ts";
import {SettingsEthernet, SettingsInputHdmi} from "@mui/icons-material";
import SerialPortInfo from "../../../types/SerialPortInfo.ts";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";

export default function SerialIndicator() {
    const ports = useSerialPorts();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const socket = useSocket();
    const socketStatus = useSocketStatus();

    const selectPort = (port: SerialPortInfo) => {
        socket.emit("setSerialPort", port.path);
    }

    return (
        <>
            <IconButton
                disabled={socketStatus !== "connected"}
                onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    socket.emit("getSerialPorts");
                }}
            >
                <SettingsInputHdmi/>
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorPosition={{top: 0, left: 0}}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <List>
                    {ports.map((port) => (
                        <ListItem key={port.path} disablePadding>
                            <ListItemButton
                                dense
                                selected={port.isActive}
                                onClick={() => selectPort(port)}
                            >
                                <ListItemIcon sx={{minWidth: 40}}>
                                    <SettingsEthernet
                                        color={port.isActive ? "inherit" : "disabled"}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={port.path}
                                    secondary={`${port.manufacturer ?? "N/A"} · ${port.locationID ?? "N/A"}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {ports.length === 0 && (
                        <Typography
                            sx={{margin: 1, color: "text.disabled"}}
                        >
                            No serial ports found
                        </Typography>
                    )}
                </List>
            </Popover>
        </>

    )
}