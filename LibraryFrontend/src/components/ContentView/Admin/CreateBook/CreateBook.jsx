import { Button, Dialog, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import "./CreateBook.css";

function CreateBook() {
  const [book, setBook] = useState({
    title: "",
    pages: "",
  });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (book.title && book.pages) {
      fetch("http://localhost:5114/library/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      setOpen(true);
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
    <div className="create-book-box">
      <h2>Add New Book To Library</h2>
      <form
        className={
          window.innerWidth > 700 ? "create-book-form-big" : "create-book-form"
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
        <TextField disabled label="Language" defaultValue="Language" required />
        <TextField disabled label="Author" defaultValue="Author" required />
        <TextField disabled label="Genre" defaultValue="Genre" required />
        <Tooltip title="Create and Add New Book to Library">
          <Button variant="outlined" color="secondary" type="submit">
            Add Book
          </Button>
        </Tooltip>
      </form>
      <Dialog onClose={handleClose} open={open}>
        <p>
          Successfully added new book to the library. See console log for
          details.
        </p>
      </Dialog>
    </div>
  );
}

export default CreateBook;
