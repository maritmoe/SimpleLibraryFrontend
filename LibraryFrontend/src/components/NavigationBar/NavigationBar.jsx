import { useContext, useState } from "react";

import { AuthContext, ColorModeContext } from "../../App";

import "./NavigationBar.css";

import logo from "../../assets/SimpleLibraryLogo.png";

import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  LightMode,
  DarkMode,
  AdminPanelSettings,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    navigate(`/profile/${user.id}`);
  };

  const handleMyBorrowingsClick = () => {
    handleCloseUserMenu();
    navigate("/borrowings");
  };

  const handleLogoutClick = () => {
    handleCloseUserMenu();
    logout();
  };

  const handleLoginClick = () => {
    handleCloseUserMenu();
    navigate("/login");
  };

  const handleRegistrationClick = () => {
    handleCloseUserMenu();
    navigate("/register");
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar disableGutters sx={{ alignSelf: "center", gap: 2 }}>
        <Tooltip title="Navigate to books">
          <Button aria-label="Books" onClick={() => navigate("/")}>
            <img style={{ height: "70px" }} alt="Logo" src={logo} />
          </Button>
        </Tooltip>
        <Box>
          {user.role === "Admin" && (
            <Tooltip title="Navigate to admin menu">
              <IconButton
                sx={{ width: "50px", height: "50px" }}
                onClick={() => navigate("/admin/add")}
                aria-label="Admin"
                label="Admin"
              >
                <AdminPanelSettings />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip
            title={
              theme.palette.mode === "dark"
                ? "Click for light mode"
                : "Click for dark mode"
            }
          >
            <IconButton
              sx={{ width: "50px", height: "50px" }}
              onClick={colorMode.toggleColorMode}
              aria-label={
                theme.palette.mode === "dark" ? "light-mode" : "dark-mode"
              }
            >
              {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              sx={{ width: "50px", height: "50px" }}
              onClick={handleOpenUserMenu}
              aria-label="Settings"
            >
              {user.id ? <Avatar alt="Profile picture" src="" /> : <Settings />}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {user.id && (
              <>
                <MenuItem onClick={handleProfileClick}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleMyBorrowingsClick}>
                  <Typography textAlign="center">My Borrowings</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </>
            )}
            {!user.id && (
              <>
                <MenuItem onClick={handleLoginClick}>
                  <Typography textAlign="center">Log In</Typography>
                </MenuItem>
                <MenuItem onClick={handleRegistrationClick}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default NavigationBar;
