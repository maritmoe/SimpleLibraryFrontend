import PropTypes from "prop-types";
import BookListItem from "./BookListItem/BookListItem";
import { InputLabel, List, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function BookList({ data, error }) {
  const [filterValue, setFilterValue] = useState("show-all");

  const getFilteredBooks = () => {
    if (filterValue === "long-books") {
      return data.filter((book) => book.pages > 300);
    } else if (filterValue === "short-books") {
      return data.filter((book) => book.pages <= 300);
    }
    return data;
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <h2>Books</h2>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
          >
            <MenuItem value="show-all">Show all</MenuItem>
            <MenuItem value="long-books">Show long books</MenuItem>
            <MenuItem value="short-books">Show short books</MenuItem>
          </Select>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {getFilteredBooks().map((book) => (
              <BookListItem key={book.id} book={book} />
            ))}
          </List>
        </>
      )}
    </>
  );
}

export default BookList;

BookList.propTypes = {
  data: PropTypes.array,
  error: PropTypes.object,
};
