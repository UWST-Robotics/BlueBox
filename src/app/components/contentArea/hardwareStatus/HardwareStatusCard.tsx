import NTGroupInfo from "../../../types/nt/NTGroupInfo.ts";
import {Card, CardContent, List, Typography} from "@mui/material";
import HardwareStatusProperty from "./HardwareStatusProperty.tsx";
import {Bolt, Expand, Explore, Palette, Refresh, Rotate90DegreesCw, Speed, Thermostat} from "@mui/icons-material";
import HardwareStatusAlert from "./HardwareStatusAlert.tsx";
import useNTValue from "../../../hooks/networkTable/useNTValue.ts";
import React from "react";

export interface HardwareStatusCardProps {
    hardwareGroup: NTGroupInfo;
}

export default function HardwareStatusCard(props: HardwareStatusCardProps) {
    const {hardwareGroup} = props;
    const name = useNTValue(hardwareGroup.path + "/name");
    const type = useNTValue(hardwareGroup.path + "/type");

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
                        path={hardwareGroup.path + "/temperature"}
                        suffix="°C"
                    />
                    <HardwareStatusProperty
                        icon={<Speed/>}
                        name={"Velocity"}
                        path={hardwareGroup.path + "/velocity"}
                        suffix=" RPM"
                    />
                    <HardwareStatusProperty
                        icon={<Refresh/>}
                        name={"Position"}
                        path={hardwareGroup.path + "/position"}
                        suffix=" ticks"
                    />
                    <HardwareStatusProperty
                        icon={<Bolt/>}
                        name={"Current"}
                        path={hardwareGroup.path + "/current"}
                        suffix="mA"
                    />
                    <HardwareStatusProperty
                        icon={<Bolt/>}
                        name={"Voltage"}
                        path={hardwareGroup.path + "/voltage"}
                        suffix="mV"
                    />

                    <HardwareStatusProperty
                        icon={<Explore/>}
                        name={"Heading"}
                        path={hardwareGroup.path + "/heading"}
                        suffix="°"
                    />
                    <HardwareStatusProperty
                        icon={<Rotate90DegreesCw/>}
                        name={"Pitch"}
                        path={hardwareGroup.path + "/pitch"}
                        suffix="°"
                    />
                    <HardwareStatusProperty
                        icon={<Rotate90DegreesCw/>}
                        name={"Roll"}
                        path={hardwareGroup.path + "/roll"}
                        suffix="°"
                    />
                    <HardwareStatusProperty
                        icon={<Rotate90DegreesCw/>}
                        name={"Yaw"}
                        path={hardwareGroup.path + "/yaw"}
                        suffix="°"
                    />
                    <HardwareStatusProperty
                        icon={<Speed/>}
                        name={"Acceleration"}
                        path={hardwareGroup.path + "/accel"}
                        suffix=" m/s²"
                    />

                    <HardwareStatusProperty
                        icon={<Expand/>}
                        name={"Proximity"}
                        path={hardwareGroup.path + "/proximity"}
                        suffix="%"
                    />
                    <HardwareStatusProperty
                        icon={<Palette/>}
                        name={"Hue"}
                        path={hardwareGroup.path + "/colorHue"}
                    />
                    <HardwareStatusProperty
                        icon={<Palette/>}
                        name={"Saturation"}
                        path={hardwareGroup.path + "/colorSaturation"}
                        suffix={"%"}
                    />
                    <HardwareStatusProperty
                        icon={<Palette/>}
                        name={"Brightness"}
                        path={hardwareGroup.path + "/colorBrightness"}
                        suffix={"%"}
                    />

                    <HardwareStatusProperty
                        icon={<Expand/>}
                        name={"Extended"}
                        path={hardwareGroup.path + "/isExtended"}
                    />
                </List>

                <HardwareStatusAlert
                    path={hardwareGroup.path + "/isOverTemp"}
                    text="Over temperature limit"
                />
                <HardwareStatusAlert
                    path={hardwareGroup.path + "/isOverCurrent"}
                    text="Over current limit"
                />
                <HardwareStatusAlert
                    path={hardwareGroup.path + "/isDriverFault"}
                    text="H-bridge driver fault"
                />
                <HardwareStatusAlert
                    path={hardwareGroup.path + "/isDriverOverCurrent"}
                    text="H-bridge over current"
                />
                <HardwareStatusAlert
                    path={hardwareGroup.path + "/isErrored"}
                    text="Unknown error"
                />
                <HardwareStatusAlert
                    path={hardwareGroup.path + "/isCalibrating"}
                    text="Currently calibrating..."
                    severity={"info"}
                />

                <HardwareStatusAlert
                    isInverted
                    path={hardwareGroup.path + "/isConnected"}
                    text="Device disconnected"
                />
            </CardContent>
        </Card>
    )
}