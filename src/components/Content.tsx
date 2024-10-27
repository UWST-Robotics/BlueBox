import LeftSidebar from "./leftSidebar/LeftSidebar.tsx";
import {Box, Paper} from "@mui/material";
import Navbar from "./navbar/navbar.tsx";
import HardwareStatusPage from "./hardwareStatus/HardwareStatusPage.tsx";
import LogOutputPage from "./logOutput/LogOutputPage.tsx";

export default function Content() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '100vh',
                width: '100vw',
            }}
        >
            <LeftSidebar/>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                }}
            >
                <Navbar/>
                <HardwareStatusPage/>
                <LogOutputPage/>
            </Paper>
        </Box>
    )
}