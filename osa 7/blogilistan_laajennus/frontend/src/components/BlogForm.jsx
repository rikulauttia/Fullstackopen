import { useState } from 'react';

import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleAddBlog = (event) => {
		event.preventDefault()
		createBlog({ title, author, url })
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return(
		<form onSubmit={handleAddBlog}>
			<div>
                Title:
				<input
					type="text"
					data-testid='title'
					value={title}
					placeholder="title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
                Author:
				<input
					type="text"
					data-testid='author'
					value={author}
					placeholder="author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
                URL:
				<input
					type="text"
					data-testid='url'
					value={url}
					placeholder="url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	)
}

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired
}

export default BlogForm