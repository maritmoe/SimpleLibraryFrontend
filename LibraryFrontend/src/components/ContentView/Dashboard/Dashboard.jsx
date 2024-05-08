import PropTypes from "prop-types";

// Include: some facts about the library and a BookList component

function Dashboard({ data, error }) {
  return (
    <>
      {error && <p>{error.message}</p>}
      {data && <h2>Books</h2>}
      <ul>
        {data.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  data: PropTypes.array,
  error: PropTypes.object,
};
