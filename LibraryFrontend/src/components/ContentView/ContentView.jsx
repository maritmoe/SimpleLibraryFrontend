import { useState, useEffect } from "react";
import BookList from "./BookList/BookList";

const API_URL = "http://localhost:5114/library/books";

function ContentView() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLibraryData();
  }, []);

  const fetchLibraryData = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  };

  return <div>{data && <BookList data={data} error={error} />}</div>;
}

export default ContentView;
