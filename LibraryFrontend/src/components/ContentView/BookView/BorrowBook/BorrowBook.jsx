import PropTypes from "prop-types";
import { Box, Button, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../App";

function BorrowBook({ book }) {
  const { user } = useContext(AuthContext);
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
      userId: user.id,
      bookId: book.id,
      borrowedDate: today,
    });
  }, []);

  const handleBorrowing = (event) => {
    event.preventDefault();
    if (!user) {
      alert("You have to log in to borrow a book");
    } else if (borrowing.userId && borrowing.bookId && borrowing.borrowedDate) {
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
      <Tooltip title={`Borrow "${book.title}"`}>
        <Button variant="outlined" color="secondary" onClick={handleBorrowing}>
          Borrow Book
        </Button>
      </Tooltip>
    </Box>
  );
}

export default BorrowBook;

BorrowBook.propTypes = {
  book: PropTypes.object,
};
