import useCurrentTab from "../../hooks/navigation/currentTab.ts";
import useNetworkTableGroup from "../../hooks/networkTable/useNetworkTableGroup.ts";
import {LOG_GROUP} from "../../types/GroupNames.ts";
import {Box, Paper, Typography} from "@mui/material";
import React from "react";

export default function LogOutputPage() {
    const [currentTab] = useCurrentTab();
    const logGroup = useNetworkTableGroup(LOG_GROUP);

    const logText = React.useMemo(() => {
        if (!logGroup)
            return undefined;
        const logRecordKeys = Object.keys(logGroup?.records ?? {});
        return logRecordKeys.map((key) => logGroup?.records[key]);
    }, [logGroup]);

    if (currentTab !== "log")
        return null;
    if (!logGroup)
        return null;
    return (
        <Box
            sx={{
                padding: 2
            }}
        >
            <Paper
                sx={{
                    padding: 2,
                    overflow: "auto",
                    height: "100%"
                }}
            >
                {logText?.map((text) => (
                    <Typography>
                        {text}
                    </Typography>
                ))}
            </Paper>
        </Box>
    );
}