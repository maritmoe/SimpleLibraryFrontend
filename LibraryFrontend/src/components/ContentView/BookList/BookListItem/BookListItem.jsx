import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Fragment } from "react";

function BookListItem({ book }) {
  const navigate = useNavigate();

  return (
    <>
      <ListItem alignItems="flex-start">
        {book && (
          <>
            <ListItemText
              primary={book.title}
              secondary={
                <Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    By AuthorName
                  </Typography>
                  {` Length: ${book.pages} pages`}
                </Fragment>
              }
            />
            <Tooltip title={`Navigate to BookView for book with id ${book.id}`}>
              <Button
                variant="text"
                color="secondary"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                View Book
              </Button>
            </Tooltip>
          </>
        )}
      </ListItem>
      <Divider />
    </>
  );
}

export default BookListItem;

BookListItem.propTypes = {
  book: PropTypes.object,
};
