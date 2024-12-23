import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
	const { id } = useParams();
	const users = useSelector((state) => state.user.users);
	const blogs = useSelector((state) => state.blogs);

	const user = users.find((user) => user.id === id);

	if (!user) {
		return <div>Loading...</div>;
	}

	const userBlogs = blogs.filter((blog) => blog.user.id === id);

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>Added Blogs</h3>
			<ul>
				{userBlogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default User;
