import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useState, useMemo } from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ContentView from "./components/ContentView/ContentView";

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
        <ContentView />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { App, ColorModeContext };
