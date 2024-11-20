const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}	else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
		return response.status(400).json({ error: 'expected `username` to be unique' })
	}	else if (error.name ===  'JsonWebTokenError') {
		return response.status(401).json({ error: 'token missing or invalid' })
	}	else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired'
		})
	}
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		request.token = authorization.replace('Bearer ', '')
	} else {
		request.token = null
	}

	next()
}

const userExtractor = async (request, response, next) => {
	const token = request.token
	if (token) {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)

		if (decodedToken.id) {
			const user = await User.findById(decodedToken.id)
			request.user = user
		}
	}

	next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }