const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const mostLikedBlog = blogs.reduce((favorite, blog) => {
		return blog.likes > favorite.likes ? blog : favorite
	})

	return {
		title: mostLikedBlog.title,
		author: mostLikedBlog.author,
		likes: mostLikedBlog.likes
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const authorBlogCounts = blogs.reduce((counts, blog) => {
		counts[blog.author] = (counts[blog.author] || 0) + 1
		return counts
	}, {})

	const mostBlogsAuthor = Object.keys(authorBlogCounts).reduce((maxAuthor, author) => {
		return authorBlogCounts[author] > authorBlogCounts[maxAuthor] ? author : maxAuthor
	})

	return {
		author: mostBlogsAuthor,
		blogs: authorBlogCounts[mostBlogsAuthor]
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const authorLikes = blogs.reduce((acc, blog) => {
		acc[blog.author]= (acc[blog.author] || 0) + blog.likes
		return acc
	}, {})

	const mostLikedAuthor = Object.keys(authorLikes).reduce((mostLiked, author) => {
		return authorLikes[author] > authorLikes[mostLiked] ? author : mostLiked
	})

	return {
		author: mostLikedAuthor,
		likes: authorLikes[mostLikedAuthor]
	}
}

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}