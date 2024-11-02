import useSelectedPathStats from "../../../hooks/valueOverTime/useSelectedPathStats.ts";
import {Box, Typography} from "@mui/material";
import React from "react";

export default function SelectedValueStats() {
    const [min, max, average] = useSelectedPathStats();

    return (
        <Box>
            <Typography>
                Max: {max}
            </Typography>
            <Typography>
                Min: {min}
            </Typography>
            <Typography>
                Average: {average}
            </Typography>
        </Box>
    )
}