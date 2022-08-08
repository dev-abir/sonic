import { useState, useEffect, createContext, useMemo } from "react";
import "./App.css";
import Login from "./Pages/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useLocation, Route, Routes, HashRouter } from "react-router-dom";
import "./styles.css";
import Playground from "./Pages/Playground";

function Content() {
    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (
        <div
            className={`${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn");
                    setDisplayLocation(location);
                }
            }}
        >
            <Routes location={displayLocation}>
                <Route path="/" element={<Login />} />
                <Route path="/playground" element={<Playground />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </div>
    );
}

export const ColorModeContext = createContext({ setColorMode: (mode) => {} });

function App() {
    const [mode, setMode] = useState("dark");

    // const colorMode = useMemo(
    //     () => ({
    //         toggleColorMode: () => {
    //             setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    //         },
    //     }),
    //     []
    // );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    // BrowserRouter doesn't work in electron
    // (https://stackoverflow.com/a/50404777)
    return (
        <ColorModeContext.Provider value={{setColorMode: (mode) => setMode(mode)}}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <Content />
                </HashRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
