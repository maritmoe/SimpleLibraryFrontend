import { Button, Dialog, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import "./EditBook.css";

function EditBook() {
  const [bookId, setBookId] = useState("");

  const [book, setBook] = useState({
    title: "",
    pages: "",
  });

  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchBook = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5114/library/books/${bookId}`)
      .then((response) => {
        const data = response.json();
        if (response.status == 200) {
          data.then((value) => {
            setBook(value);
            setErrorMessage(null);
          });
        } else {
          data.then((value) => {
            setErrorMessage(value);
            setBook({
              title: "",
              pages: "",
            });
          });
        }
      })
      .catch((error) => setError(error));
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (book.title && book.pages) {
      fetch(`http://localhost:5114/library/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      setOpen(true);
      setBookId("");
      setBook({
        title: "",
        pages: "",
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };
  return (
    <div className="edit-book-box">
      {error && <p>Error: {error.message}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
      <h2>Edit Book</h2>
      <form
        className={
          window.innerWidth > 700 ? "fetch-book-form-big" : "fetch-book-form"
        }
        onSubmit={fetchBook}
      >
        <TextField
          label="Book ID"
          type="number"
          value={bookId}
          onChange={(event) => setBookId(event.target.value)}
        />
        <Tooltip title="Fetch book with id">
          <Button variant="outlined" color="secondary" type="submit">
            {book.title && book.pages ? "Fetch new book" : "Fetch book"}
          </Button>
        </Tooltip>
      </form>
      {(book.title || book.pages) && (
        <>
          <p>Current Book ID: {book.id}</p>
          <form
            className={
              window.innerWidth > 700 ? "edit-book-form-big" : "edit-book-form"
            }
            onSubmit={handleSubmit}
          >
            <TextField
              label="Title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              required
              onChange={handleChange}
              value={book.title}
            />
            <TextField
              label="Pages"
              name="pages"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              required
              onChange={handleChange}
              value={book.pages}
            />
            <TextField disabled label="Year" defaultValue="Year" required />
            <TextField
              disabled
              label="Language"
              defaultValue="Language"
              required
            />
            <TextField disabled label="Author" defaultValue="Author" required />
            <TextField disabled label="Genre" defaultValue="Genre" required />
            <Tooltip title="Edit Book">
              <Button variant="outlined" color="secondary" type="submit">
                Update Book
              </Button>
            </Tooltip>
          </form>
        </>
      )}
      <Dialog onClose={handleClose} open={open}>
        <p>Successfully updated the book. See console log for details.</p>
      </Dialog>
    </div>
  );
}

export default EditBook;
