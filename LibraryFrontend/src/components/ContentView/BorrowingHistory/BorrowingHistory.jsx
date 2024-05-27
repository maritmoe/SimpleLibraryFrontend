import { useEffect, useState } from "react";
import BorrowingHistoryItem from "./BorrowingHistoryItem/BorrowingHistoryItem";
import "./BorrowingHistory.css";

function BorrowingHistory() {
  const [borrowings, setBorrowings] = useState([]);
  const [error, setError] = useState(null);
  const currentUser = 1; // TODO: use current user

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = () => {
    fetch(`http://localhost:5114/library/borrowings/${currentUser}`, {
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
    <div className="borrowing-history">
      {error && <p>{error.message}</p>}
      <h2>Borrowing History</h2>
      {borrowings[0] && (
        <table>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Date of Borrowing</th>
            </tr>
          </thead>
          <tbody>
            {borrowings.map((borrowing, index) => (
              <BorrowingHistoryItem key={index} borrowing={borrowing} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BorrowingHistory;
