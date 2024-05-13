import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useRef, useState } from "react";
import { AdminPanelSettings, MenuBook } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

function BottomNavigationBar() {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          colors={"secondary"}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Tooltip title="Navigate to books">
            <BottomNavigationAction
              label="Books"
              icon={<MenuBook />}
              onClick={() => navigate("/")}
            />
          </Tooltip>
          <Tooltip title="Navigate to admin if authorized">
            <BottomNavigationAction
              label="Admin"
              icon={<AdminPanelSettings />}
              onClick={() => navigate("/admin")}
            />
          </Tooltip>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNavigationBar;
