import PropTypes from "prop-types";

function BorrowingHistoryItem({ borrowing }) {
  return (
    <tr>
      <td>{borrowing.book.title}</td>
      <td>{borrowing.borrowedDate}</td>
    </tr>
  );
}

export default BorrowingHistoryItem;

BorrowingHistoryItem.propTypes = {
  borrowing: PropTypes.object,
};
