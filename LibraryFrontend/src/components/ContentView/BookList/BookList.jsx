import PropTypes from "prop-types";
import BookListItem from "./BookListItem/BookListItem";
import { List } from "@mui/material";

// Include: some facts about the library and a BookList component

function BookList({ data, error }) {
  return (
    <>
      {error && <p>{error.message}</p>}
      {data && <h2>Books</h2>}
      {data && (
        <List sx={{ width: "100%", maxWidth: 360 }}>
          {data.map((book) => (
            <BookListItem key={book.id} book={book} />
          ))}
        </List>
      )}
    </>
  );
}

export default BookList;

BookList.propTypes = {
  data: PropTypes.array,
  error: PropTypes.object,
};
