import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import { createContext, useState, useMemo } from "react";
import { Route, Routes } from "react-router-dom";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import ContentView from "./components/ContentView/ContentView";
import ProfileView from "./components/ContentView/Profile/ProfileView";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationBar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<ContentView />} />
            <Route path="/profile" element={<ProfileView />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { App, ColorModeContext };
