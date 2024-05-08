import PropTypes from "prop-types";
import "./BookListItem.css";

function BookListItem({ book }) {
  return (
    <li className="book-list-item">
      <p>Title:</p>
      <p className="book-title">{book.title}</p>
      <p>Length: {book.pages} pages.</p>
    </li>
  );
}

export default BookListItem;

BookListItem.propTypes = {
  book: PropTypes.object,
};
