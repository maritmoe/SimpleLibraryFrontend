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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to="/login">I already have a user</Link>
    </div>
  );
}

export default Register;
