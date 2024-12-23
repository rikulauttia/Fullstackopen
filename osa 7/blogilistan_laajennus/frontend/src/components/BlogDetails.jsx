import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
	const { id } = useParams();
	const blogs = useSelector((state) => state.blogs);

	const blog = blogs.find((blog) => blog.id === id);

	if (!blog) {
		return <div>Loading...</div>;
	}

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
		</div>
	);
};

export default BlogDetails;
