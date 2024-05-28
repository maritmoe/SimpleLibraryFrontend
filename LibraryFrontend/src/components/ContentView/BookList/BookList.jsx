import PropTypes from "prop-types";
import BookListItem from "./BookListItem/BookListItem";
import {
  Box,
  Container,
  InputLabel,
  List,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
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
          <Container sx={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
            <Box>
              <InputLabel id="filter-label">Filter</InputLabel>
              <Tooltip title="Select a filtering option" placement="left-start">
                <Select
                  labelId="filter-label"
                  value={filterValue}
                  onChange={(event) => setFilterValue(event.target.value)}
                >
                  <MenuItem value="show-all">None</MenuItem>
                  <MenuItem value="long-books">Long Books</MenuItem>
                  <MenuItem value="short-books">Short Books</MenuItem>
                </Select>
              </Tooltip>
            </Box>
            <Box>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Tooltip title="Select a sorting option" placement="right-start">
                <Select
                  labelId="sort-label"
                  value={sortValue}
                  onChange={(event) => setSortValue(event.target.value)}
                >
                  <MenuItem value="no-sorting">None</MenuItem>
                  <MenuItem value="shortest">Length Increasing</MenuItem>
                  <MenuItem value="longest">Length Decreasing</MenuItem>
                  <MenuItem value="title">Title Alphabetic</MenuItem>
                </Select>
              </Tooltip>
            </Box>
          </Container>
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
