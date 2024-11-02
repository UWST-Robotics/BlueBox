import {HARDWARE_INFO_GROUP} from "../../../types/GroupNames.ts";
import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import HardwareStatusCard from "./HardwareStatusCard.tsx";
import useNTGroupInfo from "../../../hooks/networkTable/useNTGroupInfo.ts";
import React from "react";

export default function HardwareStatusPage() {
    const [currentTab] = useCurrentTab();
    const hardwareGroup = useNTGroupInfo(HARDWARE_INFO_GROUP);

    if (currentTab !== "hardware")
        return null;
    if (!hardwareGroup)
        return null;
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                padding: 2,
                overflowY: "auto"
            }}
        >
            {hardwareGroup.children.map((child) => (
                <HardwareStatusCard
                    key={child.path}
                    hardwareGroup={child}
                />
            ))}
        </Box>
    );
}