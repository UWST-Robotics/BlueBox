import {Paper, Tab, Tabs} from "@mui/material";
import useCurrentTab from "../../hooks/navigation/currentTab.ts";
import {Map, Notes, SettingsEthernet} from "@mui/icons-material";

export default function Navbar() {
    const [tab, setTab] = useCurrentTab();

    return (
        <Paper
            elevation={2}
        >
            <Tabs
                variant={"standard"}
                value={tab}
                onChange={(_, value) => setTab(value)}
            >
                <Tab
                    value={"log"}
                    label={"Log Output"}
                    icon={<Notes/>}
                    iconPosition={"start"}
                />
                <Tab
                    value={"hardware"}
                    label={"Hardware Status"}
                    icon={<SettingsEthernet/>}
                    iconPosition={"start"}
                />
                <Tab
                    value={"field"}
                    label={"Field Map"}
                    icon={<Map/>}
                    iconPosition={"start"}
                />
            </Tabs>
        </Paper>
    )
}