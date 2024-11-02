import Content from "./Content.tsx";
import {ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {Provider as StateProvider} from "jotai";
import primaryStore from "../hooks/primaryStore.ts";
import useSocketConnection from "../hooks/socket/useConnectSocket.ts";
import React from "react";

// MUI theme
const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
    typography: {
        h1: {fontWeight: "bold"},
        h2: {fontWeight: "bold"},
        h3: {fontWeight: "bold"},
        h4: {fontWeight: "bold"},
        h5: {fontWeight: "bold"},
        h6: {fontWeight: "bold"}
    }
});

// App Provider Stack
function App() {
    useSocketConnection();

    return (
        <StateProvider store={primaryStore}>
            <ThemeProvider theme={darkTheme}>
                <Content/>
            </ThemeProvider>
        </StateProvider>
    )
}

export default App
