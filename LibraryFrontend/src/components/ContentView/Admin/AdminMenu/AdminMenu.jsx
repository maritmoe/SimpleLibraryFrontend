import { EditNote, Group, LibraryAdd, LibraryBooks } from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMenu() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(null);

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
      >
        <Tab
          icon={<LibraryAdd />}
          label="Create book"
          onClick={() => navigate("/admin/add")}
        />
        <Tab
          icon={<EditNote />}
          label="Edit book"
          disabled
          onClick={() => navigate("/admin/books/:bookId")}
        />
        <Tab
          icon={<Group />}
          label="Get users"
          onClick={() => navigate("/admin/users")}
        />
        <Tab
          icon={<LibraryBooks />}
          label="Get borrowings"
          disabled
          onClick={() => navigate("/admin/borrowings")}
        />
      </Tabs>
    </>
  );
}

export default AdminMenu;
