import useCurrentTab from "../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import useLog from "../../hooks/log/useLog.ts";
import React from "react";
import {Markup} from "interweave";
import ansiToHtml from "../../utils/ansiToHtml.ts";

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

    console.log(logEntries);

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
            <Box
                sx={{
                    padding: 2,
                    backgroundColor: "black",
                    fontFamily: "'Lucida Console', Monaco, monospace",
                }}
            >
                {logEntries?.map((logEntry, index) => (
                    <Markup
                        key={index}
                        content={ansiToHtml(logEntry.message)}
                        tagName="div"
                    />
                ))}
            </Box>
        </Box>
    );
}