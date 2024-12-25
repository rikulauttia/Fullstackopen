import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addComment } from '../redux/blogReducer';

const BlogDetails = () => {
	const { id } = useParams();
	const blogs = useSelector((state) => state.blogs);
	const dispatch = useDispatch();
	const [comment, setComment] = useState('');

	const blog = blogs.find((blog) => blog.id === id);

	if (!blog) {
		return <div>Loading...</div>;
	}

	const handleAddComment = (event) => {
		event.preventDefault();
		if (comment.trim() === '') {
			return;
		}
		dispatch(addComment(blog.id, comment));
		setComment('');
	};

	return (
		<div>
			<h2>{blog.title}</h2>
			<p>{blog.author}</p>
			<p>
				<a href={blog.url} target="_blank" rel="noopener noreferrer">
					{blog.url}
				</a>
			</p>
			<p>{blog.likes} likes</p>
			<p>added by {blog.user?.name}</p>

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
	);
};

export default BlogDetails;
