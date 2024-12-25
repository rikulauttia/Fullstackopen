import { useState } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	Delete,
	ExpandLess,
	ExpandMore,
	Send,
	ThumbUpAlt,
} from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardContent,
	Collapse,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';

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

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Typography
						variant="h6"
						component={Link}
						to={`/blogs/${blog.id}`}
						sx={{
							textDecoration: 'none',
							color: 'primary.main',
							'&:hover': { textDecoration: 'underline' },
						}}
					>
						{blog.title} by {blog.author}
					</Typography>
					<IconButton onClick={toggleVisibility} size="small">
						{visible ? <ExpandLess /> : <ExpandMore />}
					</IconButton>
				</Box>

				<Collapse in={visible}>
					<Box sx={{ mt: 2 }}>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
							{blog.url}
						</Typography>

						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
							<Typography variant="body2">{blog.likes} likes</Typography>
							<IconButton onClick={handleLike} size="small" color="primary">
								<ThumbUpAlt fontSize="small" />
							</IconButton>
						</Box>

						<Typography variant="body2" sx={{ mb: 2 }}>
							Added by {blog.user.name}
						</Typography>

						{user?.name === blog.user?.name && (
							<Button
								variant="outlined"
								color="error"
								startIcon={<Delete />}
								size="small"
								data-testid="remove-button"
								onClick={() => removeBlog(blog.id, blog.title, blog.author)}
								sx={{ mb: 2 }}
							>
								Remove
							</Button>
						)}

						<Divider sx={{ my: 2 }} />

						<Typography variant="h6">Comments</Typography>
						<List dense>
							{blog.comments?.map((comment, index) => (
								<ListItem key={index}>
									<ListItemText primary={comment} />
								</ListItem>
							))}
						</List>

						<Box
							component="form"
							onSubmit={handleAddComment}
							sx={{
								display: 'flex',
								gap: 1,
								mt: 2,
							}}
						>
							<TextField
								size="small"
								fullWidth
								value={comment}
								onChange={({ target }) => setComment(target.value)}
								placeholder="Write a comment"
								variant="outlined"
							/>
							<IconButton type="submit" color="primary">
								<Send />
							</IconButton>
						</Box>
					</Box>
				</Collapse>
			</CardContent>
		</Card>
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
