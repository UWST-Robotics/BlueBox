import React from "react";

export default function useWindowSize() {
    const [canvasWidth, setcanvasWidth] = React.useState<number>(window.innerWidth);
    const [windowHeight, setWindowHeight] = React.useState<number>(window.innerHeight);

    const onResize = React.useCallback(() => {
        setcanvasWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);

    return [canvasWidth, windowHeight] as const;
}