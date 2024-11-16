import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { createAnecdote, getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    if (content.length < 5) {
      alert("Anecdote must be at least 5 characters long.");
      return;
    }

    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    voteAnecdoteMutation.mutate(updatedAnecdote);
  };

  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm onCreate={addAnecdote} />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
