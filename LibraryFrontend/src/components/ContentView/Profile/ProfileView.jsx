import { useEffect, useState } from "react";

function ProfileView() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const currentUser = 1;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    fetch(`http://localhost:5114/library/users/${currentUser}`)
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

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      {user && (
        <div>
          <h2>Profile</h2>
          <p>Users ID: {user.id}</p>
          <p>Users Name: {user.name}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
