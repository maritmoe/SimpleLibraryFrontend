import PropTypes from "prop-types";

// Include: some facts about the library and a BookList component

function Dashboard({ data, error }) {
  console.log(data);
  return (
    <ul>
      {data.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  data: PropTypes.array,
  error: PropTypes.object,
};
