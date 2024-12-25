import { useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setNotification } from '../redux/notificationReducer';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
	const dispatch = useDispatch();
	const [visible, setVisible] = useState(false);
	const [comment, setComment] = useState('');

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const handleLike = async () => {
		const updatedBlog = {
			...blog,
			likes: blog.likes + 1,
		};

		const returnedBlog = await blogService.update(blog.id, updatedBlog);
		updateBlog(returnedBlog);
	};

	const handleAddComment = async (event) => {
		event.preventDefault();
		if (comment.trim() === '') {
			return;
		}
		try {
			const updatedBlog = await blogService.addComment(blog.id, { comment });
			updateBlog(updatedBlog);
			setComment('');
			dispatch(
				setNotification(
					{ message: `Comment added to "${blog.title}"`, type: 'success' },
					5
				)
			);
		} catch (error) {
			console.error('Failed to add comment:', error.message);
		}
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div className="blog" style={blogStyle}>
			<div>
				<Link to={`/blogs/${blog.id}`}>
					{blog.title} {blog.author}
				</Link>
				<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			</div>
			{visible && (
				<div>
					<p>{blog.url}</p>
					<p>
						likes {blog.likes} <button onClick={handleLike}>like</button>
					</p>
					<p>{blog.user.name}</p>
					{user?.name === blog.user?.name && (
						<button
							data-testid="remove-button"
							onClick={() => removeBlog(blog.id, blog.title, blog.author)}
						>
							remove
						</button>
					)}
					<h4>Comments</h4>
					<ul>
						{blog.comments?.map((comment, index) => (
							<li key={index}>{comment}</li>
						))}
					</ul>
					<form onSubmit={handleAddComment}>
						<input
							type="text"
							value={comment}
							onChange={({ target }) => setComment(target.value)}
							placeholder="Write a comment"
						/>
						<button type="submit">add comment</button>
					</form>
				</div>
			)}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		likes: PropTypes.number.isRequired,
		url: PropTypes.string.isRequired,
		comments: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,
};

export default Blog;
