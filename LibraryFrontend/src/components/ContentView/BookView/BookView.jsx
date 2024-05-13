import { useParams } from "react-router-dom";
import BorrowBook from "./BorrowBook/BorrowBook";
import { useEffect, useState } from "react";

function BookView() {
  const { bookId } = useParams();
  const [book, setBook] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  const fetchBook = () => {
    fetch(`http://localhost:5114/library/books/${bookId}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => setError(error));
  };

  return (
    <div>
      <h2>Book View</h2>
      {error && <p>Error: {error.message}</p>}
      {book && (
        <>
          <p>Title: {book.title}</p>
          <p>Number of Pages: {book.pages}</p>
          <BorrowBook book={book} />
        </>
      )}
    </div>
  );
}

export default BookView;
