import {Box, IconButton, Popover, Typography} from "@mui/material";
import React from "react";
import {
    Battery20,
    Battery30,
    Battery50,
    Battery60,
    Battery80,
    Battery90,
    BatteryFull,
    BatteryUnknown
} from "@mui/icons-material";

export interface BatteryIndicatorProps {
    voltage: number;
    current: number;
    temperature: number;
}

const MAX_VOLTAGE = 12000
const MIN_VOLTAGE = 11000;

export default function BatteryIndicator(props: BatteryIndicatorProps) {
    const {voltage, current, temperature} = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const batteryPercent = Math.max(0, Math.min(100, (voltage - MIN_VOLTAGE) / (MAX_VOLTAGE - MIN_VOLTAGE) * 100));

    return (
        <>
            <IconButton
                onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
                onMouseLeave={() => setAnchorEl(null)}
            >
                {isNaN(batteryPercent) && <BatteryUnknown/>}
                {batteryPercent > 90 && <BatteryFull/>}
                {batteryPercent > 80 && batteryPercent <= 90 && <Battery90/>}
                {batteryPercent > 60 && batteryPercent <= 80 && <Battery80/>}
                {batteryPercent > 50 && batteryPercent <= 60 && <Battery60/>}
                {batteryPercent > 30 && batteryPercent <= 50 && <Battery50/>}
                {batteryPercent > 20 && batteryPercent <= 30 && <Battery30/>}
                {batteryPercent <= 20 && <Battery20/>}
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
                sx={{
                    pointerEvents: 'none'
                }}
                disableRestoreFocus
            >
                <Box sx={{padding: 2}}>
                    <Typography
                        variant="subtitle1"
                        sx={{fontWeight: "bold"}}
                    >
                        Battery Stats
                    </Typography>

                    {!isNaN(voltage) && (
                        <Typography variant={"body2"}>
                            {(voltage / 1000).toFixed(1)} V (~{batteryPercent.toFixed(1)}%)
                        </Typography>
                    )}
                    {!isNaN(current) && (
                        <Typography variant={"body2"}>
                            {(current / 1000).toFixed(1)} A
                        </Typography>
                    )}
                    {!isNaN(temperature) && (
                        <Typography variant={"body2"}>
                            {temperature} °C
                        </Typography>
                    )}

                    {isNaN(voltage) && isNaN(current) && isNaN(temperature) && (
                        <Typography
                            variant={"body2"}
                            sx={{color: "#d64a4a"}}
                        >
                            No Data
                        </Typography>
                    )}
                </Box>
            </Popover>
        </>

    )
}