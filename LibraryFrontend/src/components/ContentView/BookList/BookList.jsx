import PropTypes from "prop-types";
import BookListItem from "./BookListItem/BookListItem";
import { InputLabel, List, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function BookList({ data, error }) {
  const [filterValue, setFilterValue] = useState("show-all");
  const [sortValue, setSortValue] = useState("no-sorting");

  const getSortedBooks = (books) => {
    if (sortValue === "shortest") {
      return books.sort((a, b) => a.pages - b.pages);
    } else if (sortValue === "longest") {
      return books.sort((a, b) => b.pages - a.pages);
    } else if (sortValue === "title") {
      return books.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    } else return books;
  };

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
            <MenuItem value="show-all">None</MenuItem>
            <MenuItem value="long-books">Long books</MenuItem>
            <MenuItem value="short-books">Short books</MenuItem>
          </Select>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            value={sortValue}
            onChange={(event) => setSortValue(event.target.value)}
          >
            <MenuItem value="no-sorting">None</MenuItem>
            <MenuItem value="shortest">Length increasing</MenuItem>
            <MenuItem value="longest">Length decreasing</MenuItem>
            <MenuItem value="title">Title alphabetic</MenuItem>
          </Select>
          <List sx={{ width: "100%", maxWidth: 360 }}>
            {getSortedBooks(getFilteredBooks()).map((book) => (
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
