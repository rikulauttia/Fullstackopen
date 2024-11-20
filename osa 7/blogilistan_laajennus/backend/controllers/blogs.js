const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const user = request.user
	if (!user) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const user = request.user

		const blog = await Blog.findById(request.params.id)

		if (!blog) {
			return response.status(404).json({ error: 'Blog not found!' })
		}

		if (blog.user.toString() !== user._id.toString()) {
			return response.status(401).json({ error: 'Only the creator can delete this blog' })
		}

		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()

	} catch (error) {
		console.error('Error deleting blog:', error.message)
		next(error)
	}
})

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
		if (!updatedBlog) {
			return response.status(404).json({ error: 'Blog not found' })
		}
		response.status(200).json(updatedBlog)
	} catch (error) {
		next(error)
	}
})

module.exports = blogsRouter