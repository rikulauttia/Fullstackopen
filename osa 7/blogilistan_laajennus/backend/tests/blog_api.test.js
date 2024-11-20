const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
	await User.deleteMany({})
})

describe('testing get', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')
		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blogs have an id field instead of _id', async () => {
		const response = await api.get('/api/blogs')
		response.body.forEach(blog => {
			expect(blog.id).toBeDefined()
		})
	})
})

describe('testing post', () => {
	test('blog is added', async () => {

		const newUser = {
			username: 'New',
			name: 'New Newer',
			password: 'abc123'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'New',
			password: 'abc123'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)


		const newBlog = {
			title: 'New Book',
			author: 'New Writer',
			url: 'http://example.com',
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)

		const response = await api.get('/api/blogs')
		expect(response.body.length).toEqual(helper.initialBlogs.length + 1)
	})
	test('added blog is in json format', async () => {
		const newUser = {
			username: 'New',
			name: 'New Newer',
			password: 'abc123'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'New',
			password: 'abc123'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)


		const newBlog = {
			title: 'New Book',
			author: 'New Writer',
			url: 'http://example.com',
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	})

	test('blog not added if no token', async () => {

		const newBlog = {
			title: 'Blog',
			author: 'Author',
			url: 'http://example.com',
			likes: 5
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)

	})
})

describe('testing post with missing fields', () => {
	test('if likes is missing, it defaults to 0', async () => {
		const newUser = {
			username: 'New',
			name: 'New Newer',
			password: 'abc123'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'New',
			password: 'abc123'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)

		const newBlog = {
			title: 'No Likes Blog',
			author: 'No Likes Author',
			url: 'http://nolikes.com',
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)

		const blogsAtEnd = await api.get('/api/blogs')
		const addedBlog = blogsAtEnd.body[blogsAtEnd.body.length - 1]

		expect(addedBlog.likes).toBe(0)
	})

	test('if title is missing', async () => {
		const newUser = {
			username: 'New',
			name: 'New Newer',
			password: 'abc123'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'New',
			password: 'abc123'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)

		const newBlog = {
			author: 'Author without Title',
			url: 'http://example.com',
			likes: 5,
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(400)
	})

	test('fails with status code 400 if url is missing', async () => {
		const newUser = {
			username: 'New',
			name: 'New Newer',
			password: 'abc123'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'New',
			password: 'abc123'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)

		const newBlog = {
			title: 'Blog without URL',
			author: 'Author without URL',
			likes: 5,
			user: savedUser.body.id
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(400)
	})
})


describe('testing delete', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const newUser = {
			username: 'New',
			name: 'New Newer',
			password: 'abc123'
		}

		const savedUser = await api
			.post('/api/users')
			.send(newUser)

		const loginDetails = {
			username: 'New',
			password: 'abc123'
		}

		const login = await api
			.post('/api/login')
			.send(loginDetails)

		const newBlog = {
			title: 'New Blog',
			author: 'Test Author',
			url: 'http://example.com',
			likes: 5,
			user: savedUser.body.id
		}

		const blogResponse = await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${login.body.token}`)
			.send(newBlog)
			.expect(201)

		const blogToDelete = blogResponse.body
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `Bearer ${login.body.token}`)
			.expect(204)
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

		const ids = blogsAtEnd.map(b => b.id)
		expect(ids).not.toContain(blogToDelete.id)
	})
})

describe('testing updating', () => {
	test('succeeds in updating the likes of a blog', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		const updatedBlog = {
			title: 'Updated Title',
			author: 'Updated Author',
			url: 'https://updatedurl.com',
			likes: 90
		}

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(updatedBlog)
			.expect(200)

		const blogsAtEnd = await helper.blogsInDb()
		const updatedBlogFromDb = blogsAtEnd.find(b => b.id === blogToUpdate.id)

		expect(updatedBlogFromDb.likes).toEqual(updatedBlog.likes)
	})
})

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('expected `username` to be unique')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

})

describe('testing user creation with invalid inputs', () => {
	test('creation fails if password is too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'validusername',
			name: 'Valid Name',
			password: '10'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Password must be at least 3 characters long')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails if username is too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'no',
			name: 'User',
			password: 'validpassword'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('Username must be at least 3 characters long')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
})


afterAll(async () => {
	await mongoose.connection.close()
})