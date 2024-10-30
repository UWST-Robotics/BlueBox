import {HARDWARE_INFO_GROUP} from "../../types/GroupNames.ts";
import useCurrentTab from "../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import HardwareStatusCard from "./HardwareStatusCard.tsx";
import useNetworkTableGroup from "../../hooks/networkTable/useNetworkTableGroup.ts";

export default function HardwareStatusPage() {
    const [currentTab] = useCurrentTab();
    const hardwareGroup = useNetworkTableGroup(HARDWARE_INFO_GROUP);

    const hardwareChildKeys = Object.keys(hardwareGroup?.children ?? {});

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
            {hardwareChildKeys.map((key) => (
                <HardwareStatusCard
                    key={key}
                    hardwareGroup={hardwareGroup.children[key]}
                />
            ))}
        </Box>
    );
}