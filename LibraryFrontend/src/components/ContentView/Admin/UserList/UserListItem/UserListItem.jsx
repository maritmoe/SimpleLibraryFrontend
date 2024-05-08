import PropTypes from "prop-types";
import "./UserListItem.css";

function UserListItem({ user }) {
  return (
    <li className="user-list-item">
      <p>User ID: {user.id}</p>
      <p className="user-name">{user.name}</p>
    </li>
  );
}

export default UserListItem;

UserListItem.propTypes = {
  user: PropTypes.object,
};
