import { Box, Button, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileView() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = () => {
    // TODO: check that userId from path is same as current user or current user is an admin
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
            setUser(value);
            setErrorMessage(null);
          });
        } else {
          data.then((value) => {
            setErrorMessage(value);
            setUser(null);
          });
        }
      })
      .catch((error) => setError(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.name && user.id) {
      // TODO: check that userId from path is same as current user or current user is an admin
      fetch(`http://localhost:5114/library/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) =>
          alert("New name of user with id " + data.id + " is: " + data.name)
        );
    }
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      <h2>Profile</h2>
      {user && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 1 },
          }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <p>ID: {user.id}</p>
          <TextField
            label="Name"
            name="name"
            InputLabelProps={{
              shrink: true,
            }}
            required
            onChange={handleChange}
            value={user.name}
          />
          <Box>
            <Tooltip title="Update profile of user">
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
