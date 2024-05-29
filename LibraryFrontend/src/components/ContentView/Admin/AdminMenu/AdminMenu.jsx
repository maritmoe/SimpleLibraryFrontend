import {
  EditNote,
  Group,
  LibraryAdd,
  LibraryAddTwoTone,
  LibraryBooks,
} from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMenu() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Admin menu"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <Tab
          icon={<LibraryAdd />}
          label="Create book"
          onClick={() => navigate("/admin/add")}
        />
        <Tab
          icon={<LibraryAddTwoTone />}
          label="Create multiple books"
          onClick={() => navigate("/admin/add/multiple")}
        />
        <Tab
          icon={<EditNote />}
          label="Edit book"
          onClick={() => navigate("/admin/books/edit")}
        />
        <Tab
          icon={<Group />}
          label="Get users"
          onClick={() => navigate("/admin/users")}
        />
        <Tab
          icon={<LibraryBooks />}
          label="Get borrowings"
          onClick={() => navigate("/admin/borrowings")}
        />
      </Tabs>
    </>
  );
}

export default AdminMenu;
