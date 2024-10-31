import useCurrentTab from "../../../hooks/navigation/currentTab.ts";
import {Box} from "@mui/material";
import FieldCanvas from "./FieldCanvas.tsx";

export default function FieldCanvasPage() {
    const [currentTab] = useCurrentTab();

    if (currentTab !== "field")
        return null;
    return (
        <Box
            sx={{
                display: "flex",
                padding: 2,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <FieldCanvas/>
        </Box>
    );
}