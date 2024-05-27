import PropTypes from "prop-types";
import { Box, Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

function BorrowBook({ book }) {
  const currentUser = 1;
  const [borrowing, setBorrowing] = useState({
    userId: "",
    bookId: "",
    borrowedDate: "",
  });

  useEffect(() => {
    // TODO: user should be able to choose the date of borrowing
    const today = new Date().toISOString().split("T")[0]; // Example date: 2024-05-13
    setBorrowing({
      ...borrowing,
      userId: currentUser,
      bookId: book.id,
      borrowedDate: today,
    });
  }, []);

  const handleBorrowing = (event) => {
    event.preventDefault();
    if (borrowing.userId && borrowing.bookId && borrowing.borrowedDate) {
      fetch("http://localhost:5114/library/borrowings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowing),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  return (
    <Box>
      <Tooltip title="Borrow book">
        <Button variant="outlined" color="secondary" onClick={handleBorrowing}>
          Borrow Book {book.id}
        </Button>
      </Tooltip>
    </Box>
  );
}

export default BorrowBook;

BorrowBook.propTypes = {
  book: PropTypes.object,
};
