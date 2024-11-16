import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./NotificationContext";
import { createAnecdote, getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatchNotification({
        type: "SET_NOTIFICATION",
        payload: "Anecdote added!",
      });
      setTimeout(
        () => dispatchNotification({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
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
      dispatchNotification({
        type: "SET_NOTIFICATION",
        payload: "Anecdote must be at least 5 characters long.",
      });
      setTimeout(
        () => dispatchNotification({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
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

    dispatchNotification({
      type: "SET_NOTIFICATION",
      payload: `You voted '${anecdote.content}'`,
    });
    setTimeout(
      () => dispatchNotification({ type: "CLEAR_NOTIFICATION" }),
      5000
    );
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
