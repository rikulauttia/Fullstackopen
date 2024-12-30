import { useState } from "react";

import { gql, useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
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

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    setPage("login");
  };

  const updateCacheWith = (addedBook) => {
    const dataInCache = client.readQuery({
      query: ALL_BOOKS,
      variables: { genre: null },
    });

    if (!dataInCache) return;

    const alreadyExists = dataInCache.allBooks.some(
      (book) => book.title === addedBook.title
    );

    if (!alreadyExists) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: null },
        data: {
          allBooks: dataInCache.allBooks.concat(addedBook),
        },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      window.alert(
        `New book added: ${addedBook.title} by ${addedBook.author.name}`
      );
      updateCacheWith(addedBook);
    },
  });

  return (
    <div>
      <nav>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </nav>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      {token && <NewBook show={page === "add"} />}
      <Recommendations show={page === "recommend"} />
      <Login show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
