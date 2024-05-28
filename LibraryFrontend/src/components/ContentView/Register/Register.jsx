import { Box, Button, Stack, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleResponse() {
    alert("Successfully registered a new user");
    // Navigate to login page
    navigate(`/login`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Signs up by making post request
    fetch(`http://localhost:5114/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.status === 201) {
        response.json().then(() => handleResponse());
      } else {
        setInvalid(true);
      }
    });
  }

  return (
    <div>
      <h2>Register New User</h2>
      {invalid && <span>Something went wrong</span>}
      <Stack
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 1 },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email"
          name="email"
          type="email"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={handleChange}
          value={formData.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={handleChange}
          value={formData.password}
        />
        <TextField
          label="Name"
          name="name"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={handleChange}
          value={formData.name}
        />
        <Box sx={{ mb: 2 }}>
          <Tooltip
            title={`Register a new user with email: ${formData.email}`}
            placement="right"
          >
            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </Tooltip>
        </Box>
      </Stack>
      <Link to="/login">I already have a user</Link>
    </div>
  );
}

export default Register;
