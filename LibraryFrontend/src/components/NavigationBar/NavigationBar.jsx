import { useContext, useState } from "react";

import { ColorModeContext } from "../../App";

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
import { LightMode, DarkMode, AdminPanelSettings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    // TODO: navigate to current user
    // Navigates to default user with id 1
    navigate("/profile/1");
  };

  const handleMyBorrowingsClick = () => {
    handleCloseUserMenu();
    navigate("/borrowings");
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
          <Tooltip
            title={
              theme.palette.mode === "dark"
                ? "Click for Light mode"
                : "Click for Dark mode"
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
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Profile picture" src="" />
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
            <MenuItem onClick={handleProfileClick}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleMyBorrowingsClick}>
              <Typography textAlign="center">My Borrowings</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default NavigationBar;
