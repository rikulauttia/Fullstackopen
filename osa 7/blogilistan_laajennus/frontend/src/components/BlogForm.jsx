import { useState } from 'react';

import PropTypes from 'prop-types';

import { CreateRounded } from '@mui/icons-material';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleAddBlog = (event) => {
		event.preventDefault();
		createBlog({ title, author, url });
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<Paper elevation={2} sx={{ p: 3, mb: 3 }}>
			<Typography variant="h6" gutterBottom>
				Create New Blog
			</Typography>
			<Box
				component="form"
				onSubmit={handleAddBlog}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<TextField
					label="Title"
					variant="outlined"
					fullWidth
					size="small"
					data-testid="title"
					value={title}
					placeholder="Enter blog title"
					onChange={({ target }) => setTitle(target.value)}
				/>
				<TextField
					label="Author"
					variant="outlined"
					fullWidth
					size="small"
					data-testid="author"
					value={author}
					placeholder="Enter author name"
					onChange={({ target }) => setAuthor(target.value)}
				/>
				<TextField
					label="URL"
					variant="outlined"
					fullWidth
					size="small"
					data-testid="url"
					value={url}
					placeholder="Enter blog URL"
					onChange={({ target }) => setUrl(target.value)}
				/>
				<Button
					type="submit"
					variant="contained"
					startIcon={<CreateRounded />}
					sx={{ mt: 1 }}
				>
					Create
				</Button>
			</Box>
		</Paper>
	);
};

BlogForm.propTypes = {
	createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
