import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";

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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={loginDetails.email}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginDetails.password}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">I don&apos;t have a user</Link>
    </div>
  );
}

export default LogIn;
