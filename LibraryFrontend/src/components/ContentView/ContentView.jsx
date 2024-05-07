import { useState, useEffect } from "react";
import Dashboard from "./Dashboard/Dashboard";

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

  return <div>{data && <Dashboard data={data} error={error} />}</div>;
}

export default ContentView;
