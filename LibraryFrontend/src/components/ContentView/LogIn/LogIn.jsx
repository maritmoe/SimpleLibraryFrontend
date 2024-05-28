import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";
import { Box, Button, Stack, TextField, Tooltip } from "@mui/material";

function LogIn() {
  const { login } = useContext(AuthContext);

  const [invalid, setInvalid] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    // Logs in by making post request
    fetch(`http://localhost:5114/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    }).then((response) => {
      const payload = response.json();
      if (response.status === 200) {
        payload.then((data) => login(data));
      } else {
        setInvalid(true);
      }
    });
  }

  return (
    <div>
      <h2>Log In</h2>
      {invalid && <span>Either the email or the password was incorrect</span>}
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
          value={loginDetails.email}
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
          value={loginDetails.password}
        />
        <Box sx={{ mb: 2 }}>
          <Tooltip
            title={`Log in to user with email: ${loginDetails.email}`}
            placement="right"
          >
            <Button variant="outlined" color="secondary" type="submit">
              Log In
            </Button>
          </Tooltip>
        </Box>
      </Stack>
      <Link to="/register">I don&apos;t have a user</Link>
    </div>
  );
}

export default LogIn;
