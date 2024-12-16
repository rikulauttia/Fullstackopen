import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { setNotification } from './redux/notificationReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const dispatch = useDispatch();
	const [user, setUser] = useState(null);
	const blogFormRef = useRef();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogout = async (event) => {
		event.preventDefault();
		window.localStorage.removeItem('loggedBlogappUser');
		setUser(null);
		dispatch(
			setNotification(
				{ message: 'Logged out successfully', type: 'success' },
				5
			)
		);
	};

	const loginUser = async (userObject) => {
		try {
			const user = await loginService.login(userObject);
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			dispatch(
				setNotification({ message: 'Login successful', type: 'success' }, 5)
			);
		} catch (exception) {
			dispatch(
				setNotification(
					{ message: 'Wrong username or password', type: 'error' },
					5
				)
			);
		}
	};

	const updateBlog = async (updatedBlog) => {
		try {
			const returnedBlog = await blogService.update(
				updatedBlog.id,
				updatedBlog
			);
			setBlogs(
				blogs.map((blog) =>
					blog.id === returnedBlog.id
						? { ...returnedBlog, user: blog.user || returnedBlog.user }
						: blog
				)
			);
		} catch (exception) {
			dispatch(
				setNotification({ message: 'Failed to update blog', type: 'error' }, 5)
			);
		}
	};

	const addBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			const newBlog = await blogService.create(blogObject);
			newBlog.user = user;
			setBlogs(blogs.concat(newBlog));
			dispatch(
				setNotification(
					{
						message: `A new blog "${newBlog.title}" by ${newBlog.author} added`,
						type: 'success',
					},
					5
				)
			);
		} catch (exception) {
			dispatch(
				setNotification({ message: 'Failed to add blog', type: 'error' }, 5)
			);
		}
	};

	const removeBlog = async (id, title, author) => {
		const confirmRemove = window.confirm(`Remove blog ${title} by ${author}?`);
		if (!confirmRemove) return;

		try {
			await blogService.remove(id);
			setBlogs(blogs.filter((blog) => blog.id !== id));
			dispatch(
				setNotification(
					{ message: `Removed blog "${title}" by ${author}`, type: 'success' },
					5
				)
			);
		} catch (error) {
			dispatch(
				setNotification(
					{ message: `Failed to remove blog "${title}"`, type: 'error' },
					5
				)
			);
		}
	};

	if (user === null) {
		return (
			<div>
				<LoginForm login={loginUser} />
			</div>
		);
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification />
			<p>
				{user.name} logged in<button onClick={handleLogout}>logout</button>
			</p>

			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>

			{blogs
				.slice()
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						updateBlog={updateBlog}
						removeBlog={removeBlog}
						user={user}
					/>
				))}
		</div>
	);
};

export default App;
