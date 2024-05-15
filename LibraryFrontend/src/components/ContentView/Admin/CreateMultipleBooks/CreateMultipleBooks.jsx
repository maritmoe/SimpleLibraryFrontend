import { Button, Dialog, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import "./CreateMultipleBooks.css";

function CreateMultipleBooks() {
  // Add multiple books to library by uploading a json file containing a list of book objects
  const [fileContent, setFileContent] = useState("");

  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5114/library/books/multiple", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fileContent),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setOpen(true);
    setFileContent("");
  };

  const readFileOnUpload = (uploadedFile) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      try {
        setFileContent(JSON.parse(fileReader.result));
        setError(null);
      } catch (e) {
        setError("Not a valid JSON file!");
      }
    };
    if (uploadedFile !== undefined) fileReader.readAsText(uploadedFile);
  };

  return (
    <div>
      <h2>Add Multiple Books To Library</h2>
      {error && (
        <p className="file-upload-error-message">An error occured: {error}</p>
      )}
      <form className="add-multiple-form" onSubmit={handleSubmit}>
        <TextField
          label="JSON File"
          type="file"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={(e) => readFileOnUpload(e.target.files[0])}
        />
        <Tooltip title="Create and Add Multiple Books">
          <Button variant="outlined" color="secondary" type="submit">
            Add Books
          </Button>
        </Tooltip>
      </form>
      <Dialog onClose={handleClose} open={open}>
        <p>
          Tried to add new books to the library. See console log for details.
        </p>
      </Dialog>
    </div>
  );
}

export default CreateMultipleBooks;
