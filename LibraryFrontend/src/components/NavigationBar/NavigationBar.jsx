// Things to include: Logo, link to BookList, darkmode icon, ProfilePicture (Profile, MyBorrowings, LogOut)
// Look at this: https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
import { useContext, useState } from "react";

import { ColorModeContext } from "../../App";

import logo from "../../assets/SimpleLibraryLogo.png";

import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

function NavigationBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const settings = ["Profile", "My Borrowings", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <img style={{ height: "100px" }} alt="Logo" src={logo} />
          <Box>
            <Tooltip title="Navigate to books">
              <Button variant="contained" color="secondary">
                BookList link to come
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
