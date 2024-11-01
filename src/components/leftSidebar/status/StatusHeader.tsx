import StatusBanner from "./StatusBanner.tsx";
import {Box} from "@mui/material";
import useSocketStatus from "../../../hooks/socket/useSocketStatus.ts";
import {ROBOT_GROUP, SERVER_GROUP} from "../../../types/GroupNames.ts";
import BatteryIndicator from "./BatteryIndicator.tsx";
import SerialIndicator from "./SerialIndicator.tsx";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";

export default function StatusHeader() {
    const socketStatus = useSocketStatus();
    const serialStatus = useNTValue(SERVER_GROUP + "/isSerialConnected");
    const robotStatus = useNTValue(SERVER_GROUP + "/isRobotConnected");
    const batteryVoltage = useNTValue(ROBOT_GROUP + "/batteryVoltage");
    const batteryCurrent = useNTValue(ROBOT_GROUP + "/batteryCurrent");
    const batteryTemperature = useNTValue(ROBOT_GROUP + "/batteryTemperature");

    return (
        <Box
            sx={{
                padding: 2,
                textAlign: "center",
            }}
        >
            <StatusBanner
                type={"Socket"}
                text={socketStatus ? "Connected" : "Disconnected"}
                color={socketStatus ? "green" : "red"}
            />

            {socketStatus === "connected" && (
                <>
                    <StatusBanner
                        type={"Serial"}
                        text={serialStatus ? "Open" : "Closed"}
                        color={serialStatus ? "green" : "red"}
                    />
                    <StatusBanner
                        type={"Robot"}
                        text={robotStatus ? "Enabled" : "Disabled"}
                        color={robotStatus ? "green" : "red"}
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