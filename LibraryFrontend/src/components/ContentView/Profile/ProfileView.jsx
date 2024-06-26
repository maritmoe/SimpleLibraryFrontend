import { Box, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../App";
import { Delete } from "@mui/icons-material";

function ProfileView() {
  const [userForm, setUserForm] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { userId } = useParams();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    // Checks that the user being fetched is the logged in user or an admin
    if (userId === user.id || user.role === "Admin") {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = () => {
    fetch(`http://localhost:5114/library/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const data = response.json();
        if (response.status == 200) {
          data.then((value) => {
            setUserForm(value);
            setErrorMessage(null);
          });
        } else {
          data.then((value) => {
            setErrorMessage(value);
            setUserForm(null);
          });
        }
      })
      .catch((error) => setError(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userForm.name && userForm.id) {
      // Checks that the user being edited is the logged in user or an admin
      if (userId === user.id || user.role === "Admin") {
        fetch(`http://localhost:5114/library/users/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userForm),
        })
          .then((response) => response.json())
          .then((data) => {
            if (userId === user.id) {
              // Update user stored in AuthContext
              setUser({ ...user, name: userForm.name });
            }
            alert("New name of user with id " + data.id + " is: " + data.name);
          });
      }
    }
  };

  const handleDelete = () => {
    // Checks that the user being deleted is the logged in user or an admin
    if (userId === user.id || user.role === "Admin") {
      fetch(`http://localhost:5114/library/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) =>
          alert("User " + data.id + " " + data.name + " was deleted")
        );
    }
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          borderRadius: 1,
        }}
      >
        <h2>Profile</h2>
        {userForm && (
          <Tooltip title="Delete profile of user" placement="right">
            <IconButton
              sx={{ width: "50px", height: "50px", mt: 1.5, ml: 2 }}
              onClick={handleDelete}
              color="secondary"
              aria-label="Delete user"
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {userForm && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 1 },
          }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <p>ID: {userForm.id}</p>
          <TextField
            label="Name"
            name="name"
            InputLabelProps={{
              shrink: true,
            }}
            required
            onChange={handleChange}
            value={userForm.name}
          />
          <Box>
            <Tooltip title="Update profile of user" placement="right-start">
              <Button variant="outlined" color="secondary" type="submit">
                Update User
              </Button>
            </Tooltip>
          </Box>
        </Box>
      )}
    </div>
  );
}

export default ProfileView;
