import StatusBanner from "./StatusBanner.tsx";
import {Box} from "@mui/material";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";
import useNetworkTableGroup from "../../../hooks/networkTable/useNetworkTableGroup.ts";
import {ROBOT_GROUP} from "../../../types/GroupNames.ts";
import BatteryIndicator from "./BatteryIndicator.tsx";
import SerialIndicator from "./SerialIndicator.tsx";

export default function StatusHeader() {
    const socketStatus = useSocketStatus();
    const robotGroup = useNetworkTableGroup(ROBOT_GROUP);

    const robotStatus = robotGroup?.records["status"] ?? "Unknown";
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
                type={"BlueBox"}
                text={socketStatus === "connected" ? "Connected" : "Disconnected"}
                color={socketStatus === "connected" ? "green" : "red"}
            />

            {socketStatus === "connected" && (
                <StatusBanner
                    type={"Robot"}
                    text={robotStatus === "online" ? "Online" : "Offline"}
                    color={robotStatus === "online" ? "green" : "red"}
                />
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