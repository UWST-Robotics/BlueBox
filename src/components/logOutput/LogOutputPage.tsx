import useCurrentTab from "../../hooks/navigation/currentTab.ts";
import {Box, Paper, Typography} from "@mui/material";
import useLog from "../../hooks/log/useLog.ts";
import React from "react";

export default function LogOutputPage() {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isPinnedToBottom, setIsPinnedToBottom] = React.useState(true);
    const [currentTab] = useCurrentTab();
    const logEntries = useLog();

    React.useEffect(() => {
        if (isPinnedToBottom && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [logEntries, isPinnedToBottom]);

    if (currentTab !== "log")
        return null;
    return (
        <Box
            sx={{
                padding: 2,
                overflowY: "auto"
            }}

            ref={scrollRef}
            onScroll={(event) => {
                const element = event.target as HTMLDivElement;
                setIsPinnedToBottom(
                    element.scrollHeight - element.scrollTop === element.clientHeight
                );
            }}
        >
            <Paper
                sx={{
                    padding: 2
                }}
            >
                {logEntries?.map((logEntry, index) => (
                    <Typography
                        key={index}
                        variant="body1"
                    >
                        {logEntry.message}
                    </Typography>
                ))}
            </Paper>
        </Box>
    );
}