import { Button, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminMenu() {
  const navigate = useNavigate();
  return (
    <Stack sx={{ gap: 2 }}>
      <h2>Admin Site</h2>
      <Tooltip title="Create and Add New Book to Library">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin/add")}
        >
          Create Book
        </Button>
      </Tooltip>
      <Tooltip title="Edit a Book">
        <Button
          variant="contained"
          color="secondary"
          disabled
          onClick={() => navigate("/admin/books/:bookId")}
        >
          Edit Book
        </Button>
      </Tooltip>
      <Tooltip title="Get All Users of Library">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/admin/users")}
        >
          Get All Users
        </Button>
      </Tooltip>
      <Tooltip title="Get All Borrowings">
        <Button
          variant="contained"
          color="secondary"
          disabled
          onClick={() => navigate("/admin/borrowings")}
        >
          Borrowings
        </Button>
      </Tooltip>
    </Stack>
  );
}

export default AdminMenu;
