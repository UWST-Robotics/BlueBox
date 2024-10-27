import StatusBanner from "./StatusBanner.tsx";
import {Box} from "@mui/material";

export default function StatusHeader() {
    return (
        <Box sx={{padding: 2}}>
            <StatusBanner
                type={"BlueBox"}
                text={"Connected"}
                color={"green"}
            />
            <StatusBanner
                type={"Robot"}
                text={"Disconnected"}
                color={"red"}
            />
        </Box>
    )
}