import {Tab, Tabs} from "@mui/material";
import useCurrentTab from "../../hooks/navigation/currentTab.ts";

export default function Navbar() {
    const [tab, setTab] = useCurrentTab();

    return (
        <Tabs
            variant={"fullWidth"}
            value={tab}
            onChange={(_, value) => setTab(value)}
        >
            <Tab value={"log"} label={"Log Output"}/>
            <Tab value={"hardware"} label={"Hardware Status"}/>
            <Tab value={"field"} label={"Field Map"}/>
        </Tabs>
    )
}