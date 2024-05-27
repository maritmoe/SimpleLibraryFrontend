import { useEffect, useState } from "react";
import BorrowingsListItem from "./BorrowingsListItem/BorrowingsListItem";
import "./BorrowingsList.css";

function BorrowingsList() {
  const [borrowings, setBorrowings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = () => {
    fetch(`http://localhost:5114/library/borrowings/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setBorrowings(data))
      .catch((error) => setError(error));
  };

  return (
    <div className="borrowings-list">
      {error && <p>{error.message}</p>}
      <h2>Borrowing History</h2>
      {borrowings[0] && (
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>User ID</th>
              <th>Date of Borrowing</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((borrowing, index) => (
              <BorrowingsListItem key={index} borrowing={borrowing} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BorrowingsList;
