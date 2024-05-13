// Things to include: Logo, link to BookList, darkmode icon, ProfilePicture (Profile, MyBorrowings, LogOut)
// Look at this: https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
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
import {
  LightMode,
  DarkMode,
  MenuBook,
  AdminPanelSettings,
} from "@mui/icons-material";
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
    navigate("/profile");
  };

  const handleMyBorrowingsClick = () => {
    handleCloseUserMenu();
    navigate("/borrowings");
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar disableGutters sx={{ gap: 2 }}>
        <img style={{ height: "70px" }} alt="Logo" src={logo} />
        <Box>
          <Tooltip title="Navigate to books">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<MenuBook />}
              onClick={() => navigate("/")}
            >
              Books
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Navigate to admin if authorized">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AdminPanelSettings />}
              onClick={() => navigate("/admin")}
            >
              Admin Site
            </Button>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            title={
              theme.palette.mode === "dark"
                ? "Click for Light mode"
                : "Click for Dark mode"
            }
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={
                theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />
              }
              onClick={colorMode.toggleColorMode}
              aria-label={
                theme.palette.mode === "dark" ? "light mode" : "dark mode"
              }
            >
              {theme.palette.mode === "dark" ? "light mode" : "dark mode"}
            </Button>
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
