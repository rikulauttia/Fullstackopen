import PropTypes from "prop-types";

import { gql, useQuery } from "@apollo/client";

const RECOMMENDATIONS = gql`
  query {
    recommendations {
      title
      author {
        name
      }
      published
    }
  }
`;

const Recommendations = ({ show }) => {
  const { loading, error, data } = useQuery(RECOMMENDATIONS);

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const books = data.recommendations;

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre{" "}
        <b>{books[0]?.author.favoriteGenre || "Unknown"}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Recommendations.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Recommendations;
