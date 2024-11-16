import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        votes: 0,
        id: getId(),
      });
    },
    voteYes(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : votedAnecdote))
        .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { newAnecdote, voteYes, appendAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
