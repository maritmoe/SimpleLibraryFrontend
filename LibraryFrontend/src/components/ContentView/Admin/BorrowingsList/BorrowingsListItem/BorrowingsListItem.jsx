import PropTypes from "prop-types";

function BorrowingsListItem({ borrowing }) {
  return (
    <tr>
      <td>{borrowing.book.title}</td>
      <td>{borrowing.user.id}</td>
      <td>{borrowing.borrowedDate}</td>
    </tr>
  );
}

export default BorrowingsListItem;

BorrowingsListItem.propTypes = {
  borrowing: PropTypes.object,
};
