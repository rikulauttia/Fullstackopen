import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import App from "./App";
import anecdotesReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
