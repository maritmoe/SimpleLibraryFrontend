import PropTypes from "prop-types";
import "./UserListItem.css";
import { Link } from "react-router-dom";

function UserListItem({ user }) {
  return (
    <li className="user-list-item">
      <p>
        User ID: <Link to={`/profile/${user.id}`}>{user.id}</Link>
      </p>
      <p className="user-name">{user.name}</p>
    </li>
  );
}

export default UserListItem;

UserListItem.propTypes = {
  user: PropTypes.object,
};
