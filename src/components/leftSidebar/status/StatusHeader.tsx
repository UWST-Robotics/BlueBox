import StatusBanner from "./StatusBanner.tsx";
import {Box} from "@mui/material";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";
import {ROBOT_GROUP, SERVER_GROUP} from "../../../types/GroupNames.ts";
import BatteryIndicator from "./BatteryIndicator.tsx";
import SerialIndicator from "./SerialIndicator.tsx";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";

export default function StatusHeader() {
    const socketStatus = useSocketStatus();
    const _serialStatus = useNTValue(SERVER_GROUP + "/serialStatus");
    const _robotStatus = useNTValue(SERVER_GROUP + "/heartbeat");
    const batteryVoltage = useNTValue(ROBOT_GROUP + "/batteryVoltage");
    const batteryCurrent = useNTValue(ROBOT_GROUP + "/batteryCurrent");
    const batteryTemperature = useNTValue(ROBOT_GROUP + "/batteryTemperature");

    const serialStatus = _serialStatus ?? "Unknown";
    const robotStatus = _robotStatus ?? "Unknown";

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