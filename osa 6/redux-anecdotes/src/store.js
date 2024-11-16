import { configureStore } from "@reduxjs/toolkit";

import anecdotesReducer, { appendAnecdote } from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";
import anecdoteService from "./services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdoteService.getAll().then((anecdotes) =>
  anecdotes.forEach((anecdote) => {
    store.dispatch(appendAnecdote(anecdote));
  })
);

export default store;
