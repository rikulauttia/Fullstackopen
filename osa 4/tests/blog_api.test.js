const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
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
		const newBlog = {
			title: 'New Blog',
			author: 'Test Author',
			url: 'http://example.com',
			likes: 10,
		}

		await api
			.post('/api/blogs')
			.send(newBlog)

		const response = await api.get('/api/blogs')
		expect(response.body.length).toEqual(helper.initialBlogs.length + 1)
	})
	test('added blog is in json format', async () => {
		const newBlog = {
			title: 'New Blog',
			author: 'Test Author',
			url: 'http://example.com',
			likes: 10,
		}
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	})
})


afterAll(async () => {
	await mongoose.connection.close()
})