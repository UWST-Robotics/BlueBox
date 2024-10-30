import StatusBanner from "./StatusBanner.tsx";
import {Box} from "@mui/material";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";
import {ROBOT_GROUP, SERVER_GROUP} from "../../../types/GroupNames.ts";
import BatteryIndicator from "./BatteryIndicator.tsx";
import SerialIndicator from "./SerialIndicator.tsx";
import useNetworkTableGroup from "../../../hooks/networkTable/useNetworkTableGroup.ts";

export default function StatusHeader() {
    const socketStatus = useSocketStatus();
    const robotGroup = useNetworkTableGroup(ROBOT_GROUP);
    const serverGroup = useNetworkTableGroup(SERVER_GROUP);

    const serialStatus = serverGroup?.records["serialStatus"] ?? "Unknown";
    const robotStatus = serverGroup?.records["heartbeat"] ?? "Unknown";
    const batteryVoltage = robotGroup?.records["batteryVoltage"];
    const batteryCurrent = robotGroup?.records["batteryCurrent"];
    const batteryTemperature = robotGroup?.records["batteryTemperature"];

    return (
        <Box
            sx={{
                padding: 2,
                textAlign: "center",
            }}
        >
            <StatusBanner
                type={"Socket"}
                text={socketStatus === "connected" ? "Connected" : "Disconnected"}
                color={socketStatus === "connected" ? "green" : "red"}
            />

            {socketStatus === "connected" && (
                <>
                    <StatusBanner
                        type={"Serial"}
                        text={serialStatus === "open" ? "Open" : "Closed"}
                        color={serialStatus === "open" ? "green" : "red"}
                    />
                    <StatusBanner
                        type={"Robot"}
                        text={robotStatus === "online" ? "Enabled" : "Disabled"}
                        color={robotStatus === "online" ? "green" : "red"}
                    />
                </>
            )}

            {socketStatus !== "connected" && (
                <StatusBanner
                    type={"Robot"}
                    text={"N/A"}
                    color={"yellow"}
                />
            )}

            <BatteryIndicator
                voltage={Number(batteryVoltage)}
                current={Number(batteryCurrent)}
                temperature={Number(batteryTemperature)}
            />

            <SerialIndicator/>

        </Box>
    )
}