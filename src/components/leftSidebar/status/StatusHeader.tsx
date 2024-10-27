import StatusBanner from "./StatusBanner.tsx";
import {Box} from "@mui/material";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";

export default function StatusHeader() {
    const socketStatus = useSocketStatus();

    return (
        <Box sx={{padding: 2}}>
            <StatusBanner
                type={"Socket"}
                text={socketStatus === "connected" ? "Connected" : "Disconnected"}
                color={socketStatus === "connected" ? "green" : "red"}
            />
            <StatusBanner
                type={"Robot"}
                text={"Unknown"}
                color={"yellow"}
            />
        </Box>
    )
}