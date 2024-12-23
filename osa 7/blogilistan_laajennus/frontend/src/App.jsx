import { useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	NavLink,
	Route,
	Routes,
} from 'react-router-dom';

import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import User from './components/User';
import UserList from './components/UserList';
import {
	createBlog,
	initializeBlogs,
	likeBlog,
	removeBlog,
} from './redux/blogReducer';
import { setNotification } from './redux/notificationReducer';
import { initializeUsers, logoutUser, setUser } from './redux/userReducer';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.user.user);
	const users = useSelector((state) => state.user.users);

	const blogFormRef = useRef();

	// Initialize blogs
	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUsers());
	}, [dispatch]);

	// Set logged-in user from localStorage
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	}, [dispatch]);

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser');
		dispatch(logoutUser());
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
			dispatch(setUser(user));
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

	const addBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility();
			dispatch(createBlog(blogObject));
			dispatch(
				setNotification(
					{
						message: `A new blog "${blogObject.title}" by ${blogObject.author} added`,
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

	const likeBlogHandler = (blog) => {
		dispatch(likeBlog(blog));
		dispatch(
			setNotification(
				{ message: `Liked blog "${blog.title}"`, type: 'success' },
				5
			)
		);
	};

	const removeBlogHandler = (id, title, author) => {
		const confirmRemove = window.confirm(
			`Remove blog "${title}" by ${author}?`
		);
		if (confirmRemove) {
			dispatch(removeBlog(id));
			dispatch(
				setNotification(
					{ message: `Removed blog "${title}" by ${author}`, type: 'success' },
					5
				)
			);
		}
	};

	if (!user) {
		return <LoginForm login={loginUser} />;
	}

	return (
		<Router>
			<div>
				<h2>Blogs</h2>
				<Notification />
				<p>
					{user.name} logged in <button onClick={handleLogout}>logout</button>
				</p>
				<nav>
					<NavLink to="/" end>
						Blogs
					</NavLink>{' '}
					| <NavLink to="/users">Users</NavLink>
				</nav>
				<Routes>
					<Route
						path="/"
						element={
							<>
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
											updateBlog={likeBlogHandler}
											removeBlog={removeBlogHandler}
											user={user}
										/>
									))}
							</>
						}
					/>
					<Route path="/users" element={<UserList />} />
					<Route path="/users/:id" element={<User />} />
					<Route path="/blogs/:id" element={<BlogDetails />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
