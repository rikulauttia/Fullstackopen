import {
  useEffect,
  useRef,
  useState,
} from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [successMessage, setSuccessMessage] = useState(null)
	const [user, setUser] = useState(null)
	const blogFormRef = useRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs )
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])


	const handleLogout = async (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const loginUser = async (userObject) => {
		try {
			const user = await loginService.login(userObject)
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
		} catch (exception) {
			setErrorMessage('wrong username or password')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const updateBlog = async (updatedBlog) => {
		try {
			const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
			setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? { ...returnedBlog, user: blog.user || returnedBlog.user } : blog))
		} catch (exception) {
			setErrorMessage('Failed to liking the blog')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const addBlog = async (blogObject) => {
		try {
			blogFormRef.current.toggleVisibility()
			const newBlog = await blogService.create(blogObject)
			newBlog.user = user
			setBlogs(blogs.concat(newBlog))
			setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
			setTimeout(() => { setSuccessMessage(null) }, 5000)
		} catch (exception) {
			setErrorMessage('Failed to add blog')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const removeBlog = async (id, title, author) => {
		const confirmRemove = window.confirm(`Remove blog ${title} by ${author}?`)
		if (!confirmRemove) return

		try {
			await blogService.remove(id)
			setBlogs(blogs.filter(blog => blog.id !== id))
			setSuccessMessage(`Removed blog ${title} by ${author}`)
			setTimeout(() => { setSuccessMessage(null) }, 5000)
		} catch (error) {
			setErrorMessage(`Failed to remove blog ${title}`)
			setTimeout(() => { setErrorMessage(null) }, 5000)
		}
	}

	if (user === null) {
		return (
			<div>
				<LoginForm login={loginUser} errorMessage={errorMessage} />
			</div>
		)
	}

	return (
		<div>
			<h2>Blogs</h2>
			<Notification message={successMessage} type="success" />
			<Notification message={errorMessage} type="error" />
			<p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>

			<Togglable buttonLabel="create new blog" ref={blogFormRef}>
				<BlogForm createBlog={addBlog} />
			</Togglable>

			{blogs
				.slice()
				.sort((a, b) => b.likes - a.likes)
				.map(blog => (
					<Blog
						key={blog.id}
						blog={blog}
						updateBlog={updateBlog}
						removeBlog={removeBlog}
						user={user}
					/>
				))}
		</div>
	)
}

export default App