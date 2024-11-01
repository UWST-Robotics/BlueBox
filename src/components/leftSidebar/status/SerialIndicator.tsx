import {IconButton, List, Popover, Typography} from "@mui/material";
import React from "react";
import {SettingsInputHdmi} from "@mui/icons-material";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";
import useNTGroupInfo from "../../../hooks/networkTable/useNTGroupInfo.ts";
import {SERVER_GROUP} from "../../../types/GroupNames.ts";
import SerialIndicatorOption from "./SerialIndicatorOption.tsx";

export default function SerialIndicator() {
    const serialPorts = useNTGroupInfo(SERVER_GROUP + "/serialPorts");
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const socketStatus = useSocketStatus();

    return (
        <>
            <IconButton
                disabled={socketStatus !== "connected"}
                onClick={(e) => setAnchorEl(e.currentTarget)}
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
                    {serialPorts?.children.map((port) => (
                        <SerialIndicatorOption
                            key={port.path}
                            portPath={port.path}
                        />
                    ))}

                    {serialPorts?.children.length == 0 && (
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