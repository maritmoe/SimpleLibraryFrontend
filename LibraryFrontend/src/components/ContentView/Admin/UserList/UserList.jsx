import { useEffect, useState } from "react";
import UserListItem from "./UserListItem/UserListItem";
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:5114/library/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => setError(error));
  };
  return (
    <div>
      {error && <p>{error.message}</p>}
      {users && <h2>Users</h2>}
      {users && (
        <ul className="admin-user-list">
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
