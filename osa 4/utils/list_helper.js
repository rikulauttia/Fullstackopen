const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	mostLikedBlog = blogs.reduce((favorite, blog) => {
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

module.exports = {
	dummy, totalLikes, favoriteBlog, mostBlogs
}