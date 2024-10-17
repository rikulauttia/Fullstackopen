const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	],
})


userSchema.set('toJSON', {
	transform: (document, returnedObejct) => {
		returnedObejct.id = returnedObejct._id.toString()
		delete returnedObejct._id
		delete returnedObejct.__v
		delete returnedObejct.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User