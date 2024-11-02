import React from "react";

export default function useCurrentTime(updateIntervalMs: number) {
    const [, setCurrentTime] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, updateIntervalMs);

        return () => clearInterval(interval);
    }, [updateIntervalMs]);

    return Date.now();
}