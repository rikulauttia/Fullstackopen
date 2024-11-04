import { useState } from 'react'

import PropTypes from 'prop-types'

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
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
                Author:
				<input
					type="text"
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
                URL:
				<input
					type="text"
					value={url}
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