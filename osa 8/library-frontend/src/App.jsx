import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    setPage("login");
  };

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
