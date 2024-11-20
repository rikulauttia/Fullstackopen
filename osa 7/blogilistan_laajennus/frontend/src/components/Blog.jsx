import { useState } from 'react';

import PropTypes from 'prop-types';

import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleLike = async () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1
		}

		const returnedBlog = await blogService.update(blog.id, updatedBlog)
		updateBlog(returnedBlog)
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	return (
		<div className='blog' style={blogStyle}>
			<div>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			</div>
			{visible && (
				<div>
					<p>{blog.url}</p>
					<p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
					<p>{blog.user.name}</p>
					{user?.name === blog.user?.name && (
						<button data-testid="remove-button" onClick={() => removeBlog(blog.id, blog.title, blog.author)}>
							remove
						</button>
					)}
				</div>
			)}
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		url: PropTypes.string.isRequired,
	}).isRequired
}

export default Blog