import {
  Box,
  Button,
  Container,
  Dialog,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

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
    <Stack sx={{ gap: 2 }}>
      <h2>Add New Book To Library</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Container>
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
        </Container>
        <Container>
          <TextField
            disabled
            label="Language"
            defaultValue="Language"
            required
          />
          <TextField disabled label="Author" defaultValue="Author" required />
          <TextField disabled label="Genre" defaultValue="Genre" required />
        </Container>
        <Container sx={{ m: 1 }}>
          <Tooltip title="Create and Add New Book to Library">
            <Button variant="contained" color="secondary" type="submit">
              Add Book
            </Button>
          </Tooltip>
        </Container>
      </Box>
      <Dialog onClose={handleClose} open={open}>
        <p>
          Successfully added new book to the library. See console log for
          details.
        </p>
      </Dialog>
    </Stack>
  );
}

export default CreateBook;
