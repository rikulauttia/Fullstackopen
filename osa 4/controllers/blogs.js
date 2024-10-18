const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const user = await User.findById(body.userId)

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
	try {
		const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

		if (!deletedBlog) {
			return response.status(404).json({ error: 'Blog not found!' })
		}
		response.status(204).end()
	} catch (error) {
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