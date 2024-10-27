import StatusBanner from "./StatusBanner.tsx";
import {Box} from "@mui/material";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";
import useNetworkTableGroup from "../../../hooks/networkTable/useNetworkTableGroup.ts";
import {ROBOT_GROUP} from "../../../types/GroupNames.ts";

export default function StatusHeader() {
    const socketStatus = useSocketStatus();
    const robotGroup = useNetworkTableGroup(ROBOT_GROUP);

    const robotStatus = robotGroup?.records["status"] ?? "Unknown";

    return (
        <Box sx={{padding: 2}}>
            <StatusBanner
                type={"Socket"}
                text={socketStatus === "connected" ? "Connected" : "Disconnected"}
                color={socketStatus === "connected" ? "green" : "red"}
            />
            {socketStatus === "connected" ? (
                <StatusBanner
                    type={"Robot"}
                    text={robotStatus === "online" ? "Online" : "Offline"}
                    color={robotStatus === "online" ? "green" : "red"}
                />
            ) : (
                <StatusBanner
                    type={"Robot"}
                    text={"N/A"}
                    color={"yellow"}
                />
            )}

        </Box>
    )
}