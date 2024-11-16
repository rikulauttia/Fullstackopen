import PropTypes from "prop-types";

const AnecdoteForm = ({ onCreate }) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

AnecdoteForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AnecdoteForm;
