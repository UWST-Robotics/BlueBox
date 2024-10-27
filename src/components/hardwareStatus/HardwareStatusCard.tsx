import NetworkTableGroup from "../../types/NetworkTableGroup.ts";
import {Card, CardContent, List, Typography} from "@mui/material";
import HardwareStatusProperty from "./HardwareStatusProperty.tsx";
import {Bolt, Refresh, Speed, Thermostat} from "@mui/icons-material";
import HardwareStatusAlert from "./HardwareStatusAlert.tsx";

export interface HardwareStatusCardProps {
    hardwareGroup: NetworkTableGroup;
}

export default function HardwareStatusCard(props: HardwareStatusCardProps) {
    const {hardwareGroup} = props;

    const name = hardwareGroup.records["name"];
    const type = hardwareGroup.records["type"];

    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography
                    variant="h5"
                    component="div"
                >
                    {name || "Unnamed Hardware"}
                </Typography>
                <Typography
                    gutterBottom
                    sx={{color: 'text.secondary', fontSize: 14}}
                >
                    {hardwareGroup.name} · {type || "Unknown"}
                </Typography>

                <List disablePadding>
                    <HardwareStatusProperty
                        icon={<Thermostat/>}
                        name={"Temperature"}
                        value={hardwareGroup.records["temperature"]}
                        suffix="°C"
                    />
                    <HardwareStatusProperty
                        icon={<Speed/>}
                        name={"Velocity"}
                        value={hardwareGroup.records["velocity"]}
                        suffix="RPM"
                    />
                    <HardwareStatusProperty
                        icon={<Refresh/>}
                        name={"Position"}
                        value={hardwareGroup.records["position"]}
                        suffix=" ticks"
                    />
                    <HardwareStatusProperty
                        icon={<Bolt/>}
                        name={"Current"}
                        value={hardwareGroup.records["current"]}
                        suffix="mA"
                    />
                    <HardwareStatusProperty
                        icon={<Bolt/>}
                        name={"Voltage"}
                        value={hardwareGroup.records["voltage"]}
                        suffix="mV"
                    />
                </List>

                <HardwareStatusAlert
                    isActive={hardwareGroup.records["isOverTemp"]}
                    text="Over temperature limit"
                />
                <HardwareStatusAlert
                    isActive={hardwareGroup.records["isOverCurrent"]}
                    text="Over current limit"
                />
                <HardwareStatusAlert
                    isActive={hardwareGroup.records["isDriverFault"]}
                    text="Motor h-bridge driver fault"
                />
                <HardwareStatusAlert
                    isActive={hardwareGroup.records["isDriverOverCurrent"]}
                    text="Motor h-bridge over current"
                />
            </CardContent>
        </Card>
    )
}