import { useState } from "react";

import PropTypes from "prop-types";

import { gql, useMutation } from "@apollo/client";

const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;

const GENRES_QUERY = gql`
  query {
    allBooks {
      genres
    }
  }
`;

const NewBook = ({ show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_BOOKS, variables: { genre: null } }, // Refetch all books for "all genres"
      { query: GENRES_QUERY }, // Refetch genres to update the genre buttons
    ],
    update: (cache, { data: { addBook } }) => {
      // Update the books cache
      cache.updateQuery(
        { query: ALL_BOOKS, variables: { genre: null } },
        (data) => {
          const existingBooks = data?.allBooks || [];
          return {
            allBooks: [...existingBooks, addBook],
          };
        }
      );

      // Update the genres cache
      cache.updateQuery({ query: GENRES_QUERY }, (data) => {
        const existingGenres =
          data?.allBooks.flatMap((book) => book.genres) || [];
        const updatedGenres = Array.from(
          new Set([...existingGenres, ...addBook.genres])
        );
        return {
          allBooks: updatedGenres.map((genre) => ({ genres: [genre] })),
        };
      });
    },
  });

  if (!show) return null;

  const submit = async (event) => {
    event.preventDefault();

    await addBook({
      variables: { title, author, published: parseInt(published), genres },
    });

    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (genre.trim() && !genres.includes(genre)) {
      setGenres([...genres, genre]);
      setGenre("");
    }
  };

  if (loading) return <div>Adding book...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(", ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default NewBook;
