import { useContext, useEffect, useState } from "react";
import BorrowingHistoryItem from "./BorrowingHistoryItem/BorrowingHistoryItem";
import "./BorrowingHistory.css";
import { AuthContext } from "../../../App";

function BorrowingHistory() {
  const [borrowings, setBorrowings] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const fetchBorrowings = () => {
    fetch(`http://localhost:5114/library/borrowings/${user.id}`, {
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
      <h2>Borrowing History of {user.name}</h2>
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
