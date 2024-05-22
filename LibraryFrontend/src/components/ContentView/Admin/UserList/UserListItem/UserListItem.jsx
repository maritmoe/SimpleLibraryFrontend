import PropTypes from "prop-types";
import "./UserListItem.css";

function UserListItem({ user }) {
  return (
    <li className="user-list-item">
      <p>
        User ID:{" "}
        <a href={`/profile/${user.id}`} aria-label={`User ${user.id}`}>
          {user.id}
        </a>
      </p>
      <p className="user-name">{user.name}</p>
    </li>
  );
}

export default UserListItem;

UserListItem.propTypes = {
  user: PropTypes.object,
};
