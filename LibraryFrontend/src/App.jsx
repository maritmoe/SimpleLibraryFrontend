import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import { createContext, useState, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import NavigationBar from "./components/NavigationBar/NavigationBar";
import ContentView from "./components/ContentView/ContentView";
import ProfileView from "./components/ContentView/Profile/ProfileView";
import Admin from "./components/ContentView/Admin/Admin";
import BorrowingHistory from "./components/ContentView/BorrowingHistory/BorrowingHistory";
import BookView from "./components/ContentView/BookView/BookView";
import Register from "./components/ContentView/Register/Register";
import LogIn from "./components/ContentView/LogIn/LogIn";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const AuthContext = createContext();

function App() {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    role: "",
  });

  // called when we successfully log in
  const login = (data) => {
    setAuthToken(data.token);
    setUser({
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role,
    });

    // update local storage
    localStorage.setItem("authToken", data.token);
    // redirect to home page after login
    navigate("/");
  };

  // called to log out, clear local storage and reset local state
  const logout = () => {
    // reset auth token state
    setAuthToken("");
    setUser({
      id: "",
      email: "",
      name: "",
      role: "",
    });
    // clear local storage
    localStorage.removeItem("authToken");
    // redirect to login page
    navigate("/login");
  };

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
        <AuthContext.Provider
          value={{ authToken, login, logout, user, setUser }}
        >
          <NavigationBar />
          <div className="main-container">
            <Routes>
              <Route path="/" element={<ContentView />} />
              <Route path="/book/:bookId" element={<BookView />} />
              <Route path="/profile/:userId" element={<ProfileView />} />
              <Route path="/borrowings" element={<BorrowingHistory />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </div>
        </AuthContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { App, ColorModeContext, AuthContext };
